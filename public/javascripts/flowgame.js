var FlowGame = {};

FlowGame.createColumn = function(params) {
  return {
    tasks: [],
    wip: params.wip || 1
  };
};

FlowGame.createTask = function(params) {
  var param = params || {};
  return {
    size: param.size || 10,
    progress: param.progress || 0
  };
};


FlowGame.createBoard = function(params) {
  var param = params || {};
  param.columns = param.columns || [];
  param.columns.concat(FlowGame.createColumn({wip: Infinity}));

  return {
    columns: param.columns
  };
};

FlowGame.workOnTask = function(task, calculateProgress) {
  var workedOnTask = FlowGame.cloneTask(task);
  workedOnTask.progress = calculateProgress(task);
  return workedOnTask;
};

FlowGame.isTaskComplete = function(task) {
  return task.progress === task.size;
};

FlowGame.canColumnReceiveTask = function(column) {
  return column.tasks.length < column.wip;
};

FlowGame.addTaskToColumn = function(task, column) {
  var clone = FlowGame.cloneColumn(column);
  clone.tasks.push(task);
  return clone;
};

FlowGame.changeColumn = function(params) {
  var len = params.columns.length;
  var res = [];

  for(var i = len - 1; i >= 0; i--) {
    if(params.index === i) {
      res.push(params.column);
    }
    else {
      res.push(params.columns[i]);
    }
  }

  return res;
};

FlowGame.changeColumnsOnBoard = function(params) {
  var board = FlowGame.cloneBoard(params.board);
  board.columns = params.columns;
  return board;
};

FlowGame.addTaskToBoard = function(params) {
  debugger;
  var column = FlowGame.addTaskToColumn(params.task, params.board.columns[params.column]);
  var columns = FlowGame.changeColumn({column: column, columns: params.board.columns, index: params.column});
  return FlowGame.changeColumnsOnBoard({board: params.board, columns: columns});
};


FlowGame.moveCompletedTasksOnBoard = function(board) {
  var columns = FlowGame.moveCompletedTasksForward(board.columns);
  return FlowGame.changeColumnsOnBoard({board: board, columns: columns});
};

FlowGame.cloneColumn = function(column) {
  return {
    tasks: column.tasks.slice()
  };
};

FlowGame.cloneTask = function(task) {
  return {
    size: task.size,
    progress: task.progress
  };
};

FlowGame.cloneBoard = function(board) {
  return {
    columns: board.columns.slice()
  };
};

FlowGame.moveCompletedTasksForward = function(columns) {
  if(columns.length === 2) {
    return FlowGame.moveTasksBetweenColumns(columns[0], columns[1]);
  }

  var first = columns[0];
  var rest = FlowGame.moveCompletedTasksForward(columns.slice(1));

  return FlowGame.moveTasksBetweenColumns(first, rest[0]);
};

FlowGame.moveTasksBetweenColumns = function(sourceColumn, destinationColumn) {
    var tasksToMove = FlowGame.completedTasksInColumn(sourceColumn);

    var updatedSourceColumn = FlowGame.removeTasksFromColumn(tasksToMove, sourceColumn);
    var updatedDestinationColumn = FlowGame.addTasksToColumn(tasksToMove, destinationColumn);

    return [updatedSourceColumn, updatedDestinationColumn];
};

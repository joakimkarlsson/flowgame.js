var FlowGame = {};
FlowGame.currentTaskId = 1;

FlowGame.createColumn = function(params) {
  return {
    tasks: [],
    wip: params.wip || 1
  };
};

FlowGame.nextTaskId = function() {
  var id = FlowGame.currentTaskId;
  FlowGame.currentTaskId++;
  return id;
};

FlowGame.createTask = function(params) {
  var param = params || {};
  return {
    id: FlowGame.nextTaskId(),
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

FlowGame.changeColumn = function(params) {
  var len = params.columns.length;
  var res = [];

  for(var i = 0; i < len; i++) {
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
  var column = FlowGame.addTasksToColumn({ tasks: [params.task ], column: params.board.columns[params.column]});
  var columns = FlowGame.changeColumn({column: column, columns: params.board.columns, index: params.column});
  return FlowGame.changeColumnsOnBoard({board: params.board, columns: columns});
};


FlowGame.moveCompletedTasksOnBoard = function(board) {
  var columns = FlowGame.moveCompletedTasksForward(board.columns);
  return FlowGame.changeColumnsOnBoard({board: board, columns: columns});
};

FlowGame.cloneColumn = function(column) {
  return {
    wip: column.wip,
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
    var tasksToMove = FlowGame.completedTasksInColumn({ column: sourceColumn, number: FlowGame.capacityLeftInColumn(destinationColumn)});

    var updatedSourceColumn = FlowGame.removeTasksFromColumn({tasks: tasksToMove, column: sourceColumn});
    var updatedDestinationColumn = FlowGame.addTasksToColumn({tasks: tasksToMove, column: destinationColumn});

    return [updatedSourceColumn, updatedDestinationColumn];
};

FlowGame.completedTasksInColumn = function(params) {
  if(params.number === 0) {
    return [];
  }

  var completedTasks = params.column.tasks.filter(FlowGame.isTaskComplete);
  var limitedResult = completedTasks.slice(0, params.number);

  return limitedResult;
};

FlowGame.removeTasksFromColumn = function(params) {
  var clone = FlowGame.cloneColumn(params.column);

  var taskNotInArrayPredicate = function(task) {
    return !params.tasks.some(function(pred) {
      return pred.id === task.id;
    });
  }

  var tasksLeft = clone.tasks.filter(taskNotInArrayPredicate);

  clone.tasks = tasksLeft;
  return clone;
};

FlowGame.addTasksToColumn = function(params) {
  var clone = FlowGame.cloneColumn(params.column);
  clone.tasks = clone.tasks.concat(params.tasks);
  return clone;
};

FlowGame.capacityLeftInColumn = function(column) {
  return column.wip - column.tasks.length;
};

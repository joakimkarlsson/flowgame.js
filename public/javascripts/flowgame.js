var FlowGame = {};

FlowGame.createColumn = function(params) {
  return {
    tasks: [],
    wip: params.wip || 1
  };
};

FlowGame.createTask = function() {
  return {};
};

FlowGame.workOnTask = function(task, calculateProgress) {
  var progressMade = FlowGame.calculateProgress(task);
  return FlowGame.createTask({size: task.size, progress: progressMade});
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

FlowGame.cloneColumn = function(column) {
  return {
    tasks: column.tasks.slice()
  };
};


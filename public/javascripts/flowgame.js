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

var FlowGame = {};

FlowGame.createColumn = function(params) {
  var column = {};
  var tasks = [];

  column.canReceiveTask = function() {
    return tasks.length < params.wip ;
  };

  column.addTask = function(task) {
    tasks.push(task);
  };

  return column;
};

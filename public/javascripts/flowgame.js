var FlowGame = {};

FlowGame.createColumn = function() {
  var column = {};

  column.canReceiveTask = function() {
    return true;
  };

  return column;
};

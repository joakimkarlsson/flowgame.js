describe("Column", function() {
  var column;

  beforeEach(function(){
    column = FlowGame.createColumn({wip: 1});
  });

  it("can receive a task if WIP is not reached", function() {
    expect(FlowGame.canColumnReceiveTask(column)).toBeTruthy();
  });

  describe("with WIP limit reached", function() {
    beforeEach(function() {
      column = FlowGame.addTaskToColumn(FlowGame.createTask(), column);
    });

    it("cannot receive a task", function() {
      expect(FlowGame.canColumnReceiveTask(column)).toBeFalsy();
    });
  });
});

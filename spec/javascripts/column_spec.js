describe("Column", function() {
  var column;

  beforeEach(function(){
    column = FlowGame.createColumn({wip: 1});
  });

  it("can receive a task if WIP is not reached", function() {
    expect(column.canReceiveTask()).toBeTruthy();
  });

  describe("with WIP limit reached", function() {
    beforeEach(function() {
      column.addTask({});
    });

    it("cannot receive a task", function() {
      expect(column.canReceiveTask()).toBeFalsy();
    });
  });
});

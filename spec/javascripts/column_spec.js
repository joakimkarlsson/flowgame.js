describe("Column", function() {
  var column;

  beforeEach(function(){
    column = FlowGame.createColumn({wip: 1});
  });

  it("has no tasks when first created", function() {
    expect(column.tasks.length).toEqual(0);
  });

  it("can receive a task if WIP is not reached", function() {
    expect(FlowGame.canColumnReceiveTask(column)).toBeTruthy();
  });

  describe("with WIP limit reached", function() {
    beforeEach(function() {
      column = FlowGame.addTasksToColumn({ tasks: [ FlowGame.createTask() ], column: column});
    });

    it("cannot receive a task", function() {
      expect(FlowGame.canColumnReceiveTask(column)).toBeFalsy();
    });
  });
});

describe("Column", function() {
  var column;

  beforeEach(function(){
    column = FlowGame.createColumn({wip: 1});
  });

  it("can receive a task if WIP is not reached", function() {
    expect(column.canReceiveTask()).toBeTruthy();
  });
});

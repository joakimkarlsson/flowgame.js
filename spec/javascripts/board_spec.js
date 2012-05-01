describe("Board", function() {
  var board = {};
  var task = {};

  beforeEach(function(){
    task = FlowGame.createTask({size: 1, progress: 1});
    board = FlowGame.createBoard({
      columns: [ FlowGame.createColumn({wip: 1}), FlowGame.createColumn({wip: 1}) ]
    });
  });

  describe("first column contains one completed task, second column is empty", function() {

    beforeEach(function() {
      board = FlowGame.addTaskToBoard({ board: board, task: task, column: 0});
      expect(board.columns[0].tasks).toContain(task);
      expect(board.columns[1].tasks.length).toEqual(0);
    });

    it("should move the task to the second column when we update the board", function() {
      debugger;
      board = FlowGame.moveCompletedTasksOnBoard(board);
      expect(board.columns[0].tasks.length).toEqual(0);
      expect(board.columns[1].tasks).toContain(task);
    });
  });
});


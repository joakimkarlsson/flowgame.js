describe("Board", function() {
  var board = {};
  var firstTask = {};

  beforeEach(function(){
    firstTask = FlowGame.createTask({size: 1, progress: 1});
    board = FlowGame.createBoard({
      columns: [ FlowGame.createColumn({wip: 1}), FlowGame.createColumn({wip: 1}) ]
    });
  });

  describe("first column contains one completed task, second column is empty", function() {

    beforeEach(function() {
      board = FlowGame.addTaskToBoard({ board: board, task: firstTask, column: 0});
      expect(board.columns[0].tasks).toContain(firstTask);
      expect(board.columns[1].tasks.length).toEqual(0);
    });

    it("should move the task to the second column when we update the board", function() {
      board = FlowGame.moveCompletedTasksOnBoard(board);
      expect(board.columns[0].tasks.length).toEqual(0);
      expect(board.columns[1].tasks).toContain(firstTask);
    });
  });

  describe("first column contains one completed task, second column is at wip limit", function() {
    var secondTask = {};

    beforeEach(function() {
      secondTask = FlowGame.createTask({size:1, progress: 0});
      board = FlowGame.addTaskToBoard({ board: board, task: firstTask, column: 0});
      board = FlowGame.addTaskToBoard({ board: board, task: secondTask, column: 1});
    });

    it("should not move the task in the first column", function() {
      board = FlowGame.moveCompletedTasksOnBoard(board);
      expect(board.columns[0]).toHaveTasks([firstTask]);
      expect(board.columns[1]).toHaveTasks([secondTask]);
    });
  });
});


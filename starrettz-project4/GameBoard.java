/**
 Student Name: Zack Starrett
 File Name: GameBoard.java
 Assignment number: Project 4

 This file creates a GameBoard object, which is sent through the server and used to compare, update, and display
 the moves of each client. The board also checks for move legality and if the game has been completed.
*/

public class GameBoard {

	private boolean gameReady;
	private int playerNum;
	private int[][] board;
	private Service opponent;


	public GameBoard() {
		playerNum = 1;
		board = new int[3][3];
	}


	/**
	 * Checks for all possible win conditions given the current state of the board.
	 */
	public boolean gameWon() {
		if (board[0][0] != 0 && board[0][0] == board[1][0] && board[1][0] == board[2][0]) {
			return true;
		}else if (board[0][1] != 0 && board[0][1] == board[1][1] && board[1][1] == board[2][1]) {
			return true;
		}else if (board[0][2] != 0 && board[0][2] == board[1][2] && board[1][2] == board[2][2]) {
			return true;
		}else if (board[0][0] != 0 && board[0][0] == board[0][1] && board[0][1] == board[0][2]) {
			return true;
		}else if (board[1][0] != 0 && board[1][0] == board[1][1] && board[1][1] == board[1][2]) {
			return true;
		}else if (board[2][0] != 0 && board[2][0] == board[2][1] && board[2][1] == board[2][2]) {
			return true;
		}else if (board[0][0] != 0 && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
			return true;
		}else if (board[2][0] != 0 && board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
			return true;
		}else {
			return false;
		}
	}

	/**
	 * Checks if the board currently has any playable spaces remaining.
	 */
	public boolean boardFull() {
		for (int i = 0; i < board.length; i++) {
			for (int j = 0; j < board.length; j++) {
				if (board[i][j] == 0) {
					return false;
				}
			}
		}
		return true;
	}


	/**
	 * Checks if a given space if still available for play.
	 */
	public boolean spaceFree(int row, int column) {
		if (board[row][column] == 0) {
			return true;
		}else {
			return false;
		}
	}

	/**
	 * Checks if a given space is within the board range.
	 */
	public boolean spaceInBounds(int row, int column) {
		if (row < 3 || row > -1 || column < 3 || column > -1) {
			return true;
		} else {
			return false;
		}
	}


	/**
	 * Makes a move on the board, using the player's playerNum to indicate which player made the move.
	 */
	public void makeMove(int playerNum, int row, int column) {
		board[row][column] = playerNum;
	}

	/**
	 * Returns the current state of the board represented by a string containing a 2D array of ints.
	 */
	public String getBoardState() {
		String boardState = board[0][0] + " " + board[0][1] + " " + board[0][2] + "\n" + board[1][0] + " " + board[1][1] + " "
				+ board[1][2] + "\n" + board[2][0] + " " + board[2][1] + " " + board[2][2];
		return boardState;
	}


	public boolean isGameReady() {
		return gameReady;
	}

	public void setGameReady(boolean gameReadyArg) {
		gameReady = gameReadyArg;
	}

	public Service getOpponent() {
		return opponent;
	}

	public void setOpponent(Service opponentArg) {
		opponent = opponentArg;
	}

	public int getPlayerNum() {
		return playerNum;
	}

	public void setPlayerNum(int playerNumArg) {
		playerNum = playerNumArg;
	}

}
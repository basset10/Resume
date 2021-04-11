import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;
import java.util.concurrent.locks.ReentrantLock;

/**
Student Name: Zack Starrett
File Name: Service.java
Assignment number: Project 4

This file creates a Service object and executes several tic tac toe commands from a socket.
*/

public class Service implements Runnable {
	
	private PrintWriter out;
	private GameBoard board;
	private ReentrantLock l;
	private Socket socket;
	private Scanner in;

	
	public Service(Socket socketArg, GameBoard boardArg) {
		socket = socketArg;
		board = boardArg;
		l = new ReentrantLock();
	}

	
	@Override
	public void run() {
		try {
			try {
				in = new Scanner(socket.getInputStream());
				out = new PrintWriter(socket.getOutputStream());
				doService();
			} finally {
				socket.close();
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Executes all commands until the end of input.
	 */
	private void doService() {
		while (true) {
			if (!in.hasNext())
				return;	
			String command = in.next();
				executeCommand(command);
		}
	}

	/**
	 * Handles the execution of individual commands.
	 */
	private void executeCommand(String command) {
		if (command.equals("Hello")) {
			if (board.getPlayerNum() == 1) {
				out.println("Hello you are player " + board.getPlayerNum() + ".");
				out.println(board.getPlayerNum() + "\n");
				board.setPlayerNum(board.getPlayerNum()+1);
			} else {
				board.setGameReady(true);
				out.println("Hello you are player " + board.getPlayerNum() + ".");
				out.println(board.getPlayerNum());
				board.setPlayerNum(1);
				board.setOpponent(this);
			}		
		} else if (command.equals("move")) {
			moveCheck();
		}

		out.flush();
	}

	/**
	 * Checks if an attempted move is legal, or if the board is in a game won/draw state after the move is made. 
	 */
	private void moveCheck(){
		l.lock();
		//Critical section
		int player = in.nextInt();
		int r = in.nextInt();
		int c = in.nextInt();
		if (!board.isGameReady()) {
			out.println("Illegal player number");
			try {
				Thread.sleep(200);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		} else {
			if (board.spaceInBounds(r, c)) {
				if (board.spaceFree(r, c)) {
				executeMove(player, r, c);
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
					//First check if a player has won the game
					if (board.gameWon()) {
						out.println("Player " + player + " wins!!");
						board.getOpponent().out.println("Player " + player + " wins!!");
					}
					//Then check if the board is full
					if (board.boardFull()) {
						out.println("The game is a draw.");
						board.getOpponent().out.println("The game is a draw.");
					}
					board.getOpponent().out.flush();
					board.setOpponent(this);
				} else {
					out.println("Position " + r + " "  + c + " is taken, try again");
				}
			} else {
				out.println("Illegal Board Position");
			}
		}

		l.unlock();
	}

	/**
	 * Executes a legal board move for both clients.
	 */
	private void executeMove(int playerNumArg, int rowArg, int columnArg) {	
		board.makeMove(playerNumArg, rowArg, columnArg);
		out.println("Player " + playerNumArg+ " has chosen " + rowArg + " " + columnArg);
		out.println(board.getBoardState());
		board.getOpponent().out.println("Opponent moved at " + rowArg + " " + columnArg + " \n" + board.getBoardState() + "\n");
	}
	
}
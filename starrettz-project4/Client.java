import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Scanner;

/**
Student Name: Zack Starrett
File Name: Client.java
Assignment number: Project 4

This file creates a Client object which will automatically create commands for the server, receive incoming responses,
and update the client's GUI.
 */

public class Client {

	private static final int PORT = 8888;
	private Socket s;
	private Scanner in;
	private PrintWriter out;
	private String command;
	private String serverResponse;
	private int playerNum;

	public Client() {
		try {
			s = new Socket("localhost", PORT);
			InputStream instream = s.getInputStream();
			OutputStream outstream = s.getOutputStream();
			in = new Scanner(instream);
			out = new PrintWriter(outstream);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Loop that handles incoming server response messages.
	 */
	private void responseHandler() {
		boolean illegal = false;
		while (true) {
			if (!illegal) {
				serverResponse = in.nextLine();
			}

			//Check if the game will continue
			if (!serverResponse.startsWith("Opponent") && !serverResponse.startsWith("Player 1 wins")
					&& !serverResponse.startsWith("Player 2 wins") && !serverResponse.startsWith("The game is a draw")) {
				serverResponse = sendMove();
			}

			if (serverResponse.startsWith("Player 1 has") || serverResponse.startsWith("Player 2 has")) {
				updateBoard();
				illegal = false;
			} else if (serverResponse.startsWith("The game is a draw")) {
				System.out.println("Receiving: " + serverResponse);
				break;
			} else if (serverResponse.startsWith("Opponent")) {
				try {
					//Artificial delay to differentiate the two clients
					Thread.sleep(500);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				updateBoard();
			} else if (serverResponse.startsWith("Position")) {
				illegal = true;
			} else if (serverResponse.startsWith("Illegal")) {
				illegal = true;
			} else if (serverResponse.startsWith("Player 1 wins") || serverResponse.startsWith("Player 2 wins")) {
				System.out.println("Receiving: " + serverResponse);
				break;
			}

			System.out.println("Receiving: " + serverResponse + "\n");
		}
	}


	/**
	 * Starts a tic tac toe game.
	 */
	public void startGame() {
		System.out.println("Welcome! Enter 'Hello' to start");
		String command = "Hello";
		System.out.println("Sending: " + command);
		out.print(command + "\n");
		out.flush();
		serverResponse = in.nextLine();
		playerNum = in.nextInt();
		System.out.println("Receiving: " + serverResponse);
		if (playerNum == 2) {
			System.out.println("Waiting for Player 1's first move");
			in.nextLine();
		}

		try {
			responseHandler();
			s.close();
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Updates the client's GUI with the latest board information.
	 * Displays the board as a series of strings in console.
	 */
	private void updateBoard() {

		String boardRowOne = in.nextLine();
		String boardRowTwo = in.nextLine();
		String boardRowThree = in.nextLine();
		
		ArrayList<Character> gridChars = new ArrayList<Character>();
		
		for(int i = 0; i < ClientWindow.NUM_PANELS; i++) {
			gridChars.add(' ');
		}	

		for (int i = 0; i < boardRowOne.length(); i++){
			char c = boardRowOne.charAt(i);        
			if(i == 0) {
				gridChars.set(0,c);
			}else if(i == 2) {
				gridChars.set(1,c);
			}else if(i == 4) {
				gridChars.set(2,c);
			}
		}

		for (int i = 0; i < boardRowTwo.length(); i++){
			char c = boardRowTwo.charAt(i);        
			if(i == 0) {
				gridChars.set(3,c);
			}else if(i == 2) {
				gridChars.set(4,c);
			}else if(i == 4) {
				gridChars.set(5,c);
			}
		}

		for (int i = 0; i < boardRowThree.length(); i++){
			char c = boardRowThree.charAt(i);        
			if(i == 0) {
				gridChars.set(6,c);
			}else if(i == 2) {
				gridChars.set(7,c);
			}else if(i == 4) {
				gridChars.set(8,c);
			}
		}
		
		for(int i = 0; i < ClientWindow.NUM_PANELS; i++) {
			if(gridChars.get(i) == '1') {
				ClientWindow.holders.get(i).setStyle("-fx-background-color: blue");
			} else if(gridChars.get(i) == '2') {
				ClientWindow.holders.get(i).setStyle("-fx-background-color: red");
			}
		}

		System.out.println(boardRowOne);
		System.out.println(boardRowTwo);
		System.out.println(boardRowThree);
		System.out.println("");

	}

	/**
	 * Prepares and sends a move command to the server. Returns the response from the server.
	 */
	private String sendMove() {
		System.out.println("Command format: move <playernum> <row> <col>");
		String moveKeyword = "move";
		int number = playerNum;
		int row = Util.randomIntBetween(0,2);
		int column = Util.randomIntBetween(0,2);

		//Check for valid player number
		while (number != playerNum) {
			System.out.println("Illegal player number");
			number = Util.randomIntBetween(0,2);;
			row = Util.randomIntBetween(0,2);
			column = Util.randomIntBetween(0,2);
		}

		command = moveKeyword + " " + playerNum + " " + row + " " + column + "\n";
		System.out.println("Sending move: " + command);

		out.println(command);
		out.flush();
		serverResponse = in.nextLine();
		return serverResponse;
	}

}
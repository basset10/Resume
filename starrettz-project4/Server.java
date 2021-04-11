import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

/**
Student Name: Zack Starrett
File Name: Server.java
Assignment number: Project 4

This file creates a server which two clients can connect to for a game of tic tac toe.
*/

public class Server {

	private static final int PORT = 8888;
	public static GameBoard board = new GameBoard();
	public static ServerSocket server;

	public static void main(String[] args) throws IOException{
		
		server = new ServerSocket(PORT);
		System.out.println("Waiting for clients...");
		
		while(true){
			Socket s = server.accept();
			System.out.println("Client connected");
			Service service = new Service(s, board);
			Thread t = new Thread(service);
			t.start();
		}
	}
}
import java.util.ArrayList;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.layout.StackPane;
import javafx.scene.layout.TilePane;
import javafx.stage.Stage;

/**
 Student Name: Zack Starrett
 File Name: ClientWindow.java
 Assignment number: Project 4

 This file contains code necessary to create and display a JavaFX window
 populated with nine canvasses, each representing a playable space on a tic-tac-toe grid.
 This file also creates a new Client object and a Thread that will manage the client's actions.
*/

public class ClientWindow extends Application {

	final static public int SCENE_WIDTH = 300;
	final static public int SCENE_HEIGHT = 300;
	final static public int NUM_PANELS = 9;
	
	public static ArrayList<StackPane> holders = new ArrayList<StackPane>();
	
	private Client client = new Client();

	@Override
	public void start(Stage stage) throws Exception {
		
		//Create the window that displays the board from the client's perspective
		TilePane root = new TilePane();
		ArrayList<Canvas> canvases = new ArrayList<Canvas>();
		
		for(int i = 0; i < NUM_PANELS; i++) {
			holders.add(new StackPane());
			canvases.add(new Canvas(100,100));
			holders.get(i).getChildren().add(canvases.get(i));
			root.getChildren().add(holders.get(i));
		}

		Scene scene = new Scene(root, 300, 300);
		stage.setTitle("Tic Tac Toe");
		stage.setScene(scene);
		stage.show();

		//Create the thread that manages the client's actions
		Thread clientThread = new Thread(new Runnable() {
			@Override
			public void run() {
				client.startGame();
			}
		});
		clientThread.start();
	}

	public static void main(String[] args) {
		launch(args);
	}

}
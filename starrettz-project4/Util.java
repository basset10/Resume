import java.util.Random;

/**
Student Name: Zack Starrett
File Name: Util.java
Assignment number: Project 4

This file contains math expressions used throughout the program.
*/

public class Util {

	private static Random rng = new Random();
	   
	   /**
	   Generates a random integer between two specified values.
	   */
		public static int randomIntBetween(int min, int max) {
			max++;
			if (max > min)
				return min + rng.nextInt(max - min);
			if (max < min)
				return max + rng.nextInt(min - max);
			return min;
		}
	
	
}

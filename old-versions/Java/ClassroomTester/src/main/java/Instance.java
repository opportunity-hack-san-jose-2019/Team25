import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

public class Instance implements Runnable {

	// public static void main(String[] args) throws Exception {
	// int port = Integer.parseInt(args[0]);
	//
	// HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
	// server.createContext("/analyze", new MyHandler());
	// server.setExecutor(null); // creates a default executor
	// server.start();
	// }

	private static ArrayList<JsonObject> students;
	private static ArrayList<EpicStudent> stz;
	private static ArrayList<Assignment> assignments;

	static class MyHandler implements HttpHandler {

		@Override
		public void handle(HttpExchange t) throws IOException {
			String response = Thing();
			System.out.println("Responding with: " + response);
			t.sendResponseHeaders(200, response.length());
			OutputStream os = t.getResponseBody();
			os.write(response.getBytes());
			os.close();
		}
	}

	public Instance(ArrayList<JsonObject> students, ArrayList<EpicStudent> stz, ArrayList<Assignment> assignments) {
		this.students = students;
		this.stz = stz;
		this.assignments = assignments;
		System.out.println("Vibed");
		this.run();
	}

	public static Map<String, String> queryToMap(String query) {
		Map<String, String> result = new HashMap<>();
		for (String param : query.split("&")) {
			String[] entry = param.split("=");
			if (entry.length > 1) {
				result.put(entry[0], entry[1]);
			} else {
				result.put(entry[0], "");
			}
		}
		return result;
	}

	public static void addScore(String assignmentName, double score) {
		for (Assignment a : assignments) {
			if (a.getName().equals(assignmentName)) {
				a.addScore(score);
				System.out.println("Added score");
			}
		}
	}

	public static String Thing() throws IOException {

		JsonArray a = new JsonArray();

		for (JsonObject j : students) {
			a.add(j);
		}
		
//		JsonObject stats = new JsonObject();
		
		// Start stat code
		
//		ArrayList<String> grades = new ArrayList<>();
//		int numOfGradeless = 0;
//		for(EpicStudent j : stz) {
//			if(j.getScores().size() > 0) {
//				for(Grade g : j.getScores()) {
//					grades.add("" + (double) g.getScore() / g.getMaxScore());
//					
//					addScore(g.getAssignmentName(), (double) g.getScore() / g.getMaxScore());
//				}
//			} else {
//				numOfGradeless++;
//			}
//		}
//		
//		double sum = 0.0;
//		
//		for(String g : grades) {
//			sum += Double.parseDouble(g);
//		}
//		
//		stats.addProperty("average", sum / grades.size());
//		stats.addProperty("gradeless", numOfGradeless);
//		
//		System.out.println("A");
//		JsonArray jsonments = new JsonArray();
//		for(Assignment as : assignments) {
//			if(as.getScores().size() > 1) {
//				JsonObject asign = new JsonObject();
//				asign.addProperty("id",as.getId());
//				asign.addProperty("name", as.getName());
//				
//				asign.addProperty("couseId", as.getCourseId());
//				asign.addProperty("courseName", as.getCourseName());
//				
//				asign.addProperty("creationDate", as.getCreationDate());
//				asign.addProperty("dueDate", as.getDueDate());
//				
//				System.out.println("BHEEM");
//				
//				
//				JsonArray scorez = new JsonArray();
//				for(double score : as.getScores()) {
//					scorez.add(score);
//				}
//				asign.add("scores", scorez);
//				
//				jsonments.add(asign);
//			}
//		}
//		
		
		// End stat code
		JsonObject combined = new JsonObject();
		combined.add("students", a);
//		combined.add("stats", stats);
//		combined.add("assignments", jsonments);

		// return "" + sentimentResult.getSentimentScore();
		System.out.println(combined.toString());
		return combined.toString();
	}

	@Override
	public void run() {
		int port = 1234;

		try {
			HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
			server.createContext("/givemestuff", new MyHandler());
			server.setExecutor(null); // creates a default executor
			System.out.println("Starting");
			server.start();
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Uh oh! Something didn't work!!!");
		}
	}

}

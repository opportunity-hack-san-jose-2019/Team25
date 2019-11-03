import java.util.ArrayList;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class EpicStudent {
	private String name, id, courseId;
	private ArrayList<Grade> scores;

	public EpicStudent(String name, String id, String courseId) {
		this.name = name.split("\"")[7];
		this.id = id;
		scores = new ArrayList<>();
		this.courseId = courseId;
	}

	public String getId() {
		return id;
	}

	public void addScore(String assignmentName, int score, int maxScore) {
		scores.add(new Grade(assignmentName, score, maxScore));
	}

	public String getName() {
		return name;
	}

	public ArrayList<Grade> getScores() {
		return scores;
	}

	public JsonObject getJson() {
		JsonObject j = new JsonObject();

		j.addProperty("name", name);
		j.addProperty("id", id);

		JsonArray ja = new JsonArray();
		for (Grade g : scores) {
			JsonObject e = new JsonObject();
			e.addProperty("name", g.getAssignmentName());
			e.addProperty("score", g.getScore());
			e.addProperty("max", g.getMaxScore());
			
			ja.add(e);
		}

		j.add("scores", ja);

		return j;
	}
}

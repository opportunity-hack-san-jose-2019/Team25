import java.util.ArrayList;

public class Assignment {
	private ArrayList<Double> scores;
	private String name, courseName;
	private String id, courseId;
	private String creationDate, dueDate;
	
	public Assignment(String id, String name, String courseId, String courseName, String creationDate, String dueDate) {
		this.id = id;
		this.name = name;
		this.courseId = courseId;
		this.courseName = courseName;
		this.creationDate = creationDate;
		this.dueDate = dueDate;
	}
	
	public ArrayList<Double> getScores() {
		return scores;
	}
	
	public String getName() {
		return name;
	}
	
	public String getId() {
		return id;
	}
	
	public String getCourseName() {
		return courseName;
	}
	
	public String getCourseId() {
		return courseId;
	}
	
	public String getCreationDate() {
		return creationDate;
	}
	
	public String getDueDate() {
		return dueDate;
	}
	
	public void addScore(double score) {
		scores.add(score);
	}
}


public class Grade {
	private String assignmentName;
	private int score, maxScore;
	
	public Grade(String assignmentName, int score, int maxScore) {
		this.assignmentName = assignmentName;
		this.score = score;
		this.maxScore = maxScore;
	}
	
	public String getName() {
		return assignmentName;
	}
	
	public int getScore() {
		return score;
	}
	
	public String getAssignmentName() {
		return assignmentName;
	}
	
	public int getMaxScore() {
		return maxScore;
	}
}

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.classroom.ClassroomScopes;
import com.google.api.services.classroom.model.*;
import com.google.gson.JsonObject;
import com.google.api.services.classroom.Classroom;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * bad code
 * 
 * @author Kevin Rossel
 *
 */
public class ClassroomQuickstart {
	private static final String APPLICATION_NAME = "Google Classroom API Java Quickstart";
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	private static final String TOKENS_DIRECTORY_PATH = "tokens";

	/**
	 * Global instance of the scopes required by this quickstart. If modifying
	 * these scopes, delete your previously saved tokens/ folder.
	 */
	private static List<String> SCOPES = Arrays.asList(ClassroomScopes.CLASSROOM_COURSES_READONLY,
			ClassroomScopes.CLASSROOM_COURSEWORK_STUDENTS, ClassroomScopes.CLASSROOM_ROSTERS);
	private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

	private static ArrayList<EpicStudent> students;
	private static ArrayList<Assignment> assignments;

	/**
	 * Creates an authorized Credential object.
	 * 
	 * @param HTTP_TRANSPORT
	 *            The network HTTP Transport.
	 * @return An authorized Credential object.
	 * @throws IOException
	 *             If the credentials.json file cannot be found.
	 */
	private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
		// Load client secrets.
		InputStream in = ClassroomQuickstart.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
		if (in == null) {
			throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
		}
		GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

		// Build flow and trigger user authorization request.
		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY,
				clientSecrets, SCOPES)
						.setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
						.setAccessType("offline").build();
		LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
		return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
	}

	public static void main(String... args) throws IOException, GeneralSecurityException {
		students = new ArrayList<>();

		// Build a new authorized API client service.
		final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
		Classroom service = new Classroom.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
				.setApplicationName(APPLICATION_NAME).build();

		// List the first 10 courses that the user has access to.
		ListCoursesResponse response = service.courses().list().setPageSize(10).execute();
		List<Course> courses = response.getCourses();
		if (courses == null || courses.size() == 0) {
			System.out.println("No courses found.");
		} else {
			System.out.println("Courses:");
			ListStudentsResponse r;
			ListCourseWorkResponse rr;
			List<CourseWork> cwork = null;
			for (Course course : courses) {
				System.out.printf("%s\n", course.getName());

				r = service.courses().students().list(course.getId()).execute();

				try {
					for (Student student : r.getStudents()) {
						students.add(new EpicStudent(student.getProfile().getName().toString(),
								student.getProfile().getId(), course.getId()));
					}
				} catch (NullPointerException e) {
					System.out.println("No students for course: " + course.getName());
					continue;
				}

				rr = service.courses().courseWork().list(course.getId()).execute();

				cwork = rr.getCourseWork();

				try {
					System.out.println("JIGGASSS");
					for (CourseWork cw : cwork) {
						
						
						assignments.add(new Assignment(cw.getId(), cw.getTitle(), course.getId(), course.getName(), cw.getCreationTime(), cw.getDueDate().toString()));
						
						
						ListStudentSubmissionsResponse sr = service.courses().courseWork().studentSubmissions()
								.list(course.getId(), cw.getId()).execute();
						
						System.out.println("IUIEWUFHUIWF: " + sr.getStudentSubmissions().size());
						
						for (StudentSubmission ss : sr.getStudentSubmissions()) {
							System.out.println(cw.getAssignment().toString());
							getStudentById(ss.getUserId()).addScore(cw.getTitle(), ss.getAssignedGrade().intValue(), (int) Math.round(cw.getMaxPoints()));
						}

					}
					cwork.clear();
				} catch (NullPointerException e) {
					System.out.println("No course work for course: " + course.getName());
				}

				System.out.println(students.size());
			}
			printStudents(students);
			
			ArrayList<JsonObject> jsons = new ArrayList<>();
			for(EpicStudent s : students) {
				jsons.add(s.getJson());
			}
			
			System.out.println("Creating new instance");
			Instance in = new Instance(jsons, students, assignments);
		}
	}

	public static void printStudents(List<EpicStudent> bruh) {
		for (EpicStudent s : bruh) {
			System.out.println(s.getName() + s.getScores().size());
			for(Grade g : s.getScores()) {
				System.out.print(g.getName() + ", " + g.getScore() + "|");
			}
		}
	}

	public static EpicStudent getStudentById(String id) {
		for (EpicStudent s : students) {
			if (s.getId().equals(id)) {
				return s;
			}
			
		}
		return null;
	}
}
package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/classroom/v1"
)

// Retrieve a token, saves the token, then returns the generated client.
func getClient(config *oauth2.Config) *http.Client {
	// The file token.json stores the user's access and refresh tokens, and is
	// created automatically when the authorization flow completes for the first
	// time.
	tokFile := "token.json"
	tok, err := tokenFromFile(tokFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(tokFile, tok)
	}
	return config.Client(context.Background(), tok)
}

// Request a token from the web, then returns the retrieved token.
func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)

	var authCode string
	if _, err := fmt.Scan(&authCode); err != nil {
		log.Fatalf("Unable to read authorization code: %v", err)
	}

	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		log.Fatalf("Unable to retrieve token from web: %v", err)
	}
	return tok
}

// Retrieves a token from a local file.
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	tok := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(tok)
	return tok, err
}

// Saves a token to a file path.
func saveToken(path string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", path)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

func main() {
	b, err := ioutil.ReadFile("credentials.json")
	if err != nil {
		log.Fatalf("Unable to read credentials file: %v", err)
	}

	// If modifying these scopes, delete your previously saved token.json.
	config, err := google.ConfigFromJSON(b, classroom.ClassroomCoursesScope, classroom.ClassroomRostersScope, classroom.ClassroomAnnouncementsScope, classroom.ClassroomCourseworkStudentsScope)
	if err != nil {
		log.Fatalf("Unable to parse client secret file to config: %v", err)
	}
	client := getClient(config)

	srv, err := classroom.New(client)
	if err != nil {
		log.Fatalf("Unable to create classroom Client %v", err)
	}

	r, err := srv.Courses.List().PageSize(10).Do()
	if err != nil {
		log.Fatalf("Unable to retrieve courses. %v", err)
	}

	courses := []classroom.Course{}
	courseWork := map[string][]classroom.CourseWork{}
	studentWork := map[string][]classroom.StudentSubmission{}
	students := []classroom.Student{}

	if len(r.Courses) > 0 {
		fmt.Print("Courses:\n")
		for _, c := range r.Courses {
			courses = append(courses, *c)
			fmt.Printf("%s (%s)\n", c.Name, c.Id)
			work, err := srv.Courses.CourseWork.List(c.Id).Do()
			if err != nil {
				log.Fatal(err)
			}

			for _, v := range work.CourseWork {
				courseWork[c.Id] = append(courseWork[c.Id], *v)

				studentworks, err := srv.Courses.CourseWork.StudentSubmissions.List(v.CourseId, v.Id).Do()
				if err != nil {
					log.Fatal(err)
				}
				for _, v := range studentworks.StudentSubmissions {
					studentWork[v.UserId] = append(studentWork[v.UserId], *v)
				}
			}

			stu, err := srv.Courses.Students.List(c.Id).Do()
			if err != nil {
				log.Fatal(err)
			}

			for _, v := range stu.Students {
				students = append(students, *v)
			}
		}
	} else {
		fmt.Print("No courses found.")
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		json, err := json.Marshal(map[string]interface{}{
			"courses":     courses,
			"courseWork":  courseWork,
			"studentWork": studentWork,
			"students":    students,
		})
		if err != nil {
			w.Write([]byte("{err:true}"))
			return
		}

		w.Write([]byte(json))
	})

	http.ListenAndServe(":6060", nil)
}

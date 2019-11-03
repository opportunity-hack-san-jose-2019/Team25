import requests as req
import json
import pandas as pd
from simple_salesforce import Salesforce
import random
import math

resp = req.get("http://localhost:6060")

dictionary = json.loads(resp.text)

# Output: {'name': 'Bob', 'languages': ['English', 'Fench']}

coursework = dictionary['courseWork']
course = coursework['33533282801']
students = dictionary["students"]
students_list = {}
assignments = []

count_i = resp.text.count("fullName")
count_j = resp.text.count("title")
respAtCommas = resp.text.split(",")

for resp in respAtCommas:
	if "title" in resp:
		assignments.append((resp.split(":")[1])[1:-1])


for i in range(count_i):

	students_list[(students)[i]["profile"]["id"]] = (students)[i]["profile"]["name"]["fullName"]

#for v,k in students_list:
coursesWithName = {}
"""
for (k,v) in coursework.items():
	individualStudents = v["individualStudentsOptions"]
	title = v["title"]
	studentNames = []
	for student in individualStudents:
		studentNames.append(students_list[student])
	coursesWithName[title] = studentNames"""

user = "alyxe.lett@codenation.org.alyxebox"
password = "Ixiim*19!"
token = "7peG77TFoMYHSdQUAqE0CN3n"
org_id = "00D4B0000000b2h"

sf = Salesforce(password=password, username=user, security_token=token, sandbox=True)

for k, v in students_list.items():
	print(k, v)
	first = v.split(" ")[0]
	last = v.split(" ")[1]
	email = first + "." + last + "@gmail.com"
	assignment_name = first + " " + last + " "
	grade = math.floor(random.random()*100)

	sf.Contact.create({'LastName': last, 'FirstName': first, "Email": email})




#df = pd.Dataframe()

#profile = students["profile"]
#name = students["name"]
#fullName = name["fullName"]

#print(students)






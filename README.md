# Devflow

## Usage

---

Welcome to use DevFlow. We are here to help you manage your company, your team and assign the task to your team members.

### The deployed app is at this site:

```
https://devflowproject.herokuapp.com/
```

To start the project follow the following instructions:

```
npm run build
```

After that, run:

```
npm run start
```

You will be at the intro page.

Navigate to the loggin page, loggin with:

```
Username: user
Password: user
```

Navigate to the CEO page, loggin with:

```
Username: bill
Password: user
```

Then you will login as user

Navigate to the loggin page, loggin with:

```
Username: admin
Password: admin
```

Then you will login as admin

Following are different user you can try, all with password "user":

```
daniel
bill
tom
jone
martin
user1
testondate
```

List of third party libraries:

```
bootstrap
font-awesome
joi-browser
uniqid
nanoid
nodemon
uniqid
```

To check other users, please take a look at our data base at

```
mongodb+srv://team34:team34Password@devflow.oddf0.mongodb.net/devflow
```

Firstly you will see the main page of DevFlow, by clicking on the Enter button, you will enter the Login Page.

### Registration/Login Page:

- If you are a new user for DevFlow, please clicking the Register Button to enter the Register Page.
  - By inputting your company ID, employee ID, first name, last name and password, then clicking on the Register button, you will be successful to register your account.
- If you already have an account, please enter your username and password. It will lead you to the Tasklist Page by clicking on the Login button.
- Notice: if you are the CEO of this company, you will enter the CEO Page.if you are admin of the system, you will be enter to the admin page.

### Tasklist Page:

- On the top left corner, you will see your company name, team and your name.
  - By clicking the company name, you will enter the Company Page.
  - By clicking the team, you will enter your Team Page.
  - By clicking name, you will enter your Personal Page.
- In the main area, you can search for the tasks.
  - You can search the tasks by filters such as Names/Used Time/ID/Group ID/Estimated Time.
- On the top right corner, you can log out or checking the notifications.
- You can always click our logo, DevFlow, to come back into the Tasklist Page.

### Company Page:

- On the left side of this page, you will see the logo and the company CEO. (If you are the CEO of this company. There will be a notification box which can be used to send the announcement to all the members)
- For Teams, you can check team and leader. Send notification to any team members. Clicking on the Teams, you will enter the Team Page.

### Team Page:

- You can see all the members of your team and all tasks.
  - you can delete the task once you complete it.

### Personal Page:

- You can send notifications to anyone include yourself as a remember. Later you can go back to your Tasklist Page to see the notification.

### Notification Page:

- On the left, you can see all types of notifications such as Unread, System and Non-system.
  - By clicking unread, you can see the notification from your colleagues.
    - By clicking the Read All button, all these unread notifications will be sent into the Non-System.
  - By clicking Non-system, you can check all the old notifications.

### CEO Page:

- As the CEO of your company, you can highly manage your company.
  - For Teams, you can check all members in each team and add/modify/delete the teams.
  - For Members, you can check to add/modify/profile(checking staff's personal page)/delete any members.
  - For Tasks, you are allowed to add/modify/delete any tasks.
- By clicking the company, you can send notifications to all the staff in your company.

### Admin Page:

- As an administrator, you are allowed to manage the back end of all of the companies. On the left side, you can see Companies, Teams, Members, Tasks and Pending Approval.
  - By clicking Companies, you can add/modify/delete any companies.
  - By clicking Teams, you can add/modify/delete any teams from any companies.
  - By clicking Members, you can add/modify/profile(checking staff's personal page)/delete any members.
  - By clicking Tasks, you can modify/delete tasks for any company.
  - By clicking Pending Approval, you can confirm new users by approval.

## Models
```
Company:
	{
        "members": list of members in the company :list,
        "teams": list of team in the company :list,
        "_id": the id of the company :string,
        "name": name of the company" :string,
        "bossId": id of the boss :string,
        "companyPic": url :string
	"isFinish": true or false:string
        }

Team:
	{
        "members": list of members in the team :list,
        "tasks": list of tasks in the team :list,
        "_id": id of the team :string,
        "companyId": id of the company :string,
        "teamName": name of the team :string,
        "leader": id of the team leader :string,
        "quote": team quote :string,
        "teamPic": team profile picture :string,
    },
	Tasks:
		    {
        "_id": the id of the task :string,
        "companyId": the id of the company :string,
        "name": name of the task :string,
        "estimatedTime": estimated time of the task :string,
        "usedTime": time been used of the task :string,
        "teamId": the id of the team :string,
        "assignedToId": the member id of assign the task by :string,
        "assignedById": the member id that assign the task to :string,
        "taskDetail": task details :string,
    },

Member:{
        "rank": the rank of the member :string,
        "teamId": the team Id of the member :string,
        "profilePic": the profile picture of the member :string
 	"isApproved": member approval in the company :string,
        "_id": the id of the member :string,
        "firstName": member’s first name :string,
        "lastName": member’s last name :string,
        "userName": member’s login username:string,
        "companyId": member’s company Id :string,
        "password": member’s password :string,
    },

Notification:
       {
        "from": the sender’s member id :string,
        "isUnread": check if notification is unread :string,
        "_id": the id of the notification :string,
        "level": the level of the notification(1:personal,2:team...so on) :string,
        "to": the receiver’s member id :string,
        "message": the content/message of the notification :string,
        "time": the time sent of the notification(2020-03-17T22:15:00.000Z) :string,
    },


```

## Routing table:

### auth.js

```
/auth/login
requset type: post
sample request body:
{ "data": { "userName": "user", "password": "user" } }
result: the login user data.

/auth/register
request type: put
sample request body:
{ "data": {"firstName":"daniel","lastName":"he","companyName":"Apple","userName":"daniel123",password:"user"}}
result: save input data into the data base.

/auth/check-session
request type: get
result: if it success it will return status 200 with current user's memberId, else return status 401.

/auth/logout
requset type: post
result: destroy the session.
```

### member.js

```
/api/member/all
requset type: get
result: get all Member in the system.

/api/member/:id
requset type: get

result: get a specific member with input parameter id.

/api/member/company/:id
requset type: get
result: get all members from a company by input parameter company id.


/api/member/team/:id
requset type: get
result: get all members from a team by input parameter team id.


/api/member/noTeamCompany/:id
requset type: get
result: get all members from companies that don't have team by input parameter company id.


```

### company.js

```
/api/compay/all
requset type: get
sample request body: None
result: all companies' data

/api/compay/:id
requset type: get
sample request body: None
result: get data of with the id id
```

### tasks.js

```
/api/task/team/:teamId/:memberId
requset type: get
result: get team tasks with team ID and memberID, memberID is used to check if member are within team.
Example return:
[
    {
        "_id": "SkQwg2pztcwWeBb4yeNlL",
        "teamId": "1",
        "companyId": "1",
        "name": "troll",
        "estimatedTime": 0,
        "usedTime": 0,
        "assignedToId": "2",
        "assignedById": "2",
        "taskDetail": "",
        "isFinish": "true",
        "__v": 0
    }
   ]

/api/task/all
requset type: get
result: get all tasks in the data base.

/api/task/:id
requset type: get
result: result: get a specific task with input parameter id.

/api/task/company/:id
requset type: get
result: get all tasks from a company by input parameter company id.

/api/task/finish
request type:post
sample request body:
{ "data": { "taskId": "1"} }
result: it will change the finish attribute of the task.

/api/task/join
request type:post
sample request body:
{ "data": { "taskId": "1", "memberId","1"}}
result: it will change the assignedToId attribute of the task into memberId in the request body.

/api/task/join
request type:put
sample request body:
   {data: {
        "teamId": "1",
        "companyId": "1",
        "name": "troll",
        "estimatedTime": 0,
        "usedTime": 0,
        "assignedToId": "2",
        "assignedById": "2",
        "taskDetail": "hello",
        "isFinish": "false",
    }}
result: it will add the task into the data base with the input attributes and generated id.

/api/task/update
requset type: post
sample request body:
   {data: {
   	"id":"1",
       "teamId": "1",
       "companyId": "1",
       "name": "troll",
       "estimatedTime": 0,
        "usedTime": 0,
        "assignedToId": "2",
        "assignedById": "2",
        "taskDetail": "hello",
    }}
result: update all task's attributes by input request body.
```

### team.js

```
/api/team/all
requset type: get
result: get all teams in the data base.

/api/team/:id
requset type: get
result: result: get a specific Team with input parameter team id.

/api/team/company/:id
requset type: get
result: result: get all teams within a company by input parameter company id.

```

### notification.js

```
/api/notification/to/:id
requset type: get
sample request body: None
result: get all notifications to the member with the id id

/api/notification/from/:id
unused
requset type: get
sample request body: None
result: get all notifications from the member with the id id

/api/notification/all
requset type: get
sample request body: None
result: get all notifications

/api/notification/personal
requset type: put
sample request body:
{ "fromId": "10", "toId": "6", "message": "testing" }

result: send a personal noticement from member with id 10 to member with id 6

/api/notification/team
requset type: put
sample request body:
{ "teamId": "3", "message": "testing" }
result: send a team noticement for all members in team with id 3

/api/notification/company
requset type: put
sample request body:
{ "companyId": "1", "message": "testing" }
result: send a company noticement for all members in company with id 1

/api/notification/readAll
requset type: post
sample request body:
{ "memberId": "2" }
result: read all notification of the member with id memberId by setting the isUnread field of the notification to false
```

### admin.js

```
/api/admin/getCompany
requset type: get
result: get all companies in the database.

/api/admin/deleteCompany
requset type: delete
sample request body:
{"_id":"1"}
result: delete company by input company id parameter.

/api/admin/getTeam
requset type: get
result: get all teams in the database.

/api/admin/deleteTeam
requset type: delete
sample request body:
{"_id":"1"}
result: delete team by input team id parameter.

/api/admin/getMembers
requset type: get
result: get all members in the database.

/api/admin/getPendingMember
requset type: get
result: get all pending status(not approved) members in the database.


/api/admin/approvePendingMembers
requset type: post
sample request body:
{"_id":"1"}
result: approve member by using input request body's member id .

/api/admin/deleteMember
requset type: delete
sample request body:
{"_id":"1"}
result: delete Member by input member id parameter.

/api/admin/getTask
requset type: get
result: get all tasks in the database.

/api/admin/deleteTask
requset type: delete
sample request body:
{"_id":"1"}
result: delete Task by input task id parameter.

/api/admin/addCompany
requset type: put
sample request body:
{ "name": "Tesla", "companyPic": "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202011262357" }
result: add company.


/api/admin/modifyCompany
requset type: post
sample request body:
{ "_id":"1","name": "Tesla", "companyPic": "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202011262357","bossId":"2" }
result: modify company by input request body.

/api/admin/addTeam
requset type: put
sample request body:
{ "companyId": "1","teamName":"test 1","leader":"1", "teamPic": "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202011262357","quote":"the best of best" }
result: add team.

/api/admin/modifyTeam
requset type: post
sample request body:
{ "companyId": "2","teamName":"test 2","leader":"2", "teamPic": "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202011262357","quote":"the best of worst" }
result: modify team by input request body.

/api/admin/addMember
requset type: put
sample request body:
{ "firstName": "daniel","lastName":"test 1","userName":"123", "rank": "1","password":"123" ,"profilePic":"https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202011262357" }
result: add member.

/api/admin/modifyMember
requset type: post
sample request body:
{ "_id":"1","firstName": "daniel","lastName":"test 1","userName":"123", "rank": "1","teamId":"1","companyId":"1","password":"123" ,"profilePic":"https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202011262357" }
result: modify team by input request body.
```

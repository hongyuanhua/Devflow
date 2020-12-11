# Devflow

To start the project follow the following instructions:
```
npm run build
```

After that,  run:
```
npm run start
```

You will be at the intro page.

Navigate to the loggin page, loggin with:
```
Username: user
Password: user
```
Then you will login as admin

Navigate to the loggin page, loggin with:
```
Username: admin
Password: admin
```
Then you will login as admin

To check other users, please take a look at our data base at
```
mongodb+srv://team34:team34Password@devflow.oddf0.mongodb.net/devflow
```
## Models
```
Companies:
	{
        "members": list of members in the company :list,
        "teams": list of team in the company :list,
        "_id": the id of the company :string,
        "name": name of the company" :string,
        "bossId": id of the boss :string,
        "companyPic": url :string
	"isFinish": true or false:string
        }
	
Teams:
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
    
Members:{
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

## If the postman keep "Sending request...", just cancel it. The request has successfully sent, just the postman does not get the reponse.

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

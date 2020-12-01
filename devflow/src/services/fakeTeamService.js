export const teams = [
  {
    _id: "1",
    companyId: "1",
    members: ["2", "3", "7", "8"],
    teamName: "Team 1",
    leader: "2",
    quote: "The best of the best",
    teamPic:
      "https://cdn.vox-cdn.com/thumbor/YagQ2QhkHIkJyjsiVZfgGpJlAYw=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/18288482/chrome_2019_07_08_14_17_05.jpg",
    tasks: ["1", "2"],
  },
  {
    _id: "2",
    companyId: "2",
    members: ["5", "9"],
    teamName: "Team 2",
    leader: "5",
    quote: "The worst of the best",
    teamPic:
      "https://www.thechronicleherald.ca/media/photologue/photos/cache/freelance-atlantic-skies-the-sun-is-currently-in-a-stage-of-solar-mini_rs3wJ07_large.jpg",
    tasks: ["3"],
  },
  {
    _id: "3",
    companyId: "2",
    members: ["6", "10"],
    teamName: "Team 3",
    leader: "6",
    quote: "The best of the worst",
    teamPic:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg",
    tasks: [],
  },
];
export function getTeams() {
  return teams;
}
export function getTeamById(id) {
  return teams.find((t) => t._id === id);
}
export function getTeamsByCompanyId(id) {
  return teams.filter((team) => team.companyId === id);
}

export function deleteTeam(id) {
  let TeamInDb = teams.find((m) => m._id === id);
  teams.splice(teams.indexOf(TeamInDb), 1);
  return TeamInDb;
}
export function saveTeam(team) {
  const teamIn = getTeamById(team._id) || {};
  teamIn.companyId = team.companyId;
  teamIn.members = team.members;
  teamIn.teamName = team.teamName;
  teamIn.leader = team.leader;
  teamIn.quote = team.quote;
  teamIn.teamPic = team.teamPic;
  teamIn.tasks = team.tasks;

  if (!teamIn._id) {
    teamIn._id = Date.now().toString();
    teams.push(teamIn);
  }

  return teamIn;
}
/*export function saveTask(task) {
  let taskInDb = tasks.find((m) => m._id === task._id) || {};
  taskInDb.companyId = task.companyId;
  taskInDb.name = task.name;
  taskInDb.estimatedTime = task.estimatedTime;
  taskInDb.usedTime = task.usedTime;
  taskInDb.assignedToId = task.assignedToId;
  taskInDb.assignedById = task.assignedById;
  taskInDb.teamId = task.teamId;
  taskInDb.taskDetail = task.taskDetail;

  if (!taskInDb._id) {
    taskInDb._id = Date.now().toString();
    tasks.push(taskInDb);
  }

  return taskInDb;
}*/

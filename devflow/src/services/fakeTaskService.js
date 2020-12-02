export const tasks = [
  {
    _id: "1",
    companyId: "1",
    name: "Create a new better calculator",
    estimatedTime: 10,
    usedTime: 100000000,
    assignedToId: "2",
    assignedById: "2",
    teamId: "1",
    taskDetail: "Create a new better calculator.",
  },

  {
    _id: "2",
    companyId: "1",
    name: "Modify imessage",
    estimatedTime: 15,
    usedTime: 2,
    assignedToId: "3",
    assignedById: "2",
    teamId: "1",
    taskDetail: "Modify imessage",
  },

  {
    _id: "3",
    companyId: "2",
    name: "Make a new core",
    estimatedTime: 20,
    usedTime: 3,
    assignedToId: "6",
    assignedById: "5",
    teamId: "5",
    taskDetail: "Currently using the chrome core. Make a new core",
  },
];

export function getTasks() {
  return tasks;
}
export function getTaskById(id) {
  return tasks.find((t) => t._id === id);
}
export function getTasksByCompanyId(companyId) {
  return tasks.filter((t) => t.companyId === companyId);
}

export function saveTask(task) {
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
}
export function getTaskByTeamId(teamId) {
  return tasks.filter((t) => t.teamId === teamId);
}
export function getTaskByMemberId(memberId) {
  return tasks.filter((t) => t.assignedToId === memberId);
}
export function deleteTasks(id) {
  let tasksInDb = tasks.find((m) => m._id === id);
  tasks.splice(tasks.indexOf(tasksInDb), 1);
  return tasksInDb;
}

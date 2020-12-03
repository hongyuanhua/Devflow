import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

export const getTasksByTeam = async (teamId, memberId) => {
  console.log("---at get tasks by team---");
  // Send the request with fetch()
  const tasks = await fetch(
    host + port + "/api/task/team/" + teamId + "/" + memberId
  );
  return tasks;
  // .then(res => {
  //     console.log("success get tasks by team fetch");
  //     console.log(res.status === 200)
  //     console.log(res)
  //     return res
  // })
  // .catch((error) => {
  //     console.log("fail get tasks by team fetch");
  //     // console.log(res)
  //     console.log(error);
  // });
};

export const getTasksByAssignedTo = async (memberId) => {
  console.log("---at get tasks by team---");
  const tasks = await fetch(host + port + "/api/task/toMember/" + memberId);
  return tasks;
};
export const addTask = (data) => {
  console.log("---Add Task---");
  const {
    teamId,
    companyId,
    name,
    estimatedTime,
    usedTime,
    assignedToId,
    assignedById,
    taskDetail,
  } = data;
  console.log(data);

  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/api/task/add", {
    method: "put",
    body: JSON.stringify({
      teamId: teamId,
      companyId: companyId,
      name: name,
      estimatedTime: estimatedTime,
      usedTime: usedTime,
      assignedToId: assignedToId,
      assignedById: assignedById,
      taskDetail: taskDetail,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  fetch(request)
    .then((res) => {
      console.log("success add task");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail send addTask");
      console.log(error);
    });
};
export const updateTask = async (data) => {
  console.log("---update task---");
  // Create our request constructor with all the parameters we need
  const {
    teamId,
    companyId,
    name,
    estimatedTime,
    usedTime,
    assignedToId,
    assignedById,
    taskDetail,
  } = data;
  console.log(data);
  const request = new Request(host + port + "/api/task/update", {
    method: "post",
    body: JSON.stringify({
      teamId: teamId,
      companyId: companyId,
      name: name,
      estimatedTime: estimatedTime,
      usedTime: usedTime,
      assignedToId: assignedToId,
      assignedById: assignedById,
      taskDetail: taskDetail,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      console.log("success update task");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail update addTask");
      console.log(error);
    });
};

import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

export const getNotificationByToId = async (id) => {
  console.log("---getNotificationByToId---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/notification/to/" + id;
  console.log(url);

  // Send the request with fetch()
  const notification = await fetch(url);
  return notification;
};
export const getNotificationByFromId = async (id) => {
  console.log("---getNotificationByFromId---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/notification/from/" + id;
  console.log(url);

  // Send the request with fetch()
  const notification = await fetch(url);
  return notification;
};
export const getAllNotifications = async () => {
  console.log("---getAllNotifications---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/notification/all";
  console.log(url);

  // Send the request with fetch()
  const notification = await fetch(url);
  return notification;
};

export const addPersonalMessage = (data) => {
  console.log("---In send Personal Message")
  const { fromId, toId, message } = data;
  console.log(data);

  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/api/notification/personal", {
    method: "put",
    body: JSON.stringify({
      fromId: fromId,
      toId: toId,
      message: message
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      console.log("success send personal information");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail send personal information");
      console.log(error);
    });
};

export const readAll = async (memberId) => {
  console.log("---read all---")
  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/api/notification/readAll", {
    method: "post",
    body: JSON.stringify({
      memberId: memberId
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  console.log("read all");
  const result = await fetch(request);
  return result;
};
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

export const addTeamMessage = (data) => {
  console.log("---In send Team Message")
  const { teamId, message } = data;

  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/api/notification/team", {
    method: "put",
    body: JSON.stringify({
      teamId: teamId,
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
      console.log("success send team information");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail send team information");
      console.log(error);
    });
};

export const addCompanyMessage = (data) => {
  console.log("---In send Company Message")
  const { companyId, message } = data;

  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/api/notification/company", {
    method: "put",
    body: JSON.stringify({
      companyId: companyId,
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
      console.log("success send company information");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail send company information");
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

export const ceoPostNotif = async (fromId, toIds, message) => {
  console.log(fromId, toIds, message)
  const request = new Request(host + port + "/api/notification/ceo-send-notification", {
    method: "post",
    body: JSON.stringify({
      from: fromId,
      toMembers: toIds,
      message: message,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  return await fetch(request)
}
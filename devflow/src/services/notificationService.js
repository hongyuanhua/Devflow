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

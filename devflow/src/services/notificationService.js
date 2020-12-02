import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

export const getNotificationById = async (id) => {
  console.log("---getAllNotification---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/notification/to/" + id;
  console.log(url);

  // Send the request with fetch()
  const notification = await fetch(url);
  return notification;
};
export const getNotificationFromId = async (id) => {
  console.log("---getAllNotification---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/notification/from/" + id;
  console.log(url);

  // Send the request with fetch()
  const notification = await fetch(url);
  return notification;
};

import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

// module.export = { login: login };a
export const getMemberById = async (id) => {
  console.log("---getMemberByToId---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/member/" + id;
  // Send the request with fetch()
  const member = await fetch(url);
  return member;
};

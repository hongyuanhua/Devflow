import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

// module.export = { login: login };a
export const getTeamById = async (id) => {
  console.log("---getMemberByToId---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/team/" + id;
  // Send the request with fetch()
  const team = await fetch(url);
  return team;
};

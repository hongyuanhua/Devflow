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
export const getMembersByCompanyId = async (id) => {
  console.log("---getMembersByCompanyId---");
  const url = host + port + "/api/member/company/" + id;
  // Send the request with fetch()
  const member = await fetch(url);
  return member;
};

export const getNotTeamMembersByCompanyId = async (id) => {
  console.log("---getNotTeamMembersByCompanyId---");
  const url = host + port + "/api/member/noTeamCompany/" + id;
  // Send the request with fetch()
  const member = await fetch(url);
  return member;
};
export const getAllMembers = async () => {
  console.log("---getAllMembers---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/member/all";

  // Send the request with fetch()
  const companies = await fetch(url);
  return companies;
};

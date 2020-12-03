import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

export const getAllCompany = async () => {
  console.log("---getAllCompany---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/admin/getCompany";
  // Send the request with fetch()
  const company = await fetch(url);
  return company;
};

export const deleteCompany = async (_id) => {
  console.log("---deleteCompany---");
  // Create our request constructor with all the parameters we need
  //   const url = host + port + "/admin/deleteCompany";

  const request = new Request(host + port + "/admin/deleteCompany", {
    method: "delete",
    body: JSON.stringify({
      _id: _id,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  // Send the request with fetch()
  const company = await fetch(request);
  return company;
};

export const getAllTeam = async () => {
  console.log("---getAllTeam---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/admin/getTeam";
  // Send the request with fetch()
  const team = await fetch(url);
  return team;
};

export const deleteTeam = async (_id) => {
  console.log("---deleteTeam---");
  // Create our request constructor with all the parameters we need
  //   const url = host + port + "/admin/deleteTeam";
  const request = new Request(host + port + "/admin/deleteTeam", {
    method: "delete",
    body: JSON.stringify({
      _id: _id,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  // Send the request with fetch()
  const team = await fetch(request);
  return team;
};

export const getAllMember = async () => {
  console.log("---getAllMember---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/admin/getMember";
  // Send the request with fetch()
  const member = await fetch(url);
  return member;
};

export const deleteMember = async (_id) => {
  console.log("---deleteMember---");
  // Create our request constructor with all the parameters we need
  //   const url = host + port + "/admin/deleteMember";
  //   console.log(_id);
  const request = new Request(host + port + "/admin/deleteMember", {
    method: "delete",
    body: JSON.stringify({
      _id: _id,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  // Send the request with fetch()
  const member = await fetch(request);
  return member;
};

export const getAllTask = async () => {
  console.log("---getAllTask---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/admin/getTask";
  // Send the request with fetch()
  const task = await fetch(url);
  return task;
};

export const addCompany = (data) => {
  const { _id, name, bossId, companyPic } = data;
  console.log(data);
  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/admin/addCompany", {
    method: "put",
    body: JSON.stringify({
      _id: _id,
      name: name,
      bossId: bossId,
      companyPic: companyPic,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      console.log("Company added successfully!");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail to add the company");
      // console.log(res)
      console.log(error);
    });
};

export const addTeam = (data) => {
  const { _id, companyId, teamName, leader, teamPic, quote } = data;
  console.log(data);
  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/admin/addTeam", {
    method: "put",
    body: JSON.stringify({
      _id: _id,
      companyId: companyId,
      teamName: teamName,
      leader: leader,
      teamPic: teamPic,
      quote: quote,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      console.log("Team added successfully!");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail to add the Team");
      // console.log(res)
      console.log(error);
    });
};

export const addMember = (data) => {
  const {
    _id,
    firstName,
    lastName,
    userName,
    rank,
    teamId,
    companyId,
    password,
    profilePic,
  } = data;
  console.log(data);
  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/admin/addMember", {
    method: "put",
    body: JSON.stringify({
      _id: _id,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      rank: rank,
      teamId: teamId,
      companyId: companyId,
      password: password,
      profilePic: profilePic,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      console.log("Member added successfully!");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail to add the Member");
      // console.log(res)
      console.log(error);
    });
};

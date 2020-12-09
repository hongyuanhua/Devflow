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

export const getPendingMember = async () => {
  console.log("---getPendingMember---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/admin/getPendingMember";
  // Send the request with fetch()
  const member = await fetch(url);
  return member;
};

export const approvePendingMember = async (_id) => {
  console.log("---approvePendingMember---");

  const request = new Request(host + port + "/admin/approvePendingMember", {
    method: "post",
    body: JSON.stringify({
      _id: _id,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      console.log("User success appove");
      return res;
    })
    .catch((error) => {
      console.log("fail to approve the user");
      // console.log(res)
    });
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

export const deleteTask = async (_id) => {
  console.log("---deleteTask---");
  // Create our request constructor with all the parameters we need
  //   const url = host + port + "/admin/deleteMember";
  //   console.log(_id);
  const request = new Request(host + port + "/admin/deleteTask", {
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
  const task = await fetch(request);
  return task;
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
  console.log("---addCompany---");
  const { name, companyPic } = data;
  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/admin/addCompany", {
    method: "put",
    body: JSON.stringify({
      name: name,
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
      return res;
    })
    .catch((error) => {
      console.log("fail to add the company");
      // console.log(res)
    });
};

export const modifyCompany = (data) => {
  console.log("---modifyCompany---");
  const { _id, name, bossId, companyPic } = data;
  console.log(data);

  console.log(host + port + "/admin/modifyCompany");
  const request = new Request(host + port + "/admin/modifyCompany", {
    method: "post",
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
      console.log("Company modified successfully!");
      return res;
    })
    .catch((error) => {
      console.log("fail to modify the company");
      // console.log(res)
    });
};

export const addTeam = (data) => {
  console.log("---addTeam---");
  const { _id, companyId, teamName, leader, teamPic, quote } = data;
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

export const modifyTeam = (data) => {
  console.log("---modifyTeam---");
  const { _id, companyId, teamName, leader, teamPic, quote } = data;
  console.log(data);

  const request = new Request(host + port + "/admin/modifyTeam", {
    method: "post",
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
      console.log("Team modified successfully!");
      return res;
    })
    .catch((error) => {
      console.log("fail to modify the Team");
      // console.log(res)
    });
};

export const addMember = (data) => {
  console.log("---addMember---");
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

export const modifyMember = (data) => {
  console.log("---modifyMember---");
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
  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/admin/modifyMember", {
    method: "post",
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
      console.log("Member modified successfully!");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail to modify the Member");
      // console.log(res)
      console.log(error);
    });
};

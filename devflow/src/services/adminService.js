import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

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

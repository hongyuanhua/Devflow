import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

// get all companies
export const getAllCompany = async () => {
  console.log("---getAllCompany---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/company/all";
  console.log(url);

  // Send the request with fetch()
  const companies = await fetch(url);
  return companies;
  // fetch(url)
  //     .then((res) => {
  //         console.log("Success in getting all companies")
  //         return res.json();
  //     })
  //     .catch((error) => {
  //         console.log("Fail in get all companies");
  //         console.log(error);
  //     });
};

export const getCompanyById = async (id) => {
  console.log("---getCompanyById---");
  // Create our request constructor with all the parameters we need
  const url = host + port + "/api/company/" + id;
  console.log(url);

  // Send the request with fetch()
  const company = await fetch(url);
  return company;
  //     .then((res) => {
  //     console.log("Success in getting all companies")
  //     return res.json();
  // })
  // .catch((error) => {
  //     console.log("Fail in get all companies");
  //     console.log(error);
  // });
};

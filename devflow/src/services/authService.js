import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

export const login = (userName, password) => {
  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/auth/login", {
    method: "post",
    body: JSON.stringify({
      data: {
        userName: userName,
        password: password,
      },
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      console.log("login fetch");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail loginfetch");
      // console.log(res)
      console.log(error);
    });
};

export const register = (data) => {
  const { firstName, lastName, companyName, userName, password } = data;
  // Create our request constructor with all the parameters we need
  const request = new Request(host + port + "/auth/register", {
    method: "put",
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      userName: userName,
      password: password,
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      console.log("success register fetch");
      console.log(res);
      return res;
    })
    .catch((error) => {
      console.log("fail register fetch");
      // console.log(res)
      console.log(error);
    });
};

export const checkSession = (app) => {
  const url = host + port + "/auth/check-session";

  fetch(url)
    .then((res) => {
      console.log("check session fetch");
      console.log(res);
      return res.json();
    })
    // .then(json => {
    //     if (json && json.currentUser) {
    //         app.setState({ currentUser: json.currentUser });
    //     }
    // })
    .catch((error) => {
      console.log("fail check session fetch");
      console.log(error);
    });
};

// export const getCurrMember = () => {
//     const addr = host + port + "/auth/check-session";
//     axios
//         .get(addr, {
//             headers: {
//                 'content-type': 'application/json'
//             }
//         })
//         .then(memberId => {
//             return memberId;
//         }).catch(err => {
//             console.log(err);
//         });
// }

// module.export = { login: login };

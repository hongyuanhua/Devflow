import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

export const getTasksByTeam = (teamId, memberId) => {
    console.log("at get tasks by team")
    // Send the request with fetch()
    fetch(host + port + "/api/task/")
        .then(res => {
            console.log("success get tasks by team fetch");
            console.log(res.status === 200)
            console.log(res)
            return res
        })
        .catch((error) => {
            console.log("fail get tasks by team fetch");
            // console.log(res)
            console.log(error);
        });
};

import axios from 'axios';
import { config } from "../config.js";
const { backend } = config;
const { host, port } = backend;

// getMembers
export const getMembers = (userName, password) => {
    console.log(userName, password)
    const addr = host + port + "/auth/login";
    axios.post(addr, {
        // request body
        data: {
            userName: userName,
            password: password
        },
        headers: {
            "content-type": "application/json"
        },
        withCredentials: true
    }).then(res => {
        console.log(res);
    }).catch(err => console.log(err))

}


// module.export = { login: login };a
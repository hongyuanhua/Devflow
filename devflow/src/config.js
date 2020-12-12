export const config = {
    backend: {
        host: process.env.NODE_ENV === 'production' ? "https://devflowproject.herokuapp.com" : "http://localhost:",
        port: process.env.NODE_ENV === 'production' ? "" : 5000
    }
};
export const config = {
    backend: {
        host: process.env.NODE_ENV === 'production' ? "/" : "http://localhost:",
        port: 5000
    }
};
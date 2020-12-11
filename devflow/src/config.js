export const config = {
    backend: {
        host: process.env.NODE_ENV === 'production' ? "/" : "http://localhost:",
        port: process.env.NODE_ENV === 'production' ? process.env.PORT : 5000
    }
};
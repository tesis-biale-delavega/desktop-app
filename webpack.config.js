const path = require("path");
const buildPath = path.resolve(__dirname, "./dist");

const main = {
    entry: "./public/electron.js",
    output: {
        filename: "electron.js",
        path: buildPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    },
    node: {
        __dirname: false,
        __filename: false
    },
    resolve: {
        fallback: {
            path: false,
            buffer: false,
            crypto: false
        },
    },
    target: "electron-main"
};

module.exports = main;
import { Server } from "./core/main";
import { config } from "./config/config";

const Sequelize = require("sequelize");


function extend(app) {
    console.log("d")
}


const _server = new Server({
    extend: extend,
    config: config
});
_server.run();
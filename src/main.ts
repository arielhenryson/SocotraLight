import { Server } from "./core/main";
import { config } from "./config/config";


function extend(app) {
    // console.log(__dirname);
}


const _server = new Server({
    extend: extend,
    config: config
});
_server.run();
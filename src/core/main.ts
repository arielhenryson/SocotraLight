import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { setConfig } from "./global";


// set root folder
const ROOT = __dirname + "/../../.build/";
// end set root folder



const app: any = express();
const fs = require('fs');
const compression = require('compression');


export class Server {
    private options = {
        config: null,
        extend: null
    };

    constructor(options) {
        this.options = options;

        this.options.config.root = ROOT;
        this.options.config.buildDir = "./.build";
        app.locals.ROOT = ROOT;
        app.locals.config = this.options.config;
    }

    run() {
        const ROOT = this.options.config.root;
        const config = this.options.config;

        setConfig(config);

        if (config.compression) {
            app.use(compression());
        }


        // Setting the body parser for handling post requests
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));



        // Setting the static folder fo the app
        if (config.serveStaticFiles) {
            app.use("/", express.static(path.join(ROOT, '/public'), {
                maxAge: config.maxAge
            }));
        }


        // Server extend layer for adding global middlewares
        // that are specific for your app
        try {
            this.options.extend(app);
            if (this.options.extend !== null) {
                this.options.extend(app);
            }
        } catch (e) {
            console.log("No server extend layer found");
        }

        // Routing
        require('./routes')(app);


        // Set the http server
        if (config.httpServer) {
            require('./http')(app);
        }
    }
}

const express = require('express');
require('dotenv').config();

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
    }

    execute(){
        this.app.listen( this.port, () => {
            console.log(`Server running on ${ process.env.NODE_ENV } mode on port ${this.port}`)
        } )
    }
}
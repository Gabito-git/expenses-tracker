
const express = require('express');
require('dotenv').config();

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;  
        
        this.paths={
            transactions: '/api/transactions'
        }
        
        this.middlewares();

        this.routes();
    }    

    middlewares(){
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.transactions, require('../routes/transactions'));
    }

    execute(){
        this.app.listen( this.port, () => {
            console.log(`Server running on ${ process.env.NODE_ENV } mode on port ${this.port}`)
        } )
    }
}

module.exports = Server;
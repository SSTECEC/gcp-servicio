const { Pool } = require('pg');
var config = require("../database/database.js");
const pool = new Pool(config);

module.exports = {

    listarRoles : function (req,res) {
        pool.query('SELECT * FROM listaroles', 
            (err,data) => {
                if(err)
                {
                    console.log('Surgió un error: \n',err);
                    res.sendStatus(500);
                    res.send({ 'Error' : err });
                }else{
                    console.log('Transacción Exitosa');
                    res.send(data.rows);
                }
            }
        );
    },
}
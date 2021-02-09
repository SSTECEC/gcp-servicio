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
    /* 
    verificacionUsuario : function (req,res) {
        pool.query('SELECT * FROM iniciarsesion WHERE email = $1 AND contrasena = $2',[req.body.email, req.body.contrasena], 
            (err,data) => {
                if(err)
                {
                    console.log('Surgió un error: \n',err);
                    res.sendStatus(500);
                    res.send({ 'Error' : err });
                }else{
                    console.log('Transacción Exitosa');
                    res.send(data.rows[0]);
                }
            }
        );
    },

    guardarUsuario : function (req,res) {
        pool.query('INSERT INTO usuario(usuario,email,contrasena,foto,estado,"idRol") VALUES($1,$2,$3,$4,$5)',
        [req.body.usuario, req.body.email, req.body.contrasena,1,req.body.idRol],
            (err,data) => {
                if(err)
                {
                    console.log('Surgió un error: \n',err);
                    res.sendStatus(500);
                    res.send({ 'Error' : err });
                }else{
                    console.log('Transacción Exitosa');
                    res.send(true);
                }
            }
        );
    } */

}
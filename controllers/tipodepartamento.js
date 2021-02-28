const { Pool } = require('pg');
var config = require("../database/database.js");
const pool = new Pool(config);

module.exports = {
    
    guardarTipoDepartamento : function (req,res) {
        pool.query('INSERT INTO tipo_departamento(nombre, estado) VALUES($1,1) ',[req.body.nombre],
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
    },

    listarTipoDepartamento : function (req,res) {
        pool.query('SELECT * FROM tipo_departamento WHERE estado = 1 ORDER BY "idTipoDepartamento"',
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

    listarTipoDepartamentoCambiable : function (req,res) {
        pool.query('SELECT * FROM tipo_departamento WHERE "idTipoDepartamento" = 1 OR "idTipoDepartamento" = 2 AND estado = 1 ORDER BY "idTipoDepartamento"',
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
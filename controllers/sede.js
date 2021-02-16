const { Pool } = require('pg');
var config = require("../database/database.js");
const pool = new Pool(config);

module.exports = {

    listarSede : function (req,res) {
        pool.query('SELECT * FROM listarsede',
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

    guardarSede : function (req,res) {
        pool.query('INSERT INTO sede(nombre,direccion,estado) VALUES($1,$2,1) RETURNING "idSede" ',[req.body.nombre,req.body.direccion],
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

    listarSedeDetalles : function (req,res) {
        pool.query('SELECT * FROM listarSedeDetalle',
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

    listarSedeDetallesParametro : function (req,res) {
        pool.query('SELECT * FROM listarsededetalle WHERE "idSede" = $1',
        [req.query.idSede],
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

    listarSedeDetallesAll : function (req,res) {
        pool.query('SELECT * FROM listarsededetalleall WHERE "idSede" = $1',
        [req.query.idSede],
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

    guardarSedeDetalles : function (req,res) {

        var query = 'INSERT INTO sede_detalle("idSede",piso,seccion,estado,asignacion) VALUES ' + req.body.cadena;
        
        pool.query(query, (err,data) => {
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

    actualizarSede : function (req,res) {
        pool.query('UPDATE sede SET nombre = $1, direccion = $2 WHERE "idSede" = $3',
        [req.body.nombre,req.body.direccion, req.body.idSede],
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
}
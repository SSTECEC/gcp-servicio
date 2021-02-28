const { query } = require('express');
const { Pool } = require('pg');
var config = require("../database/database.js");
const pool = new Pool(config);

module.exports = {

    listarUltimaFechaReserva : function (req,res) {
        pool.query('SELECT * FROM consultarultimafechareserva', 
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

    guardarLogReserva : function (req,res) {
        pool.query('INSERT INTO log_reserva("idUsuario", descripcion, "fechaCreacion", "estadoArchivo", "fechaInicioReservas", "fechaFinReservas") VALUES ($1,$2,$3,$4,$5,$6) RETURNING "idLogReserva","estadoArchivo" ',
        [
            req.body.idUsuario,
            req.body.descripcion,
            req.body.fechaCreacion,
            req.body.estadoArchivo,
            req.body.fechaInicioReservas,
            req.body.fechaFinReservas,
        ], 
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
    
    guardarReserva : function (req,res) {
        var query = 'INSERT INTO reserva( "idDepartamento", "idUsuario", "idCatalogoEstado", "fechaReserva", "horaInicio", "horaFin", "idLogReserva") VALUES ' + req.body.cadena;
        pool.query( query, (err,data) => {
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

    listarReservasExportacion : function (req,res) {
        var consulta = "SELECT * FROM listareservaexportacion WHERE " + '"Fecha Reserva"' + " BETWEEN '"+req.body.fechaInicio+"' AND '"+req.body.fechaFin+"'"
        console.log(consulta);
        pool.query(consulta,
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

    listarReservasExportacionDescarga : function (req,res) {
        var consulta = "SELECT * FROM listareservaexportaciondescarga WHERE " + '"Fecha Reserva"' + " BETWEEN '"+req.body.fechaInicio+"' AND '"+req.body.fechaFin+"'"
        console.log(consulta);
        pool.query(consulta,
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

    consultaLogReservas : function (req,res) {
        pool.query('SELECT * FROM consultalogreservas', 
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

    actualizarReserva : function (req,res) {
        pool.query('UPDATE reserva SET "idUsuario" = $1, "idCatalogoEstado" = 2 WHERE "idReserva" = $2',
        [req.query.idUsuario,req.query.idReserva], 
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

    cancelarReserva : function (req,res) {
        pool.query('UPDATE reserva SET "idUsuario" = $1, "idCatalogoEstado" = 1 WHERE "idReserva" = $2',
        [req.query.idUsuario,req.query.idReserva], 
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

    actualizarLogReserva : function (req,res) {
        pool.query('UPDATE log_reserva SET "nombreArchivo" = $1, "fechaSubida" = $2, archivo=$3, "estadoArchivo"=2 WHERE "idLogReserva" = $4',
        [
            req.body.nombreArchivo,
            req.body.fechaSubida,
            req.body.archivo,
            req.body.idLogReserva
        ], 
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

    listadoCompletoReservaciones : function (req,res) {
        pool.query('SELECT * FROM listadocompletoreservasadministracion', 
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

    listadoCompletoReservacionesDisponibles : function (req,res) {
        pool.query('SELECT * FROM listadocompletoreservasadministracionadicional WHERE "idCatalogoEstado" = $1',[req.query.idCatalogoEstado],
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

    listadoReservasFiltros : function (req,res) {
        var sentencia = 'SELECT * FROM listadocompletoreservasadministracionadicional WHERE ' + req.body.datos;
        console.log(sentencia);
        pool.query(sentencia,
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

    listadoCompletoReservacionesUsuario : function (req,res) {
        pool.query('SELECT * FROM listadocompletoreservasadministracionadicional WHERE "idCatalogoEstado" = 2 AND "idUsuario" = $1',[req.query.idUsuario],
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
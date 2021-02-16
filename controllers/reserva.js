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
    
    guardarReserva : function (req,res) {
        var query = 'INSERT INTO reserva( "idDepartamento", "idUsuario", "idCatalogoEstado", "fechaReserva", "horaInicio", "horaFin") VALUES ' + req.body.cadena;
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

}
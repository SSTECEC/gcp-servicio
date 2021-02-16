const { Pool } = require('pg');
var config = require("../database/database.js");
const pool = new Pool(config);

module.exports = {
    
    guardarDepartamentoInsumo : function (req,res) {
        var query = 'INSERT INTO departamento_insumo("idDepartamento","idDetalleInsumo",asignado,estado) VALUES ' + req.body.cadena;
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

    cambiarEstadoInsumo : function (req,res) {
        pool.query('UPDATE departamento_insumo SET estado = $1 WHERE "idDepartamentoInsumo" = $2',
        [req.body.estado, req.body.idDepartamentoInsumo],
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

    listarDepartamentoInsumos : function (req,res) {
        pool.query('SELECT * FROM listardepartamentoinsumos WHERE "idDepartamento" = $1',[req.query.idDepartamento],
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

    listarRegistrosInsumos : function (req,res) {
        pool.query('SELECT COUNT(*) AS "total" FROM departamento_insumo', 
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

    listarDetalleInsumosDisponibles : function (req,res) {
        pool.query('SELECT * FROM consultainsumosdisponibles WHERE "idInsumo" = $1 LIMIT $2;',[req.query.idInsumo,req.query.cantidad],
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

    listarInsumosDisponiblesDepartamento : function (req,res) {
        pool.query('SELECT * FROM consultarlistadoinsumosdepartamento WHERE "idDepartamento" = $1',[req.query.idDepartamento],
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
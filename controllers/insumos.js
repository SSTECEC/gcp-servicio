const { Pool } = require('pg');
var config = require("../database/database.js");
const pool = new Pool(config);

module.exports = {

    guardarInsumos: function (req, res) {
        pool.query('INSERT INTO insumos(nombre, caracteristicas, cantidad, estado, identificador, "numeroSerie", disponibles, asignados) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING "idInsumo","numeroSerie" ',
            [req.body.nombre, req.body.caracteristicas, req.body.cantidad, 1, req.body.identificador, req.body.numeroSerie, req.body.disponibles, req.body.asignados],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    console.log('Transacción Exitosa');
                    res.send(data.rows[0]);
                }
            }
        );
    },

    eliminarInsumos: function (req, res) {
        pool.query('UPDATE insumos SET estado = 2  WHERE "idInsumo" = $1',
            [req.body.idInsumo],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    console.log('Transacción Exitosa');
                    res.send(true);
                }
            }
        );
    },

    actualizarInsumos: function (req, res) {

        pool.query('UPDATE insumos SET nombre = $1, caracteristicas = $2 WHERE "idInsumo" = $3',
            [req.body.nombre, req.body.caracteristicas, req.body.idInsumo],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    console.log('Transacción Exitosa');
                    res.send(true);
                }
            }
        );

    },

    listarInsumos: function (req, res) {
        pool.query('SELECT * FROM insumos WHERE estado = 1 ORDER BY "idInsumo"',
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    console.log('Transacción Exitosa');
                    res.send(data.rows);
                }
            }
        );
    },

    listarInsumoEspecifico: function (req, res) {
        pool.query('SELECT * FROM insumos WHERE "idInsumo" = $1 AND estado = 1', [req.query.idInsumo],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    console.log('Transacción Exitosa');
                    res.send(data.rows[0]);
                }
            }
        );
    },

    guardarInsumoDetalles: function (req, res) {

        var query = 'INSERT INTO detalle_insumo("idInsumo",codigo,estado,asignado) VALUES ' + req.body.cadenaFinal;
        pool.query(query, (err, data) => {
            if (err) {
                console.log('Surgió un error: \n', err);
                res.sendStatus(500);
                res.send({ 'Error': err });
            } else {
                console.log('Transacción Exitosa');
                res.send(true);
            }
        }
        );

    },

    actualizarNumeroSerieInsumo: function (req, res) {
        pool.query('UPDATE insumos SET "numeroSerie" = $1 WHERE "idInsumo" = $2',
            [req.body.numeroSerie, req.body.idInsumo],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    console.log('Transacción Exitosa');
                    res.send(true);
                }
            }
        );
    },

    listarDetalleInsumos: function (req, res) {
        pool.query('SELECT * FROM listardetalleinsumos WHERE "idInsumo" = $1 ORDER BY "idDetalleInsumo" ', [req.query.idInsumo],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    console.log('Transacción Exitosa');
                    res.send(data.rows);
                }
            }
        );
    },

    listarDetalleInsumosDepartamento: function (req, res) {
        pool.query('SELECT * FROM listardetalleinsumosdepartamento WHERE "idDepartamento" = $1 ORDER BY "idDetalleInsumo" ', [req.query.idDepartamento],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    console.log('Transacción Exitosa');
                    res.send(data.rows);
                }
            }
        );
    },

    cambiarEstadoDetalleInsumo: function (req, res) {

        pool.query('SELECT * FROM insumos WHERE "idInsumo" = $1 AND estado = 1', [req.body.idInsumo],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    var insumo = data.rows[0]; 
                    var cantidadDisponible;

                    if(req.body.signoProceso == 'suma'){
                        cantidadDisponible = parseInt(insumo.disponibles) + 1 ; 
                    }else{
                        cantidadDisponible = parseInt(insumo.disponibles) - 1 ; 
                    }

                    pool.query('UPDATE insumos SET disponibles = $1 WHERE "idInsumo" = $2',
                        [cantidadDisponible.toString(), req.body.idInsumo],
                        (err, data) => {
                            if (err) {
                                console.log('Surgió un error: \n', err);
                                res.sendStatus(500);
                                res.send({ 'Error': err });
                            } else {
                                pool.query('UPDATE detalle_insumo SET "estado" = $1 WHERE "idDetalleInsumo" = $2',
                                    [req.body.estado, req.body.idDetalleInsumo],
                                    (err, data) => {
                                        if (err) {
                                            console.log('Surgió un error: \n', err);
                                            res.sendStatus(500);
                                            res.send({ 'Error': err });
                                        } else {
                                            console.log('Transacción Exitosa');
                                            res.send(true);
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            } 
        );

    },

    actualizarEstadoAsignacionDetalleInsumo : function (req, res) {
        pool.query('UPDATE detalle_insumo SET asignado = 2 WHERE "idDetalleInsumo" = $1', [req.query.idDetalleInsumo],
        (err, data) => {
            if (err) {
                console.log('Surgió un error: \n', err);
                res.sendStatus(500);
                res.send({ 'Error': err });
            } else {
                console.log('Transacción Exitosa');
                res.send(true);
            }
        }
    );
    },

    actualizarInsumoValores : function (req, res) {
        pool.query('UPDATE insumos SET disponibles = $1, asignados=$2 WHERE "idInsumo" = $3', [req.body.disponibles, req.body.asignados,req.body.idInsumo],
        (err, data) => {
            if (err) {
                console.log('Surgió un error: \n', err);
                res.sendStatus(500);
                res.send({ 'Error': err });
            } else {
                console.log('Transacción Exitosa');
                res.send(true);
            }
        }
    );
    },

}
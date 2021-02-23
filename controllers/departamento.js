const { Pool } = require('pg');
var config = require("../database/database.js");
const pool = new Pool(config);

module.exports = {

    guardarDepartamento: function (req, res) {
        pool.query('INSERT INTO departamento(codigo,nombre,capacidad,"idTipoDepartamento","idSedeDetalle",estado) VALUES($1,$2,$3,$4,$5,1)',
            [req.body.codigo, req.body.nombreDepartamento, req.body.capacidad, req.body.idTipoDepartamento, req.body.idSedeDetalle],
            (err, data) => {
                if (err) {
                    console.log('Surgió un error: \n', err);
                    res.sendStatus(500);
                    res.send({ 'Error': err });
                } else {
                    pool.query('UPDATE sede_detalle SET asignacion = 2 WHERE "idSedeDetalle" = $1', [req.body.idSedeDetalle],
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
    },

    listarDepartamentos: function (req, res) {
        pool.query('SELECT * FROM listardepartamento',
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

    listarRegistrosDepartamento: function (req, res) {
        pool.query('SELECT COUNT(*) AS "total" FROM departamento',
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

    listarDepartamentosAulas: function (req, res) {
        pool.query('SELECT * FROM listardepartamentoaulas',
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

    actualizarDepartamento: function (req, res) {
        pool.query('UPDATE departamento SET nombre = $1, capacidad=$2, "idTipoDepartamento"=$3 WHERE "idDepartamento" = $4', 
            [
                req.body.nombre,
                req.body.capacidad,
                req.body.idTipoDepartamento,
                req.body.idDepartamento,
            ],
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
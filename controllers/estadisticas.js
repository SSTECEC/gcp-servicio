const { Pool } = require('pg');
var config = require("../database/database.js");
const pool = new Pool(config);

module.exports = {

    listarInsumosJson: function (req, res) {
        pool.query('SELECT * FROM listarinsumosjson',
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

    listarReservasTotalesJson: function (req, res) {
        pool.query('SELECT * FROM listarreservastotalesjson',
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

    listarReservasUsuariosJson: function (req, res) {
        pool.query('SELECT * FROM listarreservasusuariosjson',
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

    
}
const { Pool } = require('pg');
var config = require("../database/database.js");
var auth = require(".././auth/auth.js");
const pool = new Pool(config);

module.exports = {

    listarUsuarios : function (req,res) {
        pool.query('SELECT * FROM listarusuarios', 
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

    verificacionUsuario : function (req,res) {
        pool.query('SELECT * FROM iniciarsesion WHERE email = $1 AND contrasena = $2',
        [req.body.email, auth.encriptar(req.body.contrasena)], 
            (err,data) => {
                if(err)
                {
                    console.log('Surgió un error: \n',err);
                    res.sendStatus(500);
                    res.send({ 'Error' : err });
                }else{
                    var result = data.rows[0]; 
                    console.log('Transacción Exitosa');
                    if(result != undefined ){
                        res.send({ 'resultado': result, 'token': auth.generar(result) });
                    }else{
                        res.send({ 'resultado': -1 , 'error': 'Credenciales Incorrectas' });
                    }
                }
            }
        );
    },

    guardarUsuario : function (req,res) {
        pool.query('INSERT INTO usuario(usuario,identificacion,email,contrasena,foto,estado,"idRol") VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING "idUsuario"',
        [req.body.usuario,req.body.identificacion, req.body.email, auth.encriptar(req.body.contrasena),req.body.foto,req.body.estado,req.body.rol],
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
    
    eliminarUsuario : function (req,res) {
        pool.query('UPDATE usuario SET estado = 2  WHERE "idUsuario" = $1',
        [req.body.idUsuario], 
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

    actualizarUsuario : function (req,res) {
        pool.query('UPDATE usuario SET usuario = $1, identificacion = $2, email = $3, foto = $4 WHERE "idUsuario" = $5',
        [req.body.usuario,req.body.identificacion,req.body.email,req.body.foto,req.body.idUsuario], 
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

    resetearPassword : function (req,res) {
        pool.query('UPDATE usuario SET contrasena = $1 WHERE "idUsuario" = $2',
        [auth.encriptar(req.body.contrasena),req.body.idUsuario], 
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

    listarUsuarioEspecifico : function (req,res) {
        pool.query('SELECT "idUsuario" FROM usuario WHERE identificacion = $1',[req.query.identificacion],
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

}
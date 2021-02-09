var express = require('express');
var router = express.Router();
var controladores = require('.././controllers');
var auth = require(".././auth/auth.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 
/* Rutas de acceso sin token */

// Usuario

router.post('/verificacionUsuario', controladores.usuario.verificacionUsuario);
router.post('/guardarUsuario', controladores.usuario.guardarUsuario);
router.post('/resetearPassword', controladores.usuario.resetearPassword);

/* Rutas de acceso con token */

// GET
// Sede
router.get('/listarSede', auth.seguridad ,controladores.sede.listarSede);
router.get('/listarSedeDetalles', controladores.sede.listarSedeDetalles);
router.get('/listarSedeDetallesParametro', controladores.sede.listarSedeDetallesParametro);
// Departamento
router.get('/listarTipoDepartamento', controladores.tipodepartamento.listarTipoDepartamento);
router.get('/listarDepartamentos', controladores.departamento.listarDepartamentos);
router.get('/listarRegistrosDepartamento', controladores.departamento.listarRegistrosDepartamento);
// Insumos
router.get('/listarInsumos', controladores.insumos.listarInsumos);
router.get('/listarDepartamentoInsumos', controladores.departamentoinsumos.listarDepartamentoInsumos);
router.get('/listarRegistrosInsumos', controladores.departamentoinsumos.listarRegistrosInsumos);
router.get('/listarDetalleInsumos', controladores.insumos.listarDetalleInsumos);
router.get('/listarUsuarios', controladores.usuario.listarUsuarios);
router.get('/listarRoles', controladores.rol.listarRoles);
router.get('/listarInsumoEspecifico', controladores.insumos.listarInsumoEspecifico);
router.get('/listarDetalleInsumosDisponibles', controladores.departamentoinsumos.listarDetalleInsumosDisponibles);
router.get('/actualizarEstadoAsignacionDetalleInsumo', controladores.insumos.actualizarEstadoAsignacionDetalleInsumo);


// POST
// Usuario
router.post('/actualizarUsuario', controladores.usuario.actualizarUsuario);
router.post('/eliminarUsuario', controladores.usuario.eliminarUsuario);
// Sede
router.post('/guardarSede', controladores.sede.guardarSede);
router.post('/guardarSedeDetalles', controladores.sede.guardarSedeDetalles);
router.post('/actualizarSede', controladores.sede.actualizarSede);
// Departamento
router.post('/guardarDepartamento', controladores.departamento.guardarDepartamento);
router.post('/guardarTipoDepartamento', controladores.tipodepartamento.guardarTipoDepartamento);
// Insumo
router.post('/guardarInsumos', controladores.insumos.guardarInsumos);
router.post('/guardarDepartamentoInsumo', controladores.departamentoinsumos.guardarDepartamentoInsumo);
router.post('/cambiarEstadoInsumo', controladores.departamentoinsumos.cambiarEstadoInsumo);
router.post('/eliminarInsumos', controladores.insumos.eliminarInsumos);
router.post('/actualizarInsumos', controladores.insumos.actualizarInsumos);
router.post('/guardarInsumoDetalles', controladores.insumos.guardarInsumoDetalles);
router.post('/actualizarNumeroSerieInsumo', controladores.insumos.actualizarNumeroSerieInsumo);
router.post('/cambiarEstadoDetalleInsumo', controladores.insumos.cambiarEstadoDetalleInsumo);
router.post('/actualizarInsumoValores', controladores.insumos.actualizarInsumoValores);



module.exports = router;
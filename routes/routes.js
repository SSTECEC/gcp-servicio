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
router.get('/listarSedeDetallesAll', controladores.sede.listarSedeDetallesAll);

// Departamento
router.get('/listarTipoDepartamento', controladores.tipodepartamento.listarTipoDepartamento);
router.get('/listarDepartamentos', controladores.departamento.listarDepartamentos);
router.get('/listarRegistrosDepartamento', controladores.departamento.listarRegistrosDepartamento);
router.get('/listarDepartamentosAulas', controladores.departamento.listarDepartamentosAulas);
router.get('/listarTipoDepartamentoCambiable', controladores.tipodepartamento.listarTipoDepartamentoCambiable);

// Insumos
router.get('/listarInsumos', controladores.insumos.listarInsumos);
router.get('/listarDepartamentoInsumos', controladores.departamentoinsumos.listarDepartamentoInsumos);
router.get('/listarRegistrosInsumos', controladores.departamentoinsumos.listarRegistrosInsumos);
router.get('/listarDetalleInsumos', controladores.insumos.listarDetalleInsumos);
router.get('/listarDetalleInsumosDepartamento', controladores.insumos.listarDetalleInsumosDepartamento);
router.get('/listarUsuarios', controladores.usuario.listarUsuarios);
router.get('/listarUsuarioEspecifico', controladores.usuario.listarUsuarioEspecifico);
router.get('/listarRoles', controladores.rol.listarRoles);
router.get('/listarInsumoEspecifico', controladores.insumos.listarInsumoEspecifico);
router.get('/listarDetalleInsumosDisponibles', controladores.departamentoinsumos.listarDetalleInsumosDisponibles);
router.get('/actualizarEstadoAsignacionDetalleInsumo', controladores.insumos.actualizarEstadoAsignacionDetalleInsumo);
router.get('/listarInsumosDisponiblesDepartamento', controladores.departamentoinsumos.listarInsumosDisponiblesDepartamento);
// Reserva 
router.get('/listarUltimaFechaReserva', controladores.reserva.listarUltimaFechaReserva);
router.get('/consultaLogReservas', controladores.reserva.consultaLogReservas);
router.get('/actualizarReserva', controladores.reserva.actualizarReserva);
router.get('/listadoCompletoReservaciones', controladores.reserva.listadoCompletoReservaciones);
router.get('/listadoCompletoReservacionesDisponibles', controladores.reserva.listadoCompletoReservacionesDisponibles);
router.get('/listadoCompletoReservacionesUsuario', controladores.reserva.listadoCompletoReservacionesUsuario);
router.get('/cancelarReserva', controladores.reserva.cancelarReserva);

// Estadísticas
router.get('/listarInsumosJson', controladores.estadisticas.listarInsumosJson);
router.get('/listarReservasTotalesJson', controladores.estadisticas.listarReservasTotalesJson);
router.get('/listarReservasUsuariosJson', controladores.estadisticas.listarReservasUsuariosJson);

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
router.post('/actualizarDepartamento', controladores.departamento.actualizarDepartamento);
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
// Reserva 
router.post('/guardarLogReserva', controladores.reserva.guardarLogReserva);
router.post('/guardarReserva', controladores.reserva.guardarReserva);
router.post('/listarReservasExportacion', controladores.reserva.listarReservasExportacion);
router.post('/listarReservasExportacionDescarga', controladores.reserva.listarReservasExportacionDescarga);
router.post('/actualizarLogReserva', controladores.reserva.actualizarLogReserva);
router.post('/listadoReservasFiltros', controladores.reserva.listadoReservasFiltros);

module.exports = router;
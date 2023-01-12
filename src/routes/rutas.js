const express = require('express'); //guardar express en una variable de servidor
const router = express.Router(); //usar modulo de router de ex´press
const EmpleadoController = require('../controllers/EmpleadoController');
const MantenimientoController = require('../controllers/MantenimientoController');
const SistemasController = require('../controllers/SistemasController');
const AdminController = require('../controllers/AdminController');

//Menu Principal
router.get('/', (req, res) => {
	//res.send('holoo');
	res.render('./Admin/loginUsuario.html'); 
});


//Menu Principal
router.get('/Home', (req, res) => {
	//res.send('holoo');
	res.render('index.html'); 
});

router.get('/Login/:Argumento', AdminController.Login);



/*********************************************** Prestamos ***********************************************/
router.get('/HistorialPrestamos', (req, res) => {
	//res.send('holoo');
	res.render('./Usuarios/HistorialPrestamos.html'); 
});

//Registra Nueva tarea
router.post('/solicitarPrestamo', EmpleadoController.solicitarPrestamo);
//Cargar TareasAbiertas
router.get('/ListaHistorialPrestamos/:Argumento', EmpleadoController.ListaHistorialPrestamos);
router.get('/CargarTareaElectricoid/:Argumento', EmpleadoController.CargarTareaElectricoid);

/********************************************* MANTENIMIENTO *********************************************/
router.get('/ListaMantenimiento', (req, res) => {
	//res.send('holoo');
	res.render('./Usuarios/ListaMantenimiento.html'); 
});

//Registra Nueva tarea
router.post('/registrarMantenimiento', MantenimientoController.NuevaTarea);
//Cargar TareasAbiertas
router.get('/TareasAbiertasMantenimiento/:Argumento', MantenimientoController.TareasAbiertasMantenimiento);
router.get('/CargarTareaMantenimientoid/:Argumento', MantenimientoController.CargarTareaMantenimientoid);

/********************************************* SISTEMAS *********************************************/
router.get('/ListaSistemas', (req, res) => {
	//res.send('holoo');
	res.render('./Usuarios/ListaSistemas.html'); 
}); 

//Registra Nueva tarea
router.post('/registrarSistemas', SistemasController.NuevaTarea);
//Cargar TareasAbiertas
router.get('/TareasAbiertasSistemas/:Argumento', SistemasController.TareasAbiertasSistemas);
router.get('/CargarTareaSistemasid/:Argumento', SistemasController.CargarTareaSistemasid);

 
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
  
//Menu Principal
router.get('/loginServicio', (req, res) => {
	//res.send('holoo');
	res.render('./Admin/loginServicio.html'); 
});

router.get('/LoguearServicio/:Argumento', AdminController.Login);


//Menu Principal
router.get('/HomeServicios', (req, res) => {
	//res.send('holoo');
	res.render('indexServicios.html'); 
});


/*********************************************** ELECTRICO ***********************************************/
router.get('/ListaServicioElectrico', (req, res) => {
	//res.send('holoo');
	res.render('./Servidores/ListaElectrico.html'); 
});

//Cargar TareasAbiertas vistas por el servidor
router.get('/TareasAbiertasServidorElectrico/:Argumento', EmpleadoController.TareasAbiertasServidorElectrico);
//Actualiza la respuesta
router.post('/ActualizarTareasElectrico', EmpleadoController.ActualizarTareasElectrico);
//Cerrartarea
router.post('/CerrarTareasElectrico', EmpleadoController.CerrarTareasElectrico);

/*********************************************** Mantenimiento ***********************************************/
router.get('/ListaServicioMantenimiento', (req, res) => {
	//res.send('holoo');
	res.render('./Servidores/ListaMantenimiento.html'); 
});

//Cargar TareasAbiertas vistas por el servidor
router.get('/TareasAbiertasServidorMantenimiento/:Argumento', MantenimientoController.TareasAbiertasServidorMantenimiento);

//Actualiza la respuesta
router.post('/ActualizarTareasMantenimiento', MantenimientoController.ActualizarTareasMantenimiento);
//Cerrartarea
router.post('/CerrarTareasMantenimiento', MantenimientoController.CerrarTareasMantenimiento);

/*********************************************** Sistemas ***********************************************/
router.get('/ListaServicioSistemas', (req, res) => {
	//res.send('holoo');
	res.render('./Servidores/ListaSistemas.html'); 
});

//Cargar TareasAbiertas vistas por el servidor
router.get('/TareasAbiertasServidorSistemas/:Argumento', SistemasController.TareasAbiertasServidorSistemas);

//Actualiza la respuesta
router.post('/ActualizarTareasSistemas', SistemasController.ActualizarTareasSistemas);
//Cerrartarea
router.post('/CerrarTareasSistemas', SistemasController.CerrarTareasSistemas);


/*********************************************** REPORTE ***********************************************/

router.get('/MenuReporte', (req, res) => {
	//res.send('holoo');
	res.render('./Servidores/Reporte.html'); 
});

//Cargar TareasAbiertas vistas por el servidor
router.get('/Reporte/:Argumento', AdminController.Reporte);

//Cargar TareasAbiertas vistas por el servidor
router.get('/ReporteUnitario/:Argumento', AdminController.ReporteUnitario);














module.exports = router;

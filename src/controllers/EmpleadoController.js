const Controller = {};
const express = require('express'); //guardar express en una variable de servidor 


Controller.solicitarPrestamo = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body; //TRAE TODO EL OBJETO

        console.log(req.session.nombre)

        let Empleado = req.session.nombre;
        let Planta = Object.values(data)[0].Planta;
        let Nomina = Object.values(data)[0].Nomina;
        let Cantidad = Object.values(data)[0].Cantidad;
        let Plazo = Object.values(data)[0].Plazo;  
        conn.query("INSERT INTO Prestamos(Nomina,Empleado,Planta,Cantidad,Plazo)VALUES" +
            "('" + Nomina + "','" + Empleado + "','" + Planta + "'," + Cantidad + "," + Plazo + ")", (err, data) => {
                if (err) {
                    console.log('Error de lectura' + err);
                    res.json(false);
                } else {
                    console.log('Listo')
                    res.json(true);
                }
            });
    });
};


Controller.ListaHistorialPrestamos = (req, res) => {
    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            Argumento
        } = req.params;
        conn.query("SELECT * FROM Prestamos WHERE Nomina = '" + Argumento + "' order by FechaRegistro", (err, data) => {
            if (err) {
                //res.json("Error json: " + err);
                console.log('Error al registrar recepcion ' + err);
            } else {
                //console.log(data);
                res.json(data)
            }
        });
    });
};


Controller.CargarTareaElectricoid = (req, res) => {

    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            Argumento
        } = req.params;

        conn.query("SELECT * FROM TareaElectrico WHERE id = " + Argumento, (err, data) => {
            if (err) {
                //res.json("Error json: " + err);
                console.log('Error al registrar recepcion ' + err);
            } else {
                console.log(data);
                res.json(data)
            }
        });
    });
};


Controller.TareasAbiertasServidorElectrico = (req, res) => {

    //res.send('Metodo Get list');
    req.getConnection((err, conn) => {
        const {
            Argumento
        } = req.params;
        conn.query("SELECT * FROM TareaElectrico WHERE Estatus != 'Cerrada' AND Planta = '"+req.session.planta+"'" , (err, data) => {
            if (err) {
                //res.json("Error json: " + err);
                console.log('Error al registrar recepcion ' + err);
            } else {
                //console.log(data);
                res.json(data)
            }
        });
    });
};


Controller.ActualizarTareasElectrico = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body; //TRAE TODO EL OBJETO

        let Servidor_Respuesta = Object.values(data)[0].Servidor_Respuesta;
        let Cierre = Object.values(data)[0].Cierre;
        let id = Object.values(data)[0].id;

        console.log(Cierre)
        conn.query("UPDATE TareaElectrico SET Respuesta = '" + Servidor_Respuesta + "', FechaPromesa = '" + Cierre + "' WHERE id = " + id, (err, Herramientas) => {
            if (err) {
                console.log('Error de lectura' + err);
                res.json(false);
            } else {
                console.log('Listo')
                res.json(true);
            }
        });
    });
};

Controller.CerrarTareasElectrico = (req, res) => {
    req.getConnection((err, conn) => {
        const data = req.body; //TRAE TODO EL OBJETO

        let idTarea = Object.values(data)[0].idTarea;
        let Respuesta = Object.values(data)[0].Respuesta;
        let Cierre = Object.values(data)[0].Cierre;

        conn.query("UPDATE TareaElectrico SET Respuesta = '" + Respuesta + "', FechaCierre = '" + Cierre + "', Estatus = 'Cerrada' WHERE id = " + idTarea, (err, Herramientas) => {
            if (err) {
                console.log('Error de lectura' + err);
                res.json(false);
            } else {
                console.log('Listo')
                res.json(true);
            }
        });
    });
};

module.exports = Controller;
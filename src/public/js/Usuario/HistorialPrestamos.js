function Nuevatareas() {
    document.querySelector("#Nombre").value = localStorage.getItem("Nombre")
    document.querySelector("#FechaRegistro").value = moment().format("DD-MM-YYYY");
}

async function CerrarFormularioNewTarea() {
    const ModalFormNuevaTarea = document.querySelector('#ModalFormNuevaTarea');

    await ModalFormNuevaTarea.dismiss({
        'dismissed': true
    });
}


function Registrar() {
    /* let Proyecto = localStorage.getItem('ProyectoActual'); */
    let FechaRegistro = document.querySelector("#FechaRegistro").value;
    let Nombre = localStorage.getItem("Nombre");
    let Planta = localStorage.getItem("Planta") || '';
    let Nomina = localStorage.getItem("Nomina") || '';;
    let Cantidad = document.querySelector("#Cantidad").value || '';
    let Plazo = document.querySelector("#Plazo").value || '';
    var Arreglo = [Nombre, Planta, Nomina, Cantidad, Plazo];

    console.log(Arreglo)
    var Condicion = true; //para campos vacios
    for (var a in Arreglo) { //recorrer arreglo en busca de campos vacios
        console.log(a)
        console.log(Arreglo[a])
        if (Arreglo[a].length == 0 || Arreglo[a] == undefined) {
            Condicion = false; //si algun campo esta vacio cambia a falso
        }
    }

    let Registro = {
        Nombre: Nombre,
        Planta: Planta,
        Nomina: Nomina,
        Cantidad: Cantidad,
        Plazo: Plazo
    }

    console.log(Registro)

    if (Condicion == true) { //si todos los campos estan llenos avanza
        $.post("/solicitarPrestamo", // url
            {
                Registro
            }, // data to be submit
            function (objeto, estatus) { // success callback
                window.location.href = "/HistorialPrestamos";
            });
    } else {
        alert("Faltan campos por llenar")
    }
}


//Mostrar Tareas Activas
var ListaTareas = []
var TotalTareas = []
function MostrarHistorial() {

    //Limpiar Lista Maestra
    var Lista = document.querySelector("#ListaMaestra");
    while (Lista.firstChild) {
        //The list is LIVE so it will re-index each call
        Lista.removeChild(Lista.firstChild);
    }

    //Construir Lista Maestra con tarjetas
    var ItemOriginal = document.querySelector("#Item-Borrador").innerHTML;
    $.ajax({
        url: '/ListaHistorialPrestamos/' + localStorage.getItem('Nomina'),
        success: function (data) {
            /* $("#CuerpoRegistros tr").remove(); */

            let TotalRegistros = data.length;
            document.getElementById("total").innerText = TotalRegistros;

            for (let index = 0; index < TotalRegistros; index++) {
                var Lista = document.querySelector("#ListaMaestra");

                const div = document.createElement("div"); //Creo un nuevo div para la nueva tarjeta
                div.innerHTML = ItemOriginal;
                Lista.appendChild(div);

                var Titulo = document.querySelector("#Titulo-FechaSolicitud");
                Titulo.innerHTML = moment(data[index].FechaRegistro).format("DD/MM/YYYY");
                Titulo.id = 'Titulo' + index;
                //ListaTareas.push(data[index].Proyecto);
                //console.log('TotalRegistros: ' +data[index].Tareas)
                //TotalTareas.push((data[index].Tareas-1))

                var SubTitulo = document.querySelector("#SubTitulo-Borrador");
                SubTitulo.innerHTML = "$" + data[index].Cantidad;
                SubTitulo.id = 'SubTitulo' + index;


                document.querySelector("#indiceProyecto").setAttribute('onclick', 'AsignarLocalStorage("' + data[index].id + '")');
                //document.querySelector("#indiceProyecto").setAttribute('href', '/MostrarFormulario');
                var indiceProyecto = document.querySelector("#indiceProyecto");
                indiceProyecto.id = 'indiceProyecto' + data[index].id;


                var BarraCumplimiento = document.querySelector("#BarraCumplimiento");
                BarraCumplimiento.id = 'BarraCumplimiento' + index;

                var Estatus = document.querySelector("#Estatus-Borrador");
                Estatus.id = 'Estatus' + index;
                Estatus.innerHTML = "Estatus: " + data[index].Estatus;
                if (data[index].Estatus == 'Pendiente')
                    BarraCumplimiento.setAttribute('color', 'tertiary');
                else if (data[index].Estatus == 'Revision')
                    BarraCumplimiento.setAttribute('color', 'warning');
                else if (data[index].Estatus == 'Aprobado')
                    BarraCumplimiento.setAttribute('color', 'success');
                else if (data[index].Estatus == 'Rechazado')
                    BarraCumplimiento.setAttribute('color', 'danger');
            }
            //AjustarBarras()
        } //Funcion success
    }); //Ajax 
}

//Guardar id del proyecto en revision actual
function AsignarLocalStorage(params) {
    localStorage.setItem('ProyectoActual', params);
    document.querySelector("#ModalEstatusSistemas").present()
    console.log("sigo jalando")
    EscribirModalStatus();
}

//Para cerrar el modal de estatus 
async function CerrarModalEstatusSistemas() {
    const ModalFormNuevaTarea = document.querySelector('#ModalEstatusSistemas');

    await ModalFormNuevaTarea.dismiss({
        'dismissed': true
    });
}

function EscribirModalStatus() {
    var idTarea = localStorage.getItem('ProyectoActual');

    $.ajax({
        url: '/CargarTareaSistemasid/' + idTarea,
        success: function (data) {
            document.querySelector("#est_Nombre").innerHTML = data[0].Usuario;
            document.querySelector("#est_Maquina").innerHTML = data[0].Equipo;
            document.querySelector("#est_FechaResgistro").innerHTML = 'Fecha registro: ' + moment(data[0].FechaRegistro).format('DD-MM-YYYY');
            document.querySelector("#est_Estatus").innerHTML = data[0].Estatus;
            document.querySelector("#est_Respuesta").innerHTML = data[0].Respuesta == null ? "Sin Respuesta" : data[0].Respuesta;
            if (data[0].FechaPromesa) {
                document.querySelector("#est_FechaPromesa").innerHTML = data[0].FechaPromesa == null ? "Sin Respuesta" : "Fecha promesa: " + moment(data[0].FechaPromesa).format("DD-MM-YYYY");
            }
        } //Funcion success
    }); //Ajax 
}
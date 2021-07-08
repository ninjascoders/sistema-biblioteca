var tabla;

//Función que se ejecuta al inicio
function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);	
	});
    //$('#mAlmacen').addClass("treeview active");
   // $('#lestudiantes').addClass("active");
}

//Función limpiar
function limpiar()
{
	$("#codigo").val("");
	$("#dni").val("");
	$("#nombre").val("");
	$("#carrera").val("");
	$("#direccion").val("");
	$("#telefono").val("");
	$("#email").val("");
	$("#idestudiante").val("");
}

//Función mostrar formulario
function mostrarform(flag)
{
	limpiar();
	if (flag)
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
		$("#btnagregar").hide();
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
		$("#btnagregar").show();
	}
}

//Función cancelarform
function cancelarform()
{
	limpiar();
	mostrarform(false);
}

//Función Listar
function listar()
{
	tabla=$('#tbllistado').dataTable(
	{
		"lengthMenu": [ 5, 10, 25, 75, 100],//mostramos el menú de registros a revisar
		"aProcessing": true,//Activamos el procesamiento del datatables
	    "aServerSide": true,//Paginación y filtrado realizados por el servidor
	    dom: '<Bl<f>rtip>',//Definimos los elementos del control de tabla
	    buttons: [		          
		            'copyHtml5',
		            'excelHtml5',
		            'csvHtml5',
		            'pdf'
		        ],
		"ajax":
				{
					url: '../ajax/estudiante.php?op=listar',
					type : "get",
					dataType : "json",						
					error: function(e){
						console.log(e.responseText);	
					}
				},
		"language": {
            "lengthMenu": "Mostrar : _MENU_ registros",
            "buttons": {
            "copyTitle": "Tabla Copiada",
            "copySuccess": {
                    _: '%d líneas copiadas',
                    1: '1 línea copiada'
                }
            }
        },
		"bDestroy": true,
		"iDisplayLength": 5,//Paginación
	    "order": [[ 0, "desc" ]]//Ordenar (columna,orden)
	}).DataTable();
}
//Función para guardar o editar

function guardaryeditar(e)
{
	e.preventDefault(); //No se activará la acción predeterminada del evento
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);

	$.ajax({
		url: "../ajax/estudiante.php?op=guardaryeditar",
	    type: "POST",
	    data: formData,
	    contentType: false,
	    processData: false,

	    success: function(datos)
	    {                    
	          bootbox.alert(datos);	          
	          mostrarform(false);
	          tabla.ajax.reload();
	    }

	});
	limpiar();
}

function mostrar(idestudiante)
{
	$.post("../ajax/estudiante.php?op=mostrar",{idestudiante : idestudiante}, function(data, status)
	{
		data = JSON.parse(data);		
		mostrarform(true);

		$("#codigo").val(data.codigo);
		$("#dni").val(data.dni);
		$("#nombre").val(data.nombre);
		$("#carrera").val(data.carrera);
		$("#carrera").selectpicker('refresh');
		$("#direccion").val(data.direccion);
		$("#telefono").val(data.telefono);
		$("#email").val(data.email);
 		$("#idestudiante").val(data.idestudiante);

 	})
}

//Función para desactivar registros
function desactivar(idestudiante)
{
	bootbox.confirm("¿Está Seguro de desactivar el Estudiante?", function(result){
		if(result)
        {
        	$.post("../ajax/estudiante.php?op=desactivar", {idestudiante : idestudiante}, function(e){
        		bootbox.alert(e);
	            tabla.ajax.reload();
        	});	
        }
	})
}

//Función para activar registros
function activar(idestudiante)
{
	bootbox.confirm("¿Está Seguro de activar el Estudiante?", function(result){
		if(result)
        {
        	$.post("../ajax/estudiante.php?op=activar", {idestudiante : idestudiante}, function(e){
        		bootbox.alert(e);
	            tabla.ajax.reload();
        	});	
        }
	})
}


init();
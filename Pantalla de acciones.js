function mensajeDatos()
{
	Swal.fire(
	{
		//title: 'Bienvenido', 
		//text: 'Espero que te guste mi pagina web', Pone un texto normal
		html: "<h2 class='text-info'>Datos</h2><br></bt><h6 class='text-info'>Nombre del usuario: Gabriel Caceres<br><br>Numero de cuenta: 12345</h6>",
		icon: 'info', //warning, success, info, question, error
		confirmButtonText: 'Esta bien',
		//footer: 'Estos datos son importantes',
		footer: '<h6 class="text-info">Estos datos son importantes</h6>',
		width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
		//padding: '10px', Se puede manipular el padding
		background: '#000',
		//grow: fullscreen, row, column, fullscreen | Se puede manipular el tamaño de la ventana modal
		//backdrop: true, Pone oscuro el resto del fondo de la pantalla | El valor por defecto es true y si pones false en el caso de esta app web se deforma el modal
		//timer: 10*1000, Darle tiempo | numeroDeSegundos*1000
		//timerProgressBar: true, Poner un progressBar (Si el background es negro no se vee)
		//toast: true,
		//position: center, top, left, right, bottom | Se puede manipular la posicion de la ventana modal 
		allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
		allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
		allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
		stopKeyDownPropagation: true //Mientras la ventana modal este activa los eventos de teclado no se activaran
	});

}
function mensajeSalirSesion()
{
	const swalWithBootstrapButtons = Swal.mixin(
	{
		customClass: { confirmButton: 'btn btn-outline-primary', cancelButton: 'mr-2 btn btn-outline-danger' },
	  	buttonsStyling: false
	});

	swalWithBootstrapButtons.fire(
	{
		html: "<h2 class='text-info'>Salir de la sesion?</h2>",
		background: '#000',
		icon: 'info',
		width: '35%',
		showCancelButton: true, 
		reverseButtons: true, //El boton de cancel aparece a la izquierda y el boton de confirm aparece a la derecha
		confirmButtonText: 'Salir de la sesion',
		cancelButtonText: 'No salir de la sesion',
		footer: '<h6 class="text-info">Salir de sesion</h6>',
		allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
		allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
		allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
	}
	).then((result) => //Creo que este metodo es como decir ok despues (then) que se muestre el S-alert se realizara una funcion y recibira un parametro opcional que es result
	{
  		if (result.isConfirmed) //result = Object { isConfirmed: true, isDenied: false, isDismissed: false, value: true }
  		{
  			location.href = '../HTML/login.html' 
    	} 
	})	
}

let deposito;
let retiro;
let numeroRetiros = 0;
let numeroDepositos = 0;
let retiros = [];
let depositos = [];
let total = 0;
let pagosElectricidad = [];
let pagosIT = [];
let pagosAgua = [];

buttonDatos = document.getElementById('buttonDatos');
salirSesion = document.getElementById('salirSesion');
depositar = document.getElementById('depositar');
retirar = document.getElementById('retirar');
consultarSaldo = document.getElementById('consultarSaldo');
pagarServicios = document.getElementById('pagarServicios');

buttonDatos.addEventListener('click', mensajeDatos);
salirSesion.addEventListener('click', mensajeSalirSesion);

depositar.addEventListener('click', () =>
{
	const swalWithBootstrapButtons = Swal.mixin(
	{
		customClass: { confirmButton: 'btn btn-outline-primary', cancelButton: 'mr-2 btn btn-outline-danger' },
	  	buttonsStyling: false
	});
	swalWithBootstrapButtons.fire(
	{
		html: "<h2 class='text-info'>Depositar</h2>",
		icon: 'info', //warning, success, info, question, error
		footer: '<h6 class="text-info">Establezaca el deposito</h6>',
		width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
		background: '#000',
		confirmButtonText: 'Depositar',
		cancelButtonText: 'No depositar',
		showCancelButton: true, 
		reverseButtons: true, //El boton de cancel aparece a la izquierda y el boton de confirm aparece a la derecha
		input: 'text',
		inputPlaceholder: 'Depositar',
		inputValue: '',
		allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
		allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
		allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
	}).then((result) =>
	{ 
		if(result.isConfirmed)
		{
			deposito = parseFloat(swalWithBootstrapButtons.getInput().value);
			if(swalWithBootstrapButtons.getInput().value === '' || isNaN(deposito))
			{
				swalWithBootstrapButtons.fire(
				{
					html: "<h4 class='text-info'>Dato ingresado invalido</h4>",
					icon: 'error', //warning, success, info, question, error
					footer: '<h6 class="text-info">Que diablos escribiste?</h6>',
					width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
					background: '#000',
					confirmButtonText: 'Muy bien',
					allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
					allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
					allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
				})
			}
			else
			{
				total += deposito;
				depositos.push(deposito);
				swalWithBootstrapButtons.fire(
				{
					html: "<h4 class='text-info'>Se han depositado "+ deposito +"$ exitosamente</h4>",
					icon: 'success', //warning, success, info, question, error
					footer: '<h6 class="text-info">Deposito exitoso</h6>',
					width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
					background: '#000',
					confirmButtonText: 'Muy bien',
					allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
					allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
					allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
				})
			} 
		}
	})
})

retirar.addEventListener('click', () =>
{
	const swalWithBootstrapButtons = Swal.mixin(
	{
		customClass: { confirmButton: 'btn btn-outline-primary', cancelButton: 'mr-2 btn btn-outline-danger' },
	  	buttonsStyling: false
	});
	swalWithBootstrapButtons.fire(
	{
		html: "<h2 class='text-info'>Retirar</h2>",
		icon: 'info', //warning, success, info, question, error
		footer: '<h6 class="text-info">Establezaca el retiro</h6>',
		width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
		background: '#000',
		confirmButtonText: 'Retirar',
		cancelButtonText: 'No retirar',
		showCancelButton: true, 
		reverseButtons: true, //El boton de cancel aparece a la izquierda y el boton de confirm aparece a la derecha
		input: 'text',
		inputPlaceholder: 'Retirar',
		inputValue: '',
		allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
		allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
		allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
	}).then((result) =>
	{ 
		if(result.isConfirmed)
		{
			retiro = parseFloat(swalWithBootstrapButtons.getInput().value);
			if(swalWithBootstrapButtons.getInput().value === '' || isNaN(retiro))
			{
				swalWithBootstrapButtons.fire(
				{
					html: "<h4 class='text-info'>Dato ingresado invalido</h4>",
					icon: 'error', //warning, success, info, question, error
					footer: '<h6 class="text-info">Que diablos escribiste?</h6>',
					width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
					background: '#000',
					confirmButtonText: 'Muy bien',
					allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
					allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
					allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
				})
			}
			if(retiro <= total)
			{
				total -= retiro;
				retiros.push(retiro);
				swalWithBootstrapButtons.fire(
				{
					html: "<h4 class='text-info'>Se han retirado "+ retiro +"$ exitosamente</h4>",
					icon: 'success', //warning, success, info, question, error
					footer: '<h6 class="text-info">Retiro exitoso</h6>',
					width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
					background: '#000',
					confirmButtonText: 'Muy bien',
					allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
					allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
					allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
				})
			} 
			else if(retiro > total)
			{
				swalWithBootstrapButtons.fire(
				{
					html: "<h4 class='text-info'>No tienes suficiente $</h4>",
					icon: 'error', //warning, success, info, question, error
					footer: '<h6 class="text-info">No tienes $</h6>',
					width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
					background: '#000',
					confirmButtonText: 'Muy bien',
					allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
					allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
					allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
				})
			}
		}
	})
})
//swalWithBootstrapButtons.getConfirmButton().addEventListener('click', () => { location.href = '../HTML/login.html' }) Esta linea de codigo no la utilizare pero me gusta la logica por lo tanto la quiero guardar

consultarSaldo.addEventListener("click", () =>
{
	Swal.fire(
	{
		html: "<h2 class='text-info'>Saldo: " + total + "$</h2>",
		icon: 'info', //warning, success, info, question, error
		confirmButtonText: 'Esta bien',
		footer: '<h6 class="text-info">Consulta del saldo</h6>',
		width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
		background: '#000',
		allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
		allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
		allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
	});	
})

pagarServicios.addEventListener("click", () =>
{
	let swalWithBootstrapButtons = Swal.mixin(
	{
		customClass: { confirmButton: 'btn btn-outline-primary', cancelButton: 'mr-2 btn btn-outline-danger' },
	  	buttonsStyling: false
	});
	swalWithBootstrapButtons.fire(
	{
		html: "<h2 class='text-info'>Pago de servicios</h2>",
		icon: 'info', //warning, success, info, question, error
		footer: '<h6 class="text-info">Pague un servicio</h6>',
		width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
		background: '#000',
		confirmButtonText: 'Pagar',
		cancelButtonText: 'No Pagar',
		showCancelButton: true, 
		reverseButtons: true, //El boton de cancel aparece a la izquierda y el boton de confirm aparece a la derecha
		input: "select",
		inputPlaceholder: "Servicios",
		inputOptions: { energiaElectrica: "Energia electrica", internetTelefonia: "Internet y telefonia", aguaPotable: "Agua potable" },
		inputValue: '',
		allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
		allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
		allowEnterKey: false //Si es false si el usuario pulsa ENTER no se cerrara la modal window
	}).then((result) => 
	{
		if(result.isConfirmed)
		{
			servicio = swalWithBootstrapButtons.getInput().selectedOptions[0].text;
			swalWithBootstrapButtons = Swal.mixin(
			{
				customClass: { confirmButton: 'btn btn-outline-primary'},
			  	buttonsStyling: false
			});
			swalWithBootstrapButtons.fire(
			{
				html: "<h6 class='text-info'>Establezca la cuota del servicio: " + servicio + "</h6>",
				icon: 'info', //warning, success, info, question, error
				footer: '<h6 class="text-info">Debe insertar la cuota</h6>',
				width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
				background: '#000',
				confirmButtonText: 'Pagar',
				input: 'text',
				inputPlaceholder: 'Inserte la cuota',
				inputValue: '',
				allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
				allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
				allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
			}).then((result) =>
			{ 
				let cuota;
				if(result.isConfirmed)
				{
					cuota = parseFloat(swalWithBootstrapButtons.getInput().value);
					if(swalWithBootstrapButtons.getInput().value === '' || isNaN(cuota))
					{
						swalWithBootstrapButtons.fire(
						{
							html: "<h4 class='text-info'>Dato ingresado invalido</h4>",
							icon: 'error', //warning, success, info, question, error
							footer: '<h6 class="text-info">Que diablos escribiste?</h6>',
							width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
							background: '#000',
							confirmButtonText: 'Muy bien',
							allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
							allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
							allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
						})
					}
					if(cuota <= total)
					{
						total -= cuota;
						switch(servicio)
						{
							case "Energia electrica":
								pagosElectricidad.push(cuota);
								break;
							case "Internet y telefonia":
								pagosIT.push(cuota);
								break;
							case "Agua potable":
								pagosAgua.push(cuota);
								break;
						}
						swalWithBootstrapButtons.fire(
						{
							html: "<h4 class='text-info'>Se han pagado "+ cuota +"$ exitosamente</h4>",
							icon: 'success', //warning, success, info, question, error
							footer: '<h6 class="text-info">Pago exitoso</h6>',
							width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
							background: '#000',
							confirmButtonText: 'Muy bien',
							allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
							allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
							allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
						})
					} 
					else if(cuota > total)
					{
						swalWithBootstrapButtons.fire(
						{
							html: "<h4 class='text-info'>No tienes suficiente $</h4>",
							icon: 'error', //warning, success, info, question, error
							footer: '<h6 class="text-info">No tienes $</h6>',
							width: '35%', //Utilizar siempre porcentajes sino se perdera el responsive de la ventana modal
							background: '#000',
							confirmButtonText: 'Muy bien',
							allowOutsideClick: false, //Si es true si el usuario le da click afuera se cierra el modal window Si es false si el usuario le da click afuera no se cierra el modal window
							allowEscapeKey: false, //Si es false si el usuario pula ESC no se cerrara la modal window
							allowEnterKey: false, //Si es false si el usuario pulsa ENTER no se cerrara la modal window
						})
					}
				}
			})
		}
	})
})

const pdf = document.getElementById('pdf');
pdf.addEventListener('click', () =>
{
	let lineas = 10;
	let doc = new jsPDF();
	lineas += 10;
	doc.text(100,lineas, "Historial.");
	lineas += 10;
	doc.text(20,lineas, "Depositos.");
	for(let i = 0; i < depositos.length; i++)
	{
		lineas += 10;
		doc.text(20,lineas, (i + 1) + ". Deposito: " + depositos[i] + "$");
	}
	lineas += 10;
	doc.text(20,lineas, "Retiros.");
	for(let i = 0; i < retiros.length; i++)
	{
		lineas += 10;
		doc.text(20,lineas, (i + 1) + ". Retiro: " + retiros[i] + "$");
	}
	lineas += 10;
	doc.text(20,lineas, "Pagos de energia electrica.");
	for(let i = 0; i < pagosElectricidad.length; i++)
	{
		lineas += 10;
		doc.text(20,lineas, (i + 1) + ". Pago de energia electrica: " + pagosElectricidad[i] + "$");
	}
	lineas += 10;
	doc.text(20,lineas, "Pagos de internet y telefonia.");
	for(let i = 0; i < pagosIT.length; i++)
	{
		lineas += 10;
		doc.text(20,lineas, (i + 1) + ". Pago de internet y telefonia: " + pagosIT[i] + "$");
	}
	lineas += 10;
	doc.text(20,lineas, "Pagos de agua potable.");
	for(let i = 0; i < pagosAgua.length; i++)
	{
		lineas += 10;
		doc.text(20,lineas, (i + 1) + ". Pago de agua potable: " + pagosAgua[i] + "$");
	}
	doc.save("Historial.pdf");
})

let ctx = document.getElementById("myChart").getContext("2d");
let myChart = new Chart(ctx, 
	{
		type: "bar",
		data: 
		{
			labels: ['col1', 'col2', 'col3'],
			datasets: [
			{
				label: "Num datos",
				data: [10,9,15]
			}]
		}
	});
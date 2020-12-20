
const MComponentes = require('./MComponentes');

/**
* @author Felipe Tun Cauich <ftun@palaceresorts.com>
* Clases que contienen funcionalidades genericas de la aplicacion
*/
class Util {

	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para validar los codigos de estado http de una solicitud con un respuesta valida
	* @param integer
	* @return boolean
	*/
	static getCodesSuccessOK(code) {
		var codesOk = [200, 201, 202, 203, 204, 205, 206, 207, 208];
		return codesOk.indexOf(code) >= 0;
	}

	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para obtener la fecha actual o convertir una fecha a formato ISO
	* @param string
	* @param bool
	* @return String.
	*/
	static getCurrentDate(current, useTime=false) {
		var hoy = current !== undefined ? new Date(current) : new Date();
		var dd = hoy.getDate();
		var mm = hoy.getMonth() + 1; //hoy es 0!
		var yyyy = hoy.getFullYear();

		dd = (dd < 10 ? ('0' + dd) : dd);
		mm = (mm < 10 ? ('0' + mm) : mm);

		let date =  yyyy + '-' + mm + '-' + dd;

		if(useTime) {
			let hour = hoy.getHours();
			let minute = hoy.getMinutes();
			let second = hoy.getSeconds();
			hour = (hour.length == 1 ? ('0' + hour) : hour);
			minute = (minute.length == 1 ? ('0' + minute) : minute);
			second = (second.length == 1 ? ('0' + second) : second);
			date += ' '+ hour + ':' + minute + ':' + second;
		}

		return date;
	}

	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para obtener las fecha en formato ISO de un rango especificado
	* @param string. Date ISO
	* @param string. Date ISO
	* @return array. Dates ISO
	*/
	static getDataRange(dateBegin, dateEnd) {
		var dateRange = [];
		var startDate = new Date(dateBegin);
		var endDate    = new Date(dateEnd);

		while(endDate.getTime() >= startDate.getTime()) {
			startDate.setDate(startDate.getDate() + 1);
			dateRange.push(Util.getCurrentDate(startDate));
		}

		return dateRange;
	}


	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para obtener el contenido de un archivo binario de una interfaz, y convertirlo a un archivo PDF (default)
	* @param string. url del servicion a consumir
	* @param string. Tipo de archivo a renderizar
	* @return mixed
	*/
	static getContentBucket(url, type) {
		var resonseType = type || 'application/pdf';
		return Util.ajaxRequest({
	        typeRequest : 'GET',
	        urlResquest : url,
	        responseType : 'blob',
	        responseSuccess : function (response) {
	                var blob = new Blob([response.response], {type: resonseType});
	                var fileURL = URL.createObjectURL(blob);
	                window.open(fileURL);
	        },
	        responseError : function (xhr) {
			    return Util.getMsnDialog('danger', 'File Not Available: ' + xhr.statusText);
	        },
	    });
	}

	/**
    * @author Felipe Tun <ftun@palaceresorts.com>
    * Funcion para obtener los valores de los elementos de un formulario
    * @param Object form. instancia del formualrio a enviar | !importante: el formulario debe contener el dataset 'data-method-api' definido
	* en caso contraio devolvera los atributos de usuario_creacion y usuario_ultima_modificacion con el username del usuario en sesion
    * @param Boolean string. para retornar un STRING || JSON (default STRING)
    * @return STRING || JSON
    */
	static getDataElementsForm(form, string) {
		if (form.nodeName != 'FORM') {
			return false;
		}

		var elements, element, value, json = {};
		elements = form.elements;
		for (var i = 0; i < elements.length; i++) {
			element = elements[i];
			if (element.name) {
				if (element.nodeName == 'INPUT' && element.type == 'radio') {
					var options = document.getElementsByName(element.name);
					for (var j = 0; j < options.length; j++) {
						if (options[j].checked) {
							value = options[j].value;
						}
					}
				} else if (element.nodeName == 'INPUT' && element.type == 'checkbox') {
					value = element.checked ? 1 : 0;
				}else if(element.nodeName == 'SELECT' && element.multiple){
					json['attributeMultiple'] = element.name;
					value = Util.getDataAttributeMultiple(element.id);;
				} else {
					value = element.value;
				}

				json[element.name] = value;
			}
		}

		if (form.getAttribute('data-method-api')) {
			form.getAttribute('data-method-api').toUpperCase() == 'PUT' ?
			json.usuario_ultima_modificacion = localStorage.getItem('username') :
			json.usuario_creacion =  localStorage.getItem('username');
		} else {
			json.usuario_ultima_modificacion = localStorage.getItem('username');
			json.usuario_creacion =  localStorage.getItem('username');
		}

		return string === undefined || string ? JSON.stringify(json) : json;
	}

	/**
    * @author Miguel Chan <michan@palaceresorts.com>
    * Funcion para obtener los valores de los elementos multiples de un formulario
    * @param Object form. instancia del formualrio a enviar | !importante: el formulario debe contener el dataset 'data-method-api' definido
    * @param Boolean string. para retornar un STRING || JSON (default JSON)
    * @return STRING || JSON
    */
	static getDataAttributeMultiple(idAttributeMultiple) {

		var select = document.querySelector(`select#${idAttributeMultiple}`),
			options = select.selectedOptions,
			optionsSelect = []
		;
		for (var i = 0; i < options.length; i++) {
			if (options[i].value.trim() != "") {
				optionsSelect.push(options[i].value);
			}
		}

		return optionsSelect;
	}

	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para llenar el formulario
	* @param obj data. informacion
	* @param String idform. Formululario que va a llenar.
	*/
	static setDataForm(data, idForm) {
		var form = typeof idForm === 'string' ? document.getElementById(idForm) : idForm;
		if (form.nodeName != 'FORM') {
			return false;
		}

		for (var attr in data) {
			if (data.hasOwnProperty(attr)) {
				var obj = form.querySelector(`[name="${attr}"]`);
				if (obj) {
					if (obj.type == 'checkbox') {
						obj.checked = data[attr] != 0;
					} else {
						obj.value = data[attr];
					}

					obj.classList.add('valid');
					if (obj.nextSibling) {
						obj.nextSibling.classList.add('active');
					}
				}
			}
		}

		return data;
	}

	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para obtener el html para una alerta con las clases de boostrap
	* @param string. tipo de dialog ['success', 'info', 'warning', 'danger']
	* @param string. texto en el mensaje a mostrar. puede contener codigo html
	* @return mixed.
	*/
	static getMsnDialog(type, msnText) {
		var classToast = ['info', 'success', 'warning', 'danger'];
		if (classToast.includes(type) && typeof type === 'string') {
			var typeMsn = type.charAt(0).toUpperCase() + type.slice(1);
			return MComponentes.toast(`<h6><b>${typeMsn}!</b> ${msnText}</h6>`, { classes : type });
		}

		return false;
	}

	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para obtener los errores del modelo de las peticiones POST y PUT, omitiendo los atributos por default de los modelos
	* @param string. response.message
	* @return string
	*/
	static getModelErrorMessages(errors) {
        if (typeof errors === 'object') {
            let notAttr = ['fecha_creacion', 'usuario_creacion', 'fecha_ultima_modificacion', 'usuario_ultima_modificacion'];
            let html = '<ul class="collection with-header">';
            html += '<li class="collection-header"><h5>The Following Errors Were Obtained</h5></li>';
            errors.map(attr => {
                if (!notAttr.includes(attr.field)) html += '<li class="collection-item">' + Util.getCleanAttributeName(attr.field) + ': ' + attr.message + '</li>';
            });
            html += '</ul>';
            return html;
        }

		return errors;
	}


	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para tratar los nombres de los atributos de la BD del api REST, para no mostrar los nombre de atributo llaves.
	* y remplaza los guiones bajos por espacios en blancon. En caso que el atributo lo requiera.
	* @param string.
	* @return string
	*/
	static getCleanAttributeName(attribute) {
	    var io = attribute.indexOf('_') + 1;
	    var attr = (attribute.split('_')[0].indexOf('id') > -1 ? attribute.substr(io) : attribute);
	    return attr.replace('_', ' ');
	}

	/**
	* Funcion para generar un GUID de forma aleatoria
	* @return string
	*/
	static uniqueID() {
		return '_' + Math.random().toString(36).substr(2, 9);
	}

	/**
	* Funcion para mostrar los mensajes de errores de las peticiones HTTPRequest de escritura
	* @param object
	* @return mixed
	*/
	static setResponseError(xhr) {
		var errorText = JSON.parse(xhr.responseText),
			msnModel = Util.getModelErrorMessages(xhr.response)
		;

		return msnModel ? Util.getMsnDialog('danger', msnModel) : Util.getMsnDialog('danger', 'Error: ' + xhr.statusText + ' ' + errorText.message);
	}

	/*
	* @author Miguel Chan <michan@palaceresorts.com>
    * Funcion para obtener los valores de los elementos de un formulario
    * @param Object form. instancia del formualrio a enviar
	* @param String method. Methodo del formulario
    * @param Boolean showMsgError. para mostrar los mensajes de error
    * @return JSON if validate is TRUE return data and error { data: json, error: errors} else only return data
    */
	static getValidateDataForm(form, method, showMsgError) {
		var element,
		    value,
		    json = {},
		    elements = form.elements,
		    errors = [],
			msnError = '<ul class="collection">',
		    min = 0,
		    max = -1,
		    isNum = false,
		    hasError = false;

		for (var i = 0; i < elements.length; i++) {

			element = elements[i], min = 0, max = -1, isNum = false;
			if (element.name) {
				var getValidate = element.hasAttribute("required");
				var idInput = element.hasAttribute("id") ? element.id : element.name,
				    label = document.querySelector(`label[for='${idInput}']`),
				    txtLabel = label ? label.innerText : element.name;
				if (element.nodeName == 'INPUT' && element.type == 'radio') {
					var options = document.getElementsByName(element.name);
					for (var j = 0; j < options.length; j++) {
						if (options[j].checked) {
							value = options[j].value;
						}
					}
				} else if (element.nodeName == 'INPUT' && element.type == 'checkbox') {
					value = element.checked ? 1 : 0;
				} else if (element.nodeName == 'SELECT' && element.multiple) {
					json['attributeMultiple'] = element.name;
					value = Util.getDataAttributeMultiple(element.id);
				} else if (element.nodeName == 'INPUT' && element.type == 'number') {
					value = element.value;
					min = element.hasAttribute("min") ? element.min : 0;
					max = element.hasAttribute("max") ? element.max : -1;
					isNum = true;
				} else if (element.nodeName == 'INPUT' && (element.type == 'text' || element.type == 'password')) {
					value = element.value;
					min = element.hasAttribute("minlength") ? element.minLength : 0;
					max = element.hasAttribute("maxlength") ? element.maxLength : -1;
				} else {
					value = element.value;
				}
				var error = Util.ValidateValueInput(txtLabel, value, min, max, isNum);
				if (getValidate && error) {
					errors.push(error);
					hasError = true;
					msnError += `<li class="collection-item"><b>${error.field}</b> ${error.message}</li>`;
				}
				json[element.name] = value;
				value = "";
			}
		}
		method = method || form.method;
		method == 'POST' ? json.usuario_creacion = localStorage.username : json.usuario_ultima_modificacion = localStorage.username;

		if (hasError && !(showMsgError == false)) {
			msnError += ' </ul>';
			Util.getMsnDialog('warning', msnError);
		}

		return { data: json, error: hasError, message: errors };
	}

	/**
    * @author Miguel Chan <michan@palaceresorts.com>
    * Funcion para obtener si el valor del input es valido
    * @param Object value. valor a validar
    * @param Object min. valor minimo permitido
	* @param Object max. valor maximo permitido
	* @param Boolean isNum. determina si la validacion es numerica
    * @return mixed
    */
	static ValidateValueInput(name, valueB, vMin, vMax, isNum){
		var min = isNaN(vMin) ? 0 : Number(vMin),
			max = isNaN(vMax) ? -1 : Number(vMax),
			isNum = isNum == undefined ? false : isNum,
			value = (!isNum || isNaN(valueB)) ? valueB : Number(valueB),
			valueLength = isNum ? 0 : value.length;

      	if(value == undefined || value == null || (!isNum && value == "")) {
			return { field: name, message: `is required` };
		} else if((isNum && (value < min)) || (isNum == false && (valueLength < min))){
			return { field: name, message: `the value is less than the required value` };
		} else if((isNum && (max != -1 && value > max)) || (isNum == false && (max != -1 && valueLength > max))){
			return { field: name, message: `the value is greater than the allowed value` };
		}
		return null;
	}

	/**
    * @author Miguel Chan <michan@palaceresorts.com>
    * Se obtiene el array de correos dado un string, retorna los posible emails no validos
    * @param String stringEmails. string de emails
    * @param Boolean showErros. valor para mostrar el mensaje de error
    * @return mixed
    */
	static getEmailsOfString(stringEmails, showErros) {
		showErros = showErros === undefined ? true : showErros
		var emails = stringEmails.replace(/(\n|\s|,|;|:)/mg," ").split(/\b\s+(?!$)/);
		return Util.ValidateListEmail(emails, showErros);
	}

	/**
	* @author Miguel Chan <michan@palaceresorts.com>
	* Funcion para validar una lista de correos, retorna los posibles errores
	* @param Array elements. array de emails
    * @param Boolean showMsg. valor para mostrar el mensaje de error
	* @return
	*/
	static ValidateListEmail(elements,showMsg) {
		var totalElements = elements.length,
			errors = [],
			succes = [],
			showMsg = showMsg === undefined ? true : showMsg
		;
		for (let i = 0; i < totalElements; i++) {
			var value = elements[i].trim();
			if (Util.isValidEmail(value))
				succes.push(value);
			else
				errors.push(value);
		}
		var hasError = !(succes.length == totalElements && totalElements > 0),
			msgError = errors.join(",")
		;
		succes = [...new Set(succes)]
		if(hasError && showMsg) Util.getMsnDialog( 'warning', `You have entered an invalid email address ${msgError != "" ? ": " + msgError : ""}.`)
		return {hasError: hasError, emails: succes, errors:errors};
	}

	/**
	* @author Miguel Chan <michan@palaceresorts.com>
	* Valida dado un string de correo es valido
	* @param value:(String)
	* @return mixed
	*/
	static isValidEmail(value){
		var mailformat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return value.match(mailformat)
	}

	/**
    * @author Miguel Chan <michan@palaceresorts.com>
    * Funcion para parciar un arreglo en grupos
    * @param array:(array)
    * @param size:(int)
    * @return mixed
    */
	static chunkArray(array, size){
		var tempArray = [];
		for (let index = 0; index < array.length; index += size) {
			tempArray.push(array.slice(index, index+size));
		}
		return tempArray;
	}

	/**
	* @author Felipe Tun <ftun@palaceresorts.com>
	* Funcion para obtener el valor de un parametro de la url en base a su nombre, si no se encuentra el nombre retorna null
	* location.search se asume que es la url donde se localiza el momento de invokar el metodo
	* @param string. Nombre del parametro
	* @return mixed
	* Ejemplo de uso:
	* 		query string: ?foo=lorem&bar=&baz
	* 		var foo = Util.getUrlParameterByName('foo'); // "lorem"
	*/
	static getUrlParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	/**
	 * funcion que realiza el formato del array para obtener el menu
	 * @param {*} arrayItems array dataProvider del ApiRest
	 */
	static getFormatItems(items) {
		var response = {
			arrayItems: {},
			nameModule: '',
			iconModule: ''
		};
		if (Array.isArray(items) && items.length > 0) {
			items.map((value, index) => {
				var menu = value;
				if (menu.id_padre == 0) {
					response.nameModule =  menu.label;
					response.iconModule = menu.html_icon;
				} else if (menu.id_padre > 0) {
					if (menu.has_childs > 0) {
						response.arrayItems[menu.id_nodo] = {
							title: menu.label,
							icon: menu.html_icon,
							linkTo: menu.url,
							subMenu: []
						};
					} else {
						response.arrayItems[menu.id_padre].subMenu.push({
							title: menu.label,
							icon: menu.html_icon,
							linkTo: menu.url
						});
					}
				}
			});
		}

		return response;
	}

}

module.exports = Util;

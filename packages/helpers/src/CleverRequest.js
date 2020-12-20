/**
* @author Felipe Tun <ftun@palaceresorts.com> 05 octubre 2018
* Funciones para peticiones HTTPRequest.
* Implementacion:
*       import { CleverRequest } from 'clever-component-library';
*/

/**
* @property. Configuraciones del endpoints
*/
const CleverConfig = require('./CleverConfig');
const MComponentes = require('./MComponentes');
const Util = require('./Util');
const Request = require('./Request').axiosRequest;

/**
* @property. Modulo como objeto para exportar
*/
const CleverRequest = {};

/**
* Funcion para realizar una peticion por el metodo GET HTTP
* @param string. Url de la peticion
* @param function. {response, error}
* @param boolean. Async (default: true)
* @return mixed.
* Ejemplo:
*       CleverRequest.get(CleverConfig.getApiUrl('contract') + '/idioma/translate/12/1', (response, error) => {
*           if (error) {
*               console.error(response);
*           }
*           console.log(response);
*       });
*/
CleverRequest.get = (url, functionResponse, ResponseAsync) => {
    return CleverRequest.CoreRequest({
        method : 'GET',
        url : url,
        success : functionResponse,
        async : ResponseAsync
    });
};

/**
* Funcion para realizar una peticion por el metodo POST HTTP
* @param string.
* @param object.
* @param function.
* @param boolean.
* Ejemplo:
*   let data = {"idcontr_categoria_contrato":"0","comentario":"TEST EXAMPLE","idcontr_tipo_template":"6","idclv_idioma":"1","publicado":0,"addendum":0,"idcontr_template_parent":"9","estado":1,"usuario_creacion":"ftun"};
*   CleverRequest.post(CleverConfig.getApiUrl('contract') + '/template/post', data, (response, error) => {
*       if (error) {
*              console.error(response);
*          }
*       console.log(response);
*   });
*/
CleverRequest.post = (url, dataSend, functionResponse, ResponseAsync) => {
    return CleverRequest.write('POST', url, dataSend, functionResponse, ResponseAsync);
};

/**
* Funcion para realizar una peticion por el metodo POST HTTP configurando la cabezera Content-type = 'json'
* @param string.
* @param object.
* @param function.
* @param boolean.
*/
CleverRequest.postJSON = (url, dataSend, functionResponse, ResponseAsync) => {
    return CleverRequest.write('POST', url, dataSend, functionResponse, ResponseAsync, 'application/json');
};

/**
* Funcion para realizar una peticion por el metodo PUT HTTP
* @param string.
* @param object.
* @param function.
* @param boolean.
* Ejemplo:
*   let data = {"idcontr_categoria_contrato":"0","comentario":"TEST EXAMPLE","idcontr_tipo_template":"6","idclv_idioma":"1","publicado":0,"addendum":0,"idcontr_template_parent":"9","estado":1,"usuario_creacion":"ftun"};
*   CleverRequest.put(CleverConfig.getApiUrl('contract') + '/template/put/96', data, (response, error) => {
*       if (error) {
*              console.error(response);
*          }
*       console.log(response);
*   });
*/
CleverRequest.put = (url, dataSend, functionResponse, ResponseAsync) => {
    return CleverRequest.write('PUT', url, dataSend, functionResponse, ResponseAsync);
};

/**
* Funcion para realizar una peticion por el metodo PUT HTTP configurando la cabezera Content-type = 'json'
* @param string.
* @param object.
* @param function.
* @param boolean.
*/
CleverRequest.putJSON = (url, dataSend, functionResponse, ResponseAsync) => {
    return CleverRequest.write('PUT', url, dataSend, functionResponse, ResponseAsync, 'application/json');
};

/**
* Funcion para ejecutar metodos de escritura
* @param string.
* @param string.
* @param object.
* @param function.
* @param boolean.
* @param string.
* @return mixed.
*/
CleverRequest.write = (method, url, dataSend, functionResponse, ResponseAsync, requestType) => {
    return CleverRequest.CoreRequest({
        method : method,
        url : url,
        dataSend : JSON.stringify(dataSend),
        success : functionResponse,
        async : ResponseAsync,
        requestType : requestType || null
    });
};

/**
* Funcion para ejecutar una peticion, en base a una instancia del objeto XMLHttpRequest
* Si la propiedad 'async' es configurada como false, se omite la configuracion de la opcion 'responseType' en el objeto XMLHttpRequest
* Sin embargo se toma en cuenta para codificar o no la respuesta en json
*   referencia: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
* @param object {
*       responseType: (string) Permite cambiar el tipo de respuesta ('arraybuffer', 'blob', 'document', 'json', 'text', ''), default 'json'
*       method: (string) Tipo de peticion GET/POST/HEAD/PUT/DELETE/CONNECT/OPTIONS/TRACE
*       url: (string) Url de la peticion
*       async: (boolean) Para definir si la peticion es asincrona o no, default (true)
*       authType: (string) Tipo de autenticacion de logeo (Bearer, Basic. etc.), default (Bearer)
*       success: (function) Callback para tratar el response de la peticion
*       dataSend: (string) json e formato text para envio de parametros, default null
*       requestType: (string) Permite definir el tipo de datos en el requesy
*   }
* @return mixed.
*/
CleverRequest.CoreRequest = (config) => {
    try {
        const xmlhttp = new XMLHttpRequest();
        config.async = config.async == undefined ? true : config.async;
        config.responseType = config.responseType == undefined ? 'json' : config.responseType;
        if (config.async) {
            xmlhttp.responseType = config.responseType;
        }
        xmlhttp.open(config.method, config.url, config.async);
        if (config.requestType) {
            xmlhttp.setRequestHeader("Content-type", config.requestType);
        }
        xmlhttp.setRequestHeader('Authorization', (config.authType || 'Bearer ' + localStorage.jwttoken));
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                var responseCurrent = config.responseType == 'json' && typeof this.response == 'string' ? JSON.parse(this.response) : this.response;

                if (responseCurrent) {
                    if (responseCurrent.hasOwnProperty('message') && responseCurrent.message == "Expired token") {
                        return CleverRequest.sessionExpired();
                    }

                    if ((responseCurrent.hasOwnProperty('status') && responseCurrent.status == "Forbidden" && responseCurrent.code == 403) || (responseCurrent.error && responseCurrent.code == 403)) {
                        MComponentes.toast(`<div class="valign-wrapper red-text darken-3"><h6><b>Danger!</b><b>${responseCurrent.message}</b></h6></div>`);
                    }
                }

                return config.success(responseCurrent, !CleverRequest.getCodesSuccessOK(this.status), this.status);
            }
        };
        xmlhttp.send(config.dataSend || null);
    } catch (e) {
        MComponentes.toast('CleverRequest => ', e.message);
    }
};

/**
* Funcion para validar si el token de la peticion a expirado, para realizar el logout el sistema, limpiando los localStorage
* @return mixed
*/
CleverRequest.sessionExpired = () => {
    MComponentes.toast('Expired token');
    return CleverRequest.post(CleverConfig.getApiUrl('auth') + '/logout', { username : localStorage.username}, (response, error) => {
        var msn = response.hasOwnProperty('message') ? response.message : response;
        MComponentes.toast(msn);
        localStorage.clear();
        return window.setTimeout(function () {
    		window.location = CleverConfig.getFeUrl('core') + '?session=false';
        }, 1000);
    });
};

/**
 * @author Carlos Acebedo <cacebedo@palaceresorts.com>
 * @function cleverLog
 * @description Funcion para crear un log
 * @param type Tipo de mensaje que se se guradara [info, warning, danger] (string)
 * @param system Sistema que de donde se esta guardando [contract, core, etc..] (string)
 * @param message Información que se quiere almacenar (json)
 * @example
 * import CleverRequest from 'clever-component-library';
 *
 * CleverRequest.cleverLog('info', 'contract', {
 *   code: 404,
 *   error: true,
 *   message: 'No se encontraron datos de...'
 * });
**/
CleverRequest.cleverLog = (type, system, message) => {
    const types = ['info', 'warning', 'danger'];
    if(!types.includes(type)) return Util.getMsnDialog('warning', 'The log was not created. Type not valid. Choose one of these [info, warning, danger]');

    const data = {
        tipo: type,
        modulo: system.toLowerCase(),
        mensaje: message,
        usuario_creacion: localStorage.username
    };
    Request({url: '/api/createLog', method: 'post', data}).then(() => {});
};

/**
* Funcion para validar los codigos de estado http de una solicitud con un respuesta valida
* @param integer
* @return boolean
*/
CleverRequest.getCodesSuccessOK = (code) => {
    return [200, 201, 202, 203, 204, 205, 206, 207, 208].indexOf(code) >= 0;
};

/**
* Funcion para obtener el contenido de un archivo desde un API
* @param object {url : "", method : "GET", data : null, callback : (blob, fileURL) => {}}
* @return mixed
*/
CleverRequest.contentFile = (params) => {
    let [vartype, extension, nameFile] = CleverRequest.getValidExt(params.url || '');
    return CleverRequest.CoreRequest({
        method: params.method || 'GET',
        url: params.url,
        responseType: 'blob',
        requestType:'application/json',
        dataSend:JSON.stringify(params.data || ''),
        success: (response, error, code) => {
            if (error) {
                if (typeof params.onError == 'function') params.onError(response, error, code);
                return Util.getMsnDialog('danger', (code == 403 ? 'Forbidden PDF Preview' : 'File Not Avaliable'));
            }
            let blob = new Blob([response], { type: vartype }),
                fileURL = URL.createObjectURL(blob)
            ;
            if (typeof params.callback == 'function') return params.callback(blob, fileURL);
            if (extension !== "pdf") {
                let a = document.createElement('a');
                a.href = fileURL;
                a.download = nameFile;
                return a.click();
            }

            return window.open(fileURL);
        },
    });
};

/**
* Funcio para obtener en base a una url, el tipo de archivo, su extencion y el nombre del mismo, por default se considera como pdf
* @param string
* @return array
* example output
*   /api/reportContract/viewPdf (3) ["application/pdf", "pdf", "viewPdf"]
*   /api/getListFiles/bucketfiles/7578709.pdf (3) ["application/pdf", "pdf", "7578709.pdf"]
*   /api/getListFiles/bucketfiles/ContractsTemplate.xlsx (3) ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx", "ContractsTemplate.xlsx"]
*   /api/getListFiles/bucketfiles/Medidas COVID19 Merida.docx (3) ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx", "Medidas COVID19 Merida.docx"]
*   /api/contract/pdf/5368/7596/1 (3) ["application/pdf", "pdf", "1"]
*/
CleverRequest.getValidExt = (filename) => {
    let extFile = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2),
        nameFile = filename.slice((filename.lastIndexOf("/") - 1 >>> 0) + 2)
    ;

    let ext = {
        odt : 'application/vnd.oasis.opendocument.text',
        doc : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        docx : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xls : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        xlsx : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ods : 'application/vnd.oasis.opendocument.spreadsheet',
        pdf : 'application/pdf',
    };

    return [ext.hasOwnProperty(extFile) ? ext[extFile] : 'application/pdf', extFile || 'pdf', nameFile];
};

module.exports = CleverRequest;

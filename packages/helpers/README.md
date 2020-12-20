# Clever Helpers

# Componente Util

```javascript
const {Util} = require('@ftun/helpers');

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para validar los codigos de estado http de una solicitud con un respuesta valida
* @param integer
* @return boolean
*/
Util.getCodesSuccessOK(code);

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para obtener la fecha actual o convertir una fecha a formato ISO
* @param string
* @param bool
* @return String.
*/
Util.getCurrentDate(current, useTime=false);

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para obtener las fecha en formato ISO de un rango especificado
* @param string. Date ISO
* @param string. Date ISO
* @return array. Dates ISO
*/
Util.getDataRange(dateBegin, dateEnd);

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para obtener el contenido de un archivo binario de una interfaz, y convertirlo a un archivo PDF (default)
* @param string. url del servicion a consumir
* @param string. Tipo de archivo a renderizar
* @return mixed
*/
Util.getContentBucket(url, type);

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para obtener los valores de los elementos de un formulario
* @param Object form. instancia del formualrio a enviar | !importante: el formulario debe contener el dataset 'data-method-api' definido
* en caso contraio devolvera los atributos de usuario_creacion y usuario_ultima_modificacion con el username del usuario en sesion
* @param Boolean string. para retornar un STRING || JSON (default STRING)
* @return STRING || JSON
*/
Util.getDataElementsForm(form, string);

/**
* @author Miguel Chan <michan@palaceresorts.com>
* Funcion para obtener los valores de los elementos multiples de un formulario
* @param Object form. instancia del formualrio a enviar | !importante: el formulario debe contener el dataset 'data-method-api' definido
* @param Boolean string. para retornar un STRING || JSON (default JSON)
* @return STRING || JSON
*/
Util.getDataAttributeMultiple(idAttributeMultiple);

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para llenar el formulario
* @param obj data. informacion
* @param String idform. Formululario que va a llenar.
*/
Util.setDataForm(data, idForm);

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para obtener el html para una alerta con las clases de boostrap
* @param string. tipo de dialog ['success', 'info', 'warning', 'danger']
* @param string. texto en el mensaje a mostrar. puede contener codigo html
* @return mixed.
*/
Util.getMsnDialog(type, msnText);

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para obtener los errores del modelo de las peticiones POST y PUT, omitiendo los atributos por default de los modelos
* @param string. xhr.response
* @return string
*/
Util.getModelErrorMessages(response);

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Funcion para tratar los nombres de los atributos de la BD del api REST, para no mostrar los nombre de atributo llaves.
* y remplaza los guiones bajos por espacios en blancon. En caso que el atributo lo requiera.
* @param string.
* @return string
*/
Util.getCleanAttributeName(attribute);

/**
* Funcion para generar un GUID de forma aleatoria
* @return string
*/
Util.uniqueID();

/**
* Funcion para mostrar los mensajes de errores de las peticiones HTTPRequest de escritura
* @param object
* @return mixed
* @deprecated. NO IMPLEMENTAR
*/
Util.setResponseError(xhr);

/**
* @author Miguel Chan <michan@palaceresorts.com>
* Funcion para obtener los valores de los elementos de un formulario
* @param Object form. instancia del formualrio a enviar
* @param String method. Methodo del formulario
* @param Boolean showMsgError. para mostrar los mensajes de error
* @return JSON if validate is TRUE return data and error { data: json, error: errors} else only return data
*/
Util.getValidateDataForm(form, method, showMsgError);

/**
* @author Miguel Chan <michan@palaceresorts.com>
* Funcion para obtener si el valor del input es valido
* @param Object value. valor a validar
* @param Object min. valor minimo permitido
* @param Object max. valor maximo permitido
* @param Boolean isNum. determina si la validacion es numerica
* @return mixed
*/
Util.ValidateValueInput(name, value, min, max, isNum);

/**
* @author Miguel Chan <michan@palaceresorts.com>
* Se obtiene el array de correos dado un string, retorna los posible emails no validos
* @param String stringEmails. string de emails
* @param Boolean showErros. valor para mostrar el mensaje de error
* @return mixed
*/
Util.getEmailsOfString(stringEmails, showErros);

/**
* @author Miguel Chan <michan@palaceresorts.com>
* Funcion para validar una lista de correos, retorna los posibles errores
* @param Array elements. array de emails
* @param Boolean showMsg. valor para mostrar el mensaje de error
* @return
*/
Util.ValidateListEmail(elements,showMsg);

/**
* @author Miguel Chan <michan@palaceresorts.com>
* Valida dado un string de correo es valido
* @param value:(String)
* @return mixed
*/
Util.isValidEmail(value);

/**
* @author Miguel Chan <michan@palaceresorts.com>
* Funcion para parciar un arreglo en grupos
* @param array:(array)
* @param size:(int)
* @return mixed
*/
Util.chunkArray(array, size);

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
Util.getUrlParameterByName(name);

/**
 * funcion que realiza el formato del array para obtener el menu
 * @param array array dataProvider del ApiRest
 */
Util.getFormatItems(items);

```

# Componente MComponentes

```javascript
const {MComponentes} = require('@ftun/helpers');

/**
* Se obtienen los elementos DOM especificados en el query 'selector css'
* @param string
* @return object <element>
*/
MComponentes.getSelectElements(query);

/**
* Se obtiene la instancias de los componentes de acorde a la clase que tenga asignado
* @param string
* @return object <element> || boolean
*/
MComponentes.getInstance(elem);

/**
* Funcion para re-inicializar los <label> de los <input> agregados dinamicamente.
* @return mixed
*/
MComponentes.updateTextFields();

/**
* Para todos los metodos siguinetes
* @param string
* @param object
* @return object <element> || boolean
*/
MComponentes.carousel(elems, options);
MComponentes.Collapsible(elems, options);
MComponentes.Dropdown(elems, options);
MComponentes.TapTarget(elems, options);
MComponentes.Materialbox(elems, options);
MComponentes.Slider(elems, options);
MComponentes.Modal(elems, options);
MComponentes.Parallax(elems, options);
MComponentes.Pushpin(elems, options);
MComponentes.ScrollSpy(elems, options);
MComponentes.Sidenav(elems, options);
MComponentes.Tabs(elems, options);
MComponentes.Tooltip(elems, options);
MComponentes.toast(htmlMsn, options);
MComponentes.Select(elems, options);
MComponentes.DatePicker(elems, options);
MComponentes.Chip(elems, options);
MComponentes.FloatingActionButton(elems, options);

```

# Componente CleverConfig

```javascript

const {CleverConfig} = require('@ftun/helpers');

/**
* Funcion para obtener la url base del Api de un modulo de Clever
* @param string.
* @return string.
*/
CleverConfig.getApiUrl(module);

/**
* Funcion para obtener la url base del frontend de la aplicacion de un modulo de Clever
* @param string.
* @return string.
*/
CleverConfig.getFeUrl(module);

```

# Componente CleverRequest

```javascript

const {CleverRequest} = require('@ftun/helpers');

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
CleverRequest.get(url, functionResponse, ResponseAsync);

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
CleverRequest.post(url, dataSend, functionResponse, ResponseAsync);

/**
* Funcion para realizar una peticion por el metodo POST HTTP configurando la cabezera Content-type = 'json'
* @param string.
* @param object.
* @param function.
* @param boolean.
*/
CleverRequest.postJSON(url, dataSend, functionResponse, ResponseAsync);

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
CleverRequest.put(url, dataSend, functionResponse, ResponseAsync);

/**
* Funcion para realizar una peticion por el metodo PUT HTTP configurando la cabezera Content-type = 'json'
* @param string.
* @param object.
* @param function.
* @param boolean.
*/
CleverRequest.putJSON(url, dataSend, functionResponse, ResponseAsync);

/**
* Funcion para obtener el contenido de un archivo desde un API
* @param object {url : "", method : "GET", data : null, callback : (blob, fileURL) => {}}
* @return mixed
*/
CleverRequest.contentFile({url : "/api/endpoint", method : "GET", data : null, callback : (blob, fileURL) => {}});

/**
* Funcio para obtener en base a una url, el tipo de archivo, su extencion y el nombre del mismo, por default se considera como pdf
* @param string
* @return array
* example output
*   /api/viewPdf => ["application/pdf", "pdf", "viewPdf"]
*   /api/7578709.pdf => ["application/pdf", "pdf", "7578709.pdf"]
*   /api/ContractsTemplate.xlsx => ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx", "ContractsTemplate.xlsx"]
*   /api/Medidas COVID19 Merida.docx => ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx", "Medidas COVID19 Merida.docx"]
*   /api/contract/pdf/5368/7596/1 => ["application/pdf", "pdf", "1"]
*/
CleverRequest.getValidExt(urlFile);
```

# Component: Request

## Description.
This method allows you to do an http request with axios library.

## Use.
### Promise
```javascript
const {Request} = require('@ftun/helpers');

Request.axiosRequest({
    method: 'get',
    url: '${CleverConfig.getApiUrl('frm')}/notifications/getnotificationsbyuser',
    auth: req.headers.authorization,
    data: dataSend
}).then(response => {
    // Here you can work with the response
});
```

### With async await
```javascript
const {Request} = require('@ftun/helpers');

const funcAsync = async () => {
    const response = await Request.axiosRequest({
        method: 'get',
        url: '${CleverConfig.getApiUrl('frm')}/notifications/getnotificationsbyuser',
        auth: req.headers.authorization,
        data: dataSend
    });
};
```

### Working on FrontEnd side
If you work with this method on Frontend side, you don't need to pass "auth" because the method get it automatically.

# Component: MakeRequest

Componentes para el uso **solo de lado del servidor de express** para peticiones http. En base al componente Request

- **MakeRequest(object, object, string, object)**
    - object express request
    - object express response
    - string endpoint API
    - object configuraciones default <code>{responseType: 'json', promise: false, toString: false, method: null}</code>

### Uso.

**/Controller.js**

```javascript

const {MakeRequest, CleverConfig} = require('@ftun/helpers');
const URL_CORE = CleverConfig.getApiUrl('core');

// Ejemplo simple para retornar respuesta al FE
exports.getCountryByCode = (req, res) => {
    return MakeRequest(req, res, `${URL_CORE}/pais/codigo/${req.params.code}`);
};

// Ejemplo promesa, para mejor control y tratamiento de datos antes de retornar al FE
exports.getCountryByCode = async (req, res) => {
    const Result = await MakeRequest(req, res, `${URL_CORE}/pais/codigo/${req.params.code}`, {promise: true});
    const code = Result.error ? 500 : 200;

    return res.status(code).json({
        error: Result.error,
        data:Result.data,
    });
};

```
**/Router.js**

```javascript

const catalogsCore = require('./Controller');
router.get('/catalogsCore/countryByCode/:code([a-zA-Z]+)', catalogsCore.getCountryByCode);
module.exports = router;

```

# Component: RequestUpload

Componente para uso solo del lado der server de nodejs, helper para la carga de archivos en el bucket. En base al componente Request

### uso.

**/Controller.js**

```javascript

const { CleverConfig, RequestUpload } = require('@ftun/helpers');

exports.postBucket = (req, res) => {
    return RequestUpload(req, res,`${CleverConfig.getApiUrl('frm')}/bucket/uploadfile`);
};

```
**/Router.js**

```javascript

router.post('/bucket/upload', require('./Controller').postBucket);
```

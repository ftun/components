
# Componente GridView

## Descripción.

Componente React para la generación de <code>HTML Tables</code> en base a dos matrices de configuración de columnas y datos.

## Pre-requesitos.

React: >= 16.12.0

## Instalación:

Via npm
```json
npm i --save @ftun/gridview
```

## Propiedades.

- **columns** : <code>array*</code> Matriz de configuración de las columnas del componente.
- **data** : <code>array*</code> Matriz de datos para desglosar en el cuerpo del componente.
- **serializeRows** : <code>bool</code> Opción para agregar una columna extra para enumerar las filas.
- **checkRows** : <code>bool</code> Opción para agregar una columna extra de checkbox en las filas.
- **defaultCheckRows** : <code>bool | func</code> Valor para iniciarla los controles checkbox de <code>checkRows</code>. **ver ejemplo abajo)**
    - Puedes configurar esta propiedad como una funcion callback: <code>(data, index) => {}</code> para que se ejecute para validar la propiedad <code>defaultChecked</code> de cada fila generada por <code>checkRows</code>. Si se implementa de esta manera, la funcion debe retornar un valor <code>bool</code> valido para la evaluación.

    - ```javascript
        defaultCheckRows={(data, index) => data.sex == 'Female'}
    ```

    - Y el checkHeader de la columna <code>checkRows</code> por default se inicializa en <code>indeterminate = true</code>.

    - ![image](https://user-images.githubusercontent.com/16906853/75715965-55103300-5c9c-11ea-9ac5-23e990df2765.png)

- **enabledHeadCheck** : <code>bool</code> Valor para activar / desactivar el checkbox del header de <code>checkRows</code>.
- **floatHeader** : <code>bool</code> Opcion para los titulos flotantes del componente.
- **classTable** : <code>string</code> CSS para aplicar estilos al componente.
- **afterMountData** : <code>func</code> Funcion callback que se ejecuta cuando se crea / actualiza el componente.
- **onCheck** : <code>func</code> <code>(index, checked, data) => {}</code> Funcion callback que se ejecuta en el evento onChange de cada checkbox de <code>checkRows</code>.
    - <code>onCheck</code> se tiene la siguiente salida, **ver ejemplo abajo)**:

    ![image](https://user-images.githubusercontent.com/16906853/75613356-9d8feb00-5afa-11ea-8ace-e82cfab6293a.png)

    - Donde el valor de <code>index</code> es <code>-1</code> y <code>data</code> es una objeto vacio <code>{}</code> cuando el evento es ejecutado por el checkbox principal (cabecera de columna) de la columna <code>checkRows</code>
- **sort** : <code>bool</code> Valor para activar / desactivar la opcion de ordenamiento en los titulos de las columnas. Esta propiedad aplica solo a las columnas con un <code>attribute</code> definido
- **optionsRows** : <code>func</code> <code>data => {}</code> Configuración para agregar atributos a las filas a través de una función callback, la cual debe retornar un atributo valido de [elementos DOM](https://es.reactjs.org/docs/dom-elements.html) como objecto, **ver ejemplo abajo**
    - ```javascript
        optionsRows={data => data.sex == 'Female' ? { 'className': 'red lighten-5' } : {}}
    ```
- **expandRows** : : <code>func</code> <code>data => {}</code> Funcion callback que se ejecuta por cada fila de los datos, para evaluar la opcion del expand de la misma, la cual debe retornar un valor <code>bool</code>, por default esta retorna un `true`, **ver ejemplo abajo**
    - ```javascript
        expandRows={data => data.city != 'Paris'}
    ```

### columns

- **attribute** : <code>string</code> Nombre del atributo asociado a la matriz de datos.
- **alias** : <code>string</code> Titulo opcional para el encabezado de cada columna.
- **expand** : <code>func</code> <code>data => {}</code> Función que retorna el contenido jsx a renderizar en la columna expandida.
- **icon** : <code>string</code> Opcional para el icono de una columna configirada como <code>expand</code>.
- **value** : <code>string | func</code> <code>(data, index) => {}</code> Contenido para jsx para el contenido de cada fila en la columna configurada.
- **visible** : <code>bool</code> Opcional para ocultar la columna de vista.
- **sort** : <code>bool</code> Opcional para la ordenación de los datos de una columna.
- **visibleExpand** : <code>bool | func</code> <code>data => {}</code> Opcional para validar la visibilidad de `expand` (solo aplica cuando se define el mismo) específicamente de la columna, este atributo **sobre-escribe** la validación del `props.expandRows` que aplica a la misma **ver ejemplo abajo**.

### Consideraciones

- Al implementar la funcionalidad de `prop.checkRows` en conjunto con la funcionalidad `sort`, este segundo al ejecutarse realizar un reset de los checkboxs del grid en base al valor definifo en el `props.defaultCheckRows`. Es decir dependiendo del valor que se asigne a esta propiedad es el valor que toman los **checkbox** al aplicar el sort.

- El `props.defaultCheckRows` puede evaluar el resultado de una `function` en un valor `bool`, para los casos que sea necesario manipular los valores por default de cada **checkbox** en las filas en base a una condición de lógica de negocios (ver ejemplo).

- Al implementar la funcionalidad de `props.expandRows` considerar que esta condición sera evaluada para todas las columnas expand que apliquen en la data. Ya que el componente admite multi columnas expand implementadas en el mismo. Si se requiere definir esta validar por columna, esta deber ser implementada en la configuración de las mismas mediante el atributo `visibleExpand` **ver seccion `columns`**

### Funciones Auxiliares
```javascript
import { auxUpdateState, auxDeleteState } from '@ftun/gridview';

```

- **<code>auxUpdateState(dataState : array, index : integer, rowUpdate : object)</code>** : Funcion auxiliar para actualizar el una posicion del array de datos del grid mediante el index del mismo.

- **<code>auxDeleteState(dataState : array, index : integer)</code>** : Funcion auxiliar para eliminar un row del array de datos del grid mediante el index del mismo.


### Ejemplo Implementacion

```javascript

import React, { Component, Fragment } from 'react';
import GridView, { auxUpdateState, auxDeleteState } from '@ftun/gridview';

const DATA =  [
    { sex: "Female", name: "Sandra", city: "Las Vegas", car: "Audi A4" },
    { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
    { sex: "Male", name: "Mark", city: "Chicago	", car: "Honda Accord" },
    { sex: "Female", name: "Betty", city: "Paris", car: "Honda Civic" },
    { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
    { sex: "Male", name: "Test Mark", city: "Austin", car: "Nissan Altima" },
    { sex: "Male", name: "Mark", city: "Chicago", car: "Toyota Corolla" },
    { sex: "Male",name: "Thomas",city: "Rio de Janeiro",car: "Honda Accord"},
    { sex: "Male", name: "Robert", city: "Las Vegas", car: "Honda Civic" },
    { sex: "Male",name: "Robert",city: "Los Angeles",car: "Honda Accord"},
    { sex: "Male",name: "William",city: "Los Angeles",car: "Honda Civic"},
    { sex: "Male", name: "Mark", city: "Austin", car: "Nissan Altima" },
];

/**
* @example Implementacion componente GridView
* @author Felipe Tun <ftun@palaceresorts.com>
*/
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : DATA,
        };
    }

    /**
    * Configuracion de columnas
    * @return array
    */
    getConfigColumns() {
        return [
            {
                attribute: "name",
                alias: "Name",
                expand : (data) => <h5><b>Name</b> {data.name}</h5>,
                visibleExpand : true,
            },
            {
                attribute: "sex",
                alias: "Sex",
            },
            {
                attribute: "city",
                alias: "City",
                expand : (data) => <h5><b>City</b> {data.city}</h5>,
            },
            {
                attribute: "car",
                alias: "Car",
            },
            {
                alias : 'Info',
                icon : 'info',
                expand : (data) => <h5><b>Name: </b>{data.name} <b>City: </b>{data.city} <b>Sex: </b>{data.sex} <b>Car: </b>{data.car}</h5>,
                visibleExpand : data => data.city != 'Paris',
            },
            {
                alias : <a className="btn btn-icon btn-link" onClick={() => this.addData()}><i className="material-icons blue-text text-darken-3">add</i></a>,
                value : (data, index) => <Fragment>
                        <a className="btn btn-icon btn-link"  onClick={() => this.updateRow(data, index)}><i className="material-icons">update</i></a>
                        {data.city != 'Chicago' && <a className="btn btn-icon btn-link" onClick={() => this.removeRow(data, index)}><i className="material-icons">delete_forever</i></a>}
                    </Fragment>,
            }
        ];
    }

    /**
    * @example addData
    * Agrega datos al Grid
    * @return mixed
    */
    addData() {
        let addData = [
            { sex: "Female", name: "Linda", city: "Austin", car: "Toyota Corolla" },
            { sex: "Male",name: "Robert",city: "Las Vegas",car: "Chevrolet Cruze"},
            { sex: "Female", name: "Lisa", city: "London", car: "BMW 750" },
            { sex: "Male", name: "Mark", city: "Chicago", car: "Toyota Corolla" },
            { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
        ];
        this.setState(state => {
            return {data : state.data.concat(addData)};
        });
    }

    /**
    * @example auxUpdateState
    * Actualizar un row de la data en base al index
    * @param object
    * @param integer
    */
    updateRow(data, index) {
        let rowUpdate = { sex: "Test Update", name: "Name Update", city: "City Update", car: "Car Update" };
        this.setState(state => {
            return {data : auxUpdateState(state.data, index, rowUpdate)};
        });
    }

    /**
    * @example auxDeleteState
    * Eliminar row de la data del grid mendiante el index del registro
    * @param object
    * @param integer
    */
    removeRow(data, index) {
        this.setState(state => {
            return {data : auxDeleteState(state.data, index)};
        });
    }

    render() {
        return <GridView
            columns={this.getConfigColumns()}
            data={this.state.data}
            floatHeader={true}
            checkRows={true}
            onCheck={(index, data, checked) => console.log(index, data, checked)}
            defaultCheckRows={(data, index) => data.sex == 'Female'}
            optionsRows={data => data.city == 'Chicago' ? { 'className': 'danger' } : null}
            expandRows={data => data.sex == 'Male'}
        />;
    }
}

export default App;

```

### Resultado Ejemplo:

![image](https://user-images.githubusercontent.com/16906853/96183083-01d1b480-0efc-11eb-94f9-34ab2e5cfe15.png)

### Detalle de ejempo:

```js
    // default check en 'true'
    defaultCheckRows={(data, index) => data.sex == 'Female'}
```
![image](https://user-images.githubusercontent.com/16906853/96185376-6a6e6080-0eff-11eb-9948-71c101326474.png)

```js
    // Se resalta las filas de grid para ciertos registros
    optionsRows={data => data.city == 'Chicago' ? { 'className': 'danger' } : null}
```
![image](https://user-images.githubusercontent.com/16906853/96185500-9984d200-0eff-11eb-8362-a78886309643.png)

```js
    // Condicion globla para validar la opcion 'expand' para las columnas
    expandRows={data => data.sex == 'Male'}
```
![image](https://user-images.githubusercontent.com/16906853/96185572-b6b9a080-0eff-11eb-985c-9d6dd8f36e1f.png)

```js
    // ...
    // Se sobre escribe la funcionalidad global de la columna 'info' (EJEMPLO)
    <GridView
        {...props}
        expandRows={data => data.sex == 'Male'}
        columns={[
            ...,
            {
                alias : 'Info',
                icon : 'info',
                expand : (data) => <h5><b>Name: </b>{data.name} <b>City: </b>{data.city} <b>Sex: </b>{data.sex} <b>Car: </b>{data.car}</h5>,
                visibleExpand : data => data.city != 'Paris',
            }
        ]}
    />
```
![image](https://user-images.githubusercontent.com/16906853/96185646-d2bd4200-0eff-11eb-9a31-373a059f4d8e.png)

```js
    // ...
    // Se sobre escribe la funcionalidad global de la columna 'name' (EJEMPLO)
    <GridView
        {...props}
        expandRows={data => data.sex == 'Male'}
        columns={[
            ...,
            {
                attribute: "name",
                alias: "Name",
                expand : (data) => <h5><b>Name</b> {data.name}</h5>,
                visibleExpand : true,
            }
        ]}
    />
```
![image](https://user-images.githubusercontent.com/16906853/96185738-f84a4b80-0eff-11eb-846f-0ef495c000bb.png)

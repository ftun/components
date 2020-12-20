# Componente: CompareStrings

## Descripcion.

Componente para obtener las diferencias entre dos textos.

## Instalación:

Via npm
```json
npm i --save @ftun/comparestrings
```

Via package.json
```json
{
    "@ftun/comparestrings": "0.0.1"
}
```

## Propiedades.

- **before** <code>string*</code> Texto original(texto sin cambios)

- **after** <code>string*</code> Texto nuevo(texto con cambios)

- **validation** <code>integer</code> Default 0.
    0=>normal(Muestra los texto agregado y eliminados)
    1=>inserts(Muestra solo los texto agregado)
    2=>deletes(Muestra solo los texto eliminados)


# Uso.

```javascript

import CompareStrings from '@ftun/comparestrings';

//Textos a validar
let _stringOriginal="<h1>Hello 1</h1>";
let _stringNew="<h1>Hello World 2</h1>";

//Componente
let text= CompareStrings(_stringOriginal, _stringNew);

<iframe srcDoc={text} width="100%"></iframe>

```
![image](https://user-images.githubusercontent.com/45043710/87075192-946c0480-c1e5-11ea-9d59-43bf7afd5c61.png)


# Tipo de Validación Inserts.

```javascript

import CompareStrings from '@ftun/comparestrings';

//Textos a validar
let _stringOriginal="<h1>Hello 1</h1>";
let _stringNew="<h1>Hello World 2</h1>";
let _validation=1; // esta validación solo muestra los textos que se agregaron
//Componente
let text= CompareStrings(_stringOriginal, _stringNew, _validation);

<iframe srcDoc={text} width="100%"></iframe>

```
![image](https://user-images.githubusercontent.com/45043710/87075461-ffb5d680-c1e5-11ea-90d5-f8da1edad100.png)

# Tipo de Validación Deletes.

```javascript

import CompareStrings from '@ftun/comparestrings';

//Textos a validar
let _stringOriginal="<h1>Hello 1</h1>";
let _stringNew="<h1>Hello World 2</h1>";
let _validation=1; // esta validación solo muestra los textos que se eliminaron
//Componente
let text= CompareStrings(_stringOriginal, _stringNew, _validation);

<iframe srcDoc={text} width="100%"></iframe>

```
![image](https://user-images.githubusercontent.com/45043710/87075509-152b0080-c1e6-11ea-9d07-e3f0b979959a.png)

# Componente: Pagination

## Descripcion.

Componente para generacion de los items del widget de paginacion en base al layout de clever.

![image](https://user-images.githubusercontent.com/16906853/93648385-47b85d00-f9d0-11ea-8957-680edadac02e.png)

## Pre-requesitos.

React: 16.12.0 +

## Instalación:

Via npm
```json
npm i --save @ftun/pagination
```

Via package.json
```json
{
    "@ftun/pagination": "^1.0.4"
}
```

## Propiedades.

- **totalItems** <code>integer*</code> Numero de items

- **pageItems** <code>integer*</code> Numero de item por pagina

- **showItems** <code>integer</code> Default 10. Items visible en primera instancia

- **align** <code>string</code> Default center. center | left | rigth. Alineacion del componente

- **onChange** <code>function</code> Funcion callBack que se ejecuta al dar click sobre un item.

    - onChange(limit:integer, offset:integer, itemCurrent:integer)

    - Ejemplo de salida:

    ![image](https://user-images.githubusercontent.com/16906853/70166360-9770a680-1692-11ea-999d-c59d03c022e8.png)

## Consideraciones.

El Componente valida internamente los siguietes props <code>totalItems</code> <code>pageItems</code> <code>showItems</code> como números enteros, con la funcion <code>Math.ceil()</code> de javascript, la cual retorna el entero mayor o igual más próximo a un número dado. Para mejor consistendia de los calculos en la generacion de los items de paginacion.

![image](https://user-images.githubusercontent.com/16906853/76231341-1fff6580-61f3-11ea-835d-0be72ad515d9.png)
![image](https://user-images.githubusercontent.com/16906853/76231387-2e4d8180-61f3-11ea-979b-f7a153f8b324.png)

# Uso.

```javascript

import Pagination from '@ftun/pagination';

<Pagination
    totalItems={100}
    pageItems={5}
    showItems={10}
    onChange={(limit, offset, itemCurrent) => console.log(limit, offset, itemCurrent)}
    align="left"
/>

```

## Integracion con [GridView](https://github.com/ftun/clv-components/packages/134393)

```javascript

import GridView from '@ftun/gridview';
import Pagination from '@ftun/pagination';
const {CleverRequest} = require('@ftun/helpers');

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            totalData : 0
        }

        this.getPagination = this.getPagination.bind(this);
    }

    componentDidMount() {
        this.getTotalData();
        this.getPagination(300, 0);
    }

    getTotalData() {
        CleverRequest.get(`/api/contract/getTotalData`, res => {
            if (!res.error) this.setState({ totalData : res.data });
        });
    }

    getPagination(limit, offset) {
        CleverRequest.get(`/api/contract/getSearchPagination/${limit}/${offeset}`, res => {
            if (!res.error) this.setState({ data : res.data });
        });
    }

    render() {
        const { data, totalData } = this.state;
        return [
            <GridView
                data={data}
                columns={[
                    { attribute: 'atributo_uno'},
                    { attribute: 'atributo_dos'},
                ]}
            />,
            <Pagination totalItems={totalData} pageItems={300} onChange={this.getPagination}/>
        ];
    }
}

```

Nota. Posiblemete el codigo anterior no fuciones

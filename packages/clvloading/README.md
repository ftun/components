# Componente Loading
### Animacion que representa el estado de carga

## Pre-requesitos.

React: 16.12.0 +

## Instalación:

Via npm
```json
npm i --save @ftun/clvloading
```

## Props

- **show** : <code>bool</code> Bandera para activar / inactivar el componete.

### Ejemplo Implementacion

```javascript
import React, { Component } from 'react';
import CleverLoading from '@ftun/clvloading';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state= {
            show : false,
        }
    }

    getLoading() {
        this.setState({ show : true });
        return window.setTimeout(() => {
            this.setState({ show : false });
        }, 1500);
    }

    render() {
        return (
            <div className="row">
                <a className="btn btn-success" onClick={e => this.getLoading()}>Show Loading</a>
                <div className="col s12 m12">
                    <CleverLoading show={this.state.show} />
                </div>
            </div>
        );
    }
}
```

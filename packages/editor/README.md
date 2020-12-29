
# Componente I18n

Componentes para la internacionalizacion del idioma

## Pre-requesitos.

React: >= 16.12.0

## Instalación:

Via npm
```json
npm i --save @ftun/clvi18n
```

# Componente <code>WidgetI18n</code>

## Propiedades.

- **url** : <code>string*</code> Endpoint del API para obtener el catalogo de idiomas. API por default: <code>CleverConfig.getApiUrl('frm') + '/idioma/search'</code>

## Implementacion En El Layout.

```javascript
import React from 'react';
import { render } from 'react-dom';
import CleverLayout from '@ftun/clvlayout';
import {CleverConfig} from '@ftun/helpers';
const coreFeUrl = CleverConfig.getFeUrl('core');

import { WidgetI18n } from '@ftun/clvi18n';

render(
        <CleverLayout
            urlHash='/api/FRM/hash/'
            urlMenu='/api/FRM/menu'
            urlLogout='/api/AUTH/logout'
            urlCoreFE={coreFeUrl}
            urlLoginCoreFE={`${coreFeUrl}/login`}
            isDirect={false}
            viewHeader={true}
            i18n={<WidgetI18n url='/api/FRM/i18n/languagesApp' />}
        />
    ,
  document.getElementById('root')
);
```

## Resultado.
![image](https://user-images.githubusercontent.com/16906853/80153962-3172b600-8584-11ea-81d0-e3969b1227a7.png)

# Componente <code>I18n</code>

## Propiedades.

- **view** : <code>string*</code> ID de la vista para la traduccion
- **url** : <code>string</code> API para obtener los datos de traduccion de las directivas asociadas a la vista. API por default: <code>CleverConfig.getApiUrl('frm') + '/idioma/translate'/{view}/{lang}</code>

## Implementacion.

```javascript
import React, { Component } from 'react';
import I18n from '@ftun/clvi18n';

class App extends Component {
    render() {
        return (
            <I18n view={3} url='/api/FRM/i18n/translateLanguage' ref={ref => this.view = ref}>
                <div className="row">
                    <div className="col s12 m12">
                        <blockquote><h1>Welcome To Clever</h1></blockquote>
                    </div>
                </div>
            </I18n>
        );
    }
}
```
El componente valida el cambio en el virtual DOM de los hijos del componente para obtener la traducción de los elemento nuevos agregados al DOM.

## Metodos

- **<code>addChildren(jsx, element, callback)</code>** : Función expuesta del componente para lo caso donde se requiera rende rizar elementos en el DOM mediante **[ReactDOM.render()](https://es.reactjs.org/docs/react-dom.html#render)** implementado los mismos parámetros.


# Componente <code>T</code>

## Propiedades.

- **d** : <code>string*</code> Directiva
- **t** : <code>string</code> Texto por default

**Ojo: NO es necesario para la directiva en el formato <code>{{'DIRECTIVE'}}</code>. Ya que el componente internamente toma este formato, entonces solo seria el <code>DIRECTIVE</code>.**

## Implementacion
```javascript
import I18n, {T} from '@ftun/clvi18n';

<I18n view={2} url='/api/FRM/i18n/translateLanguage'>
    <T t='Change' d='CHANGE' /> <br />
    <T t='Template' d='TEMPLATE' />
    <T t='Clause without content for the language, do you want to add a content?' d='MSG_CONFIRM_NEW_CLAUSE' /> <br />
    <T t='PDF preview' d='PREVIEW_PDF' /> <br />
    <T t='Status' d='STATUS' /> <br />
</I18n>
```

# Ejemplo de la implementación de los componentes:

```javascript

import React, { Component } from 'react';
import I18n, {T} from '@ftun/clvi18n';
import GridView from '@ftun/gridview';
import  Modal, { ConfirmDialog }  from '@ftun/clvmodal';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msn : null
        }
        this.trans = null;
        this.idDiv = 'render-rom';
        this.actionModal = null;
        this.actionModal2 = null;
    }

    /**
    * Se monta el componente
    */
    componentDidMount() {
        this.view.getTranslate();
    }

    /**
    * @example render DOM
    */
    getRenderDOM() {
        let content = <div className="row">
            <div className="col s12 m12">
                <b>Render DOM: </b> <br />
                <T t='Consecutive Folio' d='CONSECUTIVE_FOLIO'/> <br />
            </div>
            <T t='Year Folio' d='YEAR_FOLIO' /> <br />
        </div>;
        this.view.addChildren(content, document.getElementById(this.idDiv));
    }

    /**
    * @example render state
    */
    getRenderState() {
        return this.setState({msn : <T t='Template' d='TEMPLATE' />});
    }

    render() {
        return (
            <I18n view={3} url='/api/FRM/i18n/translateLanguage' ref={ref => this.view = ref}>
                <I18n view={2} url='/api/FRM/i18n/translateLanguage'>
                    <T t='Change' d='CHANGE' /> <br />
                    <T t='Template' d='TEMPLATE' /> <br />
                    <T t='Clause without content for the language, do you want to add a content?' d='MSG_CONFIRM_NEW_CLAUSE' /> <br />
                    <T t='PDF preview' d='PREVIEW_PDF' /> <br />
                    <T t='Status' d='STATUS' /> <br />
                    <blockquote>
                        <div><b>Render State: </b> {this.state.msn}</div>
                    </blockquote>
                    <div id="tesModal">
                        <Modal actions={modal => this.actionModal2 = modal}>
                        </Modal>
                    </div>
                </I18n>
                <div className="row">
                    <a className="btn btn-link" onClick={e => this.getRenderState()}>Render State</a>
                    <a className="btn btn-link" onClick={e => this.getRenderDOM()}>Render DOM</a>
                    <a className="btn btn-link" onClick={e => this.actionModal.open() }>Open Modal</a>
                    <a className="btn btn-link" onClick={e => {
                            this.actionModal2.setContent(<T t='Template' d='TEMPLATE' />);
                            this.actionModal2.open();
                        } }>Open Modal Set</a>
                    <I18n view={12} url='/api/FRM/i18n/translateLanguage'>
                        <div className="row">
                            <div className="col s12 m12">
                                <blockquote>
                                    <h1><T t='Welcome To Clever' d='WELCOME_TO_CLEVER' /></h1>
                                </blockquote>
                            </div>
                        </div>
                        <div id="tesModal">
                            <Modal actions={modal => this.actionModal = modal}>
                                <h1><T t='Welcome To Clever' d='WELCOME_TO_CLEVER' /></h1>
                            </Modal>
                        </div>
                    </I18n>
                    <blockquote>
                        <div id={this.idDiv}><b>Render DOM: </b></div>
                    </blockquote>
                </div>
                <T t='Description' d='DESCRIPTION' /> <br />
                <T t='Year Folio' d='YEAR_FOLIO' /> <br />
                <T t='Consecutive Folio' d='CONSECUTIVE_FOLIO'/> <br />
                <T t='Active' d='ACTIVE'/> <br />
                <T t='Inactive' d='INACTIVE'/> <br />
                    <GridView
                        columns={[
                            { attribute: 'comentario', alias: <T t='Description' d='DESCRIPTION' /> },
                            { attribute: 'anio', alias: <T t='Year Folio' d='YEAR_FOLIO' /> },
                            { attribute: 'consecutivo', alias: <T t='Consecutive Folio' d='CONSECUTIVE_FOLIO'/> },
                            { alias: 'Exp', expand : data => <T t='Consecutive Folio' d='CONSECUTIVE_FOLIO'/> },
                        ]}
                        data={[
                            {comentario : "Description 1", anio : "2020", consecutivo : "1"},
                            {comentario : "Description 2", anio : "2020", consecutivo : "1"},
                            {comentario : "Description 3", anio : "2020", consecutivo : "4"},
                            {comentario : "Description 4", anio : "2020", consecutivo : "7"},
                            {comentario : "Description 5", anio : "2020", consecutivo : "3"}
                        ]}
                    />
            </I18n>
        );
    }
}
export default App;

```

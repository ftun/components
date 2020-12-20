import React, { Component, forwardRef, createContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Dropdown from '@ftun/dropdown';
const { Util, CleverConfig, CleverRequest, Request } = require('@ftun/helpers');

const I18nContext = createContext();
const I18nProvider = I18nContext.Provider;
const I18nConsumer = I18nContext.Consumer;

/**
* Clase Componente para el dropdown de seleccion de idioma
* @author Felipe Tun <ftun@palaceresorts.com>
*/
class WidgetI18n extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data : [],
        };
    }

    /**
    * Se monta el componente
    */
    componentDidMount() {
        this._isMounted = true;
        this.getApi();
    }

    /**
    * se invoca inmediatamente antes de que un componente se desmonte y se destruya.
    */
    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
    * Peticion al APi para obtener los idiomas
    * @return mixed
    */
    async getApi() {
        let response = await Request.axiosRequest({ url : this.props.url }),
            data = response.hasOwnProperty('data') ? response.data : response,
            dataDropDown = []
        ;

        if (data && data.length > 0) {
            data.map(lang => dataDropDown.push({
                action : this.getChangeLang,
                value : lang.idclv_idioma,
                title : lang.descripcion,
                code : lang.codigo,
            }));
        }

        return this._isMounted && this.setState({ data : dataDropDown });
    }

    /**
    * Evento onchange del componente dropdown
    * @return mixed
    */
    getChangeLang(data) {
        sessionStorage.setItem('idclv_idioma', data.value);
        let i18n = InstancesI18n.getInstance();
        return Object.keys(i18n).map(t => {
            if (typeof i18n[t] == 'object') i18n[t].ref.getTranslate();
        });
    };

    render() {
        let { data } = this.state;
        if (data.length) return <Dropdown id='dropdown-i18n' text='language' type='icon' className='btn btn-icon' data={data} />;
        return null;
    }
}

WidgetI18n.propTypes = {
    url : PropTypes.string,
};

WidgetI18n.defaultProps = {
    url : CleverConfig.getApiUrl('frm') + '/idioma/search',
};

/**
* Funcion auxiliar para la gestions de instancias del componente i18n
* @author Felipe Tun <ftun@palaceresorts.com>
* @return object
*/
const InstancesI18n = (() => {
    var instances = [];
    return {
        setInstance : (ref, view) => {
            instances.push({view : view, ref : ref});
        },
        getInstance : () => instances,
        removeInstance : (view) => {
            instances = Object.keys(instances).filter(inst => instances[inst].view != view);
            return instances;
        }
    };
})();

/**
* Clase para generar el componente para ingresar las directivas en vista
* @author Felipe Tun <ftun@palaceresorts.com>
* @important. Se implementa como componente clase para el consumo del context
*/
class T extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txt : '',
        };
    }

    /**
    * Se monta el componente en el DOM
    * @return mixed
    */
    componentDidMount() {
        if (this.value) {
            // console.log('componentDidMount => ', this.value.dataTranslate);
            this.getReplaceText(this.value.dataTranslate);
        }
    }

    /**
    * Se actualiza el componente en el DOM
    * @return mixed
    */
    componentDidUpdate(prevProps) {
        if (this.value) {
            // console.log('componentDidUpdate => ', this.value.dataTranslate);
            this.getReplaceText(this.value.dataTranslate);
        }
    }

    /**
    * Funcion para obtener la traudcion del compoente `T` en base al contexto del component `I18n`
    * @param object
    * @return mixed
    */
    getReplaceText(dataTranslate) {
        if (Object.keys(dataTranslate).length == 0) return false;

        let { d, t } = this.props;
        let { txt } = this.state;
        let lang = sessionStorage.idclv_idioma || 1,
            dataLang = dataTranslate.hasOwnProperty(lang) ? dataTranslate[lang] : {}
        ;

        if (Object.keys(dataLang).length > 0) {
            let data = dataLang,
                dire = `{{'${d}'}}`
            ;

            if (data.hasOwnProperty(dire) && data[dire] !== txt) {
                return this.setState({ txt : data[dire] });
            }
        }
    }

    render() {
        let { d, t } = this.props;
        let { txt } = this.state;
        return <I18nConsumer>
            {value => {
                this.value = value;
                let text = txt || t;
                return value != undefined ?
                    <clv-t data-directive={`{{'${d}'}}`} data-view={value.view} data-text={text}>{text}</clv-t> :
                    <clv-t data-directive={`{{'${d}'}}`} data-text={text} data-context='no'>{text}</clv-t>
                ;
            }}
        </I18nConsumer>
    }
}

T.propTypes = {
    d : PropTypes.string.isRequired,
    t : PropTypes.string,
};

T.defaultProps = {
    t : '',
};

T.contextType = I18nContext;

/**
* Componente para la internacionalizacion del idioma en las vista
* @author Felipe Tun <ftun@palaceresorts.com>
*/
class Translate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTranslate : {},
        };

        this.ref = React.createRef();
        this.dataTranslate = {};
        this.api = true;
        this.refReturn = {
            getTranslate : () => this.getDataTranslate(),
            addChildren : (e, c) => this.getAddChildren(e, c),
        };
    }

    /**
    * Se ejecuta al montar el componente
    * @return mixed
    */
    componentDidMount() {
        let { onRef } = this.props;


        if (onRef) {
            if (typeof onRef === 'function') onRef(this.refReturn);
            else onRef.current = this.refReturn;
        }

        if (this.props.view > 0) {
            InstancesI18n.setInstance(this.refReturn, this.props.view);
            this.getDataTranslate();
        }
    }

    /**
    * Se ejecuta al actualizar el component
    * @return mixed
    */
    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children && this.props.view > 0) {
            this.getDataTranslate();
        }
    }

    /**
    * Al desmontar. Se setae en null la referencia del componente
    */
    componentWillUnmount() {
        InstancesI18n.removeInstance(this.props.view);
        this.ref = null;
        this.api = true;
    }

    /**
    * Funcionalidad para agregar elementos mediante ReactDOM.render, fuera el contexto del componente
    * @param object jsx
    * @param object <element>
    * @param function
    * @return mixed
    */
    getAddChildren(element, container, callback) {
        return ReactDOM.render(element, container, () => {
            if (container) {
                let children = container.querySelectorAll(`clv-t[data-context="no"]:not([data-lang="${lang}"])`),
                    lang = sessionStorage.idclv_idioma || 1,
                    data = this.dataTranslate[lang]
                ;

                children.forEach(node => {
                    node.dataset.lang = lang;
                    node.dataset.view = this.props.view;
                    node.innerHTML = data.hasOwnProperty(node.dataset.directive) ? data[node.dataset.directive] : node.dataset.text;
                });
                if (typeof callback == 'function') callback();
            }
        });
    }

    /**
    * Se realizar la peticion al API para obtener la traduccion de las vista deseada
    * se valida que exista la referencia del componente en el DOM y que no haya una peticion async en proceso
    * @return mixed
    */
    getDataTranslate() {
        if (!this.ref) return false;
        let lang = sessionStorage.idclv_idioma || 1;
        if (this.dataTranslate.hasOwnProperty(lang) && Object.keys(this.dataTranslate[lang]).length > 0) return this.setState({ dataTranslate : this.dataTranslate }, () => this.getChildrenT(lang));

        if (!this.api) return false;
        CleverRequest.get(this.props.url + `/${this.props.view}/${lang}`, (response) => {
            if (!response.error) {
                this.dataTranslate[lang] = response.data;
                this.setState({ dataTranslate : this.dataTranslate }, () => this.getChildrenT(lang));
            }
            this.api = true;
        });
        this.api = false;
    }

    /**
    * Se obtiene las directivas <T /> para el remplazo de la traduccion, para los casos que son inyectados en el DOM, mediante la funcion: `this.getAddChildren()`
    * @param integer
    * @return mixed
    */
    getChildrenT(lang) {
        let { dataTranslate } = this.state,
            data = dataTranslate[lang]
        ;

        if (Object.keys(data).length > 0) {
            let children = this.ref.current.querySelectorAll(`clv-t[data-view="${this.props.view}"][data-context="no"]:not([data-lang="${lang}"])`);
            children.forEach(node => {
                node.dataset.lang = lang;
                node.innerHTML = data.hasOwnProperty(node.dataset.directive) ? data[node.dataset.directive] : node.dataset.text;
            });
        }
    }

    render() {
        let { dataTranslate } = this.state;
        return <I18nProvider value={{ view : this.props.view, dataTranslate : dataTranslate }}>
            <clv-i18n ref={this.ref}>{this.props.children}</clv-i18n>
        </I18nProvider>;
    }
}

Translate.propTypes = {
    view : PropTypes.number.isRequired,
    url : PropTypes.string,
};

Translate.defaultProps = {
    url : CleverConfig.getApiUrl('frm') + '/idioma/translate',
};

const I18n = forwardRef((props, ref) => <Translate {...props} onRef={ref} />);

export default I18n;
export {T, WidgetI18n};

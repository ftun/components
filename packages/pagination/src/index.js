import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Componente para la paginacion - integracion con el componente GridView
* @modificated Felipe Tun <ftun@palaceresorts.com> 2020.09.15
*   - Calculo de rango de items en base al item actual
*/
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items : 1,
            min : 0,
            max : 0,
            from : 1,
            to : 0,
            current : 0,
        };

        // Se ejecuta en el onClick del control de navegacion hacia atras
        this.removeItem = this.removeItem.bind(this);
        // Se ejecuta en el onClick del control de navegacion hacia adelante
        this.addItem = this.addItem.bind(this);
        // Se ejecuta en el onClick de los controles de primera y ultima pagina
        this.getFirtsItem = this.getFirtsItem.bind(this);
        // Se ejecuta en el onClick de los controles de primera y ultima pagina
        this.getLastItem = this.getLastItem.bind(this);
        // Se almacena el numero de rango hacia adelante y atras para visibilidad de los items
        this.range = 0;
    }

    /**
    * Se valida los props 'number' para obtener el entero mayor o igual más próximo a un número dado. Siempre y cuando sean mayor a cero
    * @param array
    * @return array
    */
    getCeilProps(props) {
        let { totalItems, pageItems, showItems } = props;
        return [Math.ceil(totalItems || 1), Math.ceil(pageItems || 1), Math.ceil(showItems || 1)];
    }

    /**
    * Funcionalidad del componente al montarse sobre el DOM
    * @return mixed
    */
    componentDidMount() {
        return this.getItemsCalculations();
    }

    /**
    * Se invoca antes de que un componente montado reciba nuevos props.
    * @param object
    * @return mixed
    */
    componentDidUpdate(prevProps) {
        let [ totalItems, pageItems, showItems ] = this.getCeilProps(this.props);
        let [ totalItemsPrev, pageItemsPrev, showItemsPrev ] = this.getCeilProps(prevProps);
        if ((totalItemsPrev !== totalItems) || (pageItemsPrev !== pageItems) || (showItemsPrev !== showItems)) {
            return this.getItemsCalculations();
        }
    }

    /**
    * Se realiza los calculos para los items de la paginacion, asi como los controles del mismo
    * @return mixed
    */
    getItemsCalculations() {
        let [ totalItems, pageItems, showItems ] = this.getCeilProps(this.props),
            auxItems = Math.ceil(totalItems / pageItems),
            items = (totalItems >= pageItems ?
                        auxItems :
                        (totalItems > showItems) ?
                            showItems :
                            Math.ceil(showItems / totalItems)),
            max = items > showItems ? showItems : auxItems,
            to = totalItems > pageItems ? pageItems : totalItems
        ;

        // Se calcula el rango de items en base al numero de items del props.showItems
        this.range = Math.ceil((max / 2));
        return this.setState({
            current : 0,
            min : 0,
            from : 1,
            items : items > auxItems ? auxItems : items,
            max : max,
            to : to,
        });
    }

    /**
    * Funcion que se ejecuta al seleccionar un item para invocar la funcion callBack 'onChange' del props
    * @param integer
    * @param object
    * @return mixed
    */
    getActive(current, values = {}) {
        let { onChange } = this.props,
            { max, min, items } = this.state,
            [ totalItems, pageItems ] = this.getCeilProps(this.props),
            realPage = (pageItems > totalItems ? totalItems : pageItems),
            offset = (current * pageItems),
            to = (offset + pageItems)
        ;

        // Si el objecto esta vacio, la funcion es llamada desde los items, en caso contrario es llamada desde los controles de navegacion
        if (Object.keys(values).length) {
            max = values.max;
            min = values.min;
        }

        // Se calcula el rango de items, en base al item actual seleccionado, siempre y cuando el maximo de itesm sea mayor a 1
        if (max > 1) {
            max = current + this.range;
            min = current - this.range;
        }

        // El rango hacia adelante no puede se mayor al total de items calculados
        if (max > items) {
            min -= max - items;
            max = items;
        }

        // El rango hacia abajo no puede se menor a cero
        if (min < 0) {
            // Se agregar los if para el caso de numeros impares, para que el max no sea mayor a los items totales
            if (max < items) max += Math.abs(min);
            if (max > items) max = items;
            min = 0;
        }

        return this.setState({
            from : offset + 1,
            to : to >= totalItems ? totalItems : to,
            current : current,
            max : max,
            min : min,
        }, () => {
            return onChange(realPage, offset, current);
        });
    }

    /**
    * Se obtiene los item a renderizar en el componente
    * @return object <element>
    */
    getItems() {
        let { min, max, current } = this.state,
            li = [],
            num = min + 1
        ;

        for (let i = min; i < max; i++) {
            let active = i == current ? 'active' : '';
            li.push(<li key={i} className={'waves-effect ' + active}><a onClick={(e) => this.getActive(i)}>{num}</a></li>);
            num++;
        }

        return li || null;
    }

    /**
    * Se remueve un item en vista validando el minimo (cero)
    * @return mixed
    */
    removeItem(e) {
        let { min, max, current } = this.state,
            newCurrent = current - 1
        ;

        if (min <= 0) {
            if (min == current) return false;
            return this.getActive(newCurrent);
        }

        return this.getActive(newCurrent, { min : (min - 1), max : (max - 1) });
    }

    /**
    * Se agrega un nuevo item en vista validando el maximo en base al calculo del total / page
    * @return mixed
    */
    addItem(e) {
        let { min, items, max, current } = this.state,
            newCurrent = current + 1
        ;

        if (max >= items) {
            if (items == newCurrent) return false;
            return this.getActive(newCurrent);
        }

        return this.getActive(newCurrent, { min : (min + 1), max : (max + 1) });
    }

    /**
    * Funcionalidad para ir al primer item
    * @param object <element>
    * @return mixed
    */
    getFirtsItem(e) {
        let { current } = this.state;
        if (current == 0) return false;
        return this.getActive(0);
    }

    /**
    * Funcionalidad para ir al ultimo item
    * @param object <element>
    * @return mixed
    */
    getLastItem(e) {
        let { items, max, min, current } = this.state,
            tempItems = items - 1
        ;

        if (current == tempItems) return false;
        return this.getActive(tempItems, {max : (max + 1), min : (min + 1) } );
    }

    render() {
        let { align } = this.props,
            [ totalItems ] = this.getCeilProps(this.props),
            { from, to } = this.state
        ;

        return <ul className={'pagination text-' + align}>
            <li className="waves-effect navigate"><a onClick={this.getFirtsItem}><i className="material-icons">first_page</i></a></li>
            <li className="waves-effect navigate"><a onClick={this.removeItem}><i className="material-icons">chevron_left</i></a></li>
            {this.getItems()}
            <li className="waves-effect navigate"><a onClick={this.addItem}><i className="material-icons">chevron_right</i></a></li>
            <li className="waves-effect navigate"><a onClick={this.getLastItem}><i className="material-icons">last_page</i></a></li>
            <li className="waves-effect navigate"><a>{`${from} - ${to} / ${totalItems}`}</a></li>
        </ul>;
    }
};

Index.propTypes = {
    totalItems : PropTypes.number.isRequired,
    pageItems : PropTypes.number.isRequired,
    showItems : PropTypes.number,
    align : PropTypes.oneOf(['left', 'center', 'right']),
    onChange : PropTypes.func,
};

Index.defaultProps = {
    showItems : 10,
    align : 'center',
    onChange : (limit, offset, currentItem) => {},
};

export default Index;

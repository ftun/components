import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
* @author Felipe Tun <ftun@palaceresorts.com>
* Version ligera del componente GridView, con mejoras en las funcionalidades mas utilizadas
*/
class GridView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns : [],
            data : [],
            numRow : 1,
            expandedRows : {},
        };

        this.checkHead = null;
        this.refChecks = {};
        this.auxCountRows = 1;
        this.attrSort = {};
    }

    /**
    * Funcionalidad del componente al montarse sobre el DOM
    * Se valida los props para las columnas por default
    * @return mixed
    */
    componentDidMount() {
        let columns = this.getExtraColumns();
        this.setState((state, props) => {
            return { columns : columns, data : props.data };
        }, this.setAfterState);
    }

    /**
    * Se invoca antes de que un componente montado reciba nuevos props. Para actualizar el state.data en base a los props.data si estos son cargados de manera async
    * por el padre que lo implementa
    * @param mixed
    * @return mixed
    */
    componentDidUpdate(prevProps) {
        let { data, serializeRows, checkRows } = this.props;
        if ((prevProps.data !== data) || (prevProps.serializeRows !== serializeRows) || (prevProps.checkRows !== checkRows)) {
            this.setBeforeState();
            let columns = this.getExtraColumns();
            this.refChecks = {};
            this.attrSort = {};
            this.setState(state => {
                return { data : data, columns: columns, expandedRows : {} };
            }, this.setAfterState);
        }
    }

    /**
    * Funcion callback antes de realizar un set state, validandos props de 'defaultCheckRows' 'enabledHeadCheck'
    * si enabledHeadCheck == true || defaultCheckRows == true, se valida las propiedades 'checked' 'indeterminate' del check principal
    * si defaultCheckRows == function, no se resetean los valores de los checks, puesto que se obtienen en la funcion callback defaultCheckRows()
    * @return mixed
    */
    setBeforeState() {
        let { defaultCheckRows, enabledHeadCheck } = this.props,
            isFunction = typeof defaultCheckRows === 'function',
            defaultChecked = isFunction ? true : defaultCheckRows
        ;

        if (!isFunction) {
            let diff = Object.keys(this.refChecks).filter(inp => this.refChecks[inp] && this.refChecks[inp].input && this.refChecks[inp].input.checked !== defaultChecked);
            diff.map(inp => this.refChecks[inp].input.checked = defaultChecked);
        }

        if (this.checkHead) {
            this.checkHead.checked = defaultChecked;
            this.checkHead.indeterminate = !enabledHeadCheck || isFunction;
        }
    }

    /**
    * Funcion callback despues de realizar un set state validando los props enabledHeadCheck, afterMountData, defaultCheckRows, checkRows
    * si enabledHeadCheck == true, se valida las propiedades 'indeterminate' 'disabled' del check principal
    * si defaultCheckRows == function && checkRows, se resetean los checks con los valores en base a la condicion de la funcion callback defaultCheckRows()
    * @return mixed
    */
    setAfterState() {
        let { enabledHeadCheck,  afterMountData, defaultCheckRows, checkRows } = this.props,
            isFunction = typeof defaultCheckRows === 'function',
            { data } = this.state
        ;

        if (checkRows) {
            Object.keys(this.refChecks).map(inp => {
                if (this.refChecks[inp].input) this.refChecks[inp].input.checked = this.refChecks[inp].status;
            });
        }

        if (this.checkHead) {
            this.checkHead.indeterminate = !enabledHeadCheck || isFunction;
            this.checkHead.disabled = !enabledHeadCheck;
        }

        if (data.length > 0) afterMountData();
    }

    /**
    * Funcion para validacion de las columna estra por default del GridView
    * Mofica para guardar las referencias de los checks con su valor por default que se obtiene del props 'defaultCheckRows'
    * @return array
    */
    getExtraColumns() {
        let { columns, serializeRows, checkRows, defaultCheckRows } = this.props,
            checkHeader = typeof defaultCheckRows === 'function'
        ;

        if (checkRows && !columns.find(c => c.checkColumn == true)) {
            columns.unshift({
                checkColumn : true,
                alias : <label>
                            <input ref={r => this.checkHead = r} type="checkbox" onChange={e => this.getOnChangeChecks(-1, e.target.checked)} defaultChecked={(checkHeader ? null : defaultCheckRows)} />
                            <span></span>
                        </label>,
                value : (data, index) => {
                    let defaultChecked = checkHeader ? defaultCheckRows(data, index) : defaultCheckRows;
                    return <label>
                        <input ref={r => this.refChecks[index] = {input : r, status : defaultChecked}} type="checkbox" onChange={e => this.getOnChangeChecks(index, e.target.checked, data)} defaultChecked={defaultChecked} />
                        <span></span>
                    </label>;
                }
            });
        }

        if (serializeRows && !columns.find(c => c.alias == '#' && c.serializeColumn == true)) {
            columns.unshift({
                serializeColumn : true,
                alias : '#',
                value : () => this.auxCountRows++,
            });
        }

        return columns;
    }

    /**
    * Funcionalidad del check principal para seleccion / deseleccion de los checks de la columna
    * si el primer parametro es menor a cero, la accion ejecutada por parte del check principal
    * @param boolean
    * @param boolean
    * @param array
    * @return boolean
    */
    getOnChangeChecks(index, check, data) {
        let keys = Object.keys(this.refChecks);
        let diff = keys.filter(inp => this.refChecks[inp].input && this.refChecks[inp].input.checked !== check);

        if (index < 0) {
            if (diff.length > 0) diff.map(inp => this.refChecks[inp].input.checked = check);
        } else {
            if (this.props.enabledHeadCheck) {
                if (diff.length == 0) {
                    this.checkHead.checked = check;
                    this.checkHead.indeterminate = false;
                }

                if (diff.length > 0) this.checkHead.indeterminate = true;
            }
        }

        return this.props.onCheck(index, check, data || {});
    }

    /**
    * Funcionamiento para el efecto expand de las columnas del Grid
    * @param string. Referencia de la columna expand actual
    * @param index. Index del registro que realizar el expand
    * @param function. callback a renderizar en la columna expand
    * @return mixed
    */
    getExpand(refColumn, index, callback) {
        let { expandedRows } = this.state;

        if (expandedRows.hasOwnProperty(index) && expandedRows[index].refColumn == refColumn) {
            expandedRows = Object.keys(expandedRows)
                            .filter(key => key !== index)
                            .reduce((obj, key) => {
                                obj[key] = expandedRows[key];
                                return obj;
                            }, {});
        } else {
            expandedRows[index] = {expand : callback, refColumn : refColumn};
        }

        this.setState({expandedRows : expandedRows});
    }

    /**
    * Ordenamiento en base a attribute de la configuracion de las columnas
    * @param string
    * @return mixed
    */
    getSortBy(attr) {
        if (!attr) return null;

        let arrayCopy = this.state.data.slice();
        if (!this.attrSort.hasOwnProperty(attr)) this.attrSort = {};

        if (Object.keys(this.attrSort).length == 0 || this.attrSort[attr] == 'arrow_drop_up') {
            // ORDER ASC
            this.attrSort[attr] = 'arrow_drop_down';
            arrayCopy.sort(function(a, b) {
                return (a[attr] > b[attr]) ? 1 : ((a[attr] < b[attr]) ? -1 : 0 );
            });
        } else {
            // ORDER DESC
            this.attrSort[attr] = 'arrow_drop_up';
            arrayCopy.sort(function(a, b) {
                return (a[attr] > b[attr]) ? -1 : ((a[attr] < b[attr]) ? 1 : 0 );
            });
        }

        // this.setBeforeState();
        return this.setState({ data: arrayCopy, expandedRows : {} }, this.setAfterState);
    }

    /**
    * Funcion para agregarle atributos a los row con una funcion anonima
    * @return object
    */
    getOptionsRows(element, data) {
        let attrRow = this.props.optionsRows(data);
        return React.cloneElement(element, attrRow);
    }

    /**
    * Se obtienen las rows de la informacion del Grid
    * @return <element>
    */
    getBody() {
        let { data, columns, numRow, expandedRows } = this.state,
            { expandRows } = this.props,
            body = []
        ;
        this.auxCountRows = numRow;

        data.forEach((data, index) => {
            let indexC = index + '-expand';
            let rows = columns.map((row, inx) => {
                let value = typeof row.value === 'function' ? row.value(data, index) : (data.hasOwnProperty(row.attribute) ? data[row.attribute] : null);

                let iconExpand = null;
                if (typeof row.expand === 'function') {
                    let visibleExpand = expandRows(data);
                    if (row.visibleExpand) visibleExpand = typeof row.visibleExpand === 'function' ? row.visibleExpand(data) : row.visibleExpand;
                    iconExpand = visibleExpand ? <a className="btn btn-icon btn-link" onClick={() => this.getExpand((row.attribute || row.alias|| inx), indexC, row.expand)}><i className="material-icons">{row.icon || 'arrow_drop_down'}</i></a> : null;
                }
                return <td key={inx} className={(row.visible === undefined || row.visible) ? null : 'hide'}>{value}{iconExpand}</td>;
            });

            let tr = [this.getOptionsRows(<tr key={index}>{rows}</tr>, data)];
            if (expandedRows.hasOwnProperty(indexC)) tr.push(<tr key={indexC}><td colSpan={columns.length} className="table-collapsible">{expandedRows[indexC].expand(data)}</td></tr>);

            body = body.concat(tr);
            return body;
        });

        return body;
    }

    /**
    * Se obtienen los encabezados de las columnas
    * @return <element>
    */
    getHead() {
        let { columns } = this.state;
        let { sort } = this.props;
        return <tr>{columns.map((row, index) => {
                let className = (row.visible === undefined || row.visible) ? null : 'hide',
                    attr = row.attribute || false,
                    display = row.alias || (row.attribute && row.attribute.replace(/\_/g, " ")),
                    icon = (attr && this.attrSort.hasOwnProperty(attr) ? this.attrSort[attr] : 'unfold_more'),
                    colSort = row.sort !== false
                ;

                return <th key={index} className={className}>
                    {display}
                    {attr && sort && colSort ? <a className="btn btn-icon btn-link" onClick={e => this.getSortBy(attr)}><i className="material-icons">{icon}</i></a> : null}
                </th>
            })}
        </tr>
    }

    render() {
        let { classTable, floatHeader } = this.props;
        let classFloat = floatHeader ? ' floating-header use-navbar-fixed '  : '';

        return <table className={classTable + classFloat}>
            <thead>
                {this.getHead()}
            </thead>
            <tbody>
                {this.getBody()}
            </tbody>
        </table>;
    }
};

GridView.propTypes = {
    columns : PropTypes.array.isRequired,
    data : PropTypes.array.isRequired,
    serializeRows : PropTypes.bool,
    checkRows : PropTypes.bool,
    defaultCheckRows : PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.bool
    ]),
    enabledHeadCheck : PropTypes.bool,
    floatHeader : PropTypes.bool,
    classTable : PropTypes.string,
    afterMountData : PropTypes.func,
    onCheck : PropTypes.func,
    sort : PropTypes.bool,
    optionsRows : PropTypes.func,
    expandRows : PropTypes.func,
};

GridView.defaultProps = {
    serializeRows : true,
    checkRows : false,
    defaultCheckRows : true,
    enabledHeadCheck : true,
    floatHeader : true,
    classTable: 'clever-table responsive-table',
    afterMountData : () => {},
    onCheck : (index, checked, data) => {},
    sort : true,
    optionsRows : data => {},
    expandRows : data => true,
};

export default GridView;


/**
* Funcion auxiliar para actualizar el una posicion del array de datos del grid mediante el index del mismo
* @param array
* @param integer
* @param object
* @return array
*/
export const auxUpdateState = (dataState, index, rowUpdate) => {
    if (!Array.isArray(dataState)) return [];
    let dataUpdate = dataState.slice();
    if (typeof dataUpdate[index] == undefined) return dataUpdate;
    dataUpdate[index] = rowUpdate;
    return dataUpdate;
};

/**
* Funcion auxiliar para eliminar un row del array de datos del grid mediante el index del mismo
* @param array
* @param integer
* @return array
*/
export const auxDeleteState = (dataState, index) => {
    if (!Array.isArray(dataState)) return [];
    let newData = dataState.slice();
    if (typeof newData[index] == undefined) return newData;
    newData.splice(index, 1);
    return newData;
};

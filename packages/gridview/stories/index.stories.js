import React, { Fragment } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import GridView from '../src/index';

export default {
  title: 'GridView',
  component: GridView,
  decorators: [withKnobs],
};

const getData = () => [
    { sex: "Female", name: "Sandra", city: "Las Vegas", car: "Audi A4" },
    { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
    { sex: "Male", name: "Mark", city: "Paris", car: "Honda Accord" },
    { sex: "Male", name: "Paul", city: "Paris", car: "Nissan Altima" },
    { sex: "Female", name: "Linda", city: "Austin", car: "Toyota Corolla" },
    { sex: "Male",name: "Robert",city: "Las Vegas",car: "Chevrolet Cruze"},
    { sex: "Female", name: "Lisa", city: "London", car: "BMW 750|" },
    { sex: "Male", name: "Mark", city: "Chicago", car: "Toyota Corolla" },
    { sex: "Male",name: "Thomas",city: "Rio de Janeiro",car: "Honda Accord"},
    { sex: "Male", name: "Robert", city: "Las Vegas", car: "Honda Civic" },
    { sex: "Female", name: "Betty", city: "Paris", car: "Honda Civic" },
    { sex: "Male",name: "Robert",city: "Los Angeles",car: "Honda Accord"},
    { sex: "Male",name: "William",city: "Los Angeles",car: "Honda Civic"},
    { sex: "Male", name: "Mark", city: "Austin", car: "Nissan Altima" },
    { sex: "Male", name: "Test Mark", city: "Austin", car: "Nissan Altima" }
];

const getColumns = () => [
    {
        attribute: "name",
        alias: "Name",
        expand : data => <h5><b>Name</b> {data.name}</h5>
    },
    {
        attribute: "sex",
        alias: "Sex",
        sort : false
    },
    {
        attribute: "city",
        alias: "City",
        expand : data => <h5><b>City</b> {data.city}</h5>
    },
    {
        attribute: "car",
        alias: "Car"
    },
    {
        icon : 'info',
        expand : data => <h5><b>Name: </b>{data.name} <b>City: </b>{data.city} <b>Sex: </b>{data.sex} <b>Car: </b>{data.car}</h5>,
        visibleExpand : data => data.city != 'Paris',
    },
    {
        icon : 'add',
        expand : data => <h5>expand {data.name}</h5>
    },
    {
        alias:'Action',
        value : data => <Fragment>
                            <a><i className="material-icons">apps</i></a>
                            <a><i className="material-icons">menu</i></a>
                        </Fragment>
    }
];

export const defaultGridView = () => {
    const _classTable = text('classTable', 'clever-table responsive-table');
    const _floatHeader = boolean('floatHeader', false);
    const _serializeRows = boolean('serializeRows', true);
    const _sort = boolean('sort', true);
    const _columns = getColumns();
    const _data = getData();

    return <GridView
        classTable={_classTable}
        columns={_columns}
        data={_data}
        floatHeader={_floatHeader}
        serializeRows={_serializeRows}
        sort={_sort}
        optionsRows={data => data.sex == 'Female' ? { 'className': 'danger' } : null}
    />;
};

export const gridViewCheckRows = () => {
    const _classTable = text('classTable', 'clever-table responsive-table');
    const _floatHeader = boolean('floatHeader', false);
    const _serializeRows = boolean('serializeRows', true);
    const _checkRows = boolean('checkRows', true);
    const _defaultCheckRows = boolean('defaultCheckRows', true);
    const _enabledHeadCheck = boolean('enabledHeadCheck', true);
    const _afterMountData = action('GridView-afterMountData');
    const _onCheck = action('GridView-_onCheck');
    const _sort = boolean('sort', true);
    const _columns = getColumns();
    const _data = getData();

    return <GridView
        classTable={_classTable}
        columns={_columns}
        data={_data}
        floatHeader={_floatHeader}
        serializeRows={_serializeRows}
        checkRows={_checkRows}
        defaultCheckRows={data => data.sex == 'Female'}
        enabledHeadCheck={_enabledHeadCheck}
        afterMountData={_afterMountData}
        onCheck={_onCheck}
        sort={_sort}
    />;
};

export const gridViewExpandRows = () => {
    const _classTable = text('classTable', 'clever-table responsive-table');
    const _floatHeader = boolean('floatHeader', false);
    const _serializeRows = boolean('serializeRows', true);
    const _sort = boolean('sort', true);
    const _columns = getColumns();
    const _data = getData();

    return <GridView
        classTable={_classTable}
        columns={_columns}
        data={_data}
        floatHeader={_floatHeader}
        serializeRows={_serializeRows}
        sort={_sort}
        expandRows={data => data.sex != 'Female'}
    />;
};

import React, { Fragment } from 'react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Pagination from '../src/index';

export default {
  title: 'Pagination',
  component: Pagination,
  decorators: [withKnobs],
};

export const defaultRender = () => {
    const _totalItems = number('totalItems', 100);
    const _pageItems = number('pageItems', 5);
    const _showItems = number('showItems', 10);
    const _align = select('align', { left: 'left', center: 'center', right: 'right'}, 'center');
     const _onClick = action('Pagination-onChange');

    return <Pagination
        totalItems={_totalItems}
        pageItems={_pageItems}
        showItems={_showItems}
        onChange={_onClick}
        align={_align}
    />;
};

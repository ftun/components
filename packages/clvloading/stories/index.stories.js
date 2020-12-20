import React, { Fragment } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Loading from '../src/index';

export default {
  title: 'Loading',
  component: Loading,
  decorators: [withKnobs],
};

export const defaultLoading = () => {
    const _show = boolean('show', false);
    return <Loading show={_show}/>;
};

import React, { Fragment } from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Editor from '../src/index';

export default {
  title: 'Editor',
  component: Editor,
  decorators: [withKnobs],
};

export const defaultEditor = () => {
    return <Editor value={'<p>Lorem ipsum</p>'} />;
};

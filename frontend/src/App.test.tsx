import React from 'react';
import { getByTestId, render, screen } from '@testing-library/react';
import App from './App';

test('render check for app component', () => {
    const {getByTestId} =render(<App />);
    getByTestId("app")
});

import {
  ChakraProvider,
  ColorModeScript,
  baseTheme,
  extendTheme,
} from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { mode } from '@chakra-ui/theme-tools';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const styles = {
  global: props => ({
    body: {
      bg: mode('white', 'dark.600')(props),
      color: mode('black', 'white')(props),
      transitionProperty: 'background-color, color',
      transitionDuration: '1s',
      transitionTimingFunction: 'ease-in-out',
    },
  }),
};

const theme = extendTheme({ ...baseTheme, styles });

root.render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);

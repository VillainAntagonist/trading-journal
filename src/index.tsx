import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import Loading from "./components/Loading";
import ErrorBoundary from "./components/ErrorBoundary";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Suspense fallback={<Loading/>}>
              <ErrorBoundary>
                  <Provider store={store}>
                    <BrowserRouter>
                        <App/>
                      </BrowserRouter>
                  </Provider>
              </ErrorBoundary>
          </Suspense>
      </ThemeProvider>
  </React.StrictMode>
);


reportWebVitals();

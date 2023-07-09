import React from 'react';
import Router from "./router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification from "./components/Notification";
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
        <>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              closeOnClick
              pauseOnHover
              draggable
          />
            <Notification/>
            <HelmetProvider>
            <Router/>
            </HelmetProvider>
          </>
  );
}

export default App;

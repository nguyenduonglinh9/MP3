import React, { useInsertionEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { privateRoutes } from './routes/index';
import LayoutMain from "./components/Layout/LayoutMain";


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const layoutPage = route.layout;
            if (layoutPage === null) {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                      <Page />
                  }
                ></Route>
              );
            }
            if (layoutPage === "MainLayout") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutMain>
                      <Page />
                    </LayoutMain>
                  }
                ></Route>
              );
            }
            
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

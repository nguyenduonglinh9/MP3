
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes } from "./route/index";
import LayoutMain from "./components/Layout/LayoutMain";
import { useState, createContext } from 'react';

export const currentID = createContext();

function App() {
  const [currentSong, setCurrentSong] = useState(1);
  
  return (
    <currentID.Provider value={currentSong}>
      <Router>
        <Routes>
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            const layoutPage = route.layout;
            if (layoutPage === null) {
              return <Route key={index} path={route.path} element={<Page />}></Route>;
            }
            if (layoutPage === "LayoutMain") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutMain
                      currentSong={currentSong}
                      controlCurrentSong={setCurrentSong}
                    >
                      <Page sendData={setCurrentSong} />
                    </LayoutMain>
                  }
                ></Route>
              );
            }
          })}
        </Routes>
      </Router>
    </currentID.Provider>
  )
}

export default App;

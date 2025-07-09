import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const App = () =>{
  console.log('loaded')
  return(
    <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;
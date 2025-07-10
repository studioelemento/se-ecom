import { Routes,Route } from "react-router-dom";
import React from "react";
import LoginForm from "../components/LoginForm";
import StockistDashboard from "../pages/StockistDashboard";
import { ViewAllFrachise } from "../pages/ViewAllFranchise";
import { AddFranchisee } from "../pages/AddFranchise";


const AppRoutes = () =>{
  return(
    <Routes>
    {/* Public Routes */}

    <Route path="/" element={<LoginForm/>}></Route>
    <Route path="/login" element={<LoginForm/>}></Route>

    {/* Stockist Dashboard */}    
    <Route path="/stockist/dashboard" element={<StockistDashboard/>} ></Route>

    <Route path="stockist/view-all-franchise" element={<ViewAllFrachise/>} ></Route>
    <Route path="stockist/add-franchise" element={<AddFranchisee/>} ></Route>
    



  </Routes>
  )
}

export default AppRoutes;
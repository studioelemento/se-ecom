import React from "react";
import { useNavigate } from "react-router-dom";

const StockistDashboard = () =>{

  const navigate = useNavigate();


  return(
    <div>
      <h2>Welcome,Stockist</h2>
      <button
        onClick={()=>navigate('/stockist/view-all-frachise')}
      >View Franchise</button>
      <button>Add Franchise</button>
      <button>View Franchise By Id</button>
      <button>Toggle</button>

    </div>
  )
}

export default StockistDashboard;
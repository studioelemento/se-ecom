import { useEffect, useState } from "react";
import React from "react";
import axiosInstance from "../api/axiosInstance";

export const ViewAllFrachise = () =>{
  const [franchisees,setFranchisees] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    const fetchFranchisees=async()=>{

      try{
        const token = localStorage.getItem('token');
        const res = await axiosInstance.get('/franchise/all',{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        });

        setFranchisees(res.data.data);
        setLoading(false);

      }catch(err){
        console.error(err);
        setError('Failed to load Franchiseees');
        setLoading(false);
      }
    };
    fetchFranchisees();
  },[]);
  if (loading) {
    return <p>loading franchisees</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return(
    <div>
      <h2>All Frachisees</h2>
      <table>
        <thead>
        <tr>
          <th>frachise ID</th>
          <th>name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        </thead>
        <tbody>
          {franchisees.map((f)=>(
            <tr key={f.franchise_id}>
              <td>{f.franchise_id}</td>
              <td>{f.name}</td>
              <td>{f.email}</td>
              <td>{f.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

import { useState } from "react";
import axios from "../api/axiosInstance";


export const ViewFranchiseById = () =>{
  const [result,setResult]=useState('')

  const handleSubmit= async(e)=>{
    e.preventDefault();

    try {
      const res = await axios.get(`/franchise/${result}`)
      const frachisee = res.data.data

      if (!frachisee) {
        alert('Franchisee not found');
        return;
      }
      setResult(res.data.data)

    } catch (error) {
      console.log(error)
      alert("error")
    }

  }

  return(
    <>
    <div>
      <input type="text" value={result} onChange={(e)=>setResult(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
    <div>
      {frachisee && (
        <table>
        <thead>
        <tr>
          <th>frachise ID</th>
          <th>name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>status</th>
        </tr>
        </thead>
        <tbody>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tbody>
        </table>
      )}
    </div>
    </>
  )
}
import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export const AddFranchisee=()=>{

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [franchise_id,setFranchise_id] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();

    try {

      const token = localStorage.getItem('token')
      const res = await axios.post('/franchise/register',
        {
          name,
          email,
          phone,
          franchise_id,
          password
        },
        {
        headers:{
            Authorization:`Bearer ${token}`,
          },
        }
    );

    alert('Franchiseee added successfully!');
    navigate('/stockist/view-all-franchise')
      
    } catch (err) {
      console.log(err);
      alert('registration failed')
    }

  }



  return(
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" onChange={(e)=>setName(e.target.value)} value={name} /> <br />

        <label>Email</label>
        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email}/> <br />

        <label>Phone</label>
        <input type="text" onChange={(e)=>setPhone(e.target.value)} value={phone} /> <br />

        <label>Franchise_id</label>
        <input type="text" onChange={(e)=>setFranchise_id(e.target.value)} value={franchise_id} /> <br />

        <label>Password</label>
        <input type="text" onChange={(e)=>setPassword(e.target.value)} value={password} /> <br />

        <button type="submit" >Submit</button>
      </form>
    </div>  
  )
}
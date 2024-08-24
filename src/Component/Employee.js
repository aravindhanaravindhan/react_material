import React ,{useState}from 'react'
import { InputText } from "primereact/inputtext";
import axios from  'axios'
import { Button } from 'primereact/button';

function Employee() {
    const [value, setValue] = useState({
        name:"",
        email:"",
    });


    const handleChange=(e)=>{

        const {id,value}=e.target;
        setValue((prevData)=>({
            ...prevData,
            [id]:value
        }))
    }


console.log(value);

    
    const handleSumbit=()=>{
        axios.post('http://localhost:3000/employeeAdd',value)

       
    }
  return (
    <div>

<div className="card flex justify-content-center">
            <InputText 
            value={value.name} 
              className="p-inputtext-sm" 
              placeholder="Name" 
              onChange={handleChange}
              id='name'/>

            <InputText
             value={value.email} 
             onChange={handleChange}
             className="p-inputtext-sm" 
             placeholder="Email"
             id='email'
              />
            <Button label="Submit"  onClick={handleSumbit}/>
        </div>

    </div>
  )
}

export default Employee
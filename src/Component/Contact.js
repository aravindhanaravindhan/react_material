import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axois from 'axios'
import "./Home.css"
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from 'primereact/dropdown';



function Contact() {
  const [date, setDate] = useState(null);
  const [checked, setChecked] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [dropData, setDropData] = useState();

  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: '',
    date: null,
    checked: ""
  });


  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };



  const handleSumbit = () => {

    axios.post("http://localhost:3000/dataAdd", {
      ...formData, date, checked, selectedCity
    }
    )
  };

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => setDropData(res.data))
  }, [])
  // const Drop_data=dropData.forEach(a=>{

  // });


  return (
    <div class="formData">

      <InputText value={formData.field1} onChange={(e) => handleInputChange(e, 'field1')} placeholder='Enter Your Name' className="p-inputtext-sm" />
      <InputText value={formData.field2} onChange={(e) => handleInputChange(e, 'field2')} placeholder='Enter Your Email' />
      <InputText value={formData.field3} onChange={(e) => handleInputChange(e, 'field3')} placeholder='Enter Your password' />
      <div className="card flex justify-content-center">
        <Calendar value={date} onChange={(e) => setDate(e.value)} placeholder='Select DataBirth' />
        <div className="card flex justify-content-center">
          <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
        </div>
        <div className="card flex justify-content-center">
          <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={dropData} optionLabel="UserName"
            placeholder="Select a City" className="w-full md:w-25rem" filter={false} />
        </div>
      </div>
      <Button onClick={handleSumbit} label="Submit" />

    </div>
  );
}

export default Contact;

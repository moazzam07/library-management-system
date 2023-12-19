import React, { useState } from 'react';
import '../styles/MemberList.css'
import { createMember } from '../services/api';


const MemberForm = ({ member }) => {
  const [formData, setFormData] = useState({
    name: member ? member.name : '',
    // Add other member properties
  });

  const handleSubmit = async (e) => {
    // const result = await importBooks(importData);
    console.log(formData)

    e.preventDefault();
    try {
      const result = await createMember(formData);
      
      console.log('Member Added:', result);
      alert("Member Added Successfully")
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error Creating Member:', error);
    }
    // onSubmit(formData); // onSubmit will be createMember or updateMember
    // Clear form or reset state as needed
  };

  return (
    <div className='form1'>
    <h2>Create Member</h2>
      <label>
        Name:
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </label>
      <button type="submit" className='custom-button' onClick={handleSubmit}>Create Member</button>
    </div>
  );
};

export default MemberForm;
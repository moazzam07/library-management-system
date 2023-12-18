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
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Error Creating Member:', error);
    }
    // onSubmit(formData); // onSubmit will be createMember or updateMember
    // Clear form or reset state as needed
  };

  return (
    <div className='form1'>
    
    {/* <form onSubmit={handleSubmit}> */}
      <label>
        Name:
      </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      <br></br>
      {/* Add other form fields */}
      <button type="submit" className="addMemberButton" onClick={handleSubmit}>Create Member</button>
    {/* </form> */}
    </div>
  );
};

export default MemberForm;
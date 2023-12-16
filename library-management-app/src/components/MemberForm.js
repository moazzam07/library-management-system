import React, { useState } from 'react';
import '../styles/form.css'
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
    <div className='form'>
    
    {/* <form onSubmit={handleSubmit}> */}
      <label>
        Name:
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </label>
      {/* Add other form fields */}
      <button type="submit" onClick={handleSubmit}>{member ? 'Update Member' : 'Create Member'}</button>
    {/* </form> */}
    </div>
  );
};

export default MemberForm;
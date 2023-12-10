import React, { useState } from 'react';
import '../styles/form.css'


const MemberForm = ({ onSubmit, member }) => {
  const [formData, setFormData] = useState({
    name: member ? member.name : '',
    // Add other member properties
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // onSubmit will be createMember or updateMember
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
      <button type="submit">{member ? 'Update Member' : 'Create Member'}</button>
    {/* </form> */}
    </div>
  );
};

export default MemberForm;
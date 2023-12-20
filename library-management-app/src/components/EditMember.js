import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateMember } from '../services/api';
import { useNavigate } from 'react-router-dom';

const EditMember = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [member, setMember] = useState({
    name: '',
    outstanding_debt: null
  });  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember((prevMember) => ({
      ...prevMember,
      [name]: value,
    }));
  };

  const updatedMember = Object.fromEntries(
    Object.entries(member).filter(([key, value]) => value !== '')
  );

  const handleEditMember = async (memberId) => {
    try {
      await updateMember(memberId, updatedMember);
      navigate(`/members`);
      alert('Member updated successfully!');
    } catch (error) {
      alert('Error updating book. Please check the data format.');
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className='form1'>
      <h2>Edit Member</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" value={member.name} onChange={handleInputChange} />
        </label>
        <label>
          Debt:
          <input type="text" name="outstanding_debt" value={member.outstanding_debt} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={() => handleEditMember(id, member)}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditMember;
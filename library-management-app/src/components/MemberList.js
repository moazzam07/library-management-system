import React, { useState, useEffect } from 'react';
import '../styles/MemberList.css'; // Import the CSS file
import { fetchMembers, deleteMember } from '../services/api';
import { useNavigate } from 'react-router-dom';

const MemberList = () => {

  const navigate = useNavigate()
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        const result = await fetchMembers();
        setMembers(result.members);
      } catch (error) {
        console.error(error.response.data.message);
      }
    };

    fetchMembersData();
  }, []);

  const handleEdit = async (memberID) => {
    navigate(`/members/edit/${memberID}`);
  }
  const handleDelete = async (member_id) => {
    try {
      // Call the importBooks function to make the API request
      const result = await deleteMember(member_id);
      
      console.log('Member Deleted:', result);
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== member_id));
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error(error.response.data.message);
    }
  };

  return (
    <div className='form1'>
      <h2>Member List</h2>
      <div className="member-list-container">
        {members.map((member) => (
          // <MemberDetailsBox key={member.id} member={member} />
          <div className="member-details-box">
            <p><b>Name:</b> {member.name}</p>
            <p><b>Dept:</b> {member.outstanding_debt}</p>
            <button onClick={() => handleEdit(member.id)}>Edit</button>
            <button onClick={() => handleDelete(member.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberList;

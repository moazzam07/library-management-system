import React, { useEffect, useState } from 'react';
import '../styles/form.css'
import { fetchMembers } from '../services/api';



const MemberList = () => {
  const [members, setMembers] = useState([])

  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        const result = await fetchMembers();
        setMembers(result.members)
        console.log("hi")
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error Creating Member:', error);
      }
    };
    fetchMembersData();
  }, []);
  
  return (
    <div className='form'>
      <h2>Member List</h2>
      <ul className='book-list'>
        
        {members.map((member) => (
          <li key={member.id} className='book-item'>
            <p>
            {member.id}{'. '}
            <span className='book-title'>
            Name: {member.name}{' '}</span>
            <span className='book-title'>Debt:</span> {' '}{member.outstanding_debt}</p>
            
            <button onClick={() => console.log("deleted")}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
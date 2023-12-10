import React from 'react';
import '../styles/form.css'


const MemberList = ({ members, onDelete }) => {
  return (
    <div className='form'>
      <h2>Member List</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            {member.name}{' '}
            <button onClick={() => onDelete(member.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
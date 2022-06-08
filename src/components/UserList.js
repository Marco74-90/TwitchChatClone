import React from 'react';
import {FaHorseHead, FaSmile} from 'react-icons/fa'

export default function UserList ({users}){

    return(

        <div className="userList-container">
            {users?.map(user =>(
                <li key={user.id}>
                    {user.role == 'user' ? <FaHorseHead/> : <FaSmile/>}
                    <p>{user.name}</p>
                </li>
            ))}

        </div>

    )

}
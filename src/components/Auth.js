import React from 'react';
import {useState} from 'react'
import axios from 'axios'

export default function Auth(){

    const [isLogin, setIsLogin] = useState(true)
    const [username,setUsername] = useState(" ")
    const [password,setPassword] = useState(" ")
    const [confirmPassword,setConfirmPassword] = useState(" ")
    const [error, setError] = useState(false)

    const handleSubmit = async () => {
        if(password !== confirmPassword) {
            setError(true)
            return 
        }
        const response = await axios.post(`https://localhost:8000/signup`,{
            username, 
            password
        })

        console.log(response)
    }

    return(

        <div className='auth-container'>
            <div className='auth-container-box'>
                <div className="auth-form">
                    <input
                    type='text'
                    id='username'
                    name='username'
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                    type='text'
                    id='password'
                    name='password'
                    placeholder='password'
                    onChange={(e) => setPassword(e.target.value)}
                    />
                  { !isLogin && <input
                    type='text'
                    id='password-check'
                    name='password-check'
                    placeholder='Confirm password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    {error && <p>Passwords do not match!</p>}
                    <button className="standard-button"onClick={handleSubmit}>Log In</button>
                </div>
                    <div className="auth-options">
                        <button
                         onClick={() => setIsLogin(true) }
                         style={{backgroundColor: !isLogin ? '#151a1f' : '#070a0d'}}>Login</button>
                        <button 
                        onClick={() => setIsLogin(false)}
                        style={{backgroundColor: isLogin ? '#151a1f' : '#070a0d'}}>Sign Up</button>
                    </div>
            </div>

        </div>

    )

}
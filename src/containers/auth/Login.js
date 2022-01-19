import React, { useState, useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {

        const authToken = sessionStorage.getItem('Auth key')
        if (authToken) navigate('/home')

    }, [])

    const registerHandler = async () => {
        
        try {
            const response = await signInWithEmailAndPassword( getAuth(), email, password );
            sessionStorage.setItem('Auth key', response._tokenResponse.refreshToken);
            navigate('/home')
            
        } catch (error) {
            toast.error(error.message, { pauseOnHover: true });
        }

    }

    return (
        <div className="layout">
            <h2>Login Page</h2>
            <Form className='custom-form'>
                <Form.Field>
                    <label>Email</label>
                    <input type="email"
                           placeholder='Enter your Email ID'
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Enter your Password'
                           type="password"
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Field>
                <Button color="blue" 
                        type='submit' 
                        onClick={registerHandler}>Submit</Button>
            </Form>
            <ToastContainer />
        </div>
    )
}

export default Login 
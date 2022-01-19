import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerHandler = async () => {

        const authentication = getAuth();

        try {
            await createUserWithEmailAndPassword(authentication, email, password);
            setEmail('')
            setPassword('')
            navigate('/login')
            
        } catch (error) {
            toast.error(error.message, { pauseOnHover: true });
        }

    }
    return (
        <div className='layout'>
            <h2>Register Page</h2>
            <Form className='custom-form'>
                <Form.Field>
                    <label>Email</label>
                    <input type="email"
                           placeholder='Enter your Email ID'
                           value={ email }
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Enter your Password'
                           type="password"
                           value={ password }
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

export default Register
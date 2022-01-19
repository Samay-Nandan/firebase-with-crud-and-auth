import React, { useState, useEffect } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { database } from '../../firebase-config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Update = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search);
    const id = query.get("id")
    const databaseRef = doc(database, 'react-firebase', id);

    const [newName, setName] = useState('');
    const [newAge, setAge] = useState('');
    const [newPhone, setPhone] = useState('');

    useEffect(() => {

        const getData = async () => {

            try {
    
                const document = await getDoc(databaseRef);
                if( !document.data() ) return toast.error('No Data found with the provided id', { pauseOnHover: true });
                const { name, age, phone } = document.data();
                setName(name);
                setAge(age);
                setPhone(phone);
    
            } catch (error) {
                toast.error(error.message, { pauseOnHover: true });
            }
    
        }

        getData();

    }, [])

    const updatedDataHandler = async () => {

        try {
            await updateDoc(databaseRef, {name: newName, age: Number(newAge), phone: Number(newPhone)})
            navigate('/home');

        } catch (error) {
            toast.error(error.message, { pauseOnHover: true });
        }

    }

    return (
        <div className='layout'>
            <h2>Update Data</h2>
            <Form className='custom-form'>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name'
                           type='text'
                           value={newName}
                           onChange={(e) => setName(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Age</label>
                    <input placeholder='Age'
                           type='number'
                           value={newAge}
                           onChange={(e) => setAge(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Phone Number</label>
                    <input placeholder='Phone Number'
                           type='number'
                           value={newPhone}
                           onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Field>
                <Button color="facebook" 
                        type='submit' 
                        onClick={updatedDataHandler}>Update</Button>
            </Form>
            <ToastContainer />
        </div>
    )
}

export default Update;
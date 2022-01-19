import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react';
import { database } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

const defaultFormState = {
    name: '',
    age: '',
    phone: ''
}

const Create = () => {

    const databaseRef = collection(database, 'react-firebase');

    const [ formState, setFormState ] = useState(defaultFormState);

    const createDataHandler = async () => {

        try {
            await addDoc(databaseRef, formState);
            toast.success("Data Created Successfully!", { pauseOnHover: true });
            setFormState(defaultFormState)

        } catch (error) {
            toast.error(error.message, { pauseOnHover: true });
        }

    }

    const inputChangeHandler = (e) => setFormState({ ...formState, [e.target.name]: e.target.value })

    return (
        <div className='layout'>
            <h2>Create Data</h2>
            <Form className='custom-form'>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name'
                           type="text"
                           name='name'
                           value={formState.name}
                           onChange={inputChangeHandler} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>Age</label>
                    <input placeholder='Age'
                           type="number"
                           name='age'
                           value={formState.age}
                           onChange={inputChangeHandler}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Phone Number</label>
                    <input placeholder='Phone Number'
                           type='number'
                           name='phone'
                           value={formState.phone}
                           onChange={inputChangeHandler}
                    />
                </Form.Field>
                <Button color="facebook" 
                        type='submit' 
                        onClick={createDataHandler}>Submit</Button>
            </Form>
            <ToastContainer />
        </div>
    )
}

export default Create
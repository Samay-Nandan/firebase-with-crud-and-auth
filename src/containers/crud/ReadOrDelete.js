import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { database } from '../../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';

const ReadOrDelete = () => {

    const databaseRef = collection(database, 'react-firebase');

    const navigate = useNavigate();

    const [userData, setUserData] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        
        const authToken = sessionStorage.getItem('Auth key')

        if (authToken) navigate('/home')
        else navigate('/login')

        const getData = async () => {

            try {
                const { docs } = await getDocs(databaseRef);
                setUserData(docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                setUpdate(false);

            } catch (error) {
                toast.error(error.message, { pauseOnHover: true });
            }

        }

        getData()

    }, [ update ])

    const deleteHandler = async (id) => {

        try {
            const data = doc(database, 'react-firebase', id);
            await deleteDoc(data)
            setUpdate(true)
            toast.success("Data Deleted Successfully!", {  pauseOnHover: true });

        } catch (error) {
            toast.error(error.message, { pauseOnHover: true });
        }
    }
    
    const handleLogout = () => {
        sessionStorage.removeItem('Auth key');
        navigate('/login')
    }

    return (
        <div className='layout'>
            <h2>Home Page</h2>
            <Button color="red" onClick={handleLogout}>Log Out</Button>
            {
                userData.map(({ id, name, age, phone }) => {
                    return (
                        <div className='show-user-data' key={id}>
                            <h3>Name: {name}</h3>
                            <h3>Age: {age}</h3>
                            <h3>Phone Number: {phone}</h3>

                            <Button color="black" 
                                    onClick={() => navigate(`/update?id=${id}`)}>
                                Update this field
                            </Button>

                            <Button color="red" 
                                    onClick={() => deleteHandler(id)}>
                                    Delete this field
                            </Button>
                        </div>
                    )
            })}
            <ToastContainer />
        </div>
    )
}

export default ReadOrDelete;
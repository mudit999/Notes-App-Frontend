import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container,Card } from "react-bootstrap";
import MainScreen from '../../components/MainScreen';
import axios from 'axios';
import "./MyNotes.css";
import Masonry from 'react-masonry-css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import './../../toastifyCustomStyles.css';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = () => {

    const [notes,setNotes] = useState([]);
    const [error, setError] = useState(false);
    const baseUrl = "https://notes-app-backend.cyclic.app/";
    // const baseUrl = "http://localhost:5320/";


    const deleteHandler = async(id) => {
          const {data} = await axios.delete(`${baseUrl}api/notes/delete/${id}`);
          console.log(data);
          toast.success("Note Deleted", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000
          });
    }

    const loginInfo = window.localStorage.getItem('userLogin');
    // converting string data to json
    const userData = JSON.parse(loginInfo);

    const fetchNotes = async() => {
        try{
            const {data} = await axios.get(`${baseUrl}api/notes/${userData._id}`);
                setNotes(data);
        }catch(error){
            setError(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchNotes();
    },[notes])

    const breakpoints = {
        default: 3,
        1100: 2,
        700: 1,
    }
    
    return(
        <Container>
            <MainScreen>
                <h3>Welcome to Notes App, {userData.name}</h3>

                <Link to='/mynotes/createNote'>
                    <button className='createButton'>
                        Create
                    </button>
                </Link>

                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}

                <Masonry
                    breakpointCols={breakpoints}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column">
                        {
                            notes.map(note => (
                                <div key='note._id'>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title >{note.title}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">{note.category}</Card.Subtitle>
                                            <Card.Text>{note.content}</Card.Text>
                                            <div>
                                                <Link to = {`/mynotes/editNote/${note._id}`}>
                                                    <EditIcon style={{ color: '#1a2456'}}/>
                                                </Link>
                                                
                                                <DeleteIcon style={{ color: '#d62929', cursor: 'pointer' }}  onClick={() => deleteHandler(note._id)}/>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))
                        }

                </Masonry>
            </MainScreen>
        </Container>
    )
}

export default MyNotes;
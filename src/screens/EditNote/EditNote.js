import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Form } from 'react-bootstrap';
import MainScreen from '../../components/MainScreen';
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import "./EditNote.css";
import { toast } from 'react-toastify';
import './../../toastifyCustomStyles.css';

const EditNote = () => {

    const navigation = useNavigate();

    const params = useParams();
    
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [category,setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const baseUrl = "https://notes-app-backend.cyclic.app/";
    // const baseUrl = "http://localhost:5320/";


    // Firstly get the original note
    const getNote = async () => {
        const {data} = await axios.get(`${baseUrl}api/notes/getnote/${params.noteid}`)
        
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
    } 
    
    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
                const config = {
                    headers: {
                        "Content-type" : "application/json",
                    }
                }

                setLoading(true);
                const { data } = await axios.put(`${baseUrl}api/notes/update/${params.noteid}`,{
                    title,
                    content,
                    category
                }, config)
                setLoading(false)

                // console.log(data);

                toast.success("Note Edited", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1000
                  });
                navigation('/mynotes');
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message);
        }
    }

    useEffect(() =>{        
        getNote();
    },[params.noteid])

    return(
        <MainScreen title='Edit Note'>
            <div className='editContainer'>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading></Loading>}
            <Form onSubmit={formSubmitHandler} className='formStyles'>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        required 
                        type="text"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        required 
                        type="text" 
                        value={category}
                        onChange={(e) => {setCategory(e.target.value)}} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea" 
                        rows={7}
                        type="text"
                        value={content}
                        onChange={(e) => {setContent(e.target.value)}} />
                </Form.Group>

                <div className='btnSection'>
                    <button className='goBackButton' onClick={() => {navigation('/mynotes')}}>
                        Cancel
                    </button>
                    
                    <button type="submit" className='submitButton'>
                        Done
                    </button>
                </div>
            </Form>
            </div>
        </MainScreen>
    )
}

export default EditNote;
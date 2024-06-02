import React,{useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteRecord = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const { id } = useParams();
    const handleDeleteRecord = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/records/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Record deleted successfully', {variant: 'success'});
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar('Failed to delete record', {variant: 'error'});
                setLoading(false);
            });
    };
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3xl my-4'>Delete Record</h1>
        {loading?<Spinner/> :''}
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Are you sure you want to delete this record?</h3>
                <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteRecord}>Yes, Delete it!</button>
            </div>
    </div>
  )
}


export default DeleteRecord;
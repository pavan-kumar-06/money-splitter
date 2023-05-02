import React, { useEffect, useState } from 'react'
import DynamicEvent from '../components/DynamicEvent';
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify';
import { getAuth } from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function Event() {
  const navigate = useNavigate();
  const auth = getAuth();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    event_name: "",
    present: [],
    amountPaid:[],
    user_names:[],
    amountOwed:[],
    image_url:"",
    description:""
  });
  const {
    event_name,
    present,
    amountPaid,
    amountOwed,
    image_url,
    description,
    user_names
  } = formData;
  //query for usernames.length to store amount 
  useEffect(() => {
    async function fetchEvent() {
      const docRef = doc(db, "events", params.eventId);
      setLoading(true);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const event = docSnap.data()
        if (event !== null && auth !== null && auth.currentUser !== null && event.userRef !== auth.currentUser.uid) {
            toast.error("You are unautherised to access event");
            navigate("/");
        }    
        setFormData(event);
      }
      else{
        toast.error("trip details not found");
        navigate("/");
      }
        setLoading(false);      
    }
    fetchEvent();
  }, [params.eventId]);


  if (loading) {
    return <Spinner />;
  }

  return (
    <div >
      <form className='items-center px-3 max-w-3xl mx-auto'>
        <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Event Name
            </label>
            <input 
            value={event_name}
            type="text" 
            id="event_name" 
            className="items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter Event Name" 
            required/>
        </div>
        <DynamicEvent user_names = {user_names} amountPaid = {amountPaid} amountOwed={amountOwed} present = {present} />
        <div>
            <label  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Description
            </label>
            <textarea 
            value={description}
            type="text" 
            id="description" 
            className="items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter Description Hastags etc" 
            required/>
        </div>
        <div>
            <label  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Image Url
            </label>
            <input 
            value={image_url}
            type="text" 
            id="image_url" 
            className="items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter Image Url" 
            required/>
        </div>
      </form>
    </div>
    
  )
}

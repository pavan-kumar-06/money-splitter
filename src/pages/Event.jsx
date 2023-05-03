import React, { useEffect, useState } from 'react'
import DynamicEvent from '../components/DynamicEvent';
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify';
import { getAuth } from "firebase/auth";
import { deleteDoc, doc, getDoc} from "firebase/firestore";
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

  async function handleDelete(){
    if (window.confirm("Are you sure you want to delete?")) {
      setLoading(true);
      await deleteDoc(doc(db, "events", params.eventId));
      setLoading(false);
      navigate('/')
      toast.success("Successfully deleted the listing");
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
      <div className='items-center px-3 max-w-3xl mx-auto'>
        <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Event Name
            </label>
            <p
            className="items-center text-l" 
            >
              {event_name}
            </p>
        </div>
        <DynamicEvent user_names = {user_names} amountPaid = {amountPaid} amountOwed={amountOwed} present = {present} />
        <div>
            <label  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Description
            </label>
            <p
            className="items-center text-l" 
            >
              {description}
            </p>
        </div>
        <div>
            <label  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Image Url
            </label>
            <p
            className="items-center text-l" 
            >
              {image_url}
            </p>
        </div>
        <div className="flex justify-center">
        <button onClick={()=>navigate(`/update-event/${params.eventId}`)} type="button" className=" basis-1/4 mr-4 mb-4 max-w-2xl text-white uppercase text-bold  bg-blue-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4">
          Update Event
        </button>
        <button type="button" onClick={handleDelete} className="basis-1/4 mb-4 max-w-2xl text-white uppercase text-bold  bg-blue-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4">
          Delete Event
        </button>
        </div>
    </div>
  )
}

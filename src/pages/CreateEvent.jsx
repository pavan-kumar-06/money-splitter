import React, { useEffect, useState } from 'react'
import DynamicEventInput from '../components/DynamicEventInput';
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify';
import { getAuth } from "firebase/auth";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function CreateEvent() {
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
  //get changed in input fields
  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: (e.target.value),
    }));
  }
  //change child changing parent state
  function onChangeChild(amountChange,amountPaid,amountOwed){
    if(amountChange === true){
        
    }else{
        present[amountPaid] = amountOwed;
    }
    setFormData((prevState) => ({
        ...prevState,
        amountPaid: amountPaid,
        amountOwed:amountOwed,
        present: present
    }));
  }
  //get changed in input fields
  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: (e.target.value),
    }));
  }
  //change child changing parent state
  function onChangeChild(amountChange,amountPaid,amountOwed){
    if(amountChange === true){
        
    }else{
        present[amountPaid] = amountOwed;
    }
    setFormData((prevState) => ({
        ...prevState,
        amountPaid: amountPaid,
        amountOwed:amountOwed,
        present: present
    }));
    // console.log(amountPaid,amountOwed,present);
  }
  //query for usernames.length to store amount 
  useEffect(() => {
    async function fetchTrip() {
      const docRef = doc(db, "trips", params.tripId);
      setLoading(true);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const trip = docSnap.data()
        // console.log(docSnap.data(),auth.currentUser.uid)
        if (trip !== null && auth !== null && auth.currentUser !== null && trip.userRef !== auth.currentUser.uid) {
            toast.error("You are unautherised to add event");
            navigate("/");
        }    
        setFormData({
            ...formData,
            user_names:trip.user_names,
            amountPaid: Array(trip.user_names.length).fill(0),
            amountOwed: Array(trip.user_names.length).fill(0),
            present: Array(trip.user_names.length).fill(false),
          });
      }
      else{
        toast.error("trip details not found");
        navigate("/");
      }
        setLoading(false);      
    }
    fetchTrip();
  }, [params.tripId]);


  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // if(equal === false && totalPaid !== totalOwed){
    //   toast.error("Toal paid and total owed must be equal")
    //   return;
    // }
    const formDataCopy={
      ...formData,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
      tripId:params.tripId
    }
    const docRef = await addDoc(collection(db, "events"), formDataCopy);
    setLoading(false);
    toast.success("Event created");
    navigate(`/trip/${params.tripId}`);
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div >
      <form onSubmit={onSubmit} className='items-center px-3 max-w-3xl mx-auto'>
        <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Event Name
            </label>
            <input 
            value={event_name}
            onChange={onChange}
            type="text" 
            id="event_name" 
            className="items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter Event Name" 
            required/>
        </div>
        <DynamicEventInput user_names = {user_names} amountPaid = {amountPaid} amountOwed={amountOwed} present = {present} onChangeChild={onChangeChild}/>
        <div>
            <label  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Description
            </label>
            <textarea 
            value={description}
            onChange={onChange}
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
            onChange={onChange}
            type="text" 
            id="image_url" 
            className="items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter Image Url" 
            required/>
        </div>
        <button type="submit" className=" mb-4 max-w-3xl text-white uppercase text-bold  bg-blue-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4">
          Create new Event
        </button>
      </form>
    </div>
    
  )
}
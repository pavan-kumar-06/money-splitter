import React, { useState } from 'react'
import DynamicInput from '../components/DynamicInput';
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify';
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom';

export default function CreateTrip() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    trip_name: "",
    user_names: [""],
    image_url:"",
    description:""
  });
  const {
    trip_name,
    user_names,
    image_url,
    description
  } = formData;
  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: (e.target.value),
    }));
  }
  
  function onChangeUserName({value,id}){
    user_names[id] = value
    setFormData((prevState) => ({
      ...prevState,
      user_names
    }));
  }

  function insertUserName(){
    user_names.push("")
    setFormData((prevState) => ({
      ...prevState,
      user_names
    }));
  }

  function deleteUserName({names}){
    // user_names.splice(id,1);
    setFormData((prevState) => ({
      ...prevState,
      user_names:names
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (user_names.length === 0) {
      setLoading(false);
      toast.error("Enter atleast one user name");
      return;
    }
    const formDataCopy={
      ...formData,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    }
    const docRef = await addDoc(collection(db, "trips"), formDataCopy);
    setLoading(false);
    toast.success("Listing created");
    // navigate(`/category/${formDataCopy.type}/${docRef.id}`);
    navigate('/');
  }
  if (loading) {
    return <Spinner />;
  }

  return (
    <div >
      <form onSubmit={onSubmit} className='items-center px-3 max-w-3xl mx-auto'>
        <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
              Trip Name
            </label>
            <input 
            value={trip_name}
            onChange={onChange}
            type="text" 
            id="trip_name" 
            className="items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Enter Trip Name" 
            required/>
        </div>
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
        <DynamicInput user_names = {user_names} change={onChangeUserName} delete={deleteUserName}/>
        <button onClick={insertUserName} className="text-white uppercase text-bold  bg-blue-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4">
          New User
        </button>
        <button type="submit" className="max-w-3xl text-white uppercase text-bold  bg-blue-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4">
          Create new Trip
        </button>
      </form>
    </div>
    
  )
}

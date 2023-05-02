import React, { useState } from 'react'

export default function DynamicInput(props) {
    const [names, setNewNames] = useState(props.user_names);
   function handleChange(event) {
      let value = event.target.value;
      let id = event.currentTarget.id;
      names[id] = value
      setNewNames(names);
      props.change({value,id});
   }    
   function handleDelete(event){
    // event.preventDefault();
    let id = event.currentTarget.id;
    names.splice(id,1);
    setNewNames(names);
    props.delete({names});
}
    return (
    <div>
        <label  className="block mb-2 text-lg font-medium text-gray-900 dark:text-white mt-4">
                    Enter User Names
                </label>
      {names.map((name,id) => {
        return(
            <div className='flex flex-row' key={id}>
                <input 
                value={name}
                onChange={handleChange}
                type="text" 
                id={id} 
                className="basis-3/4 items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4" 
                placeholder="Enter User Name" 
                required/>
                <button className=" basis-1/4 ml-4 text-white uppercase items-center px-3 mx-auto bg-red-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-red-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 mt-4"
                type="button" id={id} onClick={handleDelete}>Delete User</button>
            </div>
        )
      })}
    </div>
    )
}

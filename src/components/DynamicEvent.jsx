import React, { useState } from 'react'
import Spinner from './Spinner';

export default function DynamicEventInput(props) {
    const [names, setNewNames] = useState(props.user_names);
    const [amountPaid,setAmountPaid] = useState(props.amountPaid);
    const [amountOwed,setAmountOwed] = useState(props.amountOwed);
    const [present,setPresent] = useState(props.present);
    const [loading,setLoading] = useState(false);
    // console.log(names,amountPaid,amountOwed)
    //onChangeChild({amountChange,value,id}) -> is passed should call using props.onChangeChild
    if(loading === true)return <Spinner/>
  return (
    <div>        
        <table className="table-auto mt-3">
            <thead>
            <tr>
                <th>User Name</th>
                <th>Amount Paid</th>
                <th>Amount Owed</th>
                <th>Present</th>
            </tr>
            </thead>
            <tbody>
                {names!== null && names.map((name,id) => {
                    return(
                        <tr key={id}>
                            <td>{name}</td>
                            <td>
                                <input 
                                    readOnly="readonly"
                                    value={present[id]===true ? amountPaid[id] : 0}
                                    type="number" 
                                    min={0}
                                    id={id} 
                                    className="basis-1/4 items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4" 
                                    placeholder="Enter Amount Spent" 
                                    required/>
                            </td>
                            <td>
                                <input 
                                    readOnly="readonly"
                                    value={present[id]===true ? Math.round(amountOwed[id] * 100) / 100
                                    : 0}
                                    // readOnly = {present[id]===true ? "" : "readonly"}
                                    type="number" 
                                    id={id} 
                                    className="basis-1/4 items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4" 
                                    placeholder="Enter Amount Spent" 
                                    required/>
                            </td>
                            <td>
                                <input
                                    readOnly="readonly"
                                    type="checkbox"
                                checked={present[id]}
                                id={id} 
                                className="basis-1/4 items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4" 
                                />
                            </td>                                
                        </tr>
                            )
                })}
            </tbody>
        </table>
    </div>
  )
}

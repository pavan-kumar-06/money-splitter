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
    function onChange(e,change){
        let value = e.target.value;
        let id = e.currentTarget.id;
          setLoading(true);
        if(change === 'amountPaid'){
            if(isNaN(parseFloat(value)))
            amountPaid[id] = 0;
            else
            amountPaid[id] = parseFloat(value)
            setAmountPaid(amountPaid);
        }
        else if(change === 'amountOwed'){
            amountOwed[id] =parseFloat(value);
            setAmountOwed(amountOwed);
            props.onChangeChild(true,value,id);
        }
        else if(change === 'present'){
            present[id] = !present[id];
            setPresent(present);
            props.onChangeChild(false,present[id],id);
        }
        calculatedOwed();
        props.onChangeChild(true,amountPaid,amountOwed);

        setLoading(false);
    }
    function calculatedOwed(){
        let totalPresent = 0;
        let totalPaid = 0;
        for(let i=0;i<amountPaid.length;i++){
            if(present[i] === true)
            {
                totalPresent = totalPresent+1;
                totalPaid += parseFloat(amountPaid[i]);
            }
        }
        if(totalPresent < 1)return;
        let avg = totalPaid/totalPresent;
        for(let i=0;i<amountPaid.length;i++){
            if(present[i] === true)amountOwed[i] = avg;
        }
        setAmountOwed(amountOwed);
    }
    if(loading === true)return <Spinner/>
  return (
    <div className='flex '>        
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
                                    value={present[id]===true ? amountPaid[id] : 0}
                                    readOnly = {present[id]===true ? "" : "readonly"}
                                    onChange={(e)=>(onChange(e,'amountPaid'))}
                                    type="number" 
                                    min={0}
                                    id={id} 
                                    className="basis-1/4 items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4" 
                                    placeholder="Enter Amount Spent" 
                                    required/>
                            </td>
                            <td>
                                <input 
                                    value={present[id]===true ? Math.round(amountOwed[id] * 100) / 100
                                    : 0}
                                    // readOnly = {present[id]===true ? "" : "readonly"}
                                    readOnly ="readonly"
                                    onChange={(e)=>(onChange(e,'amountOwed'))}
                                    type="number" 
                                    id={id} 
                                    className="basis-1/4 items-center px-3 max-w-1.5xl mx-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4" 
                                    placeholder="Enter Amount Spent" 
                                    required/>
                            </td>
                            <td>
                                <input
                                onChange={(e)=>onChange(e,'present')}
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
        {/* drop down menu code simple in react bootstrap than in react taiwind css*/}
         
    </div>
  )
}

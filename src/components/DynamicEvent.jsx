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
        <table className="mt-4 mb-4 min-w-full border text-center text-sm font-light dark:border-neutral-500">
            <thead className='border-b font-medium dark:border-neutral-500'>
            <tr>
                <th className='border-r px-6 py-4 dark:border-neutral-500'>User Name</th>
                <th className='border-r px-6 py-4 dark:border-neutral-500'>Amount Paid</th>
                <th className='border-r px-6 py-4 dark:border-neutral-500'>Amount Owed</th>
                <th className='border-r px-6 py-4 dark:border-neutral-500'>Present</th>
            </tr>
            </thead>
            <tbody>
                {names!== null && names.map((name,id) => {
                    return(
                        <tr key={id} className='border-b dark:border-neutral-500'>
                            <td className='whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500'>{name}</td>
                            <td className='whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500'>
                                {present[id]===true ? amountPaid[id] : 0}
                            </td>
                            <td className='whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500'>
                                {present[id]===true ? Math.round(amountOwed[id] * 100) / 100 : 0}
                            </td>
                            <td className='whitespace-nowrap border-r px-6 py-4 font-medium dark:border-neutral-500'>
                                {present[id] ? "Yes" : "No"}
                            </td>                                
                        </tr>
                            )
                })}
            </tbody>
        </table>
    </div>
  )
}

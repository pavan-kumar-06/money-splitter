import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useEffect } from "react";
import Chart from "./Chart";

export default function Summary({tripId}) {
    const auth = getAuth();
    const [loading, setLoading] = useState(false);
    const [events,setEvents] = useState([]);
    const [summary,setSummary] = useState([]);
    const [paidData,setPaidData] = useState([]);
    const [spentData,setSpentData] = useState([]);
    const [paidChartOptions,setPaidChartOptions] = useState(null);
    const [spentChartOptions,setSpentChartOptions] = useState(null);

    useEffect(() => {
        async function fetchAllEvents() {
          setLoading(true)
          const eventsRef = collection(db, "events");
          const q = query(
            eventsRef,
            where("tripId", "==", tripId),
            orderBy("timestamp", "desc")
          );
          const querySnap = await getDocs(q);
          let listings = [];
          querySnap.forEach((doc) => {
                return listings.push(doc.data());
            })
          setEvents(listings)
          setLoading(false);
        }
        fetchAllEvents()
      }, [auth.currentUser.uid]);

      function onClick() {
        setLoading(true)
        if(events === null || events.length<1){
          setLoading(false);
          return;
        }
        let amount = Array(events[0].user_names.length).fill(0);
        let spentAmount = Array(events[0].user_names.length).fill(0);

        events.map((event,id)=>{
            event.user_names.map((name,id)=>{
              if(event.present[id] === true){
                amount[id] += parseFloat(event.amountPaid[id]) - parseFloat(event.amountOwed[id]);
                spentAmount[id]+=parseFloat(event.amountOwed[id]);
              }
            })
        })
        const data = [];
        const pdata=[];
        const sdata=[]
        const final =[];
        events[0].user_names.map((name,id)=>{
            data.push({user_name:name,amount:amount[id]})
            pdata.push({name:name,amount_getting_back:amount[id]>0?(Math.round(amount[id] * 100) / 100):0})
            sdata.push({name:name,amount_spent:(Math.round(spentAmount[id]* 100) / 100)})
          })
        console.log(amount,pdata,sdata,events);
        data.sort((a,b)=> b.amount-a.amount);
        pdata.sort((a,b)=> b.amount_getting_back-a.amount_getting_back);
        sdata.sort((a,b)=> b.amount_spent-a.amount_spent);

        // console.log("After complete",data)

        let l = 0,r = data.length-1;
        while(l<r){
            const minAmount = Math.min(Math.abs(data[l].amount),Math.abs(data[r].amount));
            if(minAmount==0)break;
            data[l].amount-=minAmount;
            data[r].amount+=minAmount;
            final.push(`${data[r].user_name} pays ${data[l].user_name}  amount: ${Math.round(minAmount * 100) / 100}`)
            // console.log(summary.back())
            if(data[l].amount <= 0)l++;
            if(data[r].amount <= 0)r--;
        }
        // console.log(final);
        setSummary(final);
        setPaidData(pdata);
        setSpentData(sdata);
        setTimeout(()=>setLoading(false),200);
        // setLoading(false)
      }
      if(loading){
        return <div className="mt-6 flex items-center justify-center"><p>Loading ...</p></div>
      }

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <button className=" max-w-[20%] mr-3 text-white uppercase text-bold  bg-blue-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4" onClick={onClick}>
            Get Summary</button>
      </div>
      <div className="text-center mt-3 mb-3">
          {summary !== null && summary.length>0 && summary.map((val,id)=>{
              return <div key={id}><p className="text-lg bold">{val}</p></div>
          })}
      </div>
      <div className="mt-3 mb-3">
        <Chart paidData={paidData} spentData={spentData}/>
      </div>
    </div>
  )
}

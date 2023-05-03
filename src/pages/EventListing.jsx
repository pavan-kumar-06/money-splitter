import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import Summary from "../components/Summary";

export default function EventListing() {
  const auth = getAuth();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events,setEvents] = useState(null);
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        // get reference
        const eventsRef = collection(db, "events");
        // create the query
        // console.log(params.tripId)
        const q = query(
          eventsRef,
          where("tripId", "==", params.tripId),
          orderBy("timestamp", "desc"),
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setEvents(listings);
        setLoading(false);
      }
      catch(error){
        toast.error("trip details not found");
        navigate("/");
      }
    }
    fetchEvents();
  }, [params.tripId]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="items-center px-3 max-w-6xl mx-auto">
    <div className="flex flex-row flex-wrap items-center px-3 max-w-6xl mx-auto">
      <div className="flex flex-row flex-wrap items-center px-3 max-w-6xl mx-auto">
        {events!==null && events.length>0 && events.map((event,id) => {
        return(
            <Link to={`/event/${event.id}`} key={id}>
                <div className="w-40 rounded overflow-hidden shadow-lg m-3 " >
                    <img className="h-30 w-40" src={event.data.image_url} alt="Event Image"/>
                    <div className="px-6 py-4">
                        <div className="uppercase font-bold text-xl mb-2">{event.data.event_name}</div>
                        <p className="text-gray-700 text-base">
                            {event.data.description}
                        </p>
                    </div>
                </div>
            </Link>
            )
        })}
    </div>
    </div>
    <div className="flex items-center justify-center">
      <button  onClick={()=>navigate(`/create-event/${params.tripId}`)}className="max-w-[20%] mr-3 text-white uppercase text-bold  bg-blue-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4">
          New Event
      </button>
    </div>
    <Summary tripId={params.tripId}/>
    </div>
  )
}

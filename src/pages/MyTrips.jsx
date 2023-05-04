import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { db } from "../firebase";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

export default function MyTrips() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchUserTrips() {
          setLoading(true)
          const tripsRef = collection(db, "trips");
          const q = query(
            tripsRef,
            where("userRef", "==", auth.currentUser.uid),
            orderBy("timestamp", "desc")
          );
          const querySnap = await getDocs(q);
          let trips = [];
          querySnap.forEach((doc) => {
            return trips.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          setTrips(trips);
          setLoading(false);
        }
        fetchUserTrips();
      }, [auth.currentUser.uid]);

      if(loading)return <Spinner/>
    return (
    <>
    <div className="flex flex-row flex-wrap items-center px-3 max-w-6xl mx-auto">
        {trips.map((trip,id) => {
        return(
            <Link to={`/trip/${trip.id}`} key={id}>
                <div className="w-40 rounded overflow-hidden shadow-lg m-3 " >
                    <img className="h-30 w-40" src={"image_url" in trip.data ? trip.data.image_url : "https://picsum.photos/seed/picsum/500/300"} alt="Trip Image"/>
                    <div className="px-6 py-4">
                        <div className="uppercase font-bold text-xl mb-2">{trip.data.trip_name}</div>
                        <p className="text-gray-700 text-base">
                            {trip.data.description}
                        </p>
                    </div>
                </div>
            </Link>
            )
        })}
    </div>
    <div className="flex items-center justify-center">
      <button  onClick={()=>navigate(`/create-trip`)}className="max-w-[20%] mr-3 text-white uppercase text-bold  bg-blue-500 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4">
          New Event
      </button>
    </div>
    </>
  )
}

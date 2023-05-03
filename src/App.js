import './App.css';
import Header from "./components/Header";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateTrip from "./pages/CreateTrip";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyTrips from './pages/MyTrips';
import EventListing from './pages/EventListing';
import CreateEvent from './pages/CreateEvent';
import Event from './pages/Event';
import UpdateEvent from './pages/UpdateEvent';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<MyTrips />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/create-trip" element={<PrivateRoute />}>
            <Route path="/create-trip" element={<CreateTrip />}/>
          </Route>
          <Route path="/create-event/:tripId" element={<PrivateRoute />}>
            <Route path="/create-event/:tripId" element={<CreateEvent/>}/>
          </Route>
          <Route path="/update-event/:eventId" element={<PrivateRoute />}>
            <Route path="/update-event/:eventId" element={<UpdateEvent/>}/>
          </Route>
          <Route
            path="/trip/:tripId"
            element={<EventListing />}
          />
          <Route
            path="/event/:eventId"
            element={<Event />}
          />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;

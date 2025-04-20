import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Main Pages
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import PlanEcoTrip from '../pages/Plantrip';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import HelpUs from '../pages/Helpus';
import Output from '../pages/OutputPage';

// Account Pages (Nested)
import MyAccount from '../pages/account/MyAccount';
import SearchHistory from '../pages/account/SearchHistory';
import AccountSettings from '../pages/account/AccountSettings';
import TripPlanner from '../pages/Plantrip';
import PrivateRoute from '../components/PrivateRoute';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/plantrip" element={<PlanEcoTrip />} />
      <Route path="/output" element={<Output />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/helpus" element={<HelpUs />} />

      {/* Nested Routes for My Account */}
      <Route path="/account" element={<MyAccount />}>
  <Route index element={<Navigate to="history" replace />} />
  <Route path="history" element={<SearchHistory />} />
  <Route path="settings" element={<AccountSettings />} />
</Route>
<Route path="/trip" element={
            <PrivateRoute><TripPlanner /></PrivateRoute>
          } />

    </Routes>
  );
};

export default AllRoutes;

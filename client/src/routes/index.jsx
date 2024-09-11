import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../views/user/Home";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../views/admin/Dashboard";
import AddVenue from "../views/admin/VenueManagement/AddVenue";
import ListVenue from "../views/admin/VenueManagement/ListVenue";
import UpdateVenue from "../views/admin/VenueManagement/UpdateVenue";
import ListUser from "../views/admin/UserManagement/ListUser";
import AddUser from "../views/admin/UserManagement/AddUser";
import UpdateUser from "../views/admin/UserManagement/UpdateUser";
import ListEvent from "../views/admin/EventManagement/ListEvent";
import AddEvent from "../views/admin/EventManagement/AddEvent";
import UpdateEvent from "../views/admin/EventManagement/UpdateEvent";
import ListReview from "../views/admin/ReviewManagement/ListReview";
import Events from "../views/user/Events";
import Seats from "../views/user/Seats";
import Login from "../views/user/Login";
import Profile from "../views/user/Profile";
import ViewEvent from "../views/user/ViewEvent";
import Register from "../views/user/Register";
import PaymentForm from "../components/PaymentForm";
import ReceptionistLayout from "../layouts/ReceptionistLayout";
import ScanQR from "../views/receptionist/ScanQR";
import OrganizerLayout from "../layouts/OrganizerLayout";
import ForgotPassword from "../views/user/ForgotPassword";
import ResetPassword from "../views/user/ResetPassword";
import ContactUs from "../views/user/ContactUs";
import ContactList from "../views/admin/FeedbackManagement/ContactList";

const FrontendRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/view/:id" element={<ViewEvent />} />
            <Route path="/seats/:id" element={<Seats />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="venues">
              <Route path="" element={<ListVenue />} />
              <Route path="add" element={<AddVenue />} />
              <Route path="update/:id" element={<UpdateVenue />} />
            </Route>

            <Route path="users">
              <Route path="" element={<ListUser />} />
              <Route path="add" element={<AddUser />} />
              <Route path="update/:id" element={<UpdateUser />} />
            </Route>

            <Route path="events">
              <Route path="" element={<ListEvent />} />
              <Route path="add" element={<AddEvent />} />
              <Route path="update/:id" element={<UpdateEvent />} />
            </Route>

            <Route path="reviews">
              <Route path="" element={<ListReview />} />
            </Route>

            <Route path="feedback">
              <Route path="" element={<ContactList />} />
            </Route>
          </Route>

          <Route path="reception" element={<ReceptionistLayout />}>
            <Route path="" element={<ScanQR />} />
          </Route>

          <Route path="organize" element={<OrganizerLayout />}>
            <Route path="" element={<ListEvent />} />
            <Route path="add" element={<AddEvent />} />
            <Route path="update/:id" element={<UpdateEvent />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default FrontendRoutes;

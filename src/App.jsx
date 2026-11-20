// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';

// Layouts
import AppShell from './layouts/AppShell.jsx';
import DispatcherLayout from './layouts/DispatcherLayout.jsx';

// Customer Pages
import SplashPage from './pages/SplashPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import HomePage from './pages/HomePage.jsx';
import FleetPage from './pages/FleetPage.jsx';
import VehicleDetailPage from './pages/VehicleDetailPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ServiceDetailPage from './pages/ServiceDetailPage.jsx';
import SavedPage from './pages/SavedPage.jsx';
import ComparePage from './pages/ComparePage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import BookingSuccessPage from './pages/BookingSuccessPage.jsx';
import ConciergePage from './pages/ConciergePage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import TripDetailPage from './pages/TripDetailPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import RequestFormPage from './pages/RequestFormPage.jsx';
import RequestsPage from './pages/RequestsPage.jsx';
import LiveChatPage from './pages/LiveChatPage.jsx';

// Profile Sub-pages
import CorporateAccountPage from './pages/profile/CorporateAccountPage.jsx';
import PaymentMethodsPage from './pages/profile/PaymentMethodsPage.jsx';
import SavedAddressesPage from './pages/profile/SavedAddressesPage.jsx';
import SavedPassengersPage from './pages/profile/SavedPassengersPage.jsx';
import SafetyInsurancePage from './pages/profile/SafetyInsurancePage.jsx';
import SettingsPage from './pages/profile/SettingsPage.jsx';
import EditProfilePage from './pages/profile/EditProfilePage.jsx';
import LegalTermsPage from './pages/profile/LegalTermsPage.jsx';

// Dispatcher Pages
import DispatchDashboard from './pages/dispatch/DispatchDashboard.jsx';
import DispatchJobs from './pages/dispatch/DispatchJobs.jsx';
import DispatchQuotes from './pages/dispatch/DispatchQuotes.jsx';
import DispatchFleet from './pages/dispatch/DispatchFleet.jsx';
import DispatchDrivers from './pages/dispatch/DispatchDrivers.jsx';
import DispatchMessages from './pages/dispatch/DispatchMessages.jsx';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Mobile App Shell (Layout Containment) */}
          <Route element={<AppShell />}>
            <Route path="/" element={<SplashPage />} />
            <Route path="/auth" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/fleet" element={<FleetPage />} />
            <Route path="/fleet/:id" element={<VehicleDetailPage />} />
            
            {/* Services Tab Routes */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />

            {/* Saved & Compare Features */}
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/compare" element={<ComparePage />} />
            
            {/* Booking Flow */}
            <Route path="/book" element={<BookingPage />} />
            <Route path="/book/success" element={<BookingSuccessPage />} />
            
            {/* AI Concierge */}
            <Route path="/ai" element={<ConciergePage />} />
            
            {/* Trips */}
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/trips/:id" element={<TripDetailPage />} />
            
            {/* Notifications */}
            <Route path="/notifications" element={<NotificationsPage />} />
            
            {/* Profile & Sub-pages */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<EditProfilePage />} />
            <Route path="/profile/corporate" element={<CorporateAccountPage />} />
            <Route path="/profile/payment" element={<PaymentMethodsPage />} />
            <Route path="/profile/addresses" element={<SavedAddressesPage />} />
            <Route path="/profile/passengers" element={<SavedPassengersPage />} />
            <Route path="/profile/safety" element={<SafetyInsurancePage />} />
            <Route path="/profile/settings" element={<SettingsPage />} />
            <Route path="/legal" element={<LegalTermsPage />} />
            
            {/* Support Hub, Request Form & Live Chat */}
            <Route path="/support" element={<SupportPage />} />
            <Route path="/support/request" element={<RequestFormPage />} />
            <Route path="/support/requests" element={<RequestsPage />} />
            <Route path="/support/chat" element={<LiveChatPage />} />
          </Route>

          {/* Desktop Dispatcher Console Shell */}
          <Route path="/dispatch" element={<DispatcherLayout />}>
            <Route index element={<DispatchDashboard />} />
            <Route path="jobs" element={<DispatchJobs />} />
            <Route path="quotes" element={<DispatchQuotes />} />
            <Route path="fleet" element={<DispatchFleet />} />
            <Route path="drivers" element={<DispatchDrivers />} />
            <Route path="messages" element={<DispatchMessages />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

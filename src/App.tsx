import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./layout/AppLayout";
import LiveFeed from "./pages/LiveFeed";
import Home from "./pages/Dashboard/Home";
import Statistics from "./pages/Statistics";
import SignIn from "./pages/AuthPages/SignIn";
import Export from "./pages/Export";
import DedicatedIP from "./pages/Static/ip";
import Templates from "./pages/Static/Templates";
import NotFound from "./pages/OtherPage/NotFound";
import Domains from "./pages/Domains";
import Suppressions from "./pages/Suppressions";
import SuppressionDetailsPage from "./pages/Suppressions/DetailsPage";
import NotificationsPage from "./pages/OtherPage/Notifications";
import APISettings from "./pages/API";
import SettingsPage from "./pages/Settings";

import PrivateRoute from "./utils/Protected";
import PublicRoute from "./utils/Public";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<SignIn />} />
        </Route>

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Home />} />
            <Route path="live-feed" element={<LiveFeed />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="export" element={<Export />} />
            <Route path="domains" element={<Domains />} />
            <Route path="dedicated-ip" element={<DedicatedIP />} />
            <Route path="templates" element={<Templates />} />
            <Route path="suppressions" element={<Suppressions />} />
            <Route
              path="suppressions/details"
              element={
                <SuppressionDetailsPage
                  onBack={() => {
                    /* implement back function */
                  }}
                />
              }
            />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="api" element={<APISettings />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="404" element={<NotFound />} />
          </Route>
        </Route>

        {/* Catch all → redirect to 404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

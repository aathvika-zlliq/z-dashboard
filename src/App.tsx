import { BrowserRouter, Routes, Route, Navigate } from "react-router";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Grouped under one base path */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="live-feed" element={<LiveFeed />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="export" element={<Export />} />
          <Route path="domains" element={<Domains />} />
          <Route path="dedicated-ip" element={<DedicatedIP />} />
          <Route path="templates" element={<Templates />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="404" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

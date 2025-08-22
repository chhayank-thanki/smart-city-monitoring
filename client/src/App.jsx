import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MapComponent from "./components/MapComponent";
import AlertsPanel from "./components/AlertsPanel";
import ReportIssueButton from "./components/ReportIssueButton";
import SOSButton from "./components/SOSButton";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-100">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <main className="flex h-[90vh] w-full">
              <MapComponent />
              <ReportIssueButton />
              <div className="w-[350px] bg-white shadow-xl p-4 overflow-y-auto">
                <AlertsPanel />
                <SOSButton />
              </div>
            </main>
          }
        />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;

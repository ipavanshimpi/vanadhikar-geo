import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SatelliteMapView from "@/components/SatelliteMapView";
import StatsPanel from "@/components/StatsPanel";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 flex">
          <SatelliteMapView />
          <StatsPanel />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
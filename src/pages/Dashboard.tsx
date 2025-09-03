import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MapView from "@/components/MapView";
import StatsPanel from "@/components/StatsPanel";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 flex">
          <MapView />
          <StatsPanel />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
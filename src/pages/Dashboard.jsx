import "remixicon/fonts/remixicon.css";
import TripAssistant from "../components/TripAssistant";

const Dashboard = () => {


  return (
    <div className="min-h-screen relative flex flex-col items-center pb-10">



      {/* Main Content */}
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        <TripAssistant />
      </div>
    </div>
  );
};

export default Dashboard;

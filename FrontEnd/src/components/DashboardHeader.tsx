import userIcon from '../assets/Images/user.svg';
import notificationIcon from '../assets/Images/notification.svg';
export default function DashboardHeader() {
 

  return (
     <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-semibold">Analytics Overview</h1>

  <div className="flex items-center gap-4">
    <input
      placeholder="Search"
      className="px-4 py-2 rounded-lg border"
    />

 {/* 👤 User */}
    <div className="w-6 h-6 rounded-full border flex items-center justify-center overflow-hidden bg-gray-200">
      <img src={userIcon} className="w-full h-full object-cover" />
    </div>



    {/* 🔔 Notification */}
    <div className="relative">
      <img src={notificationIcon} className="w-6 h-6 cursor-pointer" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
        5
      </span>
    </div>

   
  </div>
</div>
  );
}
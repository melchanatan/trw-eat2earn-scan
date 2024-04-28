"use client";
import BackButton from "../../components/global/BackButton";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const pushToGenerateQr = () => {
    router.push("/dashboard/generate-qr");
  };
  const pushToUserInfo = () => {
    router.push("/dashboard/user-info");
  };
  const pushToCouponManager = () => {
    router.push("/dashboard/coupon-manager");
  };

  return (
    <div className="h-screen flex flex-col box-container">
      <h1 className="mt-20 mb-10">Dashboard</h1>
      <h2 className="mb-4 underline cursor-pointer" onClick={pushToUserInfo}>User Info</h2>
      <h2 className="mb-4 underline cursor-pointer" onClick={pushToGenerateQr}>Restaurant QR Generator</h2>
      <h2 className="mb-4 underline cursor-pointer" onClick={pushToCouponManager}>Coupon Manager</h2>
    </div>
  );
};

export default Dashboard;

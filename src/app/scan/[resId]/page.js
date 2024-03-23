"use client";
import React, { useState } from "react";
import MyWebcam from "../../../components/MyWebcam";
import SignInOverlay from "../../../components/SignInOverlay";
import { signIn, useSession, signOut } from "next-auth/react";

const ScanPage = ({ params }) => {
  const { data: session } = useSession();

  const [image, setImage] = useState(null);

  const getScreenshot = () => {
    getScreenshot({ width: 1920, height: 1080 });
  };

  const sendToDb = () => {
    const requestBody = {
      authId: "authId",
      image: "image",
      amount: 100,
      sourceId: params.resId,
    };
    try {
      const data = fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/v1/user/point/patch`,
        {
          method: "PATCH",
          model: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            point: 100,
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!session) return <div>loading</div>;
  console.log(session);

  return (
    <div className="flex flex-col items-center justify-center p-24 relative">
      {!session && <SignInOverlay />}
      <div className="flex flex-row justify-center items-center gap-3">
        <h1>{session?.user.name}</h1>
        <img
          src={session?.user.image}
          alt=""
          className="w-10 h-10 rounded-full object-cover "
        />
      </div>
      <h1 className="text-2xl font-bold mb-10">Scan Page</h1>
      <label htmlFor="">Enter paid amount:</label>
      <input
        type="text"
        placeholder="Enter text"
        className=" placeholder:text-gray-600 text-black"
      />
      <MyWebcam setImage={setImage} />
      <button onClick={getScreenshot}>Scan</button>
      {image && (
        <div>
          <img src={`${image}`} alt="My webcam" />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={sendToDb}
          >
            to db
          </button>
        </div>
      )}
    </div>
  );
};

export default ScanPage;

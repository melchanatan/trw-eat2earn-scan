import React from "react";

const App = () => {
  return (
    <div className="">
      <h1 className="font-avant font-bold text-4xl absolute top-10 left-[16px]">
        Eat2Earn <br />
        start collecting <br />
        points!
      </h1>
      <div className="bg-gradient-primary-lighter w-full h-[490px] box-container absolute bottom-0 right-0 left-0 rounded-t-[14px] py-[44px] px-[32px]">
        <h1 className="text-background mb-[40px]">
          Enter your <br /> phone number
        </h1>
        <div className="mt-2 p-3 py-4 bg-white rounded-[14px] flex items-center">
          <div className="flex gap-2">
            <img src="/assets/usa-flag-avatar.png" alt="" />
            <h4>US+1</h4>
          </div>
          <div className="h-[28px] bg-red-300/50 w-[2px] mx-2"></div>

          <input
            type="number"
            className="bg-transparent text-lg text-black outline-0 font-futura placeholder:text-gray-300 text-center "
            placeholder="(000) 000 - 0000"
          />
        </div>
      </div>
    </div>
  );
};

export default App;

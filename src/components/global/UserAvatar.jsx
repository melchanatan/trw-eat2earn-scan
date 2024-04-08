import React from "react";
import Image from "next/image";

const UserAvatar = ({ className = "" }) => {
  return (
    <div className={`flex font-avant gap-3 p-3 pl-0 pt-6 ${className}`}>
      <Image
        src={"/assets/avatar-placeholder.png"}
        width={48}
        height={48}
        alt={"usa-flag-avatar"}
        className="rounded-[14px]"
      />
      <div className="flex flex-col">
        <label>Welcome back,</label>
        <h2>Chanatan S.</h2>
      </div>
    </div>
  );
};

export default UserAvatar;

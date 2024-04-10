import React, { useContext } from "react";
import Image from "next/image";
import { UserInfoContext } from "../../utils/scan_qr/UserInfoProvider";

const UserAvatar = ({ className = "" }) => {
  const { name } = useContext(UserInfoContext);

  return (
    <div className={`flex font-avant gap-3 pl-0 ${className}`}>
      <Image
        src={"/assets/avatar-placeholder.png"}
        width={48}
        height={48}
        alt={"usa-flag-avatar"}
        className="rounded-[14px]"
      />
      <div className="flex flex-col">
        <label>Welcome back,</label>
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default UserAvatar;

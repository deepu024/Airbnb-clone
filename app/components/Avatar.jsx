import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <Image
      src="/images/placeholder.jpg"
      alt="avatar"
      width={30}
      height={30}
      className="rounded-full"
    />
  );
};

export default Avatar;

"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import useRentModal from "@/app/hooks/useRentModal";

const UserMenu = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("LogOut Success");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onRent = useCallback(() => {
    if(currentUser === null){
      loginModal.onOpen();
      return;
    }
    // open rent 
    rentModal.onOpen();
  }, [currentUser, loginModal,rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="
                p-4
                md:py-1
                md:px-2
                border-[1px]
                border-neutral-200
                flex
                flex-row
                items-center
                gap-3
                rounded-full
                cursor-pointer
                hover:shadow-md
                transition
            "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-13
            text-sm
        "
        >
          <div
            className="
                flex 
                flex-col
                cursor-pointer
            "
          >
            {currentUser !== null ? (
              <>
                <MenuItem label="My trips" onClick={() => router.push('/trips')} />
                <MenuItem label="My favourites" onClick={() => router.push('/favorites')} />
                <MenuItem label="My reservations" onClick={() => router.push('/reservations')} />
                <MenuItem label="My properties" onClick={() => router.push('/properties')} />
                <MenuItem label="Airbnb my home" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Logout" onClick={logout} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
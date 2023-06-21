"use client";

import React from "react";
import { BiDollar } from "react-icons/bi";


const Input = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div
      className="
    relative
    w-full
  "
    >
      {formatPrice && (
        <BiDollar
          size={24}
          className="
        text-neutral-700
        absolute
        top-5
        left-2
      "
        />
      )}
      <input
        disabled={disabled}
        id={id}
        {...register(id, { required })}
        placeholder=" "
        type={type}
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          disabled:opacity-70
          transition
          disabled:cursor-not-allowed
          ${formatPrice ? "pl-9" : "pl-4"}
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        origin-[0]
        z-10
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

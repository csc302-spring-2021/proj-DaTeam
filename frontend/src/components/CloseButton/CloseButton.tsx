import React from "react";

export type CloseButtonProps = Omit<React.HTMLProps<HTMLButtonElement>, "type">;

export function CloseButton({ className = "", ...props }: CloseButtonProps) {
  return (
    <button
      type="button"
      className={
        "absolute inline-flex items-center justify-center p-2 text-gray-400 rounded-md top-2 right-2 bg-gray-50 hover:text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white " +
        className
      }
      aria-controls="mobile-menu"
      aria-expanded="false"
      {...props}
    >
      <span className="sr-only">Close</span>
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}

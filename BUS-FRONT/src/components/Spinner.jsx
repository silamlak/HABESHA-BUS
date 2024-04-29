import React from 'react';

const Spinner = ({ size = 12 }) => {
  return (
    <svg
      className={`animate-spin h-${size} w-${size} text-gray-500`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.005 8.005 0 0112 4.472v3.006c-2.605 0-4.92 1.097-6.607 2.858l1.414 1.414C7.074 9.029 8.435 8.512 10 8.472v3.006a5.968 5.968 0 00-3.5 2.813L6 14.29zM12 20c1.565 0 2.926-.527 4.07-1.415l-1.414-1.414A5.968 5.968 0 0012 14.478V11.47c2.605 0 4.92-1.097 6.607-2.858l-1.414-1.414C16.926 6.527 15.565 6 14 6V2c3.866 0 7 3.134 7 7s-3.134 7-7 7V20z"
      ></path>
    </svg>
  );
};

export default Spinner;

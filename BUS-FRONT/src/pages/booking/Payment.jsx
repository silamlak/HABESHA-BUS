import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";

const Payment = () => {
  const navigate = useNavigate();
      const location = useLocation();
      const url = location.search;
      const dispatch = useDispatch();
      const rSeat = useSelector((state) => state.info.seat_selection);


  const handlePayment = () => {
    const durl = "/book/confirmation";
    navigate(durl);
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;

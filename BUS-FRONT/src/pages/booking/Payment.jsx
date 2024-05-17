import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { clearOut } from "../../app/feature/passenger-info";
import { setBookId } from "../../app/feature/booking_info";
import { endSession } from "../../app/feature/sessionSlice";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.search;
  const dispatch = useDispatch();
  const [bookingId, setBookingId] = useState("");
  const rSeat = useSelector((state) => state.info.seat_selection);
  const rinfo = useSelector((state) => state.info.passanger_info);
  const rrId = useSelector((state) => state.info.routOfId);

  const allInfo = {
    passenger_info: rinfo,
    routeOfId: rrId,
  };

  const bookingFn = async (allInfo) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/user/route/booking`,
        allInfo
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const seatFn = async (seatInfo) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/user/route/seat`,
        seatInfo
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const { mutate: bookMutation } = useMutation({
    mutationFn: bookingFn,
    retry: 3,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setBookingId(data._id);
      dispatch(setBookId(data._id));
      seatMutation({ ...rSeat, bookId: data._id, status: "reserved" });
    },
  });

  const { mutate: seatMutation } = useMutation({
    mutationFn: seatFn,
    retry: 3,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      dispatch(clearOut());
    },
  });

  const handlePayment = () => {
    dispatch(endSession());
    bookMutation(allInfo);
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

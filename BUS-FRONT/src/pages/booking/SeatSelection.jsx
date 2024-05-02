import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { setPassSeat } from "../../app/feature/passenger-info";
import axios from "axios";

const SeatSelection = () => {
    const navigate = useNavigate();
      const location = useLocation();
      const url = location.search;
    const dispatch = useDispatch();
      const rSeat = useSelector((state) => state.info.seat_selection);
      const ri = useSelector((state) => state.info.routOfId);
      console.log('ri', ri)
  const [selectedSeats, setSelectedSeats] = useState({
    route: '',
    seat_no: 0,
    status: ''
  });


  const { data: allTakenSeats } = useQuery({
    queryKey: ["noss"],
    queryFn: async () => {
      try {
        // if (!routeId) return []; // Return empty array if routeId is not defined
        const res = await axios.get(
          `http://localhost:3000/api/user/route/seat_route/${ri}`
        );
        console.log(res.data);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    setSelectedSeats(rSeat)
  }, [])

const handleSeatClick = (seatNumber) => {
  if (selectedSeats.seat_no === 0) {
    const newSelectedSeats = {
      route: ri,
      seat_no: seatNumber,
      status: "taken",
    };
    setSelectedSeats(newSelectedSeats);
    dispatch(setPassSeat(newSelectedSeats));
  } else {
    setSelectedSeats((prevSelectedSeats) => {
      const newSelectedSeats = {
        route: ri,
        seat_no: seatNumber,
        status: "taken",
      };
      dispatch(setPassSeat(newSelectedSeats));
      return newSelectedSeats;
    });
  }
};

console.log(selectedSeats)

  const handleSeat = () => {
    dispatch(setPassSeat(selectedSeats)); // Passing pi to the action creator
    const durl = `/book/route/payment${location.search}`;
    navigate(durl);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Select your seats</h2>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 44 }, (_, index) => {
            const seat = allTakenSeats?.find(
              (seat) => seat.seat_no === index + 1
            );
            const mySeat = selectedSeats.seat_no === index + 1
            return (
              <div
                key={index}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer border ${
                  seat && seat.seat_no === index + 1
                    ? "bg-gray-400 text-gray-700 border-gray-400"
                    : mySeat
                    ? "bg-green-500 text-white border-transparent"
                    : "bg-gray-200 text-gray-700 border-gray-400 hover:bg-blue-500 hover:text-white hover:border-transparent"
                }`}
                onClick={
                  seat && seat.seat_no === index + 1
                    ? null
                    : () => handleSeatClick(index + 1)
                }
              >
                {index + 1}
              </div>
            );
          })}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected seats:</h3>
          <ul>
            {rSeat.seat_no !== 0 && (
              <li key={selectedSeats}>{rSeat.seat_no}</li>
            )}
            {rSeat.seat_no === 0 && (
              <li key={selectedSeats}>{selectedSeats?.seat_no}</li>
            )}
          </ul>
        </div>
        <button
          onClick={handleSeat}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;

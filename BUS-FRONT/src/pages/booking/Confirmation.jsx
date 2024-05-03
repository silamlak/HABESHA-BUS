import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useSelector } from "react-redux";
const Confirmation = () => {
    const bookId = useSelector((state) => state.book.bookingId);
console.log(bookId)
    const bookingInfo = async () => {
      try {
      const res = await axios.get(
        `http://localhost:3000/api/user/route/booking/info/${bookId}`
      );
      return res.data
      } catch (error) {
        console.log(error);
    }
  }
    const bookingInfoSeat = async () => {
      try {
      const res = await axios.get(
        `http://localhost:3000/api/user/route/booking/seat/${bookId}`
      );
      return res.data
      } catch (error) {
        console.log(error);
    }
  }
  
  
  const bookingInfoRoute = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/route/booking/route/${routeId}`
      );
      return res.data
    } catch (error) {
      console.log(error);
    }
  }
  
    const { data: seatData } = useQuery({
      queryKey: ["seatDeatail"],
      queryFn: bookingInfoSeat,
      enabled: !!bookId,
    });
    
  const routeId = seatData?.route;

    const {data} = useQuery({
      queryKey: ['bookingDeatil'],
      queryFn: bookingInfo,
      enabled: !!bookId
    })

    const { data: routeData } = useQuery({
      queryKey: ["routeDeatil"],
      queryFn: bookingInfoRoute,
      enabled: !!routeId,
    });


    console.log(routeData);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md bg-white p-8 shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Booking Confirmation
        </h2>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Passenger Name:</p>
          {/* <p>{bookingDetails.passengerName}</p> */}
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Bus Route:</p>
          {/* <p>{bookingDetails.route}</p> */}
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Seat Number:</p>
          {/* <p>{bookingDetails.seatNumber}</p> */}
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Departure Time:</p>
          {/* <p>{bookingDetails.departureTime}</p> */}
        </div>
        <div className="text-center">
          <p className="text-green-600 font-semibold">Booking Confirmed!</p>
          <p className="text-sm text-gray-500 mt-2">
            Thank you for choosing our service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Confirmation

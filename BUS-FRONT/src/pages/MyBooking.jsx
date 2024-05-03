import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
const MyBooking = () => {
    const location = useLocation()
    const endUrl = location.search
    console.log(endUrl)

    const searchNRP = async () => {
        try {
            const res = await axios.get(
              `http://localhost:3000/api/user/booking/mybooking${endUrl}`
            );
            console.log(res.data)
            return res.data
        } catch (error) {
            throw error
        }
    }

    const searchRoute = async (rid) => {
        console.log(rid)
        try {
            const res = await axios.get(
              `http://localhost:3000/api/user/route/booking/route/${rid}`
            );
            console.log(res.data)
            return res.data
        } catch (error) {
            throw error
        }
    }

    const searchSeat = async (bid) => {
        try {
            const res = await axios.get(
              `http://localhost:3000/api/user/route/booking/seat/${bid}`
            );
            console.log(res.data)
            return res.data
        } catch (error) {
            throw error
        }
    }

    const {data: mybooking} = useQuery({ 
        queryKey: ['bookings',endUrl],
        queryFn: searchNRP
    })
    
    
const bId = mybooking?._id
const rId = mybooking?.routeOfId;

    const { data: myRoute } = useQuery({
      queryKey: ["myroute"],
      queryFn: () => searchRoute(rId),
      enabled: !!rId
    });

    const { dataL: mySeat } = useQuery({
      queryKey: ["myseat"],
      queryFn: () => searchSeat(bId),
      enabled: !!bId
    });

    console.log(mybooking);
    console.log(mybooking);

  return (
    <div>
      hello
    </div>
  )
}

export default MyBooking

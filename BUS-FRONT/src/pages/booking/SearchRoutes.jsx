import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const options = [
  { value: "Addis", label: "Addis" },
  { value: "Gondar", label: "Gondar" },
  { value: "chicago", label: "Chicago" },
  { value: "houston", label: "Houston" },
  { value: "phoenix", label: "Phoenix" },
  { value: "philadelphia", label: "Philadelphia" },
  { value: "san-antonio", label: "San Antonio" },
  { value: "san-diego", label: "San Diego" },
  { value: "dallas", label: "Dallas" },
  { value: "san-jose", label: "San Jose" },
];

const SearchRoutes = () => {

  const navigate = useNavigate()

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [journeyDate, setJourneyDate] = useState(new Date());
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [showPassengerOptions, setShowPassengerOptions] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalPassengers = adultCount + childCount;

  useEffect(() => {
    const today = new Date();
    setJourneyDate(today);
  }, []);

  const handleOriginChange = (selectedOption) => {
    setOrigin(selectedOption);
  };

  const handleDestinationChange = (selectedOption) => {
    setDestination(selectedOption);
  };

  const handleDateChange = (date) => {
    setJourneyDate(date || new Date());
  };

  const handleAdultIncrement = () => {
    if(adultCount === 5) return
    setAdultCount((prevCount) => prevCount + 1);
    if (prevCount === 1) {
      setChildCount((prevCount) => Math.min(prevCount, 2)); // Reset children count when incrementing from 1 adult
    }
  };

  const handleAdultDecrement = () => {
    if (adultCount > 1) {
      setAdultCount((prevCount) => prevCount - 1);
    }
  };
  
  // Add a useEffect to handle the child count update after the adult count change
  useEffect(() => {
    if (adultCount === 1 && childCount > 2) {
      setChildCount(2); // Set children count to 2 if it's more than 2 when decrementing from 2 adults to 1 adult
    }
  }, [adultCount, childCount]);
  

  const handleChildIncrement = () => {
    if (adultCount === 1 && childCount < 2) {
      setChildCount((prevCount) => prevCount + 1);
    } else if (adultCount > 1 && childCount < 3) {
      setChildCount((prevCount) => prevCount + 1);
    }
  };

  const handleChildDecrement = () => {
    if (childCount > 0) {
      setChildCount((prevCount) => prevCount - 1);
    }
  };

  const handlePassengerBoxClick = () => {
    setShowPassengerOptions(!showPassengerOptions);
  };

  const handlePassengerOptionClick = (e) => {
    e.stopPropagation();
  };

  const handleExchange = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Check if all fields are filled
    if (origin && destination && journeyDate && totalPassengers) {
      const formattedDate = formatDate(journeyDate);
      const url = `/book/booking?origin=${origin.value}&destination=${destination.value}&date=${formattedDate}&passenger=${totalPassengers}&adult=${adultCount}&child=${childCount}`;
      console.log(journeyDate)
      navigate(url);
    } else {
      alert('Please fill in all fields');
    }
  };


  //fetch(`https://your-api-endpoint.com/routes?origin=${origin}&destination=${destination}&date=${date}&passengers=${passengers}`);

  return (
    <div>
      <h2>Bus Booking</h2>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <div style={{ marginRight: "10px" }}>
          <label>Origin:</label>
          <Select
            value={origin}
            onChange={handleOriginChange}
            options={options}
            placeholder="Select Origin"
          />
        </div>
        <div style={{ marginRight: "10px" }}>
          <label>Destination:</label>
          <Select
            value={destination}
            onChange={handleDestinationChange}
            options={options}
            placeholder="Select Destination"
          />
        </div>
        <div>
          <label>Date:</label>
          <DatePicker
            selected={journeyDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
            wrapperClassName="w-full"
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
          />
        </div>

        <div style={{ position: 'relative' }} onClick={handlePassengerBoxClick}>
          <label>Passengers:</label>
          <div className="border border-gray-300 rounded px-3 py-2 min-w-[200px] cursor-pointer">
            {totalPassengers}
          </div>
          {showPassengerOptions && (
            <div
              className="absolute top-full left-0 border border-gray-300 bg-white rounded p-2"
              onClick={handlePassengerOptionClick}
            >
              <div>
                <button onClick={handleAdultDecrement}>-</button>
                <span>{adultCount} Adult(s)</span>
                <button onClick={handleAdultIncrement}>+</button>
              </div>
              <div>
                <button onClick={handleChildDecrement}>-</button>
                <span>{childCount} Child(ren)</span>
                <button onClick={handleChildIncrement}>+</button>
              </div>
            </div>
          )}
        </div>

   

      </div>
      <button onClick={handleExchange}>Exchange</button>
      {origin && destination && (
        <div>
          <p>Selected Origin: {origin.label}</p>
          <p>Selected Destination: {destination.label}</p>
          <p>Journey Date: {journeyDate.toDateString()}</p>
        </div>
      )}
       <button type="submit" onClick={handleFormSubmit}>Search</button>
    </div>
  );
};

export default SearchRoutes;

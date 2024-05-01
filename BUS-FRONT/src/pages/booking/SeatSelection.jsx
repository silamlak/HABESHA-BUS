import React, { useState } from 'react'

const SeatSelection = () => {
  // Sample seat data
  const seats = [
    { id: 1, number: "A1", available: true },
    { id: 2, number: "A2", available: false },
    { id: 3, number: "A3", available: true },
    { id: 4, number: "B1", available: true },
    { id: 5, number: "B2", available: false },
    // Add more seat data as needed
  ];

  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleSeatClick = (seat) => {
    if (seat.available) {
      if (selectedSeat === seat.number) {
        setSelectedSeat(null);
      } else {
        setSelectedSeat(seat.number);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Select your seats</h2>
        <div className="grid grid-cols-5 gap-4">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer border ${
                !seat.available
                  ? "bg-gray-400 text-gray-700 border-gray-400"
                  : selectedSeat === seat.number
                  ? "bg-blue-500 text-white border-transparent"
                  : "bg-gray-200 text-gray-700 border-gray-400"
              } hover:bg-blue-500 hover:text-white hover:border-transparent`}
              onClick={() => handleSeatClick(seat)}
            >
              {seat.number}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected seat:</h3>
          <p>{selectedSeat ? selectedSeat : "None"}</p>
        </div>
      </div>
    </div>
  );
}

export default SeatSelection

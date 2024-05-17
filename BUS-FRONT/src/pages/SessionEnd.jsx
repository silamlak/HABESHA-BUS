import React, { useEffect } from 'react'

const SessionEnd = ({show}) => {
      if (!show) return null;
       document.body.style.overflow = "hidden";
useEffect(() => {
  // Function to track time spent on the page
  let startTime = Date.now();
  const timer = setTimeout(() => {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime >= 1 * 60 * 1000) {
      console.log("Session expired after 1 minute");
      // Add code here to handle session expiration
    }
  }, 1 * 60 * 1000); // 1 minute in milliseconds

  // Clean up function to clear the timer when the component unmounts
  return () => clearTimeout(timer);
}, []);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4">Session Ended</h2>
          <p>Your session has ended. Please start a new booking.</p>
          {/* Additional content and buttons */}
        </div>
      </div>
    </div>
  );
}

export default SessionEnd

import React, { useState, useEffect } from "react";

const Countdown = () => {
  // Set your target date here
  const targetDate = new Date("2025-12-31T23:59:59").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const diff = Math.max(targetDate - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 w-[25%] h-[20%] min-w-[120px] min-h-[100px] bg-[#111420] border-2 border-[#6c5b13] rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-2">
        <div className="flex flex-col justify-center">
            <div>
                <p className="text-md font-extrabold text-yellow-400">Registration ends</p>
                <p className="text-sm font-bold text-[#988f66]">Nov 19,2025</p>
            </div>
            <div className="flex items-center justify-center space-x-1 text-lg font-semibold">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-extrabold text-yellow-400">{timeLeft.days}</span>
          <span className="text-xs text-gray-500">Days</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-extrabold text-yellow-400">{timeLeft.hours}</span>
          <span className="text-xs text-gray-500">Hours</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-extrabold text-yellow-400">{timeLeft.minutes}</span>
          <span className="text-xs text-gray-500">Minutes</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-extrabold text-yellow-400">{timeLeft.seconds}</span>
          <span className="text-xs text-gray-500">Seconds</span>
        </div>
      </div>
    </div>
            <p className="text-md font-bold text-yellow-400">Dont miss out!</p>
        </div>

      
  );
};

export default Countdown;

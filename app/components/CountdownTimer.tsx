"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-baseline justify-center lg:justify-start gap-4 mt-2">
      <div className="text-center">
        <div className="text-4xl font-bold text-red-800">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="text-xs text-red-600">Days</div>
      </div>
      <div className="text-4xl font-bold text-red-800">:</div>
      <div className="text-center">
        <div className="text-4xl font-bold text-red-800">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-xs text-red-600">Hours</div>
      </div>
      <div className="text-4xl font-bold text-red-800">:</div>
      <div className="text-center">
        <div className="text-4xl font-bold text-red-800">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-xs text-red-600">Mins</div>
      </div>
    </div>
  );
}



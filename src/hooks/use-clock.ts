"use client";

import { useEffect, useState } from "react";

interface ClockValue {
  /** e.g. "Thu 24 Oct" */
  date: string;
  /** e.g. "9:41 AM" */
  time: string;
}

const DATE_FMT: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
};

const TIME_FMT: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
};

export function useClock(): ClockValue {
  const [now, setNow] = useState<ClockValue>(() => formatNow());

  useEffect(() => {
    const tick = () => setNow(formatNow());
    // Align to the next minute boundary so the clock ticks at the right moment.
    const ms = 60 * 1000 - (Date.now() % (60 * 1000));
    const initial = setTimeout(tick, ms);
    const interval = setInterval(tick, 60 * 1000);
    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return now;
}

function formatNow(): ClockValue {
  const d = new Date();
  return {
    date: d.toLocaleString(undefined, DATE_FMT),
    time: d.toLocaleString(undefined, TIME_FMT),
  };
}

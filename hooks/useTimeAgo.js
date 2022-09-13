import { useEffect, useState } from "react";
import { formDate } from "./useDateTimeFormat";

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const isTimeAgoSupported =
  typeof Intl !== "undefined" && Intl.RelativeTimeFormat;

const getDateDiffs = (timestapm) => {
  const now = Date.now();
  const elapsed = (timestapm - now) / 1000;

  for (const [unit, secondUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondUnit || unit === "second") {
      const value = Math.floor(elapsed / secondUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestapm) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestapm));

  useEffect(() => {
    if (isTimeAgoSupported) {
      if (unit === "second") {
        const interval = setInterval(() => {
          const newTimeAgo = getDateDiffs(timestapm);
          setTimeago(newTimeAgo);
        }, 5000);

        return () => clearInterval(interval);
      }
    }
  }, [timestapm]);

  if (!isTimeAgoSupported) {
    formDate();
  }

  const { value, unit } = timeago;

  const rtf = new Intl.RelativeTimeFormat("es", {
    style: "long",
  });

  return rtf.format(value, unit);
}

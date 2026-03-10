"use client";

import { useState, useEffect } from "react";

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60),
  );

  if (diffInHours < 24) {
    return `${diffInHours}時間前`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}日前`;
}

export function TimeAgo({ timestamp }: Readonly<{ timestamp: Date }>) {
  const [timeAgo, setTimeAgo] = useState<string>("");

  useEffect(() => {
    setTimeAgo(formatTimeAgo(timestamp));
  }, [timestamp]);

  if (!timeAgo) {
    return <span>...</span>;
  }

  return <span>{timeAgo}</span>;
}

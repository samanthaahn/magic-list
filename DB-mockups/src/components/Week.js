import React from "react";

function Week() {
  const today = new Date();
  const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
  const lastDayOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
  const startDateString = firstDayOfWeek.toLocaleDateString();
  const endDateString = lastDayOfWeek.toLocaleDateString();
  const weekString = `${startDateString} - ${endDateString}`;

  return (
    <div>
      <h2>This Week's Date</h2>
      <p>{weekString}</p>
    </div>
  );
}

export default Week;

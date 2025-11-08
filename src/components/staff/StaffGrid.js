import React from "react";
import StaffCard from "./StaffCard";

export default function StaffGrid({ rows, onPick }) {
  return (
    <div className="row g-3">
      {rows.map((s) => (
        <div className="col-6 col-md-4 col-lg-3" key={s.id}>
          <StaffCard data={s} onClick={() => onPick(s.id)} />
        </div>
      ))}
    </div>
  );
}

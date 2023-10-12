import React from "react";
import LikePoke from "./LikePoke";

function PinPoke({ pin }) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {pin?.map((data, idx) => (
        <div key={idx}>
          <h3>{data.name}</h3>
          <img src={data?.sprites?.other?.home?.front_default} alt="" />
          <LikePoke />
        </div>
      ))}
    </div>
  );
}

export default PinPoke;

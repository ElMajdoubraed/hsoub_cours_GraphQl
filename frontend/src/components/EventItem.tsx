import React, { useContext } from "react";
import AuthContext from "../context/auth-context";

interface EventItemProps {
  _id: string;
  title: string;
  price: number;
  date: string;
  description: string;
  creator: {
    _id: string;
    username: string;
  };
  onDetail: (_id: string) => void;
}

export default function EventItem({
  _id,
  title,
  price,
  date,
  description,
  creator,
  onDetail,
}: EventItemProps) {
  const value = useContext(AuthContext);

  return (
    <div className="events-list-item col-md-4 col-lg-3 col-6">
      <div className="text-center align-items-center flex-column d-grid gap-3">
        <div className="p2">
          <h1>{title}</h1>
        </div>
        <div className="p-3">
          <h2>
            ${price} - {date.split(".")[0].split(" ")[0].replace(/-/g, "/")}
          </h2>
        </div>
        <div className="p-2">
          <button className="btn" onClick={() => onDetail(_id)}>
            {value.userId === creator._id
              ? "أنت صاحب هذه المناسبة"
              : "عرض التفاصيل"}
          </button>
        </div>
      </div>
    </div>
  );
}

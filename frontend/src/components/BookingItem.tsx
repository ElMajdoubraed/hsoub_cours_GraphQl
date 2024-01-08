interface Props {
  _id: string;
  event: {
    title: string;
    price: number;
  };
  createdAt: string;
  onCancelBooking: (bookingId: string) => void;
}

export default function BookingItem({
  _id,
  event,
  createdAt,
  onCancelBooking,
}: Props): JSX.Element | null {
  return (
    <li className="bookings-item d-flex">
      <div>
        {event.title} - {new Date(createdAt).toLocaleDateString()} -{" "}
        {event.price}$
      </div>
      <button className="btn" onClick={() => onCancelBooking(_id)}>
        إلغاء
      </button>
    </li>
  );
}

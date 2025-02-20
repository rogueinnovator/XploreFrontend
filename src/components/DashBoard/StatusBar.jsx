import StatusCard from "./cards/statusCard";

export default function StatusBar({ revenue, checkIn, checkOut, newBooking }) {
  return (
    <div className="w-full grid gap-4 p-3 grid-cols-4  bg-white/70 rounded-xl shadow-lg  border mt-[20px]">
      <StatusCard
        title="Revenue"
        value={revenue}
        change={15}
        trend="down"
        type="line"
      />
      <StatusCard
        title="New booking"
        value={newBooking}
        change={2.4}
        trend="up"
        type="line"
      />
      <StatusCard
        title="Check-ins"
        value={checkIn}
        change={2.4}
        trend="up"
        type="line"
      />
      <StatusCard
        title="Check out"
        value={checkOut}
        change={2.4}
        trend="up"
        type="line"
      />
    </div>
  );
}

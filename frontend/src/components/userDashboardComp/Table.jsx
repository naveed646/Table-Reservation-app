import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaConciergeBell, FaMusic } from "react-icons/fa";
import { ImEnter } from "react-icons/im";
import restaurant from "../../assets/restaurant.jpg";
import ReservationForm from "./ReservationForm";
import { fetchMyReservations } from "../../redux/reservations/reservationSlice";

export default function Table() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.mine);

  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState([]);

  const tables = useMemo(
    () => [
      { id: 1, type: "window", x: 10, y: 18 },
      { id: 2, type: "window", x: 25, y: 18 },
      { id: 3, type: "center", x: 45, y: 35 },
      { id: 4, type: "center", x: 60, y: 40 },
      { id: 5, type: "center", x: 38, y: 55 },
      { id: 6, type: "center", x: 58, y: 58 },
      { id: 7, type: "band", x: 75, y: 64 },
      { id: 8, type: "window", x: 15, y: 44 },
      { id: 9, type: "window", x: 28, y: 44 },
      { id: 10, type: "window", x: 20, y: 68 },
    ],
    []
  );

  // Load all reservations for current user
  useEffect(() => {
    dispatch(fetchMyReservations());
  }, [dispatch]);

  // Fetch reservations for the selected date
  useEffect(() => {
    if (!selectedDate) return;

    const fetchReservations = async () => {
      try {
        const res = await fetch(`/api/reservations?date=${selectedDate}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setBookings(data); // update local bookings state
      } catch (err) {
        console.error(err);
      }
    };

    fetchReservations();
  }, [selectedDate]);

  // Optional polling every 10s to refresh user reservations
  useEffect(() => {
    const interval = setInterval(() => dispatch(fetchMyReservations()), 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Open/close reservation form
  const openForm = (table) => setSelectedTable(table);
  const closeForm = () => setSelectedTable(null);

  // Determine table status based on date/time conflicts
  const getTableStatus = (tableId) => {
    // Check Redux reservations first
    const reduxRes = reservations
      .filter((r) => r.tableId === tableId && r.date === selectedDate)
      .sort(
        (a, b) =>
          new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
      )[0];

    // Check local bookings for this date
    const localRes = bookings
      .filter((r) => r.tableId === tableId)
      .sort(
        (a, b) =>
          new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
      )[0];

    const latest = reduxRes || localRes;
    if (!latest) return "available";
    if (latest.status === "approved") return "approved";
    if (latest.status === "pending") return "pending";
    return "available";
  };

  const getTableBg = (status) => {
    switch (status) {
      case "approved":
        return "bg-rose-500/80";
      case "pending":
        return "bg-yellow-500/80";
      default:
        return "bg-emerald-500/90 hover:bg-emerald-500";
    }
  };

  return (
    <div className="min-h-screen w-full  bg-white">
      <header className="max-w-6xl text-black mx-auto px-4 pt-3 pb-3">
        <h1 className="text-3xl md:text-4xl text-center font-semibold tracking-tight">
          Reserve Your Table
        </h1>
      </header>

      <main className="max-w-4xl text-black mx-auto px-4 pb-20">
        {/* Legend */}
        <div className="flex justify-center flex-wrap items-center gap-3 mb-4 text-xs">
          <Legend label="Available" dotClass="bg-emerald-500" />
          <Legend label="Pending" dotClass="bg-yellow-500" />
          <Legend label="Reserved" dotClass="bg-rose-500" />
        </div>

        {/* Floor area */}
        <div
          className="relative w-full aspect-[14/9] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl"
          style={{
            backgroundImage: `url(${restaurant})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]" />

          <div className="flex justify-center mt-2">
            <Area
              title="Reception"
              sub="Check-in"
              icon={<FaConciergeBell />}
              tone="amber"
            />
          </div>

          <div className="absolute right-24 bottom-4">
            <Area title="Live Band" sub="Stage" icon={<FaMusic />} tone="sky" />
          </div>

          <div className="absolute right-10 top-30">
            <div className="flex flex-col items-center justify-center h-50 p-2 w-16 text-white rounded-md shadow-lg">
              {"Entrance".split("").map((char, index) => (
                <span key={index} className="text-lg font-bold leading-none">
                  {char}
                </span>
              ))}
              <ImEnter className="mt-2 font-bold text-2xl" />
            </div>
          </div>

          {/* Tables */}
          {tables.map((t) => {
            const status = getTableStatus(t.id);
            const bg = getTableBg(status);

            return (
              <button
                key={t.id}
                disabled={status === "pending" || status === "approved"}
                onClick={() => openForm(t)}
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
                className={[
                  "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 lg:w-20 lg:h-20 grid place-items-center shadow-lg ring-1 ring-white/10 text-slate-900",
                  bg,
                  status !== "available"
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer transition transform hover:scale-[1.04] active:scale-95",
                ].join(" ")}
              >
                <div className="relative w-3/4 h-3/4 rounded-full bg-white shadow-inner">
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-sm bg-slate-800" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-sm bg-slate-800" />
                  <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-3 rounded-sm bg-slate-800" />
                  <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 rounded-sm bg-slate-800" />
                </div>

                {status === "approved" && (
                  <span className="absolute -top-2 -right-2 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                    RESERVED
                  </span>
                )}
                {status === "pending" && (
                  <span className="absolute -top-2 -right-2 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                    PENDING
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Recent bookings */}
        {bookings.length > 0 && (
          <div className="mt-6 text-white bg-black border border-white rounded-xl p-4">
            <h3 className="font-medium mb-2">Recent Bookings</h3>
            <ul className="space-y-1 text-sm text-white">
              {bookings.slice(-5).map((b) => (
                <li key={b.id} className="flex flex-wrap gap-2">
                  <span className="opacity-70">Table</span>
                  <span className="font-semibold">#{b.tableId}</span>
                  <span className="opacity-70">
                    · {b.date} {b.time}
                  </span>
                  <span className="opacity-70">· {b.name}</span>
                  <span className="opacity-70">· {b.day}</span>
                  <span className="opacity-70">· {b.guests} guests</span>
                  <span className="opacity-70">· {b.duration} Minutes</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Reservation Form */}
      {selectedTable && (
        <ReservationForm
          table={selectedTable}
          onClose={closeForm}
          onSuccess={(res) => {
            setBookings((prev) => [
              ...prev,
              { ...res, id: crypto.randomUUID(), status: "pending" },
            ]);
            dispatch(fetchMyReservations());
          }}
          onDateChange={setSelectedDate} // pass selected date to Table
        />
      )}
    </div>
  );
}

// Legend & Area components
function Legend({ label, dotClass }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
      <span className={`inline-block h-3 w-3 rounded-full ${dotClass}`} />
      <span className="text-black text-[11px] font-medium">{label}</span>
    </span>
  );
}

function Area({ title, sub, icon, tone = "amber" }) {
  const ring = tone === "sky" ? "ring-sky-300/40" : "ring-amber-300/40";
  return (
    <div
      className={[
        "rounded-2xl px-4 py-3 shadow-xl backdrop-blur bg-white/10 ring-1",
        ring,
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        <div className="text-lg">{icon}</div>
        <div>
          <div className="text-sm font-semibold tracking-tight">{title}</div>
          <div className="text-[11px] text-white/85">{sub}</div>
        </div>
      </div>
    </div>
  );
}

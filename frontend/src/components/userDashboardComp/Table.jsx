import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaConciergeBell, FaMusic, FaUtensils } from "react-icons/fa";
import { ImEnter } from "react-icons/im";
import restaurant from "../../assets/restaurant.jpg";

export default function RestaurantBooking() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [reservedIds, setReservedIds] = useState(new Set([3, 8])); // demo pre-reserved
  const [bookings, setBookings] = useState([]);

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tableId: "",
      name: "",
      date: "",
      time: "",
      day: "",
      duration: "90",
      guests: 2,
      notes: "",
    },
    mode: "onTouched",
  });

  // Auto-calc Day from Date
  const watchDate = watch("date");
  useEffect(() => {
    if (watchDate) {
      const d = new Date(`${watchDate}T00:00:00`);
      const day = d.toLocaleDateString(undefined, { weekday: "long" });
      setValue("day", day, { shouldValidate: true });
    } else {
      setValue("day", "");
    }
  }, [watchDate, setValue]);

  // Floor plan tables
  const tables = useMemo(
    () => [
      { id: 1,  type: "window", x: 10, y: 18, seats: 2 },
      { id: 2,  type: "window", x: 25, y: 18, seats: 2 },
      { id: 3,  type: "center", x: 45, y: 35, seats: 4 },
      { id: 4,  type: "center", x: 60, y: 40, seats: 4 },
      { id: 5,  type: "center", x: 38, y: 55, seats: 4 },
      { id: 6,  type: "center", x: 58, y: 58, seats: 4 },
      { id: 7,  type: "band", x: 75, y: 64, seats: 4 },
      { id: 8,  type: "window", x: 15, y: 44, seats: 2 },
      { id: 9,  type: "window", x: 28, y: 44, seats: 2 },
      { id: 10,  type: "window", x: 20, y: 68, seats: 2 },
    ],
    []
  );

  // Open/close modal
  const openForm = (table) => {
    if (reservedIds.has(table.id)) return; // not clickable
    setSelectedTable(table);
    setValue("tableId", table.id);
  };
  const closeForm = () => {
    setSelectedTable(null);
    reset({
      tableId: "",
      name: "",
      date: "",
      time: "",
      day: "",
      duration: "90",
      guests: 2,
      notes: "",
    });
  };

  // Submit
  const onSubmit = (data) => {
    const table = tables.find((t) => t.id === Number(data.tableId));
    if (table && Number(data.guests) > table.seats) {
      alert(
        `This table seats up to ${table.seats}. Please reduce guests or choose another table.`
      );
      return;
    }
    setBookings((prev) => [...prev, { ...data, id: crypto.randomUUID() }]);
    setReservedIds((prev) => new Set([...prev, Number(data.tableId)]));
    closeForm();
  };

  return (
    <div className=" min-h-screen w-full bg-white ">
      {/* Header */}
      <header className="max-w-6xl text-black mx-auto px-4 pt-3 pb-3">
        <h1 className="text-3xl md:text-4xl text-center font-semibold tracking-tight">
          Reserve Your Table
        </h1>
      </header>

      <main className="max-w-4xl text-black mx-auto px-4 pb-20">
        {/* Legend */}
        <div className="flex justify-center flex-wrap items-center gap-3 mb-4 text-xs">
          <Legend label="Available" dotClass="bg-emerald-500" />
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

          {/* Reception */}
          <div className="flex justify-center mt-2">
            <Area
              title="Reception"
              sub="Check-in"
              icon={<FaConciergeBell />}
              tone="amber"
            />
          </div>

          {/* Band */}
          <div className="absolute right-100 bottom-4">
            <Area title="Live Band" sub="Stage" icon={<FaMusic />} tone="sky" />
          </div>

          {/* entrance */}
          <div className="absolute right-10 top-30">
            <div className="flex flex-col items-center justify-center h-50 p-2 w-16  text-white rounded-md shadow-lg">
              {"Enterance".split("").map((char, index) => (
                <span key={index} className="text-lg font-bold leading-none">
                  {char}
                </span>
              ))}
              <ImEnter className="mt-2 font-bold text-2xl" />
            </div>
          </div>

          {/* Window label */}
          <div className="absolute left-1 bottom-2 rotate-[-90deg] origin-bottom-left text-[10px] tracking-[0.25em] text-amber-200/8">
            WINDOW SIDE
          </div>

          {/* Tables */}
          {tables.map((t) => {
            const isReserved = reservedIds.has(t.id);
            const bg = isReserved
              ? "bg-rose-500/80"
                :"bg-emerald-500/90 hover:bg-emerald-500";

            return (
              <button
                key={t.id}
                disabled={isReserved}
                onClick={() => openForm(t)}
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
                className={[
                  "group absolute t -translate-x-1/2 -translate-y-1/2",
                  "rounded-full w-16 h-16 lg:w-20 lg:h-20 grid place-items-center",
                  "shadow-lg ring-1 ring-white/10 text-slate-900",
                  bg,
                  isReserved
                    ? "cursor-not-allowed opacity-80"
                    : "cursor-pointer transition transform hover:scale-[1.04] active:scale-95",
                ].join(" ")}
                  aria-label={`Table ${t.label} ${
                  isReserved ? "(reserved)" : "(available)"
                }`}
              >
                {/* tabletop */}
                <div className="relative w-3/4 h-3/4 rounded-full bg-white shadow-inner">
                  {/* chairs */}
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-sm bg-slate-800" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-sm bg-slate-800" />
                  <span className="absolute top-1/2 -left-1 -translate-y-1/2 w-3 h-3 rounded-sm bg-slate-800" />
                  <span className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 rounded-sm bg-slate-800" />
                </div>
                
                {isReserved && (
                  <span className="absolute -top-2 -right-2 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full">
                    RES
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Recent bookings (demo) */}
        {bookings.length > 0 && (
          <div className="mt-6  text-white bg-black border border-white rounded-xl p-4">
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

      {/* Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 grid place-items-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeForm}
          />

          <div className="relative z-10 w-[92vw] max-w-md rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-black/10">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Book Table {selectedTable.label}
                </h2>
                <p className="text-sm text-slate-500">
                  {selectedTable.type === "window" && "Window side"}
                  {selectedTable.type === "center" && "Center area"}
                  {selectedTable.type === "band" && "Near live band"} · Seats{" "}
                  {selectedTable.seats}
                </p>
              </div>
              <button
                onClick={closeForm}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-3">
              <input
                type="hidden"
                {...register("tableId", { required: true })}
              />

              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  placeholder="e.g., Muhammad Naveed"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Too short" },
                  })}
                />
                {errors.name && (
                  <p className="text-xs text-rose-600 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">Date</label>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    {...register("date", { required: "Date is required" })}
                  />
                  {errors.date && (
                    <p className="text-xs text-rose-600 mt-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Time</label>
                  <input
                    type="time"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    {...register("time", { required: "Time is required" })}
                  />
                  {errors.time && (
                    <p className="text-xs text-rose-600 mt-1">
                      {errors.time.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">Day</label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-slate-100"
                    placeholder="Auto from date"
                    readOnly
                    {...register("day")}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Duration</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    {...register("duration", { required: true })}
                  >
                    <option value="60">60 mins</option>
                    <option value="90">90 mins</option>
                    <option value="120">120 mins</option>
                    <option value="150">150 mins</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium">Guests</label>
                  <select
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    {...register("guests", { required: true, min: 1 })}
                  >
                    {Array.from({ length: 4 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Special Notes
                  </label>
                  <input
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                    placeholder="Birthday, high chair, etc."
                    {...register("notes")}
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="h-10 px-4 rounded-lg border border-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-5 rounded-lg bg-slate-900 text-white hover:bg-black focus:ring-2 focus:ring-slate-900"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

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

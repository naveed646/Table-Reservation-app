import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createReservation } from "../../api/reservation";

export default function ReservationForm({
  table,
  onClose,
  onSuccess,
  onDateChange,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tableId: table.id,
      name: "",
      date: "",
      time: "",
      day: "",
      duration: 90,
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
      if (onDateChange) onDateChange(watchDate); // notify parent Table
    } else {
      setValue("day", "");
    }
  }, [watchDate, setValue, onDateChange]);

  // Reset form when table changes
  useEffect(() => {
    reset({
      ...table,
      tableId: table.id,
      duration: 90,
      guests: 2,
      notes: "",
    });
  }, [table, reset]);

  // Submit handler
  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await createReservation(data);
      setSuccess("Reservation sent ✅ Waiting for admin approval.");
      if (onSuccess) onSuccess(res); // notify parent Table to refresh bookings
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to book table");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-[92vw] max-w-md rounded-2xl bg-white text-slate-900 shadow-2xl ring-1 ring-black/10">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Book Table {table.id}</h2>
            <p className="text-sm text-slate-500">
              {table.type === "window" && "Window side"}
              {table.type === "center" && "Center area"}
              {table.type === "band" && "Near live band"} · Seats{" "}
              {table.seats || "-"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-3">
          <input type="hidden" {...register("tableId", { required: true })} />

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
              <label className="block text-sm font-medium">
                Duration (mins)
              </label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                {...register("duration", { required: true, min: 30, max: 180 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Guests</label>
              <input
                type="number"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
                {...register("guests", { required: true, min: 1, max: 10 })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Special Notes</label>
              <input
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder="Birthday, high chair, etc."
                {...register("notes")}
              />
            </div>
          </div>

          {error && <p className="text-sm text-rose-600">{error}</p>}
          {success && <p className="text-sm text-green-600">{success}</p>}

          <div className="pt-1 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-lg border border-slate-300 hover:bg-slate-100"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-5 rounded-lg bg-slate-900 text-white hover:bg-black focus:ring-2 focus:ring-slate-900"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

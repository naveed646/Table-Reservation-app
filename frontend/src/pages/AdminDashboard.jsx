import React, { useEffect, useMemo } from "react";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaChair,
  FaBan,
  FaClipboardCheck,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReservations } from "../../src/redux/reservations/reservationSlice";
export default function AdminDashboard() {
  const dispatch = useDispatch();

  // Admin should use "all" reservations
  const reservations = useSelector((state) => state.reservations.all ?? []);
  const loading = useSelector((state) => state.reservations.loading);

  // Table layout definition (same as other components)
  const tables = useMemo(
    () => [
      { id: 1, type: "window", seats: 2 },
      { id: 2, type: "window", seats: 2 },
      { id: 3, type: "center", seats: 4 },
      { id: 4, type: "center", seats: 4 },
      { id: 5, type: "center", seats: 4 },
      { id: 6, type: "center", seats: 4 },
      { id: 7, type: "band", seats: 4 },
      { id: 8, type: "window", seats: 2 },
      { id: 9, type: "window", seats: 2 },
      { id: 10, type: "window", seats: 2 },
    ],
    []
  );

  // Fetch on mount and poll every 10s
  useEffect(() => {
    const POLL_MS = 10000;
    // initial fetch
    dispatch(fetchAllReservations());
    // interval
    const id = setInterval(() => {
      dispatch(fetchAllReservations());
    }, POLL_MS);
    return () => clearInterval(id);
  }, [dispatch]);

  // derive stats and recent list from reservations
  const stats = useMemo(() => {
    const total = reservations.length;
    const pending = reservations.filter((r) => r.status === "pending").length;
    const approved = reservations.filter((r) => r.status === "approved").length;
    const cancelled = reservations.filter(
      (r) => r.status === "cancelled"
    ).length;
    const rejected = reservations.filter((r) => r.status === "rejected").length;
    const completed = reservations.filter(
      (r) => r.status === "completed"
    ).length;

    // activeTables = number of unique table ids which have an APPROVED reservation
    const activeTablesCount = tables.filter((t) =>
      reservations.some((r) => r.tableId === t.id && r.status === "approved")
    ).length;

    return {
      total,
      pending,
      approved,
      cancelled,
      activeTablesCount,
      rejected,
      completed,
    };
  }, [reservations, tables]);

  // recent reservations (most recent first). Prefer createdAt if available, fallback to date+time
  const recentReservations = useMemo(() => {
    const list = [...reservations].sort((a, b) => {
      const aTime = new Date(
        a.createdAt ?? `${a.date ?? ""} ${a.time ?? ""}`
      ).getTime();
      const bTime = new Date(
        b.createdAt ?? `${b.date ?? ""} ${b.time ?? ""}`
      ).getTime();
      return bTime - aTime;
    });
    return list.slice(0, 10);
  }, [reservations]);

  return (
    <div className="p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* <StatCard title="Total Reservations" value={stats.total} color="from-indigo-500 to-purple-500" /> */}

        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<FaHourglassHalf size={28} />}
          color="bg-white"
        />

        <StatCard
          title="Approved"
          value={stats.approved}
          icon={<FaCheckCircle size={28} />}
          color="bg-white"
        />

        <StatCard
          title="Cancelled"
          value={stats.cancelled}
          icon={<FaTimesCircle size={28} />}
          color="bg-white"
        />

        <StatCard
          title="Active Tables"
          value={stats.activeTablesCount}
          icon={<FaChair size={28} />}
          color="bg-white"
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon={<FaBan size={28} />}
          color="bg-white"
        />
        <StatCard
          title="Completed"
          value={stats.rejected}
          icon={<FaClipboardCheck size={28} />}
          color="bg-white"
        />
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Recent Reservations
          </h2>
        </div>

        {loading ? (
          <p className="text-center p-4">Loading reservations...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-600">
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Table</th>
                  <th className="px-4 py-2 font-medium">Date / Time</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentReservations.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No reservations found.
                    </td>
                  </tr>
                ) : (
                  recentReservations.map((res) => (
                    <tr key={res._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{res.name}</td>
                      <td className="px-4 py-2">{res.tableId}</td>
                      <td className="px-4 py-2">
                        {res.date ?? "—"} {res.time ?? ""}
                      </td>
                      <td className="px-4 py-2 capitalize">{res.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* Small stat card component */
function StatCard({ title, value, icon }) {
  return (
    <div
      className={`flex items-center gap-4 bg- text-black p-6 rounded-2xl shadow`}
    >
      <div className="bg-white/20 p-3 rounded-full">
        {icon && icon} {/* render the icon directly */}
      </div>
      <div className="flex-1 text-right">
        <p className="text-sm">{title}</p>
        <p className="text-3xl font-bold mt-1">{value}</p>
      </div>
    </div>
  );
}

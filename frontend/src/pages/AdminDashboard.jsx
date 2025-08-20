import { statsData, reservationsData } from "../data/index";

export default function AdminDashboard() {
  return (
    <div className="p-6">

      {/* Stats Section */}
      <div className="flex justify-center sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className={`bg-gradient-to-r w-50 ${stat.gradient} text-white p-6 rounded-2xl  shadow hover:shadow-lg transition`}
          >
            <p className="text-sm text-center">{stat.title}</p>
            <p className="text-3xl text-center font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Recent Reservations
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600">
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Table</th>
                <th className="px-4 py-2 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {reservationsData.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{res.name}</td>
                  <td className="px-4 py-2">{res.table}</td>
                  <td className="px-4 py-2">{res.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

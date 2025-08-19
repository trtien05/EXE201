import React from "react";
import { Users, Calendar, MapPin, Layers } from "lucide-react";

type Stat = {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent: string;
};

const StatCard: React.FC<Stat> = ({ label, value, icon, accent }) => (
  <div className="relative bg-white rounded-lg shadow p-4 overflow-hidden">
    <div className={`absolute inset-y-0 left-0 w-2 ${accent}`} />
    <div className="flex items-center justify-between pl-4">
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-2xl font-bold mt-1">{value.toLocaleString()}</div>
      </div>
      <div className="p-3 bg-gray-50 rounded-full">{icon}</div>
    </div>
    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
      <div>Updated just now</div>
      <div className="text-green-500">+{Math.floor(Math.random() * 10)}%</div>
    </div>
  </div>
);

const AdminDashboardPage: React.FC = () => {
  const stats: Stat[] = [
    {
      label: "Total Users",
      value: 1244,
      icon: <Users size={18} />,
      accent: "bg-gradient-to-r from-blue-400 to-indigo-500",
    },
    {
      label: "Bookings Today",
      value: 32,
      icon: <Calendar size={18} />,
      accent: "bg-gradient-to-r from-green-400 to-emerald-500",
    },
    {
      label: "Hospitals",
      value: 78,
      icon: <MapPin size={18} />,
      accent: "bg-gradient-to-r from-yellow-400 to-orange-400",
    },
    {
      label: "Services",
      value: 45,
      icon: <Layers size={18} />,
      accent: "bg-gradient-to-r from-pink-400 to-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            icon={s.icon}
            accent={s.accent}
          />
        ))}
      </section>

      <section className="card">
        <div className="card-header flex items-center justify-between">
          <h2 className="text-lg font-medium">Recent Bookings</h2>
          <div className="text-sm text-gray-500">Showing latest 5</div>
        </div>
        <div className="card-body">
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-md hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">Patient #{1000 + i}</div>
                  <div className="text-sm text-gray-500">
                    Booked with Dr. John — {i} days ago
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;

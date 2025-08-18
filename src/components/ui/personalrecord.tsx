import { Clock, Activity } from "lucide-react";

export const PersonalRecords = () => {
  const records = [
    { label: "Squat", value: "120 kg", icon: <Activity className="w-5 h-5" /> },
    {
      label: "Bench Press",
      value: "85 kg",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      label: "Deadlift",
      value: "150 kg",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      label: "5k Run",
      value: "22:45 min",
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full bg-[#252525] text-white p-3 shadow-xl rounded-3xl mt-0 mx-2">
      <h2 className="text-lg font-semibold mb-3">Personal Records</h2>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
        {records.map((rec, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-neutral-700 rounded-xl p-2 shadow-md"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 text-gray-200 mb-2">
              {rec.icon}
            </div>
            <p className="text-sm font-semibold">{rec.label}</p>
            <p className="text-xs text-gray-400">{rec.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

import { Dumbbell, Flame, Clock, Activity } from "lucide-react";

export const RecentWorkouts = () => {
  const workouts = [
    {
      title: "Chest & Triceps",
      duration: "45 min",
      calories: "320 kcal",
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      title: "HIIT Cardio",
      duration: "30 min",
      calories: "250 kcal",
      icon: <Flame className="w-5 h-5" />,
    },
    {
      title: "Leg Day",
      duration: "55 min",
      calories: "410 kcal",
      icon: <Activity className="w-5 h-5" />,
    },
  ];

  return (
    <div className="w-full bg-[#252525] text-white p-4.5 shadow-xl rounded-4xl">
      <h2 className="text-lg font-semibold mb-3">Your Recent Workouts</h2>
      <div className="flex flex-col gap-3">
        {workouts.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-neutral-700 rounded-xl p-3 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/10 text-gray-200">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-gray-400">
                  {item.duration} • {item.calories}
                </p>
              </div>
            </div>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

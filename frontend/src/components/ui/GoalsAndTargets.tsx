import { Target, Trophy, Zap, Calendar } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: string;
  current: string;
  deadline: string;
  category: "fitness" | "nutrition" | "wellness";
  status: "on-track" | "behind" | "completed";
}

const goals: Goal[] = [
  {
    id: "1",
    title: "10K Steps Daily",
    description: "Maintain 10,000 steps every day this month",
    progress: 78,
    current: "23 days",
    target: "30 days",
    deadline: "Aug 31",
    category: "fitness",
    status: "on-track",
  },
  {
    id: "2",
    title: "Weight Loss Goal",
    description: "Lose 10 pounds by end of summer",
    progress: 60,
    current: "6 lbs",
    target: "10 lbs",
    deadline: "Sep 15",
    category: "fitness",
    status: "on-track",
  },
  {
    id: "3",
    title: "Weekly Workouts",
    description: "Complete 5 workouts per week",
    progress: 40,
    current: "2 workouts",
    target: "5 workouts",
    deadline: "This week",
    category: "nutrition",
    status: "behind",
  },
];

function getCategoryIcon(category: Goal["category"]) {
  switch (category) {
    case "fitness":
      return <Target className="h-4 w-4 text-white/80" />;
    case "nutrition":
      return <Zap className="h-4 w-4 text-purple-600" />;
    case "wellness":
      return <Trophy className="h-4 w-4 text-yellow-600" />;
  }
}

function getStatusColor(status: Goal["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 border-green-200";
    case "on-track":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "behind":
      return "bg-orange-100 text-orange-700 border-orange-200";
  }
}

export default function Goals() {
  return (
    <div className="bg-[#252525] rounded-4xl shadow-sm p-5">
      <h2 className="text-lg text-white font-semibold">Goals & Targets</h2>
      <p className="text-sm text-gray-400 mb-3">
        Track your fitness objectives and milestones
      </p>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-3 rounded-2xl bg-neutral-700 hover:shadow-sm transition"
          >
            {/* Fejléc */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getCategoryIcon(goal.category)}
                <h4 className="font-medium text-white">{goal.title}</h4>
              </div>
              <span
                className={`px-2 py-0.5 text-xs rounded border ${getStatusColor(
                  goal.status
                )}`}
              >
                {goal.status.replace("-", " ")}
              </span>
            </div>

            {/* Leírás */}
            <p className="mt-1 text-sm text-gray-400">{goal.description}</p>

            {/* Progress rész */}
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-gray-400">
                  {goal.current} of {goal.target}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gray-100"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-gray-400">
                <span>{goal.progress}% complete</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{goal.deadline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

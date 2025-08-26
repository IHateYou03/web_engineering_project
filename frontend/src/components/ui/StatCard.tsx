import { Dumbbell, Leaf, Droplet, Beef } from "lucide-react";

export const Statcard = () => {
  const stats = [
    {
      label: "Protein",
      value: "89 g",
      sub: "of 210 g",
      icon: <Dumbbell className="w-4 h-4" />,
    },
    {
      label: "Carbs",
      value: "130 g",
      sub: "of 300 g",
      icon: <Leaf className="w-4 h-4" />,
    },
    {
      label: "Fats",
      value: "50 g",
      sub: "of 70 g",
      icon: <Beef className="w-4 h-4" />,
    },
    {
      label: "Water",
      value: "2.5 L",
      sub: "of 5 L",
      icon: <Droplet className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full h-full bg-[#252525] text-white p-2.5 shadow-xl rounded-3xl">
      <div className="grid grid-cols-2 gap-3 h-full">
        {stats.map((item, i) => (
          <div
            key={i}
            className="flex flex-col bg-neutral-700 rounded-xl p-3 shadow-md"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">{item.label}</span>
              <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 text-gray-200">
                {item.icon}
              </div>
            </div>
            <p className="text-lg font-semibold">{item.value}</p>
            <p className="text-xs text-gray-400">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

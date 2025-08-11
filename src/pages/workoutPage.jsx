import { HoverDetailCard } from "@/components/ui/hover-detail-card";

export default function WorkoutPage() {
  return (
    <div className="flex flex-1 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 gap-2 p-4">
      <HoverDetailCard
        title="Studfdsfdio shots"
        subtitle="52 tiles"
        primaryButton={{
          text: "Go to coldsdlection",
          color: "bg-white/90",
          hoverColor: "hover:bg-white",
          textColor: "text-gray-900",
        }}
        secondaryButton={{
          text: "Edit rules",
          color: "bg-blue-600",
          hoverColor: "hover:bg-blue-700",
          textColor: "text-white",
        }}
        pills={{
          left: {
            text: "1×1",
            color: "bg-blue-100",
            textColor: "text-blue-800",
          },
          sparkle: {
            show: true,
            color: "bg-purple-100 text-purple-800",
          },
          right: {
            text: "Published",
            color: "bg-green-100",
            textColor: "text-green-800",
          },
        }}
        enableAnimations={true}
      />
    </div>
  );
}

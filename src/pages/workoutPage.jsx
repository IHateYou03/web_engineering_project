import { HoverDetailCard } from "@/components/ui/HoverDetailCard";
import DigitalSerenity from "@/components/ui/TextEffect";
import { Button } from "@/components/ui/button";

export default function WorkoutPage() {
  return (
    <div className="flex flex-col rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-full">
      {/* Felső gombsor */}
      <div className="flex justify-between items-center w-full p-2">
        <Button variant="link" className="font-primary">
          My Personal Workouts
        </Button>
        <Button variant="link" className="font-primary">
          Create Workout
        </Button>
      </div>

      {/* Központi tartalom */}
      <div className="flex flex-col items-center w-full p-2 gap-10">
        <div className="w-full">
          <DigitalSerenity />
        </div>

        {/* Kártyák */}
        <div className="flex flex-wrap gap-3 justify-center w-full">
          <HoverDetailCard
            title="Workout1"
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

          <HoverDetailCard
            title="Workout1"
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

          <HoverDetailCard
            title="Workout1"
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

          <HoverDetailCard
            title="Workout1"
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

          <HoverDetailCard
            title="Workout1"
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

          <HoverDetailCard
            title="Workout1"
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

          {/* ... ide jöhet a többi HoverDetailCard ugyanúgy ... */}
        </div>

        {/* Alul szöveg */}
        <div className="flex justify-center w-full mt-2">
          <h2 className="text-xs sm:text-sm font-mono font-light text-slate-300 uppercase tracking-[0.2em] opacity-80 text-decoration-animate-top text-center">
            <span className="word-animate" data-delay="6500">
              Observe,
            </span>{" "}
            <span className="word-animate" data-delay="7500">
              accept,
            </span>{" "}
            <span className="word-animate" data-delay="8500">
              let go.
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((_, i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          //
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
              //
            />
          </div>
          {[...new Array(2)].map((_, i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-800"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

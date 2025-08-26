import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

import { cn } from "../../lib/utils";

import { CheckCircle, TrendingUp, Video, Globe } from "lucide-react";
import { UserAuth } from "../auth/AuthContext";
import { Button } from "./Button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "../Modal";
import { Input } from "./Input";

import { Label } from "./Label";

import { ThemeProvider } from "../ThemeProvider";

export interface BentoItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  user_id?: string;
  user_name?: string;
}

function BentoGrid() {
  const [items, setItems] = useState<BentoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [exploreOpen, setExploreOpen] = React.useState(false);
  const [selectedWorkout, setSelectedWorkout] = React.useState(null);
  const [name, setName] = React.useState();
  const { session } = UserAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: workouts, error: workoutsError } = await supabase
        .from("workouts")
        .select("*")
        .eq("visibility", "community")
        .order("created_at", { ascending: false });

      if (workoutsError) {
        console.log("Error fetching workouts", workoutsError);
        setLoading(false);
        return;
      }

      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, name");

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
        setLoading(false);
        return;
      }

      const mappedItems: BentoItem[] = workouts.map((workout) => {
        const author = profiles.find((p) => p.id === workout.user_id);
        return {
          id: workout.id,
          title: workout.name,
          description: workout.description,
          tags: workout.tags || [],
          meta: workout.duration,
          status: workout.intensity,
          user_id: workout.user_id,
          user_name: author?.name || "Unknown", // itt kötjük össze
          cta: "Explore →",
          icon: getIconByTag(workout.tags || []),
          colSpan: 10,
          hasPersistentHover: false,
        };
      });

      setItems(mappedItems);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchProfile = async () => {};
  fetchProfile();

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const update = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      duration: formData.get("duration") as string,
      intensity: formData.get("intensity") as string,
      tags: (formData.get("tags") as string)?.split(",").map((t) => t.trim()),
    };

    const { error } = await supabase
      .from("workouts")
      .update(update)
      .eq("id", selectedWorkout.id);

    if (error) {
      console.error("Update failed:", error);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedWorkout.id
            ? {
                ...item,
                title: update.name,
                description: update.description,
                meta: update.duration,
                status: update.intensity,
                tags: update.tags,
              }
            : item
        )
      );
      setExploreOpen(false);
    }
  };

  const getIconByTag = (tags: string[]) => {
    if (tags.includes("cardio"))
      return <TrendingUp className="w-4 h-4 text-blue-500" />;
    if (tags.includes("strength"))
      return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    if (tags.includes("media"))
      return <Video className="w-4 h-4 text-purple-500" />;
    return <Globe className="w-4 h-4 text-sky-500" />;
  };

  if (loading) return <p className="text-center py-4">Loading workouts...</p>;

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "group relative p-2.5 rounded-xl overflow-hidden transition-all duration-300",
              "border border-gray-100/80 dark:border-white/10 bg-white dark:bg-black",
              "hover:shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_2px_12px_rgba(255,255,255,0.03)]",
              "hover:-translate-y-0.5 will-change-transform",
              item.colSpan || "col-span-1",
              item.colSpan === 2 ? "md:col-span-2" : "",
              {
                "shadow-[0_2px_12px_rgba(0,0,0,0.03)] -translate-y-0.5":
                  item.hasPersistentHover,
                "dark:shadow-[0_2px_12px_rgba(255,255,255,0.03)]":
                  item.hasPersistentHover,
              }
            )}
          >
            <div
              className={`absolute inset-0 ${
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity duration-300`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
            </div>

            <div className="relative flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-br transition-all duration-300">
                  {item.icon}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-1 rounded-lg backdrop-blur-sm",
                    "bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300",
                    "transition-colors duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/20"
                  )}
                >
                  {item.status || "Active"}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 dark:text-gray-100 tracking-tight text-[15px]">
                  {item.title}
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 font-normal">
                    {item.meta}
                  </span>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug font-[425]">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  {item.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-black/5 dark:bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="link"
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setSelectedWorkout(item);
                      setExploreOpen(true);
                    }}
                  >
                    {item.cta || "Explore →"}
                  </Button>
                </span>
              </div>
            </div>

            <Modal open={exploreOpen} onOpenChange={setExploreOpen}>
              <ModalContent className="bg-neutral-900 text-white">
                {selectedWorkout && (
                  <>
                    {selectedWorkout.user_id === session?.user?.id ? (
                      <form onSubmit={handleEdit}>
                        <ModalHeader>
                          <ModalTitle>Edit Workout</ModalTitle>
                          <ModalDescription>
                            Update your workout details.
                          </ModalDescription>
                        </ModalHeader>
                        <ModalBody className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              name="name"
                              defaultValue={selectedWorkout.title}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                              id="duration"
                              name="duration"
                              defaultValue={selectedWorkout.meta}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="intensity">Intensity</Label>
                            <Input
                              id="intensity"
                              name="intensity"
                              defaultValue={selectedWorkout.status}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                              id="description"
                              name="description"
                              defaultValue={selectedWorkout.description}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="tags">Tags</Label>
                            <Input
                              id="tags"
                              name="tags"
                              defaultValue={selectedWorkout.tags?.join(", ")}
                            />
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={async () => {
                              if (!selectedWorkout) return;

                              const confirmDelete = confirm(
                                `Are you sure you want to delete "${selectedWorkout.title}"?`
                              );
                              if (!confirmDelete) return;

                              const { error } = await supabase
                                .from("workouts")
                                .delete()
                                .eq("id", selectedWorkout.id);

                              if (error) {
                                console.error("Error deleting workout:", error);
                                alert("Failed to delete workout.");
                              } else
                                setItems((prev) =>
                                  prev.filter(
                                    (item) => item.id !== selectedWorkout.id
                                  )
                                );
                              setExploreOpen(false);
                              alert("Workout deleted successfully!");
                            }}
                          >
                            Delete
                          </Button>
                          <Button type="submit">Save</Button>
                        </ModalFooter>
                      </form>
                    ) : (
                      <>
                        <ModalHeader>
                          <ModalTitle>{selectedWorkout.title}</ModalTitle>
                          <ModalDescription>
                            Published by @{selectedWorkout.user_name}
                          </ModalDescription>
                        </ModalHeader>
                        <ModalBody className="grid gap-4 py-4">
                          <p>
                            <strong>Duration:</strong> {selectedWorkout.meta}
                          </p>
                          <p>
                            <strong>Intensity:</strong> {selectedWorkout.status}
                          </p>
                          <p>{selectedWorkout.description}</p>
                          <p>
                            {selectedWorkout.tags?.map((t) => (
                              <span key={t} className="mr-2">
                                #{t}
                              </span>
                            ))}
                          </p>
                        </ModalBody>
                        <ModalFooter>
                          <Button onClick={() => setExploreOpen(false)}>
                            Close
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </>
                )}
              </ModalContent>
            </Modal>

            <div
              className={`absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-gray-100/50 to-transparent dark:via-white/10 ${
                item.hasPersistentHover
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity duration-300`}
            />
          </div>
        ))}
      </div>
    </ThemeProvider>
  );
}

export { BentoGrid };

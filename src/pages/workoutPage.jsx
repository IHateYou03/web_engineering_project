import DigitalSerenity from "@/components/ui/texteffect";
import { Button } from "@/components/ui/button";
import { BentoGrid } from "@/components/ui/bento-grid";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Check, ChevronsUpDown } from "lucide-react";
import { supabase } from "@/supabaseClient";
import { UserAuth } from "@/components/auth/AuthContext";
import { BentoGridPrivate } from "@/components/ui/bento-grid_private";
import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function WorkoutPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [privateOpen, setPrivateOpen] = useState(false);
  const [visibilityOpen, setVisibilityOpen] = useState(false);
  const [visibilityValue, setVisibilityValue] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const { session } = UserAuth();

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error(error);
      setError("Could not fetch profile.");
    } else {
      setName(data?.name ?? null);
    }
  };
  fetchProfile();

  const visibility = [
    {
      value: "private",
      label: "Private",
    },
    {
      value: "community",
      label: "Community",
    },
  ];

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 w-full">
        <div className="flex justify-between p-5">
          <Modal open={privateOpen} onOpenChange={setPrivateOpen}>
            <ModalTrigger asChild>
              <Button className="hover:cursor-pointer p-2">
                my private workouts
              </Button>
            </ModalTrigger>
            <ModalContent className="bg-neutral-900 text-white w-full lg:max-w-[1150px] h-[50vh] overflow-y-auto">
              <ModalHeader>
                <ModalTitle>{name}’s Private Workouts</ModalTitle>
                <ModalDescription>
                  Your Workouts, exactly how you like them.
                </ModalDescription>
              </ModalHeader>
              <BentoGridPrivate />
            </ModalContent>
          </Modal>

          {/* Jobb sarok */}
          <Modal open={createOpen} onOpenChange={setCreateOpen}>
            <ModalTrigger asChild>
              <Button className="hover:cursor-pointer p-2">
                + create workout
              </Button>
            </ModalTrigger>
            <ModalContent className="bg-neutral-900 text-white">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const tagsInput = e.target.tags.value;
                  const tagsArray = tagsInput
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag.length > 0);

                  const formData = {
                    name: e.target.name.value,
                    duration: e.target.duration.value,
                    intensity: e.target.intensity.value,
                    description: e.target.description.value,
                    tags: tagsArray,
                    visibility: visibilityValue,
                  };

                  const { error } = await supabase.from("workouts").insert([
                    {
                      ...formData,
                      user_id: (await supabase.auth.getUser()).data.user?.id,
                    },
                  ]);

                  if (error) {
                    console.error(error);
                    alert("Error at saving.");
                  } else {
                    alert("Workout saved successfully!");
                    setCreateOpen(false);
                  }
                }}
              >
                <ModalHeader>
                  <ModalTitle>Create Workout</ModalTitle>
                  <ModalDescription>
                    Create your workout for yourself / our community.
                  </ModalDescription>
                </ModalHeader>
                <ModalBody className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue="Default Workout"
                    />
                  </div>

                  {/* Visibility combobox */}
                  <div className="grid gap-2">
                    <Label htmlFor="visibility">Visibility</Label>
                    <Popover
                      open={visibilityOpen}
                      onOpenChange={setVisibilityOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={visibilityOpen}
                          className="w-full justify-between"
                        >
                          {visibilityValue
                            ? visibility.find(
                                (item) => item.value === visibilityValue
                              )?.label
                            : "Select visibility..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search visibility..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No option found.</CommandEmpty>
                            <CommandGroup>
                              {visibility.map((item) => (
                                <CommandItem
                                  key={item.value}
                                  value={item.value}
                                  onSelect={(currentValue) => {
                                    setVisibilityValue(
                                      currentValue === visibilityValue
                                        ? ""
                                        : currentValue
                                    );
                                    setVisibilityOpen(false);
                                  }}
                                >
                                  {item.label}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      visibilityValue === item.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g. 45 min"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="intensity">Intensity</Label>
                    <Input
                      id="intensity"
                      name="intensity"
                      placeholder="e.g. Medium"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="Short description..."
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="e.g. cardio, strength"
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <ModalClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </ModalClose>
                  <Button type="submit">Save</Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </div>

        {/* Központi tartalom */}
        <div className="flex flex-col items-center w-full gap-5">
          <DigitalSerenity />
          <BentoGrid />

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
    </ThemeProvider>
  );
}

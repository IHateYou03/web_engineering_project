import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown, ImagePlus, X, LogOut } from "lucide-react";
import { useId, useState } from "react";
import { SidebarLink } from "@/components/ui/Sidebar";
import { UserAuth } from "./auth/AuthContext";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

export function EditProfileDialog({
  name,
  profilePicture,
}: {
  name: string;
  profilePicture: string;
  open: boolean;
}) {
  const id = useId();
  const maxLength = 180;
  const { session, signOutUser } = UserAuth();
  const [fitnesslevelOpen, setFitnesslevelOpen] = useState(false);
  const [fitnesslevelValue, setFitnesslevelValue] = useState("");
  const [personalgoalOpen, setPersonalgoalOpen] = useState(false);
  const [personalgoalValue, setPersonalgoalValue] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  const fitnesslevel = [
    {
      value: "newbie",
      label: "Newbie",
    },
    {
      value: "beginner",
      label: "Beginner",
    },
    {
      value: "intermediate",
      label: "Intermediate",
    },
    {
      value: "advanced",
      label: "Advanced",
    },
  ];

  const personalgoal = [
    {
      value: "bstrength",
      label: "Build Strength",
    },
    {
      value: "bmuscle",
      label: "Build Muscle",
    },
    {
      value: "lfat",
      label: "Lose Fat",
    },
    {
      value: "ltechs",
      label: "Learn Techniques",
    },
  ];

  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
  });

  return (
    <Dialog>
      <div className="flex items-center justify-between gap-20">
        <DialogTrigger asChild>
          <SidebarLink
            link={{
              label: name,
              to: "#",
              icon: (
                <img
                  src={profilePicture}
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  alt="Avatar"
                  width={50}
                  height={50}
                />
              ),
            }}
          />
        </DialogTrigger>

        {open && (
          <button className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:cursor-pointer transition-colors">
            <LogOut className="h-5 w-5" onClick={handleSignOut} />
          </button>
        )}
      </div>

      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg text-white">
        <DialogHeader className="contents text-left">
          <DialogTitle className="border-b border-border px-6 py-3 text-base">
            Edit profile
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a
          username.
        </DialogDescription>

        <div className="flex items-center py-2">
          {/* Avatar */}
          <div className="pt-10">
            <Avatar defaultImage={profilePicture} />
          </div>
          {/* Name input */}
          <div className="w-[360px] pb-3">
            <Label htmlFor={name}>Name</Label>
            <Input id={name} defaultValue={name} type="text" required />
          </div>
        </div>

        <div className="px-6 pb-3 pt-2">
          <form className="space-y-3">
            <div className="flex-1">
              <Label htmlFor={`${id}-last-name`}>E-Mail Address</Label>
              <Input
                id={`${id}-last-name`}
                defaultValue={session?.user?.email}
                type="text"
                required
              />
              <div className="pointer-events-none pb-32 px-6 absolute inset-y-3 right-3 flex items-center">
                <Check
                  size={16}
                  strokeWidth={2}
                  className="text-emerald-500"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="visibility">Personal Goal</Label>
              <Popover
                open={personalgoalOpen}
                onOpenChange={setPersonalgoalOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={personalgoalOpen}
                    className="w-full justify-between"
                  >
                    {personalgoalValue
                      ? personalgoal.find(
                          (item) => item.value === personalgoalValue
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
                        {personalgoal.map((item) => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={(currentValue) => {
                              setPersonalgoalValue(
                                currentValue === personalgoalValue
                                  ? ""
                                  : currentValue
                              );
                              setPersonalgoalOpen(false);
                            }}
                          >
                            {item.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                personalgoalValue === item.value
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
              <Label htmlFor="visibility">Training Experience</Label>
              <Popover
                open={fitnesslevelOpen}
                onOpenChange={setFitnesslevelOpen}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={fitnesslevelOpen}
                    className="w-full justify-between"
                  >
                    {fitnesslevelValue
                      ? fitnesslevel.find(
                          (item) => item.value === fitnesslevelValue
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
                        {fitnesslevel.map((item) => (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            onSelect={(currentValue) => {
                              setFitnesslevelValue(
                                currentValue === fitnesslevelValue
                                  ? ""
                                  : currentValue
                              );
                              setFitnesslevelOpen(false);
                            }}
                          >
                            {item.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                fitnesslevelValue === item.value
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

            <div className="grid space-y-3">
              <Label htmlFor={`${id}-bio`}>Biography</Label>
              <Textarea
                id={`${id}-bio`}
                placeholder="Write a few sentences about yourself"
                defaultValue={value}
                maxLength={maxLength}
                onChange={handleChange}
                aria-describedby={`${id}-description`}
              />
              <p
                id={`${id}-description`}
                className="mt-2 text-right text-xs text-muted-foreground"
                role="status"
                aria-live="polite"
              >
                <span className="tabular-nums">{limit - characterCount}</span>{" "}
                characters left
              </p>
            </div>
          </form>
        </div>

        <DialogFooter className="border-t border-border px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProfileBg({ defaultImage }: { defaultImage?: string }) {
  const [hideDefault, setHideDefault] = useState(false);
  const {
    previewUrl,
    fileInputRef,
    handleThumbnailClick,
    handleFileChange,
    handleRemove,
  } = useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
        {currentImage && (
          <img
            className="h-full w-full object-cover"
            src={currentImage}
            alt="Profile background"
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <button
            type="button"
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white"
            onClick={handleThumbnailClick}
            aria-label="Change image"
          >
            <ImagePlus size={16} />
          </button>
          {currentImage && (
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white"
              onClick={handleImageRemove}
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
}

function Avatar({ defaultImage }: { defaultImage?: string }) {
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange } =
    useImageUpload();
  const currentImage = previewUrl || defaultImage;

  return (
    <div className="-mt-10 px-6">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm">
        {currentImage && (
          <img
            src={currentImage}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            alt="Profile image"
          />
        )}
        <button
          type="button"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white"
          onClick={handleThumbnailClick}
          aria-label="Change profile picture"
        >
          <ImagePlus size={16} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
      </div>
    </div>
  );
}

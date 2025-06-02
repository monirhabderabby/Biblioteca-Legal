"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2, Pencil, Save } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { toast } from "sonner";

export const UserSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  image: z.string().optional(),
  email: z.string().optional(),
});

// Type Definitions
type ProfileFormProps = {
  user: User;
};

type UserData = z.infer<typeof UserSchema>;

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [editable, setEditable] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageLoader, setImageLoader] = useState(false);
  // const { edgestore } = useEdgeStore();

  const { mutate: updateMutation, isPending } = useMutation({
    mutationKey: ["profile"],
    mutationFn: async (data: UserData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/update-profile`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: () => toast.success("Profile updated successfully!"),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => toast.error(error.message),
  });

  const form = useForm<UserData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      image: user?.image || "/default-profile.jpg", // Default profile image
      email: user?.email || "",
    },
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageLoader(true);
      // const res = await edgestore.publicFiles.upload({ file });
      // form.setValue("image", res?.url || "");
      setImageLoader(false);
    }
  };

  const onSubmit = (data: UserData) => {
    updateMutation(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
            Profile
          </h2>
          <p className="text-tourHub-green-dark text-base mb-1">
            Manage your profile
          </p>
        </div>
        <Button
          className="text-sm  rounded-md px-3 py-2"
          onClick={() => {
            if (editable) {
              form.handleSubmit(onSubmit)();
            }
            setEditable((prev) => !prev);
          }}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : editable ? (
            <Save className="mr-2 h-4 w-4" />
          ) : (
            <Pencil className="mr-2 h-4 w-4" />
          )}
          {isPending ? "Saving" : editable ? "Save" : "Edit"}
        </Button>
      </div>
      {/* <Separator className="mb-4" /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-2 flex items-center gap-x-4">
                <div className="h-[100px] w-[100px] flex justify-center items-center relative">
                  <motion.div
                    initial={{ filter: "blur(0px)" }}
                    animate={{
                      filter: imageLoader ? "blur(1px)" : "blur(0px)",
                      transition: {
                        duration: 0.5,
                      },
                    }}
                    className="h-full w-full rounded-full relative flex justify-center items-center"
                  >
                    <Image
                      src={field.value || "/default-profile.jpg"}
                      alt="profile"
                      fill
                      className="rounded-full object-cover text-tourHub-green-dark bg-gray-100"
                    />
                  </motion.div>
                  {imageLoader && (
                    <Loader2 className="animate-spin h-5 w-5 absolute" />
                  )}
                </div>
                {editable && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="text-primary hover:text-primary/80"
                      onClick={handleUploadClick}
                      disabled={imageLoader}
                    >
                      Upload
                    </Button>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                {editable && <FormLabel>First Name</FormLabel>}
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your First Name"
                    {...field}
                    className="disabled:opacity-100"
                    disabled={!editable}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                {editable && <FormLabel>Last Name</FormLabel>}
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your last Name"
                    {...field}
                    className="disabled:opacity-100"
                    disabled={!editable}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                {editable && <FormLabel>Email</FormLabel>}
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Primary Email"
                    {...field}
                    disabled
                    className="disabled:opacity-70"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;

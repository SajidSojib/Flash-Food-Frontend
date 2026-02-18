"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Upload,
  User,
  Mail,
  Lock,
  Phone,
  Camera,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { env } from "@/env";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/common/inputField";
import GoogleLoginButton from "@/components/common/googleLoginButton";

const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s]*$/, {
      message: "Name can only contain letters and spaces",
    }),

  email: z
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),

  phone: z.string().regex(/^\d{11}$/, {
    message: "Please enter a valid 11-digit phone number",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),

  image: z
    .instanceof(File)
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      },
      { message: "Image must be less than 5MB" },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        );
      },
      { message: "Only JPEG, PNG, and WebP images are allowed" },
    ),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function CustomerForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      image: undefined as File | undefined,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your account...");
      setIsSubmitting(true);
      try {
        const userData = {
          name: value.name,
          email: value.email,
          phone: value.phone,
          password: value.password,
          image: "",
        };

        // Handle image upload if exists
        if (value.image && value.image instanceof File) {
          try {
            const imgUploadUrl = env.NEXT_PUBLIC_IMG_UPLOAD_URL;
            const formData = new FormData();
            formData.append("image", value.image);

            const res = await fetch(imgUploadUrl, {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              throw new Error(`Image upload failed: ${res.status}`);
            }

            const result = await res.json();
            if (result.success && result.data?.display_url) {
              userData.image = result.data.display_url;
            } else {
              throw new Error(result.error?.message || "Image upload failed");
            }
          } catch (imageError) {
            console.error("Image upload error:", imageError);
            toast.warning("Profile photo upload failed, continuing without it");
          }
        }

        // Sign up with Better Auth
        const { data, error } = await authClient.signUp.email(userData);

        if (error) {
          toast.error(error.message || "Sign up failed", { id: toastId });
          setIsSubmitting(false);
          return;
        }
        console.log(data);
        toast.success("Account created successfully!", { id: toastId });

        setIsSubmitting(false);
        router.push("/login");
        router.refresh();
      } catch (error) {
        console.error("Signup error:", error);
        setIsSubmitting(false);
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
          { id: toastId },
        );
      }
    },
    validators: {
      onSubmit: signupSchema,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setFieldValue("image", file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <>
      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-3">
            {/* Photo Upload Field */}
            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Profile Photo</FieldLabel>
                    <div className="flex items-center gap-4">
                      {/* Preview */}
                      <div className="shrink-0">
                        {previewUrl ? (
                          <div className="relative">
                            <div className="size-20 rounded-full overflow-hidden border-2 border-primary">
                              <Image
                                src={previewUrl}
                                alt="Profile preview"
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="size-20 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-muted/20">
                            <Camera className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Upload Area */}
                      <div className="flex-1">
                        <input
                          type="file"
                          id="photo-upload"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="space-y-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() =>
                              document.getElementById("photo-upload")?.click()
                            }
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Photo
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPEG, PNG, or WebP. Max 5MB.
                          </p>
                        </div>
                      </div>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <div className="flex flex-col w-full sm:flex-row gap-5">
              {/* Name Field */}
              <form.Field
                name="name"
                children={(field) => {
                  return (
                    <InputField
                      field={field}
                      label="Name"
                      type="text"
                      placeholder="John Doe"
                      icon={<User className="h-4 w-4 text-muted-foreground" />}
                    />
                  );
                }}
              />

              {/* Email Field */}
              <form.Field
                name="email"
                children={(field) => {
                  return (
                    <InputField
                      field={field}
                      label="Email Address"
                      type="email"
                      placeholder="you@example.com"
                      icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                    />
                  );
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              {/* Phone Field */}
              <form.Field
                name="phone"
                children={(field) => {
                  return (
                    <InputField
                      field={field}
                      label="Phone Number"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      icon={<Phone className="h-4 w-4 text-muted-foreground" />}
                    />
                  );
                }}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                children={(field) => {
                  return (
                    <InputField
                      field={field}
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      icon={<Lock className="h-4 w-4 text-muted-foreground" />}
                      showPasswordToggle
                      onTogglePassword={() => setShowPassword(!showPassword)}
                      showPassword={showPassword}
                    />
                  );
                }}
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          form="signup-form"
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>

        <Separator />

        <GoogleLoginButton isSubmitting={isSubmitting} />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </CardFooter>
    </>
  );
}

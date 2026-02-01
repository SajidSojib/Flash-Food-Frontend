"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Eye,
  EyeOff,
  Upload,
  User,
  Mail,
  Lock,
  Phone,
  Camera,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { env } from "@/env";
import { useRouter } from "next/navigation";

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

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

        console.log("Submitting user data:", userData);

        // Sign up with Better Auth
        const { data, error } = await authClient.signUp.email(userData);

        if (error) {
          toast.error(error.message || "Sign up failed", { id: toastId });
          return;
        }

        toast.success("Account created successfully!", { id: toastId });

        router.push("/");
        router.refresh();
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
          { id: toastId },
        );
      }
    },
    validators: {
      onChange: signupSchema,
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

  const removePhoto = () => {
    form.setFieldValue("image", undefined);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
  };

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: env.NEXT_PUBLIC_FRONTEND_URL,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error("Google login failed");
      console.error(error);
    }
  };

  return (
    <div className="pt-25 bg-background">
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-xl">

          {/* Form Card */}
          <Card className="border-border w-full shadow-lg">
            <CardHeader className="">
              <CardTitle>
                <h1 className="text-3xl font-bold text-center">
                  Welcome to Flash <span className="text-primary">Food</span>
                </h1>
              </CardTitle>
              <CardDescription className="text-center">
                Enter your information below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="signup-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <FieldGroup className="space-y-5">
                  {/* Photo Upload Field */}
                  <form.Field
                    name="image"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel>
                            Profile Photo
                          </FieldLabel>
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
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-1 -right-1 h-6 w-6 rounded-full"
                                    onClick={removePhoto}
                                  >
                                    <span className="text-xs">×</span>
                                  </Button>
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
                                    document
                                      .getElementById("photo-upload")
                                      ?.click()
                                  }
                                  disabled={form.state.isSubmitting}
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
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Full Name
                            </FieldLabel>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="text"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                                placeholder="John Doe"
                                className={cn("pl-10 w-full")}
                                disabled={form.state.isSubmitting}
                              />
                            </div>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    {/* Email Field */}
                    <form.Field
                      name="email"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Email Address
                            </FieldLabel>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="email"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                                placeholder="you@example.com"
                                className={cn("pl-10")}
                                disabled={form.state.isSubmitting}
                              />
                            </div>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5">
                    {/* Phone Field */}
                    <form.Field
                      name="phone"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Phone Number
                            </FieldLabel>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="tel"
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                                placeholder="01XXXXXXXXX"
                                className={cn("pl-10")}
                                disabled={form.state.isSubmitting}
                              />
                            </div>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />

                    {/* Password Field */}
                    <form.Field
                      name="password"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Password
                            </FieldLabel>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                onBlur={field.handleBlur}
                                placeholder="Enter password"
                                className={cn("pl-10 pr-10")}
                                disabled={form.state.isSubmitting}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={form.state.isSubmitting}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
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
                disabled={!form.state.isValid || form.state.isSubmitting}
              >
                {form.state.isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>

              <Separator />

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                type="button"
                className="w-full"
                disabled={form.state.isSubmitting}
              >
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

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
          </Card>
        </div>
      </div>
    </div>
  );
}

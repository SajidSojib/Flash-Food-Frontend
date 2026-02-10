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
  Building,
  Globe,
  MapPin,
  Truck,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { env } from "@/env";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { providerServices } from "@/services/provider.service";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import useMeasure from "react-use-measure";

const providerSchema = z.object({
  // User data
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

  photo: z
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

  // Provider data
  restaurantName: z
    .string()
    .min(2, { message: "Restaurant name must be at least 2 characters" })
    .max(100, { message: "Restaurant name must be less than 100 characters" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description must be less than 500 characters" }),

  logo: z
    .instanceof(File)
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= 5 * 1024 * 1024;
      },
      { message: "Logo must be less than 5MB" },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file.type,
        );
      },
      { message: "Only JPEG, PNG, and WebP images are allowed for logo" },
    ),

  website: z.string().url({ message: "Please enter a valid website URL" }),

  restaurantPhone: z.string().regex(/^\d{11}$/, {
    message: "Please enter a valid 11-digit restaurant phone number",
  }),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters" })
    .max(200, { message: "Address must be less than 200 characters" }),

  deliveryFee: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Please enter a valid delivery fee (e.g., 50.00)",
  }),
});

type ProviderFormValues = z.infer<typeof providerSchema>;

export function MultiStepProviderForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<number>();
  const [ref, bounds] = useMeasure();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      // User data
      name: "",
      email: "",
      phone: "",
      password: "",
      photo: undefined as File | undefined,

      // Provider data
      restaurantName: "",
      description: "",
      logo: undefined as File | undefined,
      website: "",
      restaurantPhone: "",
      address: "",
      deliveryFee: "",
    },
    validators: {
      onChange: providerSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your provider account...");
      try {
        const userData = {
          name: value.name,
          email: value.email,
          phone: value.phone,
          password: value.password,
          image: "",
        };

        const providerData = {
          restaurantName: value.restaurantName,
          token: "",
          description: value.description,
          logo: "",
          website: value.website,
          phone: value.restaurantPhone,
          address: value.address,
          deliveryFee: Number(value.deliveryFee),
        };

        // Handle user photo upload
        if (value.photo && value.photo instanceof File) {
          try {
            const imgUploadUrl = env.NEXT_PUBLIC_IMG_UPLOAD_URL;
            const formData = new FormData();
            formData.append("image", value.photo);

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
            console.error("User photo upload error:", imageError);
            toast.warning("Profile photo upload failed, continuing without it");
          }
        }

        // Handle restaurant logo upload
        if (value.logo && value.logo instanceof File) {
          try {
            const imgUploadUrl = env.NEXT_PUBLIC_IMG_UPLOAD_URL;
            const formData = new FormData();
            formData.append("image", value.logo);

            const res = await fetch(imgUploadUrl, {
              method: "POST",
              body: formData,
            });

            if (!res.ok) {
              throw new Error(`Logo upload failed: ${res.status}`);
            }

            const result = await res.json();

            if (result.success && result.data?.display_url) {
              providerData.logo = result.data.display_url;
            } else {
              throw new Error(result.error?.message || "Logo upload failed");
            }
          } catch (imageError) {
            console.error("Logo upload error:", imageError);
            toast.warning(
              "Restaurant logo upload failed, continuing without it",
            );
          }
        }

        console.log({userData, providerData});

        const { data, error } = await authClient.signUp.email(userData);
        if (data?.token) {
          providerData.token = data?.token;
        }

        const { data: providerRes, error: providerError } =
          await providerServices.createProvider({
            userId: data?.user.id,
            ...providerData,
          });

        if (error || providerError) {
          toast.error(
            error?.message || providerError?.message || "Sign up failed",
            { id: toastId },
          );
          return;
        }

        toast.success("Provider account created successfully!", {
          id: toastId,
        });

        router.push("/login");
        router.refresh();
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(
          error instanceof Error ? error.message : "Something went wrong",
          { id: toastId },
        );
      }
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setFieldValue("photo", file);
      const url = URL.createObjectURL(file);
      setPhotoPreviewUrl(url);
    }
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setFieldValue("logo", file);
      const url = URL.createObjectURL(file);
      setLogoPreviewUrl(url);
    }
  };

  const nextStep = () => {
    if (currentStep === 2) {
      form.handleSubmit();
      return;
    }
    if (currentStep < 2) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const stepTitles = [
    {
      title: "Personal Information",
      description: "Provide your personal details and profile information",
    },
    {
      title: "Restaurant Information",
      description: "Tell us about your restaurant business",
    },
    {
      title: "Business Details",
      description: "Complete your restaurant setup with final details",
    },
  ];

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
            {/* User Photo Upload Field */}
            <form.Field
              name="photo"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Profile Photo</FieldLabel>
                    <div className="flex items-center gap-4">
                      {/* Preview */}
                      <div className="shrink-0">
                        {photoPreviewUrl ? (
                          <div className="relative">
                            <div className="size-20 rounded-full overflow-hidden border-2 border-primary">
                              <Image
                                src={photoPreviewUrl}
                                alt="Profile preview"
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="size-20 rounded-full border-2 border-dashed border-border flex items-center justify-center bg-muted/20">
                            <User className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Upload Area */}
                      <div className="flex-1">
                        <input
                          type="file"
                          id="photo-upload"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handlePhotoChange}
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
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="John Doe"
                          className={cn("pl-10 w-full")}
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
                    field.state.meta.isTouched && !field.state.meta.isValid;
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
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="you@example.com"
                          className={cn("pl-10")}
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
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="01XXXXXXXXX"
                          className={cn("pl-10")}
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
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Enter password"
                          className={cn("pl-10 pr-10")}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                          onClick={() => setShowPassword(!showPassword)}
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
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            {/* Restaurant Logo Upload Field */}
            <form.Field
              name="logo"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Restaurant Logo</FieldLabel>
                    <div className="flex items-center gap-4">
                      {/* Preview */}
                      <div className="shrink-0">
                        {logoPreviewUrl ? (
                          <div className="relative">
                            <div className="size-20 rounded-lg overflow-hidden border-2 border-primary">
                              <Image
                                src={logoPreviewUrl}
                                alt="Logo preview"
                                width={80}
                                height={80}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="size-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/20">
                            <Building className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                      </div>

                      {/* Upload Area */}
                      <div className="flex-1">
                        <input
                          type="file"
                          id="logo-upload"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handleLogoChange}
                          className="hidden"
                        />
                        <div className="space-y-2">
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() =>
                              document.getElementById("logo-upload")?.click()
                            }
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose Logo
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

            <div className="flex flex-col sm:flex-row gap-5">
              {/* Restaurant Name Field */}
              <form.Field
                name="restaurantName"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Restaurant Name
                      </FieldLabel>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Your Restaurant Name"
                          className={cn("pl-10")}
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              {/* Restaurant Phone Field */}
              <form.Field
                name="restaurantPhone"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Restaurant Phone
                      </FieldLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="01XXXXXXXXX"
                          className={cn("pl-10")}
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
              {/* Website Field */}
              <form.Field
                name="website"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Website (Optional)
                      </FieldLabel>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="https://example.com"
                          className={cn("pl-10")}
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Delivery Fee Field */}
              <form.Field
                name="deliveryFee"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Delivery Fee (৳)
                      </FieldLabel>
                      <div className="relative">
                        <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="50.00"
                          className={cn("pl-10")}
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
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Description Field */}
              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Restaurant Description
                      </FieldLabel>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Your Restaurant Description"
                          className={cn("pl-10")}
                          rows={4}
                        />
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Address Field */}
              <form.Field
                name="address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Restaurant Address
                      </FieldLabel>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          rows={4}
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Full address of your restaurant"
                          className={cn("pl-10")}
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
          </div>
        );
      default:
        return null;
    }
  }, [
    currentStep,
    photoPreviewUrl,
    logoPreviewUrl,
    showPassword,
  ]);

  const variants = {
    initial: (direction: number) => {
      return { x: `${110 * direction}%`, opacity: 0 };
    },
    animate: { x: "0%", opacity: 1 },
    exit: (direction: number) => {
      return { x: `${-110 * direction}%`, opacity: 0 };
    },
  };

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        type: "spring",
        bounce: 0,
      }}
    >
      <Card className="w-full py-0 border-none shadow-none overflow-hidden">
        <motion.div layout>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 px-6 py-4">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-lg text-primary">
                {stepTitles[currentStep].title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              {stepTitles.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentStep === index
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/20",
                  )}
                />
              ))}
            </div>
          </CardHeader>

          <motion.div
            animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
            className="relative overflow-hidden"
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          >
            <div ref={ref}>
              <CardContent className="px-6 py-2 relative">
                <AnimatePresence
                  mode="popLayout"
                  initial={false}
                  custom={direction}
                >
                  <motion.div
                    key={currentStep}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                    custom={direction}
                  >
                    <form
                      id="provider-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                      }}
                    >
                      <FieldGroup>{content}</FieldGroup>
                    </form>
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </div>
          </motion.div>

          <CardFooter className="flex justify-between items-center py-4">
            <Button
              variant={"secondary"}
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              type="button"
              onClick={nextStep}
              disabled={form.state.isSubmitting}
            >
              {currentStep === stepTitles.length - 1 ? (
                <>
                  Finish <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Continue <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
          <div className="px-6 gap-3 mt-2 flex flex-col justify-center">
            <Separator />
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </Card>
    </MotionConfig>
  );
}

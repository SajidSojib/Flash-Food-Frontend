"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldGroup,
} from "@/components/ui/field";
import { Mail, Lock, Loader } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { env } from "@/env";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/common/inputField";
import GoogleLoginButton from "@/components/common/googleLoginButton";


const loginSchema = z.object({
  email: z.email({ message: "Enter a valid email address" }),

  password: z.string().min(1, { message: "Password is required" }),
});


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onSubmit: loginSchema,
      onMount: loginSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing you in...");
      try {
        setIsSubmitting(true);
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: env.NEXT_PUBLIC_FRONTEND_URL,
        });

        if (error) {
          toast.error(error.message || "Login failed", { id: toastId });
          setIsSubmitting(false);
          return;
        }

        toast.success("Welcome back!", { id: toastId });

        router.push("/");
        router.refresh();
        setIsSubmitting(false);
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
        setIsSubmitting(false);
        console.error(err);
      }
    },
  });

  
  return (
    <div className="pt-25 bg-background">
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-xl">
          <Card className="border-border w-full shadow-lg">
            {/* Header */}
            <CardHeader>
              <CardTitle>
                <h1 className="text-3xl font-bold text-center">
                  Welcome Back to Flash{" "}
                  <span className="text-primary">Food</span>
                </h1>
              </CardTitle>

              <CardDescription className="text-center">
                Login to continue ordering your favorite meals
              </CardDescription>
            </CardHeader>

            {/* Form */}
            <CardContent>
              <form
                id="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
              >
                <FieldGroup className="space-y-1">
                  {/* Email */}
                  <form.Field
                    name="email"
                    children={(field) => {
                      return (
                        <InputField
                        field={field}
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        icon={
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        }
                      />
                      )
                    }}
                  />

                  {/* Password */}
                  <form.Field
                    name="password"
                    children={(field) => {
                      return (
                        <InputField
                          field={field}
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          icon={
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          }
                          showPasswordToggle
                          onTogglePassword={() => setShowPassword(!showPassword)}
                          showPassword={showPassword}
                        />
                      );
                    }}
                  />
                </FieldGroup>
              </form>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex flex-col gap-4">
              <Button
                form="login-form"
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                { isSubmitting && <Loader className="animate-spin" />}
                Sign In
              </Button>

              <Separator />

              <GoogleLoginButton isSubmitting={isSubmitting} />
              <p className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

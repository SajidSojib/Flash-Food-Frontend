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
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { env } from "@/env";
import { useRouter } from "next/navigation";


const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),

  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;


export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onChange: loginSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing you in...");

      try {
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
          callbackURL: env.NEXT_PUBLIC_FRONTEND_URL,
        });

        if (error) {
          toast.error(error.message || "Login failed", { id: toastId });
          return;
        }

        toast.success("Welcome back!", { id: toastId });

        router.push("/");
        router.refresh();
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
        console.error(err);
      }
    },
  });

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
    } catch (err) {
      toast.error("Google login failed");
      console.error(err);
    }
  };

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
                <FieldGroup className="space-y-5">
                  {/* Email */}
                  <form.Field
                    name="email"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel>Email Address</FieldLabel>

                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                            <Input
                              type="email"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
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

                  {/* Password */}
                  <form.Field
                    name="password"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel>Password</FieldLabel>

                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                            <Input
                              type={showPassword ? "text" : "password"}
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              onBlur={field.handleBlur}
                              placeholder="Enter password"
                              className={cn("pl-10 pr-10")}
                            />

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
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
                </FieldGroup>
              </form>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex flex-col gap-4">
              <Button
                form="login-form"
                type="submit"
                className="w-full"
                disabled={!form.state.isValid || form.state.isSubmitting}
              >
                {form.state.isSubmitting ? "Signing in..." : "Login"}
              </Button>

              <Separator />

              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full"
                type="button"
              >
                Continue with Google
              </Button>

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

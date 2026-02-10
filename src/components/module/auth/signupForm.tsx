"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerForm } from "./customerForm";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProviderForm } from "./providerForm";
import { MultiStepProviderForm } from "@/components/multi-step-form";

export function SignupForm() {
  const [customer, setCustomer] = useState(true);
  // useEffect(() => {
  //   setCustomer(true);
  // }, []);

  return (
    <div className="pt-25 bg-background">
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-xl">
          <Card className="border-border w-full shadow-lg pt-0">
            <div className="flex">
              <Button
                className="w-full font-bold text-lg py-6 flex-1 rounded-none"
                variant={customer ? "default" : "secondary"}
                onClick={() => setCustomer(true)}
              >
                Be a Customer
              </Button>
              <Button
                className="w-full font-bold text-lg py-6 flex-1 rounded-none"
                variant={customer ? "secondary" : "default"}
                onClick={() => setCustomer(false)}
              >
                Be a Provider
              </Button>
            </div>
            <CardHeader className="">
              <CardTitle>
                <h1 className="text-3xl font-bold text-center">
                  {customer ? (
                    <>
                      Sign up as a
                      <span className="text-primary"> Customer</span>
                    </>
                  ) : (
                    <>
                      Join as a<span className="text-primary"> Provider</span>
                    </>
                  )}
                </h1>
              </CardTitle>
              <CardDescription className="text-center">
                {customer
                  ? "Sign up to get started with Flash Food as a customer"
                  : "Sign up to get started with Flash Food as a provider"}
              </CardDescription>
            </CardHeader>
            {customer ? <CustomerForm /> : <MultiStepProviderForm />}
          </Card>
        </div>
      </div>
    </div>
  );
}

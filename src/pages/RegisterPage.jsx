import React from "react";

import { useState } from "react";
import { Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function RegisterPage() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "free";
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link
        to="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2"
      >
        <Layers className="h-6 w-6 text-primary" />
        <span className="font-bold">WebCraft</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>
            {plan !== "free"
              ? `Sign up for the ${plan} plan to get started`
              : "Enter your information to create an account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            {plan !== "free" && (
              <div className="space-y-2">
                <Label htmlFor="card">Card information</Label>
                <Input id="card" placeholder="Card number" required />
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <Input placeholder="MM/YY" required />
                  <Input placeholder="CVC" required />
                  <Input placeholder="ZIP" required />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

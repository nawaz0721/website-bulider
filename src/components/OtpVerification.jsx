import React, { useState } from "react";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { AppRoutes } from "@/constant/constant";
import OTPInput from "react-otp-input";

export default function OTPVerification() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(AppRoutes.requestotp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setOtpSent(true);
        alert("OTP sent to your email.");
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(AppRoutes.verifyotp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        navigate("/reset-password");
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link to="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Layers className="h-6 w-6 text-primary" />
        <span className="font-bold">WebCraft</span>
      </Link>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{otpSent ? "Verify OTP" : "Send OTP"}</CardTitle>
          <CardDescription>
            {otpSent ? "Enter the OTP sent to your email" : "Enter your email to receive an OTP"}
          </CardDescription>
        </CardHeader>
        {!otpSent ? (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
        ) : (
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">OTP</Label>
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
                inputStyle={{
                  width: "2rem",
                  height: "2rem",
                  margin: "0 0.5rem",
                  fontSize: "1.2rem",
                  textAlign: "center",
                  borderRadius: "4px",
                  border: "1px solid rgba(0,0,0,0.3)",
                }}
              />
            </div>
            <div className="text-sm text-gray-500 text-center">
              Didn't receive OTP?{" "}
              <button type="button" className="text-primary hover:underline" onClick={handleSendOTP}>
                Resend OTP
              </button>
            </div>
          </CardContent>
        )}
        <CardFooter className="flex flex-col space-y-4">
          {!otpSent ? (
            <Button className="w-full" onClick={handleSendOTP} disabled={isLoading}>
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </Button>
          ) : (
            <Button type="submit" className="w-full" onClick={handleVerifyOTP} disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
          )}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
}

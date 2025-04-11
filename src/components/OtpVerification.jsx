"use client"
import { useState } from "react"
import { Layers, Mail, KeyRound, ArrowRight, Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { AppRoutes } from "@/constant/constant"
import OTPInput from "react-otp-input"
import { motion } from "framer-motion"

export default function OTPVerification() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSendOTP = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsLoading(true)
    try {
      const response = await fetch(AppRoutes.requestotp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setOtpSent(true)
        setResendDisabled(true)
        setCountdown(60)

        // Start countdown timer
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              setResendDisabled(false)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(data.message || "Failed to send OTP. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setError("")
    setIsLoading(true)
    try {
      const response = await fetch(AppRoutes.verifyotp, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      })

      const data = await response.json()

      if (data.success) {
        navigate("/reset-password")
      } else {
        setError(data.message || "Invalid OTP. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10" />
      <div className="absolute inset-0 bg-blue-500 opacity-5 -z-10" />

      <Link
        to="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <Layers className="h-6 w-6" />
        <span className="font-bold text-lg">WebCraft</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <KeyRound className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              {otpSent ? "Verify OTP" : "Password Recovery"}
            </CardTitle>
            <CardDescription className="text-center">
              {otpSent ? "Enter the OTP sent to your email" : "Enter your email to receive a verification code"}
            </CardDescription>
          </CardHeader>

          {!otpSent ? (
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11 px-4 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">We'll send a verification code to this email address</p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </CardContent>
          ) : (
            <CardContent className="space-y-5">
              <div className="space-y-4">
                <div className="text-center">
                  <span className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">{email}</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-sm font-medium flex items-center gap-2 justify-center">
                    <KeyRound className="h-4 w-4 text-blue-600" />
                    Enter Verification Code
                  </Label>
                  <div className="flex justify-center py-2">
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span className="w-2"></span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={{
                        width: "2.5rem",
                        height: "2.5rem",
                        fontSize: "1.2rem",
                        textAlign: "center",
                        borderRadius: "0.375rem",
                        border: "1px solid rgba(209, 213, 219, 1)",
                        backgroundColor: "white",
                        color: "#374151",
                        outline: "none",
                      }}
                      containerStyle="flex justify-center gap-2"
                      focusStyle={{
                        border: "1px solid rgba(59, 130, 246, 1)",
                        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.25)",
                      }}
                    />
                  </div>
                </div>

                <div className="text-sm text-center">
                  {resendDisabled ? (
                    <p className="text-gray-500">
                      Resend code in <span className="font-medium">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors flex items-center gap-1 mx-auto"
                      onClick={handleSendOTP}
                    >
                      <RefreshCw className="h-3 w-3" />
                      Resend Code
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </CardContent>
          )}

          <CardFooter className="flex flex-col space-y-4 pt-2">
            {!otpSent ? (
              <Button
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                onClick={handleSendOTP}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending OTP...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Verification Code
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Verify & Continue
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            )}

            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

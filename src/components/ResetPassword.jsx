"use client"
import { useState, useEffect } from "react"
import { Layers, Lock, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { AppRoutes } from "@/constant/constant"
import Cookies from "js-cookie"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export default function ResetPassword() {
  const navigate = useNavigate()

  // Get email and otp from cookies
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    const savedEmail = Cookies.get("email")
    const savedOtp = Cookies.get("otp")

    if (savedEmail) setEmail(savedEmail)
    if (savedOtp) setOtp(savedOtp)
  }, [])

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" }
    if (password.length < 6) return { strength: 25, label: "Weak" }
    if (password.length < 8) return { strength: 50, label: "Fair" }

    let strength = 50
    if (/[A-Z]/.test(password)) strength += 10
    if (/[a-z]/.test(password)) strength += 10
    if (/[0-9]/.test(password)) strength += 10
    if (/[^A-Za-z0-9]/.test(password)) strength += 20

    if (strength >= 90) return { strength, label: "Strong" }
    if (strength >= 70) return { strength, label: "Good" }
    return { strength, label: "Fair" }
  }

  const passwordStrength = getPasswordStrength(password)

  const getStrengthColor = (strength) => {
    if (strength >= 90) return "bg-green-500"
    if (strength >= 70) return "bg-yellow-500"
    if (strength >= 50) return "bg-orange-500"
    return "bg-red-500"
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (password !== confirmPassword) {
      setError("Passwords don't match.")
      setIsLoading(false)
      return
    }

    if (passwordStrength.strength < 50) {
      setError("Please use a stronger password.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(AppRoutes.resetPassword, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
        credentials: "include",
      })

      const data = await response.json()

      if (data.success) {
        navigate("/login")
      } else {
        setError(data.message || "Failed to reset password. Try again.")
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
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">Create a new secure password for your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Email
                </Label>
                <Input type="email" value={email} disabled className="h-11 px-4 bg-gray-50 text-gray-500" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  OTP
                </Label>
                <Input type="text" value={otp} disabled className="h-11 px-4 bg-gray-50 text-gray-500" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 px-4 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">{passwordStrength.label}</span>
                      <span className="text-xs text-gray-500">
                        {passwordStrength.strength >= 70
                          ? "Strong password"
                          : "Use 8+ chars with letters, numbers & symbols"}
                      </span>
                    </div>
                    <Progress
                      value={passwordStrength.strength}
                      className={`h-1.5 ${getStrengthColor(passwordStrength.strength)}`}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-blue-600" />
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 px-4 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {confirmPassword && password !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                )}
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
            <CardFooter className="flex flex-col space-y-4 pt-2">
              <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resetting...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Reset Password
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <div className="text-center text-sm">
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
                >
                  Back to Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

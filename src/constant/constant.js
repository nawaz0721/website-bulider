//constants.js
// http://localhost:4000/
// https://website-bulider-backend.vercel.app/
const devUrl = 'http://localhost:4000/';
export const BASE_URL = devUrl

export const AppRoutes = {
    register: devUrl + "auth/register",
    login: devUrl + "auth/login",
    logout: devUrl + "auth/logout",
    requestotp: devUrl + "auth/request-otp",
    verifyotp: devUrl + "auth/verify-otp",
    resetPassword: devUrl + "auth/reset-password",
}
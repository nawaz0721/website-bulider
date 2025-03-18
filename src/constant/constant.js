//constants.js
// http://localhost:4000/
// https://website-bulider-backend.vercel.app/
const devUrl = 'https://website-bulider-backend.vercel.app/';
export const BASE_URL = devUrl

export const AppRoutes = {
    register: devUrl + "api/register",
    login: devUrl + "api/login",
    logout: devUrl + "api/logout",
    requestotp: devUrl + "api/request-otp",
    verifyotp: devUrl + "api/verify-otp",
    resetPassword: devUrl + "api/reset-password",
    template: devUrl + "api/templates",
    alltemplate: devUrl + "api/template",
    user: devUrl + "api/users",
    profile: devUrl + "api/profile",
    profileAvatar: devUrl + "api/upload-avatar",
}
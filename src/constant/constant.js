//constants.js
// http://localhost:4000/
// https://website-bulider-backend.vercel.app/
const devUrl = 'https://website-bulider-backend.vercel.app/';
export const BASE_URL = devUrl

export const AppRoutes = {
    register: devUrl + "auth/register",
    login: devUrl + "auth/login",
    logout: devUrl + "auth/logout",
    requestotp: devUrl + "auth/request-otp",
    verifyotp: devUrl + "auth/verify-otp",
    resetPassword: devUrl + "auth/reset-password",
    template: devUrl + "template/templates",
    userTemplate: devUrl + "template/user-templates",
    userTemplatePreview: devUrl + "template/user-templates-preview",
    alltemplate: devUrl + "template/template",
    user: devUrl + "user/users",
    profile: devUrl + "profile/profile",
    profileAvatar: devUrl + "profile/upload-avatar",
}
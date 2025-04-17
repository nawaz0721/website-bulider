//constants.js
// http://localhost:4000/
// https://website-bulider-backend.vercel.app/
const devUrl = 'https://website-bulider-backend.vercel.app/';
const phpUrl = 'https://wp.website4x.com/';
export const BASE_URL = devUrl

export const AppRoutes = {
    register: devUrl + "auth/register",
    login: devUrl + "auth/login",
    logout: devUrl + "auth/logout",
    requestotp: devUrl + "auth/request-otp",
    verifyotp: devUrl + "auth/verify-otp",
    resetPassword: devUrl + "auth/reset-password",
    template: devUrl + "template/templates",
    userTemplate: devUrl + "usertemplate/user-templates",
    userTemplatePreview: devUrl + "usertemplate/user-templates-preview",
    templateByUserId: devUrl + "usertemplate/user-templates/userId",
    alltemplate: devUrl + "template/template",
    user: devUrl + "user/users",
    profile: devUrl + "profile/profile",
    profileAvatar: devUrl + "profile/upload-avatar",
    wordpress: devUrl + "wordpressform/wordpress",
    singlewordpress: devUrl + "/wordpressform/wordpress/:id",
    install: phpUrl + "installword.php",
    plugin: phpUrl + "installwo.php",
    pages: phpUrl + "wppage.php",
    payment: devUrl + "api/create-payment-intent",
    createSubscription: devUrl + "api/subscriptions/create"
}
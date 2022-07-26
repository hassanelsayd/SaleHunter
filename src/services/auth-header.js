export default function authHeader() {
    const userJWT = localStorage.getItem('JWT');
    if (userJWT) {
        return { Authorization: 'Bearer ' + userJWT};
    } else {
        return {};
    }
}
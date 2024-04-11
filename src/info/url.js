const BE_URL = `https://learner-be.vercel.app/api/v1`
// const BE_URL = `http://localhost:8000/api/v1`
const token = localStorage.getItem('token');
const userName = localStorage.getItem('username');
const userRole = localStorage.getItem('role')
export {BE_URL,token,userName,userRole};
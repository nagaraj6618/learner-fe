// const BE_URL = `https://learner-be.vercel.app/api/v1`
const BE_URL = `http://localhost:8000/api/v1`
const token = localStorage.getItem('token');
const userId = localStorage.getItem('username');
const userRole = localStorage.getItem('role')
const userName = localStorage.getItem('name')
export {BE_URL,token,userName,userRole,userId};

const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "/signin"; 
}

export default logout;
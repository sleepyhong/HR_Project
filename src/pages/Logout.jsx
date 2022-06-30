const Logout = () => {
    sessionStorage.removeItem('user');
    window.location.replace("/login");
};

export default Logout;
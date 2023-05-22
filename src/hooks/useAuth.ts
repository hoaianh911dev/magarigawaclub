export default function useAuth() {
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = user?.accessToken
    const setUser = function(user: any) {
        localStorage.setItem("user", user)
    }
    const removeUser = function() {
        localStorage.removeItem("user")
    }
    return {accessToken, setUser, removeUser}
}
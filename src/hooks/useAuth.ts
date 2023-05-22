export default function useAuth() {
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = user?.accessToken
    const setUser = function(user: any) {
        localStorage.setItem("user", user)
        window.dispatchEvent( new Event('storage') )
    }
    const removeUser = function() {
        localStorage.removeItem("user")
        window.dispatchEvent( new Event('storage') )
    }
    return {accessToken, setUser, removeUser, user}
}
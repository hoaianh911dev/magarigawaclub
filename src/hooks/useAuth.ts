export default function useAuth() {
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = user?.accessToken
    const setUser = function(user: any) {
        localStorage.setItem("user", user)
    }
    return {accessToken, setUser}
}
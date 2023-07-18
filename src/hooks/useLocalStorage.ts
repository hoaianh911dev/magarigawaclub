export default function useLocalStorage() {

    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = user?.accessToken
    const userId = user?.id

    const setUser = function(user: any) {
        localStorage.setItem("user", user)
        // Event constructor => dispatch to sent Event for element listen
        window.dispatchEvent( new Event('userstorage') )
    }
    const removeUser = function() {
        localStorage.removeItem("user")
        window.dispatchEvent( new Event('userstorage') )
    }

    const setLanguage = function(lang) {
        localStorage.setItem("language", lang)
        window.dispatchEvent( new Event('langstorage') )
    }

    return {
        accessToken, 
        setUser, 
        removeUser, 
        user, 
        userId,
        setLanguage
    }
    
}
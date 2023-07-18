import getMSG from "../constants/message"
let regxMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
let regxPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

export default function useFormValidation() {
    let errors = {}
    let name = ''
    //check required
    let lstNodeSelector = document.querySelectorAll('input.required')
    let arrSelector = [...lstNodeSelector]
  
    arrSelector?.forEach(element => {
        if(!element.value || element.value.trim().length === 0) {
            const nameControl = element.getAttribute('nameControl')
            name = element.name
            if(name !== '') errors[name] = getMSG("E_0002", [nameControl])
        }
    })
    //check format email
    lstNodeSelector = document.querySelectorAll('input.email')
    arrSelector = [...lstNodeSelector]
    arrSelector?.forEach(element => {
        if(!regxMail.test(element.value) && element.value) {
            const nameControl = element.getAttribute('nameControl')
            name = element.name
            if(name !== '') errors[name] = getMSG("E_0003", [nameControl])
        }
    })
    //check format password
    lstNodeSelector = document.querySelectorAll('input.password')
    arrSelector = [...lstNodeSelector]
    arrSelector?.forEach(element => {
        if(!regxPassword.test(element.value) && element.value) {
            const nameControl = element.getAttribute('nameControl')
            name = element.name
            if(name !== '') errors[name] = getMSG("E_0007", [nameControl])
        }
    })

    return errors
}
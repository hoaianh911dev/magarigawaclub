import { MSG } from "../constants/mesage"
let regxMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

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
            if(name !== '') errors[name] = MSG.getMSG([nameControl], MSG.ERROR.E_0002)
        }
    })
    //check format email
    lstNodeSelector = document.querySelectorAll('input.email')
    arrSelector = [...lstNodeSelector]
    arrSelector?.forEach(element => {
        if(!regxMail.test(element.value) && element.value) {
            const nameControl = element.getAttribute('nameControl')
            name = element.name
            if(name !== '') errors[name] = MSG.getMSG([nameControl], MSG.ERROR.E_0003)
        }
    })

    return errors
}
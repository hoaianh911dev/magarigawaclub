import { MSG } from "../constants/mesage"

export default function useFormValidation() {
    let errors = {}
    let name = ''
    let lstNodeSelector = document.querySelectorAll('input.required')
    let arrSelector = [...lstNodeSelector]
  
    arrSelector?.forEach(element => {
        if(!element.value || element.value.trim().length === 0) {
            const nameControl = element.getAttribute('nameControl')
            name = element.name
            if(name !== '') errors[name] = MSG.getMSG([nameControl], MSG.ERROR.E_0002)
        }
    })
    return errors
}
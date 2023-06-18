const regexNumber = /[^0-9]/g
const regexByte = /[^\x00-\xFF]/g

export const useFormEnter = (event) => {
    const className = event.target.getAttribute('class')
    if(className.includes('onebyte')) {
        const value = event.target.value
        const maxlength = event.target.getAttribute('maxlength')

        let sanitizedValue = "";

        for (let i = 0; i < value.length; i++) {
            const charCode = value.charCodeAt(i);
            if (charCode <= 255) {
                sanitizedValue += value.charAt(i);
            }
        }
        event.target.value = sanitizedValue;
        if(maxlength && value.length > maxlength) {
            event.target.value = value.slice(0,maxlength)
        }
    }
    if(className.includes('number')) {
        const value = event.target.value
        let sanitizedValue = value.replace(regexNumber, "")
        if (value !== sanitizedValue) {
            event.target.value = sanitizedValue;
        }
    }
}
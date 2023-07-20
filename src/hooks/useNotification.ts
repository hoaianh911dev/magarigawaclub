import getMSG from "../constants/message"
import Swal from 'sweetalert2';

export default function useNotification() {

    const lang = localStorage.getItem('language')
    const buttonConfirm = lang === 'en' ? "Yes" : "Có"
    const buttonDeny = lang === 'en' ? "Cancel" : "Không"

    const notifyError = (code) => {
        Swal.fire({
            icon: 'error',
            text: getMSG(code),
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
            showCloseButton: true
        })
    }

    const nofifySuccess = (code, arrName?) => {
        return Swal.fire({
            icon: 'success',
            text: getMSG(code, arrName),
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
            showCloseButton: true
        })
    }

    const notifyQuestion = async (code, arrName?) => {
        return await Swal.fire({
            icon: 'question',
            text: getMSG(code, arrName),
            showConfirmButton: true,
            confirmButtonText: buttonConfirm,
            showDenyButton: true,
            denyButtonText: buttonDeny
        })
    }

    return {
        notifyError,
        nofifySuccess,
        notifyQuestion
    }
}
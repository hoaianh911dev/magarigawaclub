import getMSG from "../constants/message"
import Swal from 'sweetalert2';

export default function useNotification() {

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

    const nofifySuccess = (code) => {
        return Swal.fire({
            icon: 'success',
            text: getMSG(code),
            toast: true,
            position: 'top-end',
            timer: 3000,
            showConfirmButton: false,
            showCloseButton: true
        })
    }

    return {
        notifyError,
        nofifySuccess
    }
}
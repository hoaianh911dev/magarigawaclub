export default function useHelper() {

    const formatUnsigned = (text) => {
        return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    const formatDateYMD = (text) => {
        return (new Date(text)).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
    }

    const formatDateYMDHM = (text) => {
        return (new Date(text)).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: '2-digit' })
    }

    return {
        formatUnsigned,
        formatDateYMD,
        formatDateYMDHM
    }
}
export default function useHelper() {

    const formatUnsigned = (text) => {
        return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }

    return {
        formatUnsigned
    }
}
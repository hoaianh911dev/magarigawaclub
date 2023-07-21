export default function useHelper() {

    const formatUnsigned = (text) => {
        return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
    const formatYM = (ym) => {
        const [year, month] = ym.toString().split("  ")
        const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1
        return `${year} . ${monthNumber} ${month} `
    }

    return {
        formatUnsigned,
        formatYM
    }
}
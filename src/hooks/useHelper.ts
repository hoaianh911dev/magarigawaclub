export default function useHelper() {

    const formatUnsigned = (text) => {
        return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
    const formatYM = (ym) => {
        const [year, month] = ym.toString().split("  ")
        const monthNumber = new Date(`${month} 1, 2021`).getMonth() + 1
        return `${year} . ${monthNumber} ${month} `
    }

    const formatDateDMYString = (text) => {
        return (new Date(text)).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" })
    }

    const formatDateDMYHM = (text) => {
        return (new Date(text)).toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: '2-digit' })
    }

    const formatDateMDY = (dateString) => {
        if (dateString) {
            const [day, month, year] = dateString.split('/')
            return `${month}/${day}/${year}`
        }
            
    }

    const lastFindIndex = (arr, condition) => {
        for(let  i = arr.length - 1; i >= 0; i--) {
            if (condition(arr[i]))  return i
        }
        return - 1
    }

    return {
        formatUnsigned,
        formatDateDMYString,
        formatDateDMYHM,
        formatDateMDY,
        formatYM,
        lastFindIndex
    }
}
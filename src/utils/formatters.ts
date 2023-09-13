/**
 * The locale for date and time formatting.
 */
export const locale = "es-VE"

/**
 * The time zone for date and time calculations.
 */
export const timeZone = "America/Caracas"

/**
 * The options for date and time formatting.
 */
const options = { timeZone }

/**
 * The months in Spanish language.
 */
export const months = [
  "Enero", "Febrero", "Marzo",
  "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre",
  "Octubre", "Noviembre", "Diciembre"
]

/**
 * Week days in Spanish language.
 */
export const days = [
  "Domingo", "Lunes", "Martes", "Miércoles", "Jueves",
  "Viernes", "Sábado"
]

export const shortDays = [
  "Dom", "Lun", "Mar", "Miér", "Jue", "Vie", "Sáb"
]

/**
 * Method to get the hour from a date string or Date object.
 * @param {string | Date | null} date - The date to extract the hour from.
 * @returns {string} The formatted hour in HH:mm AM/PM format.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
export const getHour = (date: string | Date | null): string => {
  try {
    if (!date) {
      throw Error("The date value must exist in date or string format.")
    }

    let localDate: Date

    if (typeof date === "string") {
      localDate = new Date(date)
    } else {
      localDate = date
    }

    return localDate.toLocaleTimeString(locale, options)
  } catch (error) {
    throw Error(`Error trying to get the hour: ${error}`)
  }
}

/**
 * Method to get the formatted date information from a Date object.
 * @param {Date} date - The date to extract the information from (default: current date).
 * @returns {Object | null} An object containing the day of the week, day of the month, month, and year.
 * @throws {Error} If there is an error while retrieving the date information.
 */
export const getDate = (date: Date = new Date()): { dayWeek: string, day: number, month: string, year: number } => {
  try {

    const d = new Date(date)

    return {
      dayWeek: days[d.getDay()],
      day: d.getDate(),
      month: months[d.getMonth()].toLowerCase(),
      year: d.getFullYear()
    }
  } catch (error) {
    throw new Error(`Error trying to get the date: ${error}`)
  }
}

/**
 * Method to trim text strings under a maximum character limit.
 * @param {string} text - The text string to truncate.
 * @param {number} maxLength - The maximum length of the text string (default: 255).
 * @returns {string} The truncated text string.
 */
export const cutText = (text: string = "", maxLength: number = 255): string => {
  return text.length > maxLength ? text.substring(0, maxLength - 3) + "..." : text
}

/**
 * Method for reformatting the supplied date into "dd/MM/yyyy" format.
 * @param {string | Date | null} date - The date to be formatted.
 * @returns {string} The formatted date.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
export const formatDate = (date: string | Date | null): string => {
  try {
    if (!date) {
      throw Error("The date value must exist in date or string format.")
    }

    if (typeof date === "string") {
      let newDate = date.split("T")[0].split("-")
      let [year, month, day] = newDate

      day = Number(day) < 10 ? day[1] : day
      month = Number(month) < 10 ? month[1] : month

      return `${day}/${month}/${year}`
    } else {
      return date.toLocaleDateString(locale, options)
    }
  } catch (error) {
    throw Error(`Error trying to format the date: ${error}`)
  }
}

/**
 * Method to check if the given date is within the last 24 hours.
 * @param {string | Date | null} date - The date to be checked.
 * @returns {boolean} True if the date is within the last 24 hours, false otherwise.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
export const before24hours = (date: string | Date | null): boolean => {
  try {
    if (!date) {
      throw Error("The date value must exist in date or string format.")
    }

    let postDate: Date

    if (typeof date === "string") {
      postDate = new Date(date)
    } else {
      postDate = date
    }

    let currentDate = new Date()

    return currentDate.getTime() - postDate.getTime() < 86400000
  } catch (error) {
    throw Error(`It was not possible to verify if the date is less than 24 hours from its existence: ${error}`)
  }
}

/**
 * Method to check if the given date is at least 18 years ago.
 * @param {string | Date | null} date - The date to be checked.
 * @returns {boolean} True if the date is at least 18 years ago, false otherwise.
 * @throws {Error} If the date value is missing or in an invalid format.
 */
export const legalAge = (date: string | Date | null): boolean => {
  try {
    if (!date) {
      throw Error("The date value must exist in date or string format.")
    }

    let postDate: Date

    if (typeof date === "string") {
      postDate = new Date(date)
    } else {
      postDate = date
    }

    let currentDate = new Date()

    return currentDate.getTime() - postDate.getTime() > 18 * 31536000000
  } catch (error) {
    throw Error(`It was not possible to verify if the date is less than 24 hours from its existence: ${error}`)
  }
}
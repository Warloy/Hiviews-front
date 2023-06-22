/**
 * Method to trim text strings under a maximum character limit.
 * @param {String} text Text string to cut out.
 * @param {Number} maxLength Maximum text length permitted.
 * @returns {String} Clipped text string.
 */
const cutText = (text: string = '', maxLength: number = 255): string => {
  return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text
}

/**
 * Method for reformatting the date supplied. The new format 
 * takes the form "dd/MM/yyyy".
 * @param {String} date Date to be formatted.
 * @returns {String} Date with new format.
 */
const formatDate = (date: string): string | null => {
  try {
    let newDate = date.split('T')[0]
    const arrayDate = newDate.split('-')
    return `${arrayDate[2]}/${arrayDate[1]}/${arrayDate[0]}`
  } catch (error) {
    console.log(`Error trying to format the date: ${error}`)
    return null
  }
}

const getHour = (date: string): string | null  => {
  try {
    let hourData = date.split('T')[1]
    const arrayHour = hourData.split(':')

    let hour: number | string = Number(arrayHour[0])
    let minute: number | string = Number(arrayHour[1])

    let time = hour <= 12

    hour = hour > 12 ? hour - 12 : hour

    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute

    return `${hour}:${minute} ${time ? 'A.M.' : 'P.M.'}`

  } catch (error) {
    console.log(`Error trying to get hour: ${error}`)
    return null
  }
}

const getDate = (date: Date = new Date()) => {

  try {

    const months = [
      'Enero', 'Febrero', 'Marzo',
      'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre',
      'Octubre', 'Noviembre', 'Diciembre'
    ]

    const days = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves',
      'Viernes', 'Sábado'
    ]

    const d = new Date(date)

    return {
      dayWeek: days[d.getDay()],
      day: d.getDate(),
      month: months[d.getMonth()].toLowerCase(),
      year: d.getFullYear()
    }

  } catch (error) {
    console.log(`Error trying to get date: ${error}`)
    return null
  }
}
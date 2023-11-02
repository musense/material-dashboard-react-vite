const testDateValid = (date) => {
  const d = new Date(date);
  if (d instanceof Date && !isNaN(d)) return d;
  return false;
}

const getUpdateDateTime = (date) => {
  const d = testDateValid(date)
  if (!d) return 'Not a valid date'
  return `${d.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
          ${d.toLocaleTimeString('zh-TW', { hour: 'numeric', minute: 'numeric', hour12: 'numeric' })}`

}



export default getUpdateDateTime
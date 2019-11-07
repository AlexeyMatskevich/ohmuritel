export function isEmpty (obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) { return false }
  }
  return true
}

export function extractErrors (response) {
  const memo = []
  response.errors.forEach((error) => {
    if (error.field === '_error') memo.push(error.message)
  })
  return memo
}

export function sleep (ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

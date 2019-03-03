export const countObjectProerties = (obj) => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length
  }
  return 0
}

export const removeEmpyProperties = obj => {
  const objCopy = {...obj}
  Object.keys(obj).forEach(key => {
    if (!obj[key]) delete objCopy[key]
  })
  return objCopy
}

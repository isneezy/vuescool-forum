import firebase from 'firebase/app'
import {helpers as vuelidateHelpers} from 'vuelidate/lib/validators'

export const uniqueUsername = (value) => {
  if (!vuelidateHelpers.req(value)) return false
  return new Promise(resolve => {
    firebase.database().ref('users')
      .orderByChild('usernameLower')
      .equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()))
  })
}

export const uniqueEmail = (value) => {
  if (!vuelidateHelpers.req(value)) return false
  return new Promise(resolve => {
    firebase.database().ref('users')
      .orderByChild('email')
      .equalTo(value.toLowerCase())
      .once('value', snapshot => resolve(!snapshot.exists()))
  })
}

export const supportedFormat = (value) => {
  if (!vuelidateHelpers.req(value)) return true
  const formats = ['jpeg', 'png', 'svg', 'gif']
  const sufix = value.split('.').pop()
  return formats.includes(sufix)
}

export const responseOk = (value) => {
  return new Promise(resolve => {
    if (!vuelidateHelpers.req(value)) return resolve(true)
    else {
      fetch(value)
        .then(response => resolve(response.ok))
        .catch(() => resolve(false))
    }
  })
}

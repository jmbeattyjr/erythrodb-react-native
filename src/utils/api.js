import axios from 'axios'
// import cache, { cacheItems } from '../lib/cache'

export const get = ({ path, headers = {}, auth = false }) => {
  if (auth) {
    // const userToken = cache.getItem(cacheItems.USER_TOKEN)
    // headers['x-access-token'] = userToken
  }

  return axios({
    method: 'GET',
    url: path,
    headers
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export const post = ({ path, headers = {}, body, auth = false }) => {
  if (auth) {
    // const userToken = cache.getItem(cacheItems.USER_TOKEN)
    // headers['x-access-token'] = userToken
  }

  return axios({
    method: 'POST',
    url: path,
    data: body
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

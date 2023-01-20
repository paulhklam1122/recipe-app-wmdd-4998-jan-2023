import axios from 'axios'
import qs from 'qs'
import { APP_ID, APP_KEY, BASE_URL, TYPE } from '../config/api_config'

export const getRecipes = async ingredient => {
  const url = BASE_URL

  try {
    const params = {
      q: ingredient,
      app_id: APP_ID,
      app_key: APP_KEY,
      type: TYPE,
      field: ['uri', 'image', 'label', 'source']
    }

    const recipeAxios = axios.create({
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    })

    const response = await recipeAxios.get(url, { params })

    console.log('RESPONSE', response.data.hits)

    const recipes = response.data.hits

    return recipes
  } catch (error) {
    throw error
  }
}

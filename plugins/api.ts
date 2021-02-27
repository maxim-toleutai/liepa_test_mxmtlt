import { Plugin } from '@nuxt/types'
import { Api } from '~/api'

const api: Plugin = (_, __) => {
  // set basic url for fetching data from server on application init
  Api.setBasicUrl('http://localhost:35768')
}

export default api

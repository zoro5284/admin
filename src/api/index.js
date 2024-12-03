import axios from './axios'

let api = null

function _normalize(data, options) {
  options.method = options.method || 'GET'
  if (options.method.toUpperCase() === 'GET') {
    options.params = data
  } else {
    options.data = data
  }
  return options
}

function loadModules() {
  if (api) return api
  api = {}
  const modules = import.meta.glob('./modules/*.js', { eager: true })
  for (const path in modules) {
    const moduleName = path.match(/\.\/modules\/(.*)\.js$/)[1]
    api[moduleName] = api[moduleName] || {}
    const moduleConfig = modules[path].default

    for (const apiName in moduleConfig) {
      Object.defineProperty(api[moduleName], apiName, {
        value(data, options = {}) {
          const config = _normalize(data, options)
          config.url = moduleConfig[apiName]
          return axios(config)
        },
      })
    }
  }
  return api
}

export default function useApi() {
  return loadModules()
}

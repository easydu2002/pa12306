
const baseURL = import.meta.env.VITE_APP_BASE_URL

export const request = function(url: string | URL, options?: RequestInit) {

    return fetch(baseURL + url, options)
}
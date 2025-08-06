export const isHttps = (url: string) => url.startsWith("https://");

export const isHttp = (url: string) => url.startsWith("http://");

export const httpToHttps = (url: string) => isHttps(url)
  ? url
  : url.replace(/^http:\/\//, 'https://')

export const httpsToHttp = (url: string) => isHttp(url) 
  ? url
  : url.replace(/^https:\/\//, 'http://')

export const proxyUrl = (url: string) => `/api/proxy-image?url=${encodeURIComponent(url)}`

export const safeUrl = (url: string) => isHttps(url) 
  ? url 
  : proxyUrl(url);
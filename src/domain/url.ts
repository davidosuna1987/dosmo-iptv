export const isHttps = (url: string) => url.startsWith("https://");

export const isHttp = (url: string) => url.startsWith("http://");

export const httpToHttps = (url: string) => url.replace(/^http:\/\//, 'https://')

export const httpsToHttp = (url: string) => url.replace(/^https:\/\//, 'http://')
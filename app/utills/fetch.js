let authToken = null

export function setAuthToken(str) {
  if (str) {
    authToken = `Bearer ${str}`
  }
}

export async function post(url, param = {}, additionalOpt) {
  const formData = new FormData()
  for (const key of Object.keys(param)) {
    formData.append(key, param[key])
  }

  let headers = {}

  if (authToken) {
    headers = {
      ...headers,
      Authorization: authToken,
    }
  }

  let fetchParam = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...headers,
    },
    body: formData,
  }

  if (additionalOpt) {
    fetchParam = additionalOpt(fetchParam)
  }

  // 特殊处理：服务器转发解决跨域问题
  if (process.env.NEXT_PUBLIC_IS_CHWAN === 'yes') {
    url = url.replace('/api', 'https://thawing-refuge-28685.herokuapp.com/https://gateway.lizhi.io')
    delete fetchParam.credentials
  }

  try {
    const response = await fetch(url, fetchParam)
    const data = await response.json()
    return {
      ...data,
      success: data.status === 0,
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
    }
  }
}

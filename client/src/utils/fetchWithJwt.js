import * as mainPageSlice from '../features/mainPage/mainPageSlice';

export const fetchWithJwt = async (
  uri,
  method,
  body,
  dispatch,
  // dispatchStart,
  dispatchResult,
  // dispatchError,
  useJwt = true) => {

  const jwtToken = localStorage.getItem('jwtToken');
  if (useJwt && !jwtToken) {
    return;
  }
  dispatch(mainPageSlice.setLoading(true));
  try {
    const reqBody = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (useJwt) {
      reqBody.headers.Authorization = localStorage.getItem('jwtToken');
    }
    if (body) {
      reqBody.body = JSON.stringify(body);
    }
    if (method !== 'GET') {
      reqBody.method = method
    }

    const response = await fetch(uri, reqBody);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(dispatchResult(data));
    dispatch(mainPageSlice.setLoading(false));
  } catch (err) {
    dispatch(mainPageSlice.setError(err.message));
    dispatch(mainPageSlice.setLoading(false));
    // dispatch(dispatchError(err.message));
    console.error(err.message)
  }
}
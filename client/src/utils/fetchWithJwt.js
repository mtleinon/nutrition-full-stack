export const fetchWithJwt = async (
  uri,
  method,
  body,
  dispatch,
  dispatchStart,
  dispatchResult,
  dispatchError) => {

  const jwtToken = localStorage.getItem('jwtToken');
  console.debug('jwtToken =', jwtToken);
  if (!jwtToken) {
    console.debug('NO JWT, operation not done:', uri, method);
    return;
  }
  dispatch(dispatchStart());
  try {
    const reqBody = {
      headers: {
        Authorization: localStorage.getItem('jwtToken'),
        'Content-Type': 'application/json'
      }
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
  } catch (err) {
    dispatch(dispatchError(err.message));
    console.error(err.message)
  }
}
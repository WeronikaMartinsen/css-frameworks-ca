//---Base url---//

const API_BASE_URL = "https://api/noroff.dev/api/v1";

//End-points:
//Register: /api/v1/social/auth/register
//Login: /api/v1/social/auth/login

// ----------------------Register user

/****
 * API Call that register the user
 * @param {string} url
 * @param {any} userData
 * ```js
 * registerUser(registerUrl, userData);
 */
export async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);

// registerUser(registerUrl, user);
//--------------------------

///////////-------------------------Login user------------------//////////////////////

export async function loginUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postData);

    console.log(response);
    const json = await response.json();
    const accessToken = json.accessToken;
    localStorage.setItem("accessToken", accessToken);
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);

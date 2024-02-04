export { registerUser, loginUser, getToken };

//---Base url---//

const API_BASE_URL = "https://api.noroff.dev";

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
async function registerUser(url, data) {
  try {
    const postData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, postData);
    if (!response.ok) {
      if (response.status === 400) {
        const errorJson = await response.json();
        const errorMessage = errorJson.message || "Bad Request";
        throw new Error(errorMessage);
      } else {
        throw new Error(`HTTP error ${response.status}`);
      }
    }
    console.log(response);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

const user = {
  name: "wertrghfd_account_a",
  email: "ghfunt-a@noroff.no",
  password: "my-password",
};
console.log(user);

registerUser(`${API_BASE_URL}/api/v1/social/auth/register`, user);

///////////-------------------------Login user------------------//////////////////////

async function loginUser(url, data) {
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
    if (response.ok) {
      //  if Works, return data
    } else {
      throw new Error(data.errors[0].message);
    }
    localStorage.setItem("accessToken", accessToken);
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}
loginUser(`${API_BASE_URL}/api/v1/social/auth/login`, user);

///////////////////////////////GET TOKEN/////////////////////////////////////////////

async function getToken(url) {
  try {
    const token = localStorage.getItem("accessToken");
    const getData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, getData);
    console.log(response);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

getToken(API_BASE_URL + "/api/v1/social/posts");

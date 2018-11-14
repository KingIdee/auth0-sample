const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
const ID_TOKEN_KEY = 'ID_TOKEN_KEY';

const LOCAL = 'http://localhost:5000/';
const HOME = LOCAL;
const BLOG = LOCAL + 'blog';

var auth = new auth0.WebAuth({
    clientID: 'pKVfsNmwK9tlcVvSvdK9pL5W1kuWs0sp',
    domain: 'idee.auth0.com',
    audience: 'https://backend-api-url.com/',
    redirectUri: 'http://localhost:5000/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
});

function login() {
    auth.authorize();
}

function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
function setAccessToken() {
    let accessToken = getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

function logout() {
    clearIdToken();
    clearAccessToken();
    window.location.href = HOME;
}

// Get and store id_token in local storage
function setIdToken() {
    let idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
}

function isLoggedIn() {
    const idToken = getIdToken();
    console.log(idToken)
    return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
    const token = jwt_decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}
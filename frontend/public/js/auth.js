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

function clearAccessToken() { 
    document.cookie = ACCESS_TOKEN_KEY + "=" + null + ";path=/;" ;
}

function clearIdToken() { 
    document.cookie = ID_TOKEN_KEY + "=" + null + ";path=/;" ;
}

function setAccessToken() {
    value = getParameterByName('access_token');
    console.log(value);
    document.cookie = ACCESS_TOKEN_KEY + "=" + value + ";path=/;";
}

function getAccessToken() {
    var v = document.cookie.match('(^|;) ?' + ACCESS_TOKEN_KEY + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

function setIdToken() {
    value = getParameterByName('id_token');
    console.log(value);
    document.cookie = ID_TOKEN_KEY + "=" + value + ";path=/;";
}

function getIdToken(){
    var v = document.cookie.match('(^|;) ?' + ID_TOKEN_KEY + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function logout() {
    clearIdToken();
    clearAccessToken();
    window.location.href = HOME;
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
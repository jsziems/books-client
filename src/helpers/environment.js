let APIURL = ''

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'jz-dev-digest-client.herokuapp.com' :
        APIURL = 'https://jz-developer-digest.herokuapp.com'

}

export default APIURL

let APIURL = ''

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3001';
        break;
    case 'https://jz-dev-digest-client.herokuapp.com' :
        APIURL = 'https://jz-developer-digest.herokuapp.com'

}

export default APIURL

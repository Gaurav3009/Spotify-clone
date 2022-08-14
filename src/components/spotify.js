
// ClientId :  8a706ed11c4e4bb48b4647a9bbf17c10 

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const redirectUrl = 'http://localhost:3000/';

const clientId = '8a706ed11c4e4bb48b4647a9bbf17c10';

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
];
// cheating CRUD functionality : like some classes in API's
// giving correct permissions to perform operation
export const getTokenFromResponse = () => {
    return window.location.hash.substring(1).split('&').reduce((initial, items) => {
        let part = items.split('=');
        initial[part[0]] = decodeURIComponent(part[1]);
        return initial;
    }, {});
    // To pull the access token
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

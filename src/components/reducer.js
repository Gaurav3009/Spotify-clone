export const initialState = {
    user : null,
    playlists : [],
    playing : false,
    item : null,
    discover_weekly : null,
    current_playlist : null,
    top_artists : null,
    spotify : null,
    token : null
    // token : 'BQAStbl9wvDekwurxXiMelYrQj1YL6eqcOgWqCIih0MKaXETGwEYbFJ9mUkLNZws1LZ821YnpbXVyYDOCLjo31QvwShSBggPahHxWEFhgBlJO8-vNp8Ypa3cm8ibLlU1LrvCLa54tJ33RuqC1khOAP18hqq2zvJxExU9YRbt9IODe3Kr_QYnYVSQMgxGzRbspS1Py0tjiII-CI-2_WSh'
};

const reducer = (state, action) => {
    console.log(initialState);
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user : action.user,
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token : action.token,
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists : action.playlists,
            }
        case 'SET_CURRENT_PLAYLIST' :
            return {
                ...state,
                current_playlist : action.current_playlist,
            }
        case 'SET_PLAYING':
            return {
                ...state,
                playing : action.playing,
            }
        case 'SET_ITEM':
            return {
                ...state,
                item : action.item,
            }
        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly : action.discover_weekly,
            }
        case 'SET_TOP_ARTISTS':
            return {
                ...state,
                top_artists : action.top_artists,
            }
        case 'SET_SPOTIFY':
            return {
                ...state,
                spotify : action.spotify,
            }
        default:
            return state;
    }
}

export default reducer;
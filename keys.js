console.log('this is loaded');

exports.spotify = {
    spotifyApi: process.env.spotifyApi,
    spotifyApiSecret: process.env.spotifySecret
};

exports.bandsintown = {
    bandsintownApi: process.env.bandsintownApi
}

exports.omdb = {
    omdbApi: process.env.omdbApi
}
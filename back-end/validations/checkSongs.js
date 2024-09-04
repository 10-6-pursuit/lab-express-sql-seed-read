const checkName = (req, res, next) => {
    const name = req.body.name;
    if(name) {
        next()
    } else {
        res.status(400).json({error: "Name is require"})
    };
};

const checkArtist = (req, res, next) => {
    const artist = req.body.artist;
    if(artist) {
        next()
    } else {
        res.status(400).json({error: "Artist is require"})
    };
};

const checkAlbum = (req, res, next) => {
    const album = req.body.album;
    if(album) {
        next()
    } else {
        res.status(400).json({error: "Album is require"})
    };
};

const checkTime = (req, res, next) => {
    const time = req.body.time;
    if(time) {
        next()
    } else {
        res.status(400).json({error: "Duration is require"})
    };
};

const checkIsFavorite = (req, res, next) => {
    const isFav = req.body.is_favorite;
    if (typeof isFav === "boolean" || isFav === "true" || isFav === "false" || isFav == undefined) {
        next()
    } else {
        res.status(400).json({error: "is_favorite must be boolean value"})
    }
};

module.exports = { checkName, checkAlbum, checkArtist, checkIsFavorite, checkTime }
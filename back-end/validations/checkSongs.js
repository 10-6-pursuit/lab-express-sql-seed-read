// check name
const checkName = (req, res, next) => {
    if (req.body.name) {
        return next()
    } else {
        res.status(400).json({error: "Song name is required"})
    }
};

// check artist
const checkArtist = (req, res, next) => {
    if (req.body.artist) {
        return next()
    } else {
        res.status(400).json({error: "Artist is required"})
    }
};

// check boolean
const checkBoolean = (req, res, next) => {
    if (typeof req.body.is_favorite === "boolean" || req.body.is_favorite === "true" || req.body.is_favorite === "false" || req.body.is_favorite === undefined) {
        return next()
    } else {
        res.status(400).json({error: "is_favorite must be a boolean value"})
    }
};

module.exports = { checkName, checkArtist, checkBoolean };
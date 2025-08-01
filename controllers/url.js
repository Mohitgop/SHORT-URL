const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) 
        return res.status(400).json({ error: "URL is required" }
    );
    const shortID = shortid(8);

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id, // Assuming req.user is set by the auth middleware
    });

    return res.render("home", { 
        id: shortID,
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({ 
        totalClicks:result.visitHistory.length, analytics: result.visitHistory 
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
}
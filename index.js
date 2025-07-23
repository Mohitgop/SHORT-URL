const express = require("express");

const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");

const app = express();
const PORT = 3001;

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("Connected to MongoDB")
);

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    

    // Make HTML page
    return res.end(
        `<html>
            <head>
             <body>
               <ol>
                ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectUrl} - ${url.visitHistory.length}</li>`).join("")}
               </ol>
             </body>
            </head>
        </html>`
    )
})

app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            }
        },
    });
    res.redirect(entry.redirectUrl);
})

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));   
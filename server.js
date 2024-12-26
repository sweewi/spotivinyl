const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const clientId = "6c29448dd9af438fad708cbf4de70407";
const clientSecret = "39af95e758e44c12a2d6f459172854a1";
const redirectUri = "http://localhost:3000/callback";

app.post("/token", async (req, res) => {
  const code = req.body.code;

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error exchanging token:", error.response.data);
    res.status(500).send("Error exchanging token");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

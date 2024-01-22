const express = require("express");
const i18next = require("i18next");
const Backend = require("i18next-http-backend");
const path = require("path");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 6060;

i18next.use(Backend).init(
  {
    backend: {
      //   loadPath: "http://localhost:6060/locales/{{lng}}/{{ns}}.json",
      loadPath: `http://localhost:${port}/locales/{{lng}}/{{ns}}.json`,
    },
    fallbackLng: "en",
    ns: ["translation"],
    defaultNS: "translation",
  },
  (err, t) => {
    if (err) return console.error(err);
  }
);

const app = express();

app.use("/locales", express.static(path.join(__dirname, "locales")));

app.get("/test", (req, res) => {
  const lang = req.query.lang || "en";

  i18next.changeLanguage(lang, (err, t) => {
    // if (err) return res.status(500).send(err.message);
    if (err) {
      console.error("Error changing language:", err);
      return res.status(500).send(err.message);
    }
    res.send(t("welcome"));
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

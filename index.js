const functions = require("firebase-functions");
const line = require("./utils/line");
const dictionary = require("./utils/dictionary");

const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ maxInstances: 10 });

exports.Webhook = functions.https.onRequest(async (req, res) => {
  if (req.method === "POST") {
    const events = req.body.events;
    for (const event of events) {
      switch (event.type) {
        case "message":
          if (event.message.type === "text") {
            const msg = await dictionary.chat(event.message.text);
            await line.reply(event.replyToken, [{ type: "text", text: msg }]);
            return res.end();
          }
          break;
      }
    }
  }
  res.send(req.method);
});
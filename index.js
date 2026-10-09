const axios = require("axios");
require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

app.command("/the-bot-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/the-bot-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      "https://official-joke-api.appspot.com/random_joke",
    );
    await respond({
      text: `${response.data.setup}

${response.data.punchline}`,
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke." });
  }
});

app.command("/the-bot-dog", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    await respond({ text: `Dog Image:\n${response.data.message}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a dog image." });
  }
});

app.command("/the-bot-advice", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://api.adviceslip.com/advice");
    await respond({ text: `Advice:\n${response.data.slip.advice}` });
  } catch (err) {
    await respond({ text: "Failed to fetch advice." });
  }
});

app.command("/the-bot-uselessfact", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random");
    await respond({ text: `Useless Fact:\n${response.data.text}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a useless fact." });
  }
});

app.command("/the-bot-activity", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    await respond({ text: `Activity Idea:\n${response.data.activity}` });
  } catch (err) {
    await respond({ text: "Failed to fetch an activity idea." });
  }
});

app.command("/the-bot-dadjoke", async ({ ack, respond }) => {
  await ack();
  try {
    const response = await axios.get("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" }
    });
    await respond({ text: `Dad Joke:\n${response.data.joke}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a dad joke." });
  }
});

app.command("/the-bot-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text: `Available Commands:
/the-bot-ping - Check bot latency
/the-bot-catfact - Get a cat fact
/the-bot-joke - Get a joke
/the-bot-dog - Get a random dog image
/the-bot-advice - Get a random piece of advice
/the-bot-uselessfact - Get a random useless fact
/the-bot-activity - Get a random activity idea
/the-bot-dadjoke - Get a random dad joke`,
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

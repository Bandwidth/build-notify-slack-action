const core = require("@actions/core");
const github = require('@actions/github');
const fetch = require("node-fetch");

const { buildSlackAttachments, formatChannelName } = require('./src/utils');

(async () => {
  try {
    const jobStatus = core.getInput("job-status");
    const slackChannel = core.getInput("slack-channel");
    const slackBotToken = core.getInput("slack-bot-token");

    const color = jobStatus === "success" ? "#2e993e" : jobStatus === "failure" ? "#bd0f26" : "#d29d0c";

    const attachments = buildSlackAttachments({ jobStatus, color, github });

    const payload = {
      channel: slackChannel,
      attachments: attachments
    };

    const result = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": payload.length,
        Authorization: `Bearer ${slackBotToken}`,
        Accept: "application/json",
      },
    });
    if (!result.ok) {
      throw new Error(`Server error ${result.status}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
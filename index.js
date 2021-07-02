const core = require("@actions/core");
const fetch = require("node-fetch");

(async () => {
  try {
    const status = core.getInput("status");
    const text = core.getInput("text");
    const slackChannel = core.getInput("slack-channel");
    const slackBotToken = core.getInput("slack-bot-token");

    const customSection = {
        type: "section",
        text: {
            type: "mkdwn",
            text: text
        }
    }

    const payload = {
      channel: slackChannel,
      attachments: [
        {
          color: status === "success" ? "#2e993e" : status === "failure" ? "#bd0f26" : "#d29d0c",
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: `GitHub Action: *${status === "success" ? "SUCCESS" : status === "failure" ? "FAILURE" : "CANCELLED"}*`,
              },
            },
            customSection
          ],
        },
      ],
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
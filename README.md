# build-notify-slack-action

This simple action notifies Slack of the build status.

# Usage

See [action.yml](action.yml)

```yaml
steps:
- uses: bandwidth/build-notify-slack-action
  with:
    job-status: ${{ job.status }}
    text: Hello world
    slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
    slack-channel: ${{ secrets.SLACK_CHANNEL }}
```

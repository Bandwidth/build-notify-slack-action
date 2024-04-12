# build-notify-slack-action

This simple action notifies Slack of the build status.

# Usage

See [action.yml](action.yml)

```yaml
steps:
- uses: Bandwidth/build-notify-slack-action@v2
  with:
    job-status: ${{ job.status }}
    slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
    slack-channel: ${{ secrets.SLACK_CHANNEL }}
```

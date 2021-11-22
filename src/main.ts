import * as core from '@actions/core'
import * as github from '@actions/github'
import {IssuesEvent} from '@octokit/webhooks-types'
import urlRegex from 'url-regex-safe'
async function run(): Promise<void> {
  try {
    detectSourceFactory()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

async function detectSourceFactory(): Promise<void> {
  const {eventName} = github.context
  // Do nothing if it's wasn't a relevant action or it's not an issue comment.
  if (eventName !== 'issues') return
  const issueEvent = github.context.payload as IssuesEvent
  if (issueEvent.action !== 'opened') return

  const url = urlRegex({strict: true})
    .exec(issueEvent.issue.body ?? '')
    ?.at(0)

  if (!url) return
}
run()

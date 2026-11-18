---
title: "How I work with AI"
description: "How I scope coding agents, connect tools and verify a workflow before it handles real work."
date: 2026-11-18
img_alt: ""
---

A message arrives through a webhook. Someone needs to decide what it means, where to record it and whether to send a reply. In [Meta Chatter](/portfolio/projects/meta-chatter/), a client proof of concept, that handoff gave me a specific question to test. Can a local model help classify a message while the application stays in charge of what happens next?

## Separate the decision from the action

The workflow normalizes the incoming message before passing it to an Ollama-assisted classifier. A structured output parser gives the routing step fields it can inspect. Downstream nodes handle the Google Sheets integration and outbound messaging requests. That boundary gives me three places to investigate when something goes wrong: the input, the classification and the action selected by the router.

One check I would run before enabling live sends is to replay an ambiguous message. I want to see the exact fields the parser returns and which route consumes them. A plausible-looking reply tells me very little about whether the right destination was selected.

## Give the coding agent a small, testable job

I use Claude Code and Codex for work such as scaffolding APIs, refactoring SQL and drafting tests. I start by naming the behavior to preserve and the files or tools the task needs. For a defect, that can be one failing case, the affected component and the command that reproduces it.

A reusable skill records instructions worth repeating across tasks. The harness connects those instructions to the repository, tools and verification steps. Keeping the acceptance check explicit lets me review a proposed change even when another developer or agent implements it.

## Verify at the boundary a user depends on

A test generated from an implementation can repeat its assumptions. I review its inputs and expected result against the original requirement, then check a failure path. For a routing workflow that might be an incomplete model response. For a web feature it might be a user retrying an action after validation fails.

In [enterprise SaaS delivery](/portfolio/projects/enterprise-delivery/) I used custom Claude skills alongside SonarQube for defect triage, and Playwright and Argus for end-to-end validation. Static analysis and a browser check answer different questions. I still review the diff and the observed result before accepting the change.

For a business owner, the handoff should be concrete. Which recurring step now runs automatically? Who can inspect an unexpected result? What evidence shows that the workflow reached the intended destination? Those questions guide what I build and what I test.

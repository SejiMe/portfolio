---
title: "Meta Chatter"
description: "A client proof of concept for routing incoming messages into operational workflows."
technologies: ["n8n","Ollama","Webhooks","JavaScript","Google Sheets"]
img_alt: "Meta Chatter workflow showing webhook intake, Ollama classification and operational routing"
img_path: "../../../public/meta_chatter_workflow.png"
---

## Business problem

Incoming operational messages need to reach the right workflow. Meta Chatter explores how AI classification and structured routing can reduce repetitive sorting and connect messages with existing business tools.

## Client proof of concept

The workflow receives webhook requests, checks sender roles and normalizes incoming messages. An Ollama-backed LLM chain produces structured output, which a rules switch uses to select the next action.

Visible branches cover operator updates, location queries, passenger and bus reports, general messages and missing-route handling. Google Sheets nodes read or update records, while HTTP request nodes support outbound messaging.

## Engineering approach

The workflow combines explicit routing rules with model output parsing. Sender-role checks and structured output help constrain how a message moves through the system. JavaScript nodes transform data between integrations.

## Status

This is a client proof of concept. The workflow image illustrates the integration design. Production adoption, performance measurements and client identity are unspecified.

## Business value

The intended value is faster message routing, fewer repeated lookups and a clearer handoff between incoming requests and business systems. These outcomes require validation in the client's operating environment.

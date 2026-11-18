---
title: "How I work with AI"
description: "How I used AI in hospital software development at CLDH and quality engineering at Accenture for ReadyTech, and how I apply those lessons to HaXus."
date: 2026-11-18
img_alt: ""
---

## CLDH: API development and SQL

At Central Luzon Doctors’ Hospital (CLDH), I used ChatGPT and Codex to scaffold REST endpoints, work through complex SQL queries and draft test cases. This was part of my work as a software developer on internal hospital systems, including the WellCare platform.

Scaffolding gave me a starting point for an endpoint. Deciding what it should return took a conversation with the people who used the system. The same distinction mattered for SQL. A rewritten query could run faster and still produce the wrong figures for a hospital report. Code review, automated tests and user acceptance testing gave me ways to check those changes. [WellCare case study](/portfolio/projects/wellcare-api/content/)

## Accenture and ReadyTech: defect triage and browser testing

At Accenture Philippines, I supported ReadyTech’s enterprise applications. I used custom Claude skills to make recurring code-review steps repeatable and SonarQube to identify issues worth investigating. That combination helped me triage defects and decide where to look more closely.

For the React applications, I used Argus and Claude-assisted workflows to trigger Playwright tests. A code audit could flag a suspicious change. Running the browser test let me see whether the affected interaction actually worked. [Enterprise delivery case study](/portfolio/projects/enterprise-delivery/)

## HaXus: turning a requirement into a test

HaXus is my personal project. I use AI during planning to turn a workflow in my project notes into a concrete acceptance scenario. I bring the same two questions I used at work: what does the person using this system expect, and what would I have to observe to know it worked?

One example comes from Hanay, the fleet-management part of HaXus. A bus is scheduled to reach a terminal and make a return trip. Suppose its scheduled arrival time has passed, but nobody has confirmed that it arrived. Should the dispatcher be able to start the return leg?

I can give an assistant that question along with the proposed dispatch rules and ask it to draft the two cases. With the arrival still unconfirmed, the return leg should stay blocked. Once the arrival is confirmed, the dispatcher can prepare the return trip, and departure still needs an explicit release. I review both cases against the project notes before treating them as acceptance criteria. At this stage the result is a testable design for Hanay.

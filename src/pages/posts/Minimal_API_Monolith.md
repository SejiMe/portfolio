---
title: "Minimal API Monolithic Approach"
date: "2025-02-05"

layout: ../../layouts/PostLayout.astro
description: "Learn how to exploit buffer overflows in this post!"

img_path : "/portfolio/APIMonolith.jpg"
img_alt : "Insert image description here"
---

## Are you a beginner?

Everyone has to start with the basic right? Yes! before I dive into Architectures like the Onion/Clean, Microservices and all other stuffs. I went back to using Monolothic approach! Now if you ask "why went back" yes I went straight using Vertical Slice Architecture.

## Is that a Problem?

Well no, but Yes! imagine first time joining a basketball team and after few training sessions you already want to be the captain of the team, without even knowing the general basketball rules and some other stuff like leading.

Moreover, you've gotta understand FUNdamentals, yes it's much more FUN that way. so why Monolithic? being monolithic you will be exposed to understand hard code your business logics, use cases, views, models and all other stuffs without getting your brain rot. This! especially when you don't have proper guidelines, or a senior guiding you on stuff like microservice or clean architecture.

## Its Quite Simple!

```
-src
|
|--Models
|---DTOs
|---Value Objects
|--- POCOs
|--Common
|--- Dependency Injection
|--- Persistence
|-- Endpoints 
|--- // here I'll be using Screaming architecture onwards
|--- TodoEndpoint
|---- TodoGet
|---- TodoPost
|---- TodoPatch
|---- TodoDelete
|--- SomeEndpoint
|-- Interfaces
|-- Services
|--- 
```

## To Be Continue!
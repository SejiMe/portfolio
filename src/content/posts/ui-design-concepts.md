---
title: "UI Design Concepts"
description: "A frosted header, a sideways gallery, and a career card illustrate how to choose a visual style and give motion a purpose."
date: 2026-11-18
img_alt: ""
---

On this portfolio, you can browse projects sideways, open a case study, and read it from top to bottom. The change in direction marks a change in what you came to do. In the gallery you are choosing a project. Inside the case study you are following an explanation.

That distinction helped me put my design notes to use. “Glassmorphism” describes a surface. “Horizontal exhibition” describes how someone moves through a collection. Neither tells me whether a visitor can find the next project or read the current one. I make those decisions separately.

## Choose a style for the task

| Design concept | Where I would use it | What I would check |
| --- | --- | --- |
| Glassmorphism | A menu over project artwork | Can I read every link over both the lightest and darkest parts of the image? |
| Functional minimalism | A table someone uses throughout the day | Can I find the row and its primary action on a second visit? |
| Editorial design | A case study with a problem, a decision, and an outcome | Do the headings make the argument clear when I skim? |
| Bento grid | An overview of independent features | Does each tile still make sense when the grid becomes one column? |
| Neo-brutalism | A welcome screen with one main action | Do the bold type and hard outlines draw my eye to that action? |
| Expressive design | A first-run experience or a milestone | How does it feel if I encounter the same animation several times? |

## Give the header two jobs

The frosted header keeps some of the artwork visible as it passes underneath. The active underline answers a different question: which chapter am I in? I can check the two independently. If the links disappear over a bright thumbnail, I increase the surface opacity. If I lose my place when I move the pointer away, I check the active state.

Here is a small version of the underline. The current chapter link carries `aria-current="location"`. The line stays visible when the pointer leaves, and keyboard focus has its own outline.

```css
.chapter-nav a {
  position: relative;
  display: inline-block;
  padding: 0.6rem 0.4rem;
}

.chapter-nav a::after {
  content: "";
  position: absolute;
  inset: auto 0.4rem 0;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease-out;
}

.chapter-nav a:is(:hover, :focus-visible, [aria-current="location"])::after {
  transform: scaleX(1);
}

.chapter-nav a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .chapter-nav a::after { transition: none; }
}
```

The padding belongs to the link itself. A visitor can tap the space around the word, even though the underline is only two pixels tall. [W3C guidance on target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum)

## Decide what scrolling reveals

A horizontal exhibition works for the project listing because each card offers the same decision: open this case study or keep browsing. Previous and next controls make that choice visible before someone tries a gesture. A visitor who enlarges the text must also be able to reach the bottom of the current card. If a downward scroll advances the gallery before they can read its last line, the interaction has taken away part of the content.

For a project about redesigning a single screen, I would consider a different treatment from my notes. A sticky device preview could stay in place while the surrounding text explains what changed. That layout earns its space when each paragraph points to a visible difference in the preview. [Browse the project exhibition](/portfolio/projects/)

## Design the resting states first

Two ideas from Charles Liu’s *20 Principles of UX & Animation* are especially practical here. **Pose to pose** starts with the states on either side of an interaction. **Secondary action** adds a smaller cue that reinforces the change.

Take an experience card. Closed, it needs to tell me the role, employer, and length of service. Open, it needs to connect that role to specific contributions. Once both states read well, the chevron can turn to show that the card is open. With reduced motion enabled, the details and final chevron position still communicate the result. [Try an experience card](/portfolio/about/#experience)

My last check is to operate the page with a keyboard, enlarge the text, and turn on reduced motion. Can I tell where I am, reach the next action, and read what changed? Those three questions catch problems a still screenshot can miss. [W3C guidance on animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

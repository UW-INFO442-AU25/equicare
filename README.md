# Equicare
INFO 442 Autumn 2025

Group 4: Ayushi Mehra, Yuvika Verma, Sonoma Miller, Audrey Phan, Judy Kuang

## Problem Statement

**Primary UN Sustainable Development Goal Focus:** This project primarily aligns with the UN Sustainable Development Goal: Good Health and Well-being, which aims to improve health outcomes and well-being for all at all ages (United Nations). By supporting expecting parents in navigating relational and medical challenges during pregnancy, the project contributes to community-improved mental health, stronger family foundations, and healthier generational outcomes for both parents and children.

**Defining the Problem:** Hence, this brings us to our central design challenge: How might we support first-time expecting parents in urban areas in the U.S. navigate shifting relationship dynamics during pregnancy to strengthen their relationship so they can maintain a supportive partnership during their transition to parenthood?

**Targeted Causes for Intervention:** Expecting parents undergo profound shifts in their relationship dynamics during pregnancy. These changes are caused by a complex interplay of factors, including evolving expectations with parenthood, hormonal fluctuations–especially in the pregnant partner–that impact wellbeing, evolving sense of identity, and heightened emotional and financial stress. Limited access to approachable, stigma-free mental health support for expecting parents contributes to this issue, leaving many couples without the resources they need to navigate this critical life stage (Savell SM, Breeden LV, Emery RE., 2025).

Additionally, a key reason for strain is the lack of structured opportunities for partners to openly communicate their emotional needs. Our project aims to focus on addressing these gaps by providing interactive tools that foster communication and offer supportive activities to strengthen the relationship during pregnancy.

## Features
| Requirement                                                  | Description | Priority |
|--------------------------------------------------------------|-------------|----------|
| Firebase auth login                                          | Establish their account and personal info |    P0    |
| Date Night Idea Quiz                                         | Fill out the quiz to get ideas for date night |    P0    |
| Linked Calendar - to track appointments/milestones           | Shared To-Do List or planner for baby prep |    P0    |
| “About Me” Quiz (profile set up) - part of new account login | Answer questions about hobbies, things you like/dislike, love language, etc. |    P1    |
| Resources page                                               | Mix of articles, links, experts to talk to, videos |    P1    |
| Weekly check-in journal                                      | Allow couples to write their individual thoughts/concerns |    P2    |

## Design Decisions
TODO: Include feature justification here

## Tech Stack
- Figma for design
- HTML/CSS for static pages
- Bootstrap app
- Explore fullcalendar.io for linked accounts?
- React for front end reactivity
- Javascript, Firebase for backend reactivity
- Node.js + Express for events/users?
- SQL of some kind for database (storing events)
- GitHub pages to publish

### GenAI Use
TODO: include any genai usage here


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

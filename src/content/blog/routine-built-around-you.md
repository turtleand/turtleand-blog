---
author: Turtleand
pubDatetime: 2026-11-15T15:00:00Z
title: "AI Should Meet You Where You Are"
slug: routine-built-around-you
featured: true
draft: false
tags:
  - AI
  - reflection
  - growth
description: "Better help starts with what you understand, where you get lost, and what makes the next step clearer."
ogImage: /assets/images/workflow-story-a-signup.png
---

_Better help starts with what you understand, where you get lost, and what makes the next step clearer._

![Turtleand at an ordinary desk, following a signup request through linked files and a simple diagram on his monitor.](/assets/images/workflow-story-a-signup.png)

On Monday morning, Turtleand opened a codebase he had never worked on. His first task looked simple: change the subject line of the welcome email.

He asked the AI in his editor how signup worked. It returned a detailed overview of routes, services, background jobs, and configuration. He scrolled back to the top.

He knew more names now. He still did not know where the email came from.

“Follow one signup with me,” he typed. “Start when someone presses the button. Show me the relevant file at each step, and pause so I can ask questions.”

The explanation began with the form. Turtleand opened the linked file, then followed the request to the code that created the account.

Turtleand asked for a small diagram. Five boxes appeared: form, request, account, queue, email. Each linked back to the code.

![One signup follows five steps: form, request, account, queue, and email.](/assets/images/workflow-story-a-signup-flow.svg)

Next came a background job.

“Wait. Is this where the email gets sent?”

“Here, the application adds it to a queue. Another part picks it up and sends it.”

![A job waits in the queue until a worker picks it up and sends the welcome email.](/assets/images/workflow-story-a-queue-detail.svg)

He clicked the last box and found the message template.

Now the filenames had a place in a sequence he could follow.

Before editing, he explained the journey aloud. At the queue, he stopped again. What happened if sending failed? This time, he knew which part to ask about.

He imagined opening unfamiliar work this way more often: a short route through one example, with longer explanations available where he needed them. Sometimes he would want a conversation. Sometimes a diagram would be enough.

He could connect the pieces and decide where to look next.

He returned to the subject line, with a clearer picture of the system around it.

**Try this next:** Ask for one concrete example to be followed from beginning to end. Pause at the first step you cannot explain.

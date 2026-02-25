# AI Resume Optimizer

You just built an AI-powered app from scratch -- in about 30 minutes, using only free tools. This repo has everything from the workshop so you can revisit what we built, keep learning, and apply the same techniques to your own projects.

## Workshop Slides

[View the presentation (PDF)](https://drive.google.com/file/d/1tT_AOX_4LwrdNEwWUemVOtT0jNyoMViw/view?usp=sharing)

---

## Start Here

Depending on what you want to do next:

- **Rebuild it from scratch?** Follow the [Prompt Guide](prompt-guide.md) -- it has every prompt from the workshop, ready to copy-paste
- **Quick refresher on the techniques?** Check the [Cheat Sheet](cheat-sheet.md) -- the 4 principles, a reusable prompt template, and the top 5 errors we saw
- **Keep building?** The [Going Further](going-further.md) guide has 4 bonus sessions: PDF upload, AI clarifying questions, optimization history, and UI polish
- **Explore more tools and resources?** The [Resources](resources.md) page has curated links -- prompt engineering guides from Anthropic/OpenAI/Google, YouTube channels, AI coding tools, and communities

---

## What's In This Repo

| Path | What It Is |
|------|-----------|
| [prompt-guide.md](prompt-guide.md) | The complete build guide -- Sessions 0 through 4 with prompts, instructions, and troubleshooting |
| [cheat-sheet.md](cheat-sheet.md) | One-page quick reference: the 4 principles, prompt template, common errors and fixes |
| [going-further.md](going-further.md) | 4 bonus sessions to keep building beyond what we covered in the workshop |
| [resources.md](resources.md) | Curated links to prompt engineering guides, YouTube tutorials, AI tools, and communities |
| [sample-data/](sample-data/) | The sample resume and job descriptions we used during the demo |
| [colab-version/](colab-version/) | The complete Colab notebook with all features -- PDF upload, skill gaps, history, and more |
| [full-version/](full-version/) | The polished React + FastAPI version from the opening demo |

---

## How the App Works

```
Paste your resume
      |
Paste a job description
      |
AI analyzes the JD --> extracts skills, keywords, requirements
      |
AI rewrites your resume tailored to that specific job
      |
Save it under a category (ML Engineer, Data Scientist, etc.)
```

The core idea: instead of manually reading job descriptions and guessing which keywords to add, you let AI do the analysis and rewriting while keeping all your real experience intact.

---

## Build It Yourself (The 5-Session Approach)

During the workshop, we built a working version in 5 sessions using [Claude.ai](https://claude.ai), [ChatGPT](https://chat.openai.com), or [Google AI Studio](https://aistudio.google.com). You can redo this at your own pace:

| Session | What You Build | Time |
|---------|---------------|------|
| 0 | Brainstorm and create a project brief | ~3 min |
| 1 | Gradio web app with text inputs and a button | ~8 min |
| 2 | Connect Gemini AI to analyze job descriptions | ~8 min |
| 3 | AI-powered resume rewriting and optimization | ~8 min |
| 4 | Save optimized resumes to Google Drive by category | ~8 min |

Every prompt is in **[prompt-guide.md](prompt-guide.md)** -- just copy, paste into your AI tool, and follow the instructions.

---

## The 4 Principles of AI-Assisted Coding

These are the techniques we practiced. They work for any AI coding project, not just this one.

1. **Decompose first** -- Before opening any AI tool, break your project into small, independent pieces. We split our app into 4 sessions: UI, AI connection, optimization logic, and storage. Each piece stands on its own.

2. **One session, one task** -- Every AI conversation should accomplish exactly one thing. Don't ask for "an entire app" -- ask for "a Gradio form with two text areas and a button." Focused asks get better results.

3. **Feed context forward** -- When you start a new session, paste your existing code so the AI knows what you already have. Without context, it will generate something incompatible with what you built.

4. **Test between sessions** -- Run your code after every session. If something breaks, fix it before moving on. Never stack untested changes -- that's how small problems become big ones.

---

## Getting a Free Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it into the app's Settings tab

The free tier is generous enough for everything in this workshop.

---

## Keep Learning

- **[Going Further](going-further.md)** -- 4 bonus sessions: add PDF upload, AI clarifying questions, optimization history, and a polished UI
- **[Resources](resources.md)** -- Prompt engineering guides from Anthropic, OpenAI, and Google. YouTube channels. AI coding tools like Cursor, Windsurf, and Claude Code. Communities to join.
- **[Cheat Sheet](cheat-sheet.md)** -- Print this one out. The 4 principles, a fill-in-the-blank prompt template, and the 5 most common errors with fixes.

---

## The Skill You Learned Today

The skill isn't coding. The skill is knowing how to break a problem down, give AI a focused task, and iterate when things go wrong. The tools will change every six months -- these techniques won't.

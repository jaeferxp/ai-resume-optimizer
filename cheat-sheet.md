# Cheat Sheet -- AI-Assisted Coding

A quick reference for the techniques from the workshop. Use this for any AI coding project, not just the resume optimizer.

---

## The 4 Principles

| Principle | What It Means | Example |
|-----------|--------------|---------|
| **Decompose first** | Break your project into small pieces before asking AI anything | "I need 4 sessions: UI, AI, optimization, storage" |
| **One session, one task** | Each AI conversation does exactly one thing | Session 2 only adds Gemini -- nothing else |
| **Feed context forward** | Paste your existing code when starting a new session | "Here is my current code: [paste]" |
| **Test between sessions** | Run your code after every session before moving on | Run all cells, click the URL, verify it works |

---

## The Workflow

```
Brainstorm --> Plan --> Implement --> Test --> Iterate
    |            |          |           |         |
 "What am I   "Break it   "One AI    "Run it,  "Paste the
  building?"   into        session    click     error back
               sessions"   per piece" around"   to AI"
```

---

## Prompt Template

Use this template for any AI coding task:

> I am building [WHAT] using [FRAMEWORK/LANGUAGE] on [PLATFORM].
>
> I have already built [WHAT EXISTS SO FAR].
>
> Now I want to add [SPECIFIC FEATURE]:
> - [Requirement 1]
> - [Requirement 2]
> - [Requirement 3]
>
> Technical constraints:
> - [Package/library to use]
> - [Platform constraints]
>
> Here is my current code:
> ```
> [PASTE CODE]
> ```
>
> Give me [SPECIFIC OUTPUT FORMAT].

---

## Top 5 Errors and Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `ModuleNotFoundError: No module named 'gradio'` | Didn't run the pip install cell | Run Cell 1 first and wait for it to finish |
| `403 PERMISSION_DENIED` from Gemini | Invalid or expired API key | Get a new key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| Wrong import: `google.generativeai` | AI gave you the deprecated package | Use `from google import genai` (google-genai package) |
| `Rate limit exceeded` | Free tier has per-minute limits | Wait 30 seconds and try again |
| Layout is single column instead of side-by-side | AI used `gr.Interface` instead of `gr.Blocks` | Tell AI: "Rewrite using gr.Blocks with gr.Row and gr.Column" |

---

## Free Tools

| Tool | URL | What It Does |
|------|-----|-------------|
| Google Colab | [colab.research.google.com](https://colab.research.google.com) | Free Python notebook in the cloud |
| Claude.ai | [claude.ai](https://claude.ai) | AI coding assistant (recommended) |
| ChatGPT | [chat.openai.com](https://chat.openai.com) | AI coding assistant |
| Google AI Studio | [aistudio.google.com](https://aistudio.google.com) | AI coding assistant + Gemini API keys |
| Gemini API Key | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Free API key for Gemini AI |

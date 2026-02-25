# Prompt Guide -- Build a Resume Optimizer in 5 Sessions

Build a working AI-powered Resume Optimizer using Google Colab and any free AI tool. Each session takes about 8 minutes.

## Before You Start

1. Open [Google Colab](https://colab.research.google.com) and create a new notebook
2. Open a free AI tool in a separate tab:
   - [Claude.ai](https://claude.ai) (recommended)
   - [ChatGPT](https://chat.openai.com)
   - [Google AI Studio](https://aistudio.google.com)
3. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey) -- you need this in Session 2

> **How this works:** Copy each prompt below, paste it into your AI tool, and receive code back. Paste that code into your Colab notebook and run it.

---

## Session 0: Brainstorm Your Project (~3 minutes)

**Goal:** Create a project brief that you will reference in every future session.

**Why this matters:** 3 minutes of planning saves 30 minutes of debugging. This is the "decompose first" principle in action.

### Prompt

> I want to build an AI-powered Resume Optimizer that runs in Google Colab using Gradio for the UI and Google Gemini for the AI.
>
> The app should:
> 1. Let users paste their resume and a job description
> 2. Use Gemini AI to analyze the job description (extract skills, keywords, requirements)
> 3. Use Gemini AI to rewrite the resume tailored to that specific job
> 4. Save optimized resumes to Google Drive organized by job category
>
> Tech constraints:
> - Python only, runs in Google Colab
> - Gradio for the web interface (use gr.Blocks, not gr.Interface)
> - google-genai package for Gemini (NOT the deprecated google-generativeai)
> - Model: gemini-2.0-flash
> - Google Drive for storage
>
> Help me break this into 4 independent build sessions, where each session produces working, testable code. List what each session builds and what I should test after each one.

### What to do

Save the AI's response. You will reference this project brief when starting each new session.

---

## Session 1: Gradio App Skeleton (~8 minutes)

**Goal:** Get a working web interface with text inputs and a button. No AI yet.

**Start a NEW conversation in your AI tool.** Paste this:

### Prompt

> I want to create a simple Python app using Gradio that runs in Google Colab.
>
> The app should have:
> - A title "AI Resume Optimizer" at the top
> - Two side-by-side columns:
>   - Left column: a text area labeled "Your Resume" (12 lines tall)
>   - Right column: a text area labeled "Job Description" (12 lines tall)
> - A button labeled "Optimize Resume" (primary style, large)
> - An output text area labeled "Optimized Resume" (12 lines tall)
>
> For now, when the button is clicked, just return the message:
> "AI optimization coming in Session 2! Your resume has X characters and the JD has Y characters."
> (Replace X and Y with actual character counts from the inputs.)
>
> Requirements:
> - Use gr.Blocks (NOT gr.Interface) for layout control
> - Use gr.themes.Soft() for a clean look
> - The launch must use share=True so it works in Colab
> - Put the pip install in a separate cell at the top
>
> Give me exactly 2 Colab cells I can copy-paste.

### What to do with the response

1. **Cell 1** in Colab -- Paste the `pip install` cell
2. **Cell 2** in Colab -- Paste the Gradio app code
3. Run both cells in order (click play or press Shift+Enter)

### How to verify

You should see a Gradio interface with two text areas, a button, and an output area. Click the public URL that appears -- it opens in a new tab. Type in both boxes, click the button, and see the placeholder message with character counts.

### Troubleshooting

- **"ModuleNotFoundError: No module named 'gradio'"** -- Run the pip install cell first and wait for it to finish
- **The layout looks wrong (single column)** -- Tell the AI: *"Please rewrite this using gr.Blocks with gr.Row and gr.Column instead of gr.Interface."*
- **The public URL doesn't load** -- Wait 10 seconds and refresh, or re-run the app cell

---

## Session 2: Gemini AI Integration (~8 minutes)

**Goal:** Connect to Gemini AI so clicking the button analyzes the job description.

**Start a NEW conversation.** Paste this:

### Prompt

> I have a Gradio app running in Google Colab. Now I want to add Google Gemini AI to analyze job descriptions.
>
> Here is what I need:
>
> 1. Update the pip install cell to also install google-genai
>
> 2. Add a Settings section to the Gradio UI:
>    - A password text input for the Gemini API key
>    - A "Set API Key" button
>    - A status text showing whether the key is set
>
> 3. When "Optimize Resume" is clicked:
>    - Initialize a genai.Client with the API key
>    - Send the job description to Gemini (model: "gemini-2.0-flash") with this prompt:
>      "Analyze this job description. Extract: job title, company, must-have skills,
>      nice-to-have skills, key responsibilities, and important ATS keywords.
>      Format as a clear summary."
>    - Show the analysis result in the output area
>
> Use the new google-genai package (NOT the deprecated google-generativeai):
> - Import: from google import genai
> - Client: genai.Client(api_key=key)
> - Generate: client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
>
> Here is my current code:
>
> ```python
> [PASTE YOUR CELL 2 CODE HERE]
> ```
>
> Give me the updated cells. Keep the same Gradio theme and layout.

**Before pasting:** Replace `[PASTE YOUR CELL 2 CODE HERE]` with your actual code from Cell 2. This is "feeding context forward" -- the AI needs your existing code to build on it.

### What to do with the response

1. Update Cell 1 with the new pip install
2. Replace Cell 2 with the updated code
3. Run all cells top to bottom

### How to verify

1. Enter your Gemini API key and click "Set API Key" -- you should see a confirmation
2. Paste any job description into the JD box
3. Click "Optimize Resume"
4. You should see an AI-generated analysis of the job's key skills, requirements, and keywords

### Troubleshooting

- **403 or PERMISSION_DENIED** -- Your API key is invalid. Generate a new one at [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- **"API key not set"** -- Click "Set API Key" first and see the confirmation before clicking Optimize
- **Rate limit error** -- The free tier has a requests-per-minute limit. Wait 30 seconds and try again
- **Wrong import** -- Make sure the code uses `from google import genai`, NOT the deprecated `google.generativeai`

---

## Session 3: Resume Optimization (~8 minutes)

**Goal:** Make the AI actually rewrite the resume tailored to the job.

**Start a NEW conversation.** Paste this:

### Prompt

> My Gradio app connects to Gemini AI and analyzes job descriptions. Now I want it to actually optimize the resume.
>
> When the user clicks "Optimize Resume", the app should do TWO AI calls:
>
> 1. First call -- Analyze the JD:
>    Send the job description to Gemini and ask it to extract key skills, requirements,
>    and ATS keywords.
>
> 2. Second call -- Optimize the resume:
>    Send BOTH the original resume AND the JD analysis to Gemini with this instruction:
>    "You are a professional resume writer. Rewrite this resume to be perfectly tailored
>    to the target job. Rules:
>    - Keep all information truthful -- do NOT invent experience
>    - Naturally weave in keywords from the job description
>    - Rewrite the professional summary to match the target role
>    - Emphasize relevant skills and achievements
>    - Use strong action verbs and quantify where possible
>    - Output the COMPLETE rewritten resume as clean text"
>
> 3. Show the optimized resume in the output area.
>
> Use the google-genai package:
> - from google import genai
> - client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
>
> Here is my current code:
>
> ```python
> [PASTE ALL YOUR CURRENT CODE HERE]
> ```
>
> Update the code. Keep the same theme and layout.

### What to do with the response

1. Replace your app cell with the updated code
2. Run all cells top to bottom

### How to verify

1. Paste a resume (use [sample-data/sample_resume.txt](sample-data/sample_resume.txt) if you need one)
2. Paste a job description (use one from [sample-data/job_descriptions/](sample-data/job_descriptions/))
3. Click "Optimize Resume"
4. Compare the original and optimized versions -- you should see keywords woven in, the summary rewritten, and relevant experience highlighted

### Troubleshooting

- **Output is a list of suggestions instead of a full resume** -- Tell the AI: *"Tell Gemini to output the COMPLETE rewritten resume as formatted text, not a list of suggestions."*
- **Output invents fake experience** -- Add to the prompt: *"IMPORTANT: Only use information from the original resume. Do not fabricate experience, skills, or credentials."*
- **Output is cut off** -- Tell the AI: *"Set max_output_tokens to 4096 in the generate_content call."*

---

## Session 4: Save to Google Drive (~8 minutes)

**Goal:** Save optimized resumes to Google Drive, organized by category.

**Start a NEW conversation.** Paste this:

### Prompt

> My resume optimizer works. Now I want to add two features: save to Google Drive and a resume library.
>
> Add these features:
>
> 1. A Google Drive mount cell (separate cell, runs before the app):
>    - Mount Google Drive
>    - Create folder at "/content/drive/MyDrive/AI_Resume_Optimizer/resumes"
>
> 2. In the Gradio UI, add below the optimized resume output:
>    - A dropdown to select job category: "ML Engineer", "Data Scientist",
>      "AI Engineer", "Computer Vision", "Software Engineer"
>    - A "Save Resume" button
>    - A status message showing save result
>
> 3. A second tab called "Resume Library":
>    - A "Load Saved Resumes" button
>    - Shows all saved resumes grouped by category with file previews
>
> 4. Save logic:
>    - Save as text file in a subfolder named after the category
>    - Filename: YYYYMMDD_HHMMSS_category.txt
>    - Show success message with filename
>
> Use the google-genai package (from google import genai).
>
> Here is my current code:
>
> ```python
> [PASTE ALL YOUR CURRENT CODE HERE]
> ```
>
> Give me all cells including the Drive mount cell.

### What to do with the response

1. Add the Drive mount cell near the top (after pip install, before app code)
2. Replace your app cell with the updated version
3. Run all cells in order. When prompted, authorize Google Drive access

### How to verify

1. Optimize a resume as before
2. Select a category (e.g., "ML Engineer") and click "Save Resume" -- see a success message
3. Switch to the Library tab, click "Load Saved Resumes" -- your resume should appear
4. Check Google Drive: `My Drive > AI_Resume_Optimizer > resumes` -- the file should be there

### Troubleshooting

- **Drive mount fails** -- This only works in Google Colab, not local Jupyter. Make sure you are in Colab
- **"Permission denied" when saving** -- Re-run the Drive mount cell. If that fails, try `Runtime > Disconnect and delete runtime`, reconnect, and run all cells again
- **Save button does nothing** -- Run the optimize step first. Save only works when there is optimized text in the output

---

## You Did It!

You built a working AI-powered Resume Optimizer from scratch:

- **Session 0:** Project brief and roadmap
- **Session 1:** Gradio web interface
- **Session 2:** Gemini AI integration
- **Session 3:** Resume optimization
- **Session 4:** Google Drive storage

All using copy-paste prompts and free tools.

### What You Practiced

- **Decomposing** a project into independent sessions
- **Feeding context forward** by pasting existing code into each new prompt
- **Testing between sessions** to catch issues early
- **Iterating with AI** to fix problems when they come up

### When Something Breaks

Paste this into the SAME conversation where the error happened:

> I got this error when running the code:
>
> ```
> [PASTE THE ERROR MESSAGE HERE]
> ```
>
> Please fix it. Show me only the changed code.

This is an important lesson: **iterating with AI to fix problems IS the workflow.**

### The Pattern

Every session follows the same 5 steps:

```
1. Start a NEW AI conversation
2. State what you have already built
3. State what you want to build next
4. Paste your current code
5. Get code -> paste in Colab -> run -> test
```

You can use this pattern to build anything.

---

## Prompt Writing Tips

### Be Specific

| Vague Prompt | Specific Prompt |
|-------------|----------------|
| "Build me an app" | "Build a Gradio app with a text area (10 lines), a button, and an output area. Use gr.Blocks." |
| "Add AI" | "Use google-genai package. Import: `from google import genai`. Model: gemini-2.0-flash." |
| "Make it save" | "Save as a text file to Google Drive at /content/drive/MyDrive/folder/. Filename: YYYYMMDD_HHMMSS.txt" |

### Tell the AI What You Already Have

Always include:
- What framework you are using (Gradio, React, etc.)
- What platform you are on (Google Colab, local machine, etc.)
- Your current code (paste it in)

### Constrain the Output

- "Give me exactly 2 Colab cells"
- "Keep the same theme and layout"
- "Show me only the changed code"
- "Output the COMPLETE rewritten resume, not a summary"

### Fix Errors by Pasting Them Back

When something breaks, copy the error message and paste it back to the AI. This is normal and expected -- professional developers do this constantly.

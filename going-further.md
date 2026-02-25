# Going Further -- Bonus Sessions

You built a working resume optimizer in 4 sessions. Here are 4 more sessions to keep leveling up, plus ideas for building something completely new.

Same workflow as before: start a new AI conversation, paste the prompt, paste your current code, get code back, paste into Colab, test.

---

## Session 5: Add PDF Upload (~10 minutes)

**Goal:** Upload a PDF resume instead of pasting text.

### Prompt

> My resume optimizer works with pasted text. Now I want to add PDF upload support.
>
> Add to my Gradio app:
> 1. A file upload component that accepts PDF files
> 2. When a PDF is uploaded, extract the text using PyMuPDF (fitz)
> 3. Show the extracted text in the "Your Resume" text area so the user can review it
> 4. Keep the existing text paste option as a fallback
>
> Requirements:
> - Install PyMuPDF: pip install PyMuPDF
> - Import: import fitz
> - Extract text: loop through pages with `doc = fitz.open(file_path)` and `page.get_text()`
>
> Here is my current code:
> ```python
> [PASTE YOUR CURRENT CODE HERE]
> ```
>
> Give me the updated code.

### How to verify

Upload any PDF resume. The text should appear in the "Your Resume" text area. Then run the optimizer as usual -- it should work the same as pasting text.

---

## Session 6: AI Clarifying Questions (~10 minutes)

**Goal:** Before optimizing, the AI asks you 2-3 questions to better tailor the resume.

### Prompt

> My resume optimizer analyzes the JD and rewrites the resume. I want to add a middle step where the AI asks clarifying questions first.
>
> New flow:
> 1. User pastes resume + JD, clicks "Analyze"
> 2. AI analyzes the JD (already working)
> 3. AI generates 2-3 questions like:
>    - "The JD mentions cloud deployment experience. Can you describe any projects where you deployed to AWS/GCP/Azure?"
>    - "Do you have experience leading a team? The JD emphasizes leadership."
> 4. User answers the questions in text boxes
> 5. User clicks "Optimize" -- AI uses the resume + JD analysis + answers to generate a better result
>
> Show the questions in the UI with text boxes for answers. Add a second button "Optimize My Resume" that only appears after questions are shown.
>
> Here is my current code:
> ```python
> [PASTE YOUR CURRENT CODE HERE]
> ```
>
> Give me the updated code.

### How to verify

After clicking Analyze, you should see 2-3 personalized questions. Answer them, click Optimize, and the result should be noticeably more targeted than without answers.

---

## Session 7: Optimization History (~8 minutes)

**Goal:** Track every optimization you run with timestamps.

### Prompt

> I want to add a history feature to my resume optimizer that logs every optimization.
>
> Add:
> 1. A new tab called "History"
> 2. Every time the user optimizes a resume, save a log entry with:
>    - Timestamp
>    - Job title (extracted from the JD analysis)
>    - Category (if saved)
>    - First 100 characters of the optimized resume as a preview
> 3. Save the history log as a JSON file on Google Drive
> 4. A "Load History" button in the History tab that shows all past optimizations
>
> Here is my current code:
> ```python
> [PASTE YOUR CURRENT CODE HERE]
> ```
>
> Give me the updated code.

### How to verify

Optimize a few resumes. Switch to the History tab, click Load History, and see timestamped entries for each one.

---

## Session 8: Make It Prettier (~8 minutes)

**Goal:** Polish the UI with better layout and formatting.

### Prompt

> I want to improve the look of my resume optimizer app.
>
> Make these changes:
> 1. Use the theme gr.themes.Soft(primary_hue="indigo") for a more professional look
> 2. Add a markdown header with a brief description at the top
> 3. Make the optimized resume output area taller (20 lines)
> 4. Add a character count below each text area
> 5. Format the JD analysis as markdown with headers and bullet points
> 6. Add a "Copy to Clipboard" button next to the optimized resume
>
> Here is my current code:
> ```python
> [PASTE YOUR CURRENT CODE HERE]
> ```
>
> Give me the updated code.

### How to verify

The app should look noticeably more polished. The indigo theme, markdown formatting, and copy button should all work.

---

## Challenge: Build Something New

Apply the same 4-session pattern to a different project. Here are ideas:

| Project | Session 1 | Session 2 | Session 3 | Session 4 |
|---------|-----------|-----------|-----------|-----------|
| **Cover Letter Writer** | Text inputs for resume + JD | AI generates a cover letter | Tone/style options | Save to Drive |
| **LinkedIn Summary Optimizer** | Input for current summary + target role | AI analyzes target role | AI rewrites summary | Before/after comparison view |
| **Interview Prep Bot** | Input for JD | AI generates likely interview questions | AI generates sample answers based on your resume | Save Q&A sets by company |
| **Portfolio Project Describer** | Input for project details | AI writes a professional description | Multiple versions (technical, non-technical, tweet) | Export as markdown |

The pattern is always the same:
1. **Session 0:** Brainstorm and plan
2. **Session 1:** Build the UI
3. **Session 2:** Connect to AI
4. **Session 3:** Core logic
5. **Session 4:** Save and organize

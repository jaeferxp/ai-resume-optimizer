import { useState, useCallback } from 'react'
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ClipboardPaste,
  Upload,
  Briefcase,
  Star,
  ListChecks,
  HelpCircle,
  Save,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react'
import StepIndicator from '../components/StepIndicator'
import FileUpload from '../components/FileUpload'
import { analyzeJD, generateQuestions, optimizeResume, saveResume } from '../lib/api'

export default function Optimize() {
  // Wizard state
  const [step, setStep] = useState(1)

  // Step 1: Resume
  const [inputMode, setInputMode] = useState('upload') // 'upload' | 'paste'
  const [resumeText, setResumeText] = useState('')

  // Step 2: Job Description
  const [jobDescription, setJobDescription] = useState('')

  // Step 3: Analysis + Questions
  const [jdAnalysis, setJdAnalysis] = useState(null)
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})

  // Step 4: Results
  const [optimizedResume, setOptimizedResume] = useState('')
  const [category, setCategory] = useState('ML Engineer')
  const [saveStatus, setSaveStatus] = useState(null) // null | 'saving' | 'saved' | 'error'

  // Loading states
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')

  // ------- Step 2 -> Step 3: Analyze JD + Generate Questions -------
  const handleAnalyze = useCallback(async () => {
    setLoading(true)
    setLoadingMessage('Analyzing job description...')
    try {
      const jdRes = await analyzeJD(jobDescription)
      const analysis = jdRes.data.analysis
      setJdAnalysis(analysis)

      setLoadingMessage('Generating tailored questions...')
      const qRes = await generateQuestions(resumeText, analysis)
      const qs = qRes.data.questions || []
      setQuestions(qs)
      // Pre-fill answers map
      const initial = {}
      qs.forEach((q) => { initial[q.id] = '' })
      setAnswers(initial)

      setStep(3)
    } catch (err) {
      alert(err.response?.data?.detail || 'Analysis failed. Please check your API key and try again.')
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }, [jobDescription, resumeText])

  // ------- Step 3 -> Step 4: Optimize Resume -------
  const handleOptimize = useCallback(async () => {
    setLoading(true)
    setLoadingMessage('Optimizing your resume...')
    try {
      const formattedAnswers = questions.map((q) => ({
        id: q.id,
        question: q.question,
        answer: answers[q.id] || '',
      }))
      const res = await optimizeResume(resumeText, jdAnalysis, formattedAnswers)
      setOptimizedResume(res.data.optimized_resume)
      setStep(4)
    } catch (err) {
      alert(err.response?.data?.detail || 'Optimization failed. Please try again.')
    } finally {
      setLoading(false)
      setLoadingMessage('')
    }
  }, [resumeText, jdAnalysis, questions, answers])

  // ------- Save Resume -------
  const handleSave = useCallback(async () => {
    setSaveStatus('saving')
    try {
      await saveResume({
        category,
        original_text: resumeText,
        optimized_text: optimizedResume,
        job_title: jdAnalysis?.job_title || '',
        company: jdAnalysis?.company || '',
      })
      setSaveStatus('saved')
    } catch (err) {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus(null), 3000)
    }
  }, [category, resumeText, optimizedResume, jdAnalysis])

  // ------- Start Over -------
  const handleStartOver = () => {
    setStep(1)
    setInputMode('upload')
    setResumeText('')
    setJobDescription('')
    setJdAnalysis(null)
    setQuestions([])
    setAnswers({})
    setOptimizedResume('')
    setCategory('ML Engineer')
    setSaveStatus(null)
  }

  // ========================= RENDER =========================

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator currentStep={step} />

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-950/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 bg-gray-900 border border-gray-800 rounded-2xl px-10 py-8 shadow-2xl">
            <Loader2 size={36} className="text-teal-400 animate-spin" />
            <p className="text-sm text-gray-300 font-medium">{loadingMessage}</p>
          </div>
        </div>
      )}

      {/* ======================== STEP 1: Resume Input ======================== */}
      {step === 1 && (
        <section className="space-y-6 animate-in fade-in">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold mb-2">Upload Your Resume</h2>
            <p className="text-gray-400 text-sm">Start by providing your current resume</p>
          </div>

          {/* Mode Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-900 border border-gray-800 rounded-xl p-1">
              <button
                onClick={() => setInputMode('upload')}
                className={`
                  flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${inputMode === 'upload'
                    ? 'bg-teal-500/15 text-teal-400 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                <Upload size={15} />
                Upload PDF
              </button>
              <button
                onClick={() => setInputMode('paste')}
                className={`
                  flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${inputMode === 'paste'
                    ? 'bg-teal-500/15 text-teal-400 shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                  }
                `}
              >
                <ClipboardPaste size={15} />
                Paste Text
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            {inputMode === 'upload' ? (
              <FileUpload
                onTextExtracted={(text) => setResumeText(text)}
              />
            ) : (
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={12}
                className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 resize-y focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-colors"
              />
            )}

            {resumeText && (
              <div className="mt-3 flex items-center gap-2 text-xs text-teal-400">
                <CheckCircle2 size={14} />
                <span>Resume loaded ({resumeText.length.toLocaleString()} characters)</span>
              </div>
            )}
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              disabled={!resumeText.trim()}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${resumeText.trim()
                  ? 'bg-teal-500 text-gray-950 hover:bg-teal-400 shadow-lg shadow-teal-500/20'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Next
              <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}

      {/* ======================== STEP 2: Job Description ======================== */}
      {step === 2 && (
        <section className="space-y-6 animate-in fade-in">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold mb-2">Job Description</h2>
            <p className="text-gray-400 text-sm">Paste the complete job description below</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job description here..."
              rows={14}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-500 resize-y focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-colors"
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={handleAnalyze}
              disabled={!jobDescription.trim()}
              className={`
                flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                ${jobDescription.trim()
                  ? 'bg-teal-500 text-gray-950 hover:bg-teal-400 shadow-lg shadow-teal-500/20'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <Sparkles size={16} />
              Analyze
            </button>
          </div>
        </section>
      )}

      {/* ======================== STEP 3: Analysis + Questions ======================== */}
      {step === 3 && jdAnalysis && (
        <section className="space-y-6 animate-in fade-in">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold mb-2">Analysis & Questions</h2>
            <p className="text-gray-400 text-sm">Review the analysis and answer questions to personalize your optimization</p>
          </div>

          {/* JD Analysis Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
            {/* Title + Level Row */}
            <div className="flex flex-wrap items-center gap-4">
              {jdAnalysis.job_title && (
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-teal-400" />
                  <span className="text-lg font-semibold text-gray-100">{jdAnalysis.job_title}</span>
                </div>
              )}
              {jdAnalysis.experience_level && (
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/20">
                  {jdAnalysis.experience_level}
                </span>
              )}
              {jdAnalysis.company && (
                <span className="text-sm text-gray-400">at {jdAnalysis.company}</span>
              )}
            </div>

            {/* Must-have Skills */}
            {jdAnalysis.must_have_skills?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Star size={14} className="text-amber-400" />
                  Must-Have Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {jdAnalysis.must_have_skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nice-to-have Skills */}
            {jdAnalysis.nice_to_have_skills?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Star size={14} className="text-gray-500" />
                  Nice-to-Have Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {jdAnalysis.nice_to_have_skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-400 border border-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key Responsibilities */}
            {jdAnalysis.key_responsibilities?.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <ListChecks size={14} className="text-teal-400" />
                  Key Responsibilities
                </h4>
                <ul className="space-y-1.5 ml-1">
                  {jdAnalysis.key_responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="text-teal-500 mt-1.5 shrink-0 w-1 h-1 rounded-full bg-teal-500" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Questions */}
          {questions.length > 0 && (
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <HelpCircle size={18} className="text-teal-400" />
                Help Us Personalize
              </h3>
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3"
                >
                  <label className="block text-sm font-medium text-gray-200">
                    {idx + 1}. {q.question}
                  </label>
                  {q.why && (
                    <p className="text-xs text-gray-500 -mt-1">{q.why}</p>
                  )}
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    placeholder="Type your answer..."
                    rows={2}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 placeholder-gray-500 resize-y focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/20 transition-colors"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={handleOptimize}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-teal-500 text-gray-950 hover:bg-teal-400 shadow-lg shadow-teal-500/20 transition-all duration-200"
            >
              <Sparkles size={16} />
              Optimize Resume
            </button>
          </div>
        </section>
      )}

      {/* ======================== STEP 4: Results ======================== */}
      {step === 4 && (
        <section className="space-y-6 animate-in fade-in">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold mb-2">Your Optimized Resume</h2>
            <p className="text-gray-400 text-sm">Compare the original and optimized versions side by side</p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-800 bg-gray-900/80">
                <h3 className="text-sm font-semibold text-gray-400">Original</h3>
              </div>
              <pre className="p-5 text-xs text-gray-400 font-mono whitespace-pre-wrap break-words max-h-[500px] overflow-y-auto leading-relaxed">
                {resumeText}
              </pre>
            </div>

            {/* Optimized */}
            <div className="bg-gray-900 border border-teal-500/20 rounded-2xl overflow-hidden shadow-lg shadow-teal-500/5">
              <div className="px-5 py-3 border-b border-teal-500/20 bg-teal-500/5">
                <h3 className="text-sm font-semibold text-teal-400">Optimized</h3>
              </div>
              <pre className="p-5 text-xs text-gray-200 font-mono whitespace-pre-wrap break-words max-h-[500px] overflow-y-auto leading-relaxed">
                {optimizedResume}
              </pre>
            </div>
          </div>

          {/* Save section */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Save to Library</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-xs text-gray-500 mb-1.5">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full sm:w-64 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-200 focus:outline-none focus:border-teal-500/50 transition-colors appearance-none cursor-pointer"
                >
                  {['ML Engineer', 'Data Scientist', 'AI Engineer', 'Computer Vision', 'Software Engineer', 'Custom'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving' || saveStatus === 'saved'}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                  ${saveStatus === 'saved'
                    ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                    : saveStatus === 'saving'
                      ? 'bg-gray-800 text-gray-400 cursor-wait'
                      : saveStatus === 'error'
                        ? 'bg-red-500/15 text-red-400 border border-red-500/20'
                        : 'bg-teal-500 text-gray-950 hover:bg-teal-400 shadow-lg shadow-teal-500/20'
                  }
                `}
              >
                {saveStatus === 'saving' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Saving...
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <CheckCircle2 size={16} />
                    Saved!
                  </>
                ) : saveStatus === 'error' ? (
                  <>
                    <Save size={16} />
                    Save Failed - Retry
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Resume
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Start Over */}
          <div className="flex justify-center pt-2">
            <button
              onClick={handleStartOver}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 transition-colors"
            >
              <RotateCcw size={16} />
              Start Over
            </button>
          </div>
        </section>
      )}
    </div>
  )
}

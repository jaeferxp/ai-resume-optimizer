import { useState, useRef, useCallback } from 'react'
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react'
import { parsePDF } from '../lib/api'

export default function FileUpload({ onTextExtracted }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState(null)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const handleFile = useCallback(async (file) => {
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file.')
      return
    }

    setError(null)
    setIsLoading(true)
    setFileName(file.name)

    try {
      const response = await parsePDF(file)
      const text = response.data.text
      if (!text || text.trim().length === 0) {
        setError('Could not extract text from this PDF. Try pasting your resume instead.')
        setFileName(null)
      } else {
        onTextExtracted(text)
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || 'Failed to parse PDF. Please try again or paste your resume text.'
      )
      setFileName(null)
    } finally {
      setIsLoading(false)
    }
  }, [onTextExtracted])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    handleFile(file)
  }, [handleFile])

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (e) => {
    const file = e.target.files?.[0]
    handleFile(file)
    // Reset input so same file can be re-selected
    e.target.value = ''
  }

  return (
    <div className="w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative flex flex-col items-center justify-center w-full min-h-[220px]
          border-2 border-dashed rounded-2xl cursor-pointer
          transition-all duration-300 ease-in-out
          ${isDragging
            ? 'border-teal-400 bg-teal-500/10 shadow-lg shadow-teal-500/10'
            : fileName && !isLoading && !error
              ? 'border-teal-500/40 bg-teal-500/5'
              : 'border-gray-700 bg-gray-900/50 hover:border-gray-500 hover:bg-gray-900/80'
          }
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleInputChange}
          className="hidden"
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={40} className="text-teal-400 animate-spin" />
            <p className="text-sm text-gray-300">Parsing PDF...</p>
            <p className="text-xs text-gray-500">{fileName}</p>
          </div>
        ) : fileName && !error ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-teal-500/15 flex items-center justify-center">
              <FileText size={28} className="text-teal-400" />
            </div>
            <p className="text-sm font-medium text-gray-200">{fileName}</p>
            <p className="text-xs text-teal-400">PDF parsed successfully</p>
            <p className="text-xs text-gray-500 mt-1">Click or drop to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className={`
              w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300
              ${isDragging ? 'bg-teal-500/20' : 'bg-gray-800'}
            `}>
              <Upload size={28} className={isDragging ? 'text-teal-400' : 'text-gray-400'} />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-300">
                Drop your PDF here or <span className="text-teal-400 font-medium">click to browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Supports .pdf files only</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}
    </div>
  )
}

import { Check } from 'lucide-react'

const steps = [
  { number: 1, label: 'Resume' },
  { number: 2, label: 'Job Description' },
  { number: 3, label: 'Analysis' },
  { number: 4, label: 'Results' },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center justify-center w-full mb-10">
      {steps.map((step, idx) => {
        const isCompleted = currentStep > step.number
        const isCurrent = currentStep === step.number
        const isUpcoming = currentStep < step.number

        return (
          <div key={step.number} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-300 ease-in-out
                  ${isCompleted
                    ? 'bg-teal-500 text-gray-950 shadow-lg shadow-teal-500/25'
                    : isCurrent
                      ? 'bg-teal-500 text-gray-950 shadow-lg shadow-teal-500/30 ring-4 ring-teal-500/20'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }
                `}
              >
                {isCompleted ? <Check size={18} strokeWidth={3} /> : step.number}
              </div>
              <span
                className={`
                  mt-2 text-xs font-medium transition-colors duration-300
                  ${isCurrent ? 'text-teal-400' : isCompleted ? 'text-gray-300' : 'text-gray-500'}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className={`
                  w-20 sm:w-28 md:w-36 h-0.5 mx-2 mt-[-1.25rem] rounded-full
                  transition-colors duration-500 ease-in-out
                  ${currentStep > step.number + 1
                    ? 'bg-teal-500'
                    : currentStep > step.number
                      ? 'bg-gradient-to-r from-teal-500 to-gray-700'
                      : 'bg-gray-700'
                  }
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

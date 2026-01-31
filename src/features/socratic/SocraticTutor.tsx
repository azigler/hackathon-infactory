// Socratic Tutor - AI that only asks questions, never gives answers
// This is a key differentiator: we help students think, not write for them

import { useState, useEffect, useCallback, useRef } from 'react'
import type { Highlight } from '@/types'

// Climate change specific Socratic questions
const CLIMATE_CHANGE_QUESTIONS = {
  // Questions about sources and evidence
  sourceAnalysis: [
    "You've cited this source about climate denial. What counterargument might someone raise?",
    "Your essay mentions the 1.5 degree goal. Why does this specific number matter?",
    "You've highlighted conflicting perspectives. How do you reconcile them?",
    "Which of your sources provides the strongest evidence for your argument? What makes it compelling?",
    "What assumptions does this source make that might be worth examining?",
    "If you were a skeptic reading this source, what questions would you ask?",
  ],
  // Questions about argument structure
  argumentStructure: [
    "What is the strongest objection someone could make to your main argument?",
    "You've made a claim here - what evidence would make it even more convincing?",
    "How would your argument change if you had to convince someone who disagrees?",
    "What's the logical connection between this paragraph and your thesis?",
    "Are there any gaps in your reasoning that a careful reader might notice?",
  ],
  // Questions about deeper thinking
  deeperThinking: [
    "Who benefits from the perspective presented in this article? Who might be harmed?",
    "What historical context might help readers understand this climate debate?",
    "How might someone from a different country or background view this issue?",
    "What questions does your essay leave unanswered?",
    "If you wrote this essay again in 10 years, what might you add or change?",
    "What's the most uncomfortable implication of the evidence you've gathered?",
  ],
  // Questions triggered by inactivity
  stuck: [
    "What part of your argument feels most uncertain to you right now?",
    "If you had to summarize your essay in one sentence, what would it be?",
    "What would a reader need to know before reading your next paragraph?",
    "What's the most important point you haven't written yet?",
    "Looking at your highlights, which one hasn't made it into your essay yet?",
  ],
  // Questions based on word count milestones
  milestones: [
    "Now that you've started, what direction is your argument taking?",
    "You're building momentum. What's the strongest point you want to make?",
    "You've got a solid foundation. What counterargument should you address?",
    "Your essay is taking shape. How will you bring it to a strong conclusion?",
  ],
}

// Highlight-specific question templates
const HIGHLIGHT_QUESTION_TEMPLATES = [
  "You highlighted: \"{highlight}\". How does this connect to your main argument?",
  "This highlight suggests an important point. Have you explored why this matters?",
  "You saved this quote. What would someone who disagrees with it say?",
  "This passage caught your attention. What deeper question does it raise?",
]

export type TriggerReason =
  | 'word_count'
  | 'pause'
  | 'highlight'
  | 'manual'
  | 'milestone'

export interface SocraticTutorProps {
  isVisible: boolean
  onDismiss: () => void
  onRequestAnother: () => void
  currentQuestion: string
  triggerReason?: TriggerReason
}

// Main exported component for display
export function SocraticTutor({
  isVisible,
  onDismiss,
  onRequestAnother,
  currentQuestion,
}: SocraticTutorProps) {
  if (!isVisible) return null

  return (
    <div className="absolute bottom-8 right-8 w-96 z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-white rounded-xl shadow-xl border border-atlantic-pearl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-atlantic-gold/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xl" role="img" aria-label="thinking">?</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-semibold text-atlantic-charcoal mb-2">
              Something to consider...
            </h4>
            <p className="text-atlantic-slate text-sm leading-relaxed">
              {currentQuestion}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <button
                onClick={onDismiss}
                className="text-atlantic-gold text-sm font-medium hover:text-atlantic-gold/80 transition-colors"
              >
                I'll think about that
              </button>
              <span className="text-atlantic-pearl">|</span>
              <button
                onClick={onRequestAnother}
                className="text-atlantic-stone text-sm hover:text-atlantic-slate transition-colors"
              >
                Ask me something else
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Trigger button component when tutor is not visible
export function SocraticTriggerButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="absolute bottom-8 right-8">
      <button
        onClick={onClick}
        className="bg-atlantic-gold/10 text-atlantic-gold px-4 py-2 rounded-full text-sm font-medium hover:bg-atlantic-gold/20 transition-colors flex items-center gap-2"
      >
        <span className="w-5 h-5 rounded-full bg-atlantic-gold/20 flex items-center justify-center text-xs">?</span>
        Get a thinking prompt
      </button>
    </div>
  )
}

// Hook to manage Socratic tutor state and logic
export function useSocraticTutor(
  wordCount: number,
  highlights: Highlight[],
  essayContent: string
) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [triggerReason, setTriggerReason] = useState<TriggerReason>('manual')
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set())
  const [lastWordCount, setLastWordCount] = useState(0)
  const [hasShownInitial, setHasShownInitial] = useState(false)

  // Refs for pause detection
  const lastActivityTime = useRef(Date.now())
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hasShownPausePrompt = useRef(false)

  // Get a random question from a category, avoiding repeats
  const getRandomQuestion = useCallback((category: keyof typeof CLIMATE_CHANGE_QUESTIONS): string => {
    const questions = CLIMATE_CHANGE_QUESTIONS[category]
    const availableQuestions = questions.filter(q => !usedQuestions.has(q))

    // If all questions used, reset and start over
    if (availableQuestions.length === 0) {
      setUsedQuestions(new Set())
      return questions[Math.floor(Math.random() * questions.length)]
    }

    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  }, [usedQuestions])

  // Get a highlight-based question
  const getHighlightQuestion = useCallback((): string | null => {
    if (highlights.length === 0) return null

    const randomHighlight = highlights[Math.floor(Math.random() * highlights.length)]
    const template = HIGHLIGHT_QUESTION_TEMPLATES[
      Math.floor(Math.random() * HIGHLIGHT_QUESTION_TEMPLATES.length)
    ]

    // Truncate highlight text if too long
    const highlightText = randomHighlight.text.length > 60
      ? randomHighlight.text.slice(0, 60) + '...'
      : randomHighlight.text

    return template.replace('{highlight}', highlightText)
  }, [highlights])

  // Get milestone-appropriate question
  const getMilestoneQuestion = useCallback((): string => {
    const milestones = CLIMATE_CHANGE_QUESTIONS.milestones
    if (wordCount < 150) return milestones[0]
    if (wordCount < 250) return milestones[1]
    if (wordCount < 400) return milestones[2]
    return milestones[3]
  }, [wordCount])

  // Show a prompt with a specific category
  const showPrompt = useCallback((reason: TriggerReason, category?: keyof typeof CLIMATE_CHANGE_QUESTIONS) => {
    let question: string

    if (reason === 'highlight' && highlights.length > 0) {
      question = getHighlightQuestion() || getRandomQuestion('sourceAnalysis')
    } else if (reason === 'milestone') {
      question = getMilestoneQuestion()
    } else if (reason === 'pause') {
      question = getRandomQuestion('stuck')
    } else if (category) {
      question = getRandomQuestion(category)
    } else {
      // Default: mix of categories
      const categories: (keyof typeof CLIMATE_CHANGE_QUESTIONS)[] = [
        'sourceAnalysis', 'argumentStructure', 'deeperThinking'
      ]
      const randomCategory = categories[Math.floor(Math.random() * categories.length)]
      question = getRandomQuestion(randomCategory)
    }

    setCurrentQuestion(question)
    setUsedQuestions(prev => new Set([...prev, question]))
    setTriggerReason(reason)
    setIsVisible(true)
  }, [highlights.length, getHighlightQuestion, getMilestoneQuestion, getRandomQuestion])

  // Dismiss the tutor
  const dismiss = useCallback(() => {
    setIsVisible(false)
    hasShownPausePrompt.current = false
  }, [])

  // Request another question
  const requestAnother = useCallback(() => {
    showPrompt('manual')
  }, [showPrompt])

  // Manual trigger
  const triggerManually = useCallback(() => {
    showPrompt('manual')
  }, [showPrompt])

  // Track activity for pause detection
  const recordActivity = useCallback(() => {
    lastActivityTime.current = Date.now()
    hasShownPausePrompt.current = false
  }, [])

  // Effect: Word count trigger (100+ words for first prompt)
  useEffect(() => {
    if (!hasShownInitial && wordCount >= 100 && !isVisible) {
      setHasShownInitial(true)
      showPrompt('word_count', 'argumentStructure')
    }
  }, [wordCount, hasShownInitial, isVisible, showPrompt])

  // Effect: Milestone triggers (every 150 words after initial)
  useEffect(() => {
    const milestone = Math.floor(wordCount / 150) * 150
    if (
      hasShownInitial &&
      milestone > lastWordCount &&
      milestone >= 150 &&
      !isVisible
    ) {
      setLastWordCount(milestone)
      showPrompt('milestone')
    }
  }, [wordCount, lastWordCount, hasShownInitial, isVisible, showPrompt])

  // Effect: Pause detection (30+ seconds of inactivity)
  useEffect(() => {
    // Clear any existing timer
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current)
    }

    // Only set timer if:
    // - Student has started writing (100+ words)
    // - Tutor is not currently visible
    // - Haven't already shown a pause prompt since last activity
    if (wordCount >= 100 && !isVisible && !hasShownPausePrompt.current) {
      pauseTimerRef.current = setTimeout(() => {
        if (!isVisible && !hasShownPausePrompt.current) {
          hasShownPausePrompt.current = true
          showPrompt('pause')
        }
      }, 30000) // 30 seconds
    }

    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current)
      }
    }
  }, [essayContent, wordCount, isVisible, showPrompt])

  return {
    isVisible,
    currentQuestion,
    triggerReason,
    dismiss,
    requestAnother,
    triggerManually,
    recordActivity,
    showPrompt,
  }
}

// Export questions for testing or external use
export const SOCRATIC_QUESTIONS = CLIMATE_CHANGE_QUESTIONS

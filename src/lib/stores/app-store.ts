// Global app state using Zustand
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Classroom, Highlight, Note } from '@/types'
import { DAY_1_STATE, DAY_30_STATE } from '@/data/demo-state'

// Version for localStorage schema - increment when breaking changes occur
const STORE_VERSION = 2

type DemoMode = 'day1' | 'day30'
type ViewRole = 'teacher' | 'student'

// ============================================================================
// Student Activity Tracking Types (bd-2w0)
// ============================================================================

// Tracks when a student views/reads an article
export interface ArticleViewRecord {
  articleId: string
  openedAt: string // ISO timestamp when article was opened
  closedAt?: string // ISO timestamp when article was closed (undefined if still open)
}

// ============================================================================
// Essay Submission Types (bd-ywe)
// ============================================================================

// Represents a submitted essay from a student
export interface SubmittedEssay {
  id: string
  classroomId: string
  studentId: string
  studentName: string
  htmlContent: string // Rich text HTML content
  submittedAt: string // ISO timestamp
}

// ============================================================================
// Extended Classroom Types (bd-1pn)
// ============================================================================

// Citation format types
export type CitationStyle = 'mla' | 'apa' | 'chicago'

// Extended classroom type with share code and custom content for teacher flow
export interface ClassroomWithShareCode extends Classroom {
  shareCode: string
  customArticles?: string[] // Article IDs added by teacher
  citationStyle?: CitationStyle // Required citation format for this classroom
}

// Joined classroom record for student history
export interface JoinedClassroom {
  classroom: ClassroomWithShareCode
  joinedAt: string
}

// Helper to generate a share code
function generateShareCode(topicId: string): string {
  const topicPrefix = topicId.split('-')[0].toUpperCase().slice(0, 6)
  const year = new Date().getFullYear()
  const randomSuffix = Math.random().toString(36).substring(2, 4).toUpperCase()
  return `${topicPrefix}-${year}${randomSuffix}`
}

// Demo classroom - pre-seeded for testing with code "CLIMATE-2026"
const DEMO_CLASSROOM: ClassroomWithShareCode = {
  id: 'climate-change',
  topicId: 'climate-change',
  teacherId: 'demo-teacher',
  title: 'Climate Change: Science and Society',
  assignmentPrompt: 'Analyze how climate change coverage in The Atlantic has evolved. What perspectives are represented? What solutions are proposed?',
  shareCode: 'CLIMATE-2026',
  createdAt: new Date().toISOString(),
  citationStyle: 'mla',
}

interface AppState {
  // Demo state
  demoMode: DemoMode
  viewRole: ViewRole
  setDemoMode: (mode: DemoMode) => void
  setViewRole: (role: ViewRole) => void

  // Auth state
  user: User | null
  setUser: (user: User | null) => void

  // Current classroom context
  currentClassroom: Classroom | null
  setCurrentClassroom: (classroom: Classroom | null) => void

  // Created classrooms (teacher flow)
  createdClassrooms: ClassroomWithShareCode[]
  createClassroom: (config: {
    topicId: string
    title: string
    assignmentPrompt: string
    dateRange?: { start: string; end: string }
    excludedKeywords?: string[]
    citationStyle?: CitationStyle
    customArticles?: string[]
  }) => ClassroomWithShareCode
  getClassroomByShareCode: (shareCode: string) => ClassroomWithShareCode | undefined
  getClassroomById: (id: string) => ClassroomWithShareCode | undefined

  // Student joined classrooms
  joinedClassrooms: JoinedClassroom[]
  joinClassroom: (classroom: ClassroomWithShareCode) => void
  hasJoinedClassroom: (classroomId: string) => boolean

  // Student work state
  highlights: Highlight[]
  addHighlight: (highlight: Highlight) => void
  removeHighlight: (id: string) => void
  setHighlights: (highlights: Highlight[]) => void

  notes: Note[]
  addNote: (note: Note) => void
  updateNote: (id: string, content: string) => void
  removeNote: (id: string) => void
  setNotes: (notes: Note[]) => void

  essay: string
  setEssay: (content: string) => void

  // ============================================================================
  // Teacher Research State (bd-2tz)
  // ============================================================================
  teacherHighlights: Highlight[]
  addTeacherHighlight: (highlight: Highlight) => void
  removeTeacherHighlight: (id: string) => void
  setTeacherHighlights: (highlights: Highlight[]) => void

  teacherNotes: Note[]
  addTeacherNote: (note: Note) => void
  updateTeacherNote: (id: string, content: string) => void
  removeTeacherNote: (id: string) => void
  setTeacherNotes: (notes: Note[]) => void

  // Load demo data based on mode
  loadDemoData: () => void
  clearDemoData: () => void

  // ============================================================================
  // Student Activity Tracking (bd-2w0)
  // ============================================================================
  articleViewHistory: ArticleViewRecord[]
  recordArticleView: (articleId: string) => void
  recordArticleClose: (articleId: string) => void
  getArticleViewHistory: () => ArticleViewRecord[]
  getTotalReadingTime: () => number // Returns total reading time in milliseconds

  // ============================================================================
  // Essay Submission Storage (bd-ywe)
  // ============================================================================
  submittedEssays: SubmittedEssay[]
  submitEssay: (classroomId: string, htmlContent: string) => SubmittedEssay
  getSubmittedEssays: (classroomId?: string) => SubmittedEssay[]

  // ============================================================================
  // Classroom Article Management (bd-1pn)
  // ============================================================================
  addArticleToClassroom: (classroomId: string, articleId: string) => void
  removeArticleFromClassroom: (classroomId: string, articleId: string) => void
  updateClassroomAssignment: (classroomId: string, assignmentPrompt: string) => void

  // ============================================================================
  // Student Citations (bd-cite)
  // ============================================================================
  studentCitations: Record<string, string> // articleId -> citation text
  setArticleCitation: (articleId: string, citation: string) => void
  getArticleCitations: () => Record<string, string>
  clearCitations: () => void
}

// Helper to ensure DEMO_CLASSROOM is always present in createdClassrooms after hydration
function ensureDemoClassroom(classrooms: ClassroomWithShareCode[]): ClassroomWithShareCode[] {
  const hasDemoClassroom = classrooms.some((c) => c.id === DEMO_CLASSROOM.id)
  if (!hasDemoClassroom) {
    return [DEMO_CLASSROOM, ...classrooms]
  }
  return classrooms
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
  // Demo state
  demoMode: 'day1',
  viewRole: 'teacher',
  setDemoMode: (mode) => {
    set({ demoMode: mode })
    get().loadDemoData()
  },
  setViewRole: (role) => set({ viewRole: role }),

  // Auth
  user: null,
  setUser: (user) => set({ user }),

  // Classroom
  currentClassroom: null,
  setCurrentClassroom: (classroom) => set({ currentClassroom: classroom }),

  // Created classrooms (teacher flow) - includes demo classroom
  createdClassrooms: [DEMO_CLASSROOM],
  createClassroom: (config) => {
    const shareCode = generateShareCode(config.topicId)
    const classroom: ClassroomWithShareCode = {
      id: `classroom-${Date.now()}`,
      topicId: config.topicId,
      teacherId: get().user?.id || 'demo-teacher',
      title: config.title,
      assignmentPrompt: config.assignmentPrompt,
      excludedKeywords: config.excludedKeywords,
      createdAt: new Date().toISOString(),
      shareCode,
      citationStyle: config.citationStyle || 'mla',
      customArticles: config.customArticles,
    }
    set((state) => ({
      createdClassrooms: [...state.createdClassrooms, classroom],
    }))
    return classroom
  },
  getClassroomByShareCode: (shareCode) => {
    return get().createdClassrooms.find((c) => c.shareCode === shareCode)
  },
  getClassroomById: (id) => {
    // First check created classrooms
    const created = get().createdClassrooms.find((c) => c.id === id)
    if (created) return created
    // Also check joined classrooms (for students)
    const joined = get().joinedClassrooms.find((j) => j.classroom.id === id)
    return joined?.classroom
  },

  // Student joined classrooms
  joinedClassrooms: [],
  joinClassroom: (classroom) => {
    const alreadyJoined = get().joinedClassrooms.some(
      (j) => j.classroom.id === classroom.id
    )
    if (!alreadyJoined) {
      set((state) => ({
        joinedClassrooms: [
          ...state.joinedClassrooms,
          { classroom, joinedAt: new Date().toISOString() },
        ],
      }))
    }
    // Set as current classroom
    set({ currentClassroom: classroom })
  },
  hasJoinedClassroom: (classroomId) => {
    return get().joinedClassrooms.some((j) => j.classroom.id === classroomId)
  },

  // Highlights
  highlights: [],
  addHighlight: (highlight) =>
    set((state) => ({ highlights: [...state.highlights, highlight] })),
  removeHighlight: (id) =>
    set((state) => ({ highlights: state.highlights.filter((h) => h.id !== id) })),
  setHighlights: (highlights) => set({ highlights }),

  // Notes
  notes: [],
  addNote: (note) =>
    set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (id, content) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, content } : n)),
    })),
  removeNote: (id) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
  setNotes: (notes) => set({ notes }),

  // Essay
  essay: '',
  setEssay: (content) => set({ essay: content }),

  // Teacher highlights (bd-2tz)
  teacherHighlights: [],
  addTeacherHighlight: (highlight) =>
    set((state) => ({ teacherHighlights: [...state.teacherHighlights, highlight] })),
  removeTeacherHighlight: (id) =>
    set((state) => ({ teacherHighlights: state.teacherHighlights.filter((h) => h.id !== id) })),
  setTeacherHighlights: (teacherHighlights) => set({ teacherHighlights }),

  // Teacher notes (bd-2tz)
  teacherNotes: [],
  addTeacherNote: (note) =>
    set((state) => ({ teacherNotes: [...state.teacherNotes, note] })),
  updateTeacherNote: (id, content) =>
    set((state) => ({
      teacherNotes: state.teacherNotes.map((n) => (n.id === id ? { ...n, content } : n)),
    })),
  removeTeacherNote: (id) =>
    set((state) => ({ teacherNotes: state.teacherNotes.filter((n) => n.id !== id) })),
  setTeacherNotes: (teacherNotes) => set({ teacherNotes }),

  // Demo data loading
  loadDemoData: () => {
    const { demoMode } = get()
    if (demoMode === 'day30') {
      set({
        highlights: DAY_30_STATE.highlights,
        notes: DAY_30_STATE.notes,
        essay: DAY_30_STATE.essay,
        submittedEssays: DAY_30_STATE.submittedEssays || [],
      })
    } else {
      set({
        highlights: DAY_1_STATE.highlights,
        notes: DAY_1_STATE.notes,
        essay: DAY_1_STATE.essay,
        submittedEssays: [],
      })
    }
  },
  clearDemoData: () => {
    set({
      highlights: [],
      notes: [],
      essay: '',
    })
  },

  // ============================================================================
  // Student Activity Tracking (bd-2w0)
  // ============================================================================
  articleViewHistory: [],

  recordArticleView: (articleId) => {
    const now = new Date().toISOString()
    set((state) => {
      // Check if there's already an open view for this article
      const existingOpenView = state.articleViewHistory.find(
        (v) => v.articleId === articleId && !v.closedAt
      )
      if (existingOpenView) {
        // Article already open, don't create duplicate
        return state
      }
      return {
        articleViewHistory: [
          ...state.articleViewHistory,
          { articleId, openedAt: now },
        ],
      }
    })
  },

  recordArticleClose: (articleId) => {
    const now = new Date().toISOString()
    set((state) => ({
      articleViewHistory: state.articleViewHistory.map((view) => {
        // Find the most recent open view for this article and close it
        if (view.articleId === articleId && !view.closedAt) {
          return { ...view, closedAt: now }
        }
        return view
      }),
    }))
  },

  getArticleViewHistory: () => {
    return get().articleViewHistory
  },

  getTotalReadingTime: () => {
    const history = get().articleViewHistory
    const now = new Date().getTime()

    return history.reduce((total, view) => {
      const openedAt = new Date(view.openedAt).getTime()
      const closedAt = view.closedAt
        ? new Date(view.closedAt).getTime()
        : now // If still open, use current time
      return total + (closedAt - openedAt)
    }, 0)
  },

  // ============================================================================
  // Essay Submission Storage (bd-ywe)
  // ============================================================================
  submittedEssays: [],

  submitEssay: (classroomId, htmlContent) => {
    const user = get().user
    const submittedEssay: SubmittedEssay = {
      id: `essay-${Date.now()}`,
      classroomId,
      studentId: user?.id || 'anonymous',
      studentName: user?.name || 'Anonymous Student',
      htmlContent,
      submittedAt: new Date().toISOString(),
    }
    set((state) => ({
      submittedEssays: [...state.submittedEssays, submittedEssay],
    }))
    return submittedEssay
  },

  getSubmittedEssays: (classroomId) => {
    const essays = get().submittedEssays
    if (classroomId) {
      return essays.filter((e) => e.classroomId === classroomId)
    }
    return essays
  },

  // ============================================================================
  // Classroom Article Management (bd-1pn)
  // ============================================================================
  addArticleToClassroom: (classroomId, articleId) => {
    set((state) => ({
      createdClassrooms: state.createdClassrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          const existingArticles = classroom.customArticles || []
          // Don't add duplicates
          if (existingArticles.includes(articleId)) {
            return classroom
          }
          return {
            ...classroom,
            customArticles: [...existingArticles, articleId],
          }
        }
        return classroom
      }),
    }))
  },

  removeArticleFromClassroom: (classroomId, articleId) => {
    set((state) => ({
      createdClassrooms: state.createdClassrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return {
            ...classroom,
            customArticles: (classroom.customArticles || []).filter(
              (id) => id !== articleId
            ),
          }
        }
        return classroom
      }),
    }))
  },

  updateClassroomAssignment: (classroomId, assignmentPrompt) => {
    set((state) => ({
      createdClassrooms: state.createdClassrooms.map((classroom) => {
        if (classroom.id === classroomId) {
          return { ...classroom, assignmentPrompt }
        }
        return classroom
      }),
    }))
  },

  // ============================================================================
  // Student Citations (bd-cite)
  // ============================================================================
  studentCitations: {},

  setArticleCitation: (articleId, citation) => {
    set((state) => ({
      studentCitations: { ...state.studentCitations, [articleId]: citation },
    }))
  },

  getArticleCitations: () => {
    return get().studentCitations
  },

  clearCitations: () => {
    set({ studentCitations: {} })
  },
    }),
    {
      name: 'the-beat-store',
      version: STORE_VERSION,
      migrate: (persistedState, version) => {
        // If version mismatch, return empty object to use fresh initial state
        if (version !== STORE_VERSION) {
          return {}
        }
        return persistedState as AppState
      },
      partialize: (state) => ({
        // Only persist these fields
        demoMode: state.demoMode,
        viewRole: state.viewRole,
        highlights: state.highlights,
        notes: state.notes,
        essay: state.essay,
        joinedClassrooms: state.joinedClassrooms,
        createdClassrooms: state.createdClassrooms,
        submittedEssays: state.submittedEssays,
        studentCitations: state.studentCitations,
      }),
      onRehydrateStorage: () => (state) => {
        // After hydration, ensure DEMO_CLASSROOM is always present
        if (state) {
          state.createdClassrooms = ensureDemoClassroom(state.createdClassrooms)
        }
      },
    }
  )
)

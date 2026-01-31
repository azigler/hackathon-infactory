// Core domain types for The Beat

// User types
export type UserRole = 'teacher' | 'student'

export interface User {
  id: string
  name: string
  role: UserRole
}

// Article/Source types from Infactory API
export interface Article {
  id: string
  title: string
  author: string
  publishedDate: string
  content: string
  excerpt?: string
  url?: string
  tags?: string[]
  topic?: string
  section?: string
}

// Classroom types
export interface NewsroomTopic {
  id: string
  title: string
  description: string
  dateRange: {
    start: string
    end: string
  }
  articleCount: number
  suggestedAssignments: string[]
  curatedBy: 'atlantic' | 'teacher'
}

export interface Classroom {
  id: string
  topicId: string
  teacherId: string
  title: string
  assignmentPrompt: string
  excludedDateRanges?: { start: string; end: string }[]
  excludedKeywords?: string[]
  createdAt: string
}

// Student work types
export interface Highlight {
  id: string
  articleId: string
  articleTitle?: string
  text: string
  startOffset?: number
  endOffset?: number
  color?: string
  createdAt?: string
}

export interface Note {
  id: string
  articleId?: string
  highlightId?: string
  content: string
  createdAt?: string
}

export interface StudentWork {
  studentId: string
  classroomId: string
  highlights: Highlight[]
  notes: Note[]
  essay: string
  submittedAt?: string
}

// Socratic AI types
export interface SocraticPrompt {
  id: string
  question: string
  context: 'reading' | 'writing' | 'stuck'
  triggeredBy?: string // articleId or highlightId
}

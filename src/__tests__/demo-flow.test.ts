import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../lib/stores/app-store'

describe('Demo Flow - Store State', () => {
  beforeEach(() => {
    // Reset store to initial state
    useAppStore.setState({
      demoMode: 'day1',
      viewRole: 'teacher',
      highlights: [],
      notes: [],
      essay: '',
      joinedClassrooms: [],
    })
  })

  describe('Demo Mode Toggle', () => {
    it('starts in day1 mode', () => {
      const { demoMode } = useAppStore.getState()
      expect(demoMode).toBe('day1')
    })

    it('can toggle to day30 mode', () => {
      const { setDemoMode } = useAppStore.getState()
      setDemoMode('day30')
      expect(useAppStore.getState().demoMode).toBe('day30')
    })

    it('loads day30 demo data when toggled to day30', () => {
      const { setDemoMode } = useAppStore.getState()
      setDemoMode('day30')

      const { highlights, notes, essay } = useAppStore.getState()
      expect(highlights.length).toBeGreaterThan(0)
      expect(notes.length).toBeGreaterThan(0)
      expect(essay.length).toBeGreaterThan(0)
    })

    it('clears data when toggled back to day1', () => {
      const { setDemoMode } = useAppStore.getState()

      // First go to day30
      setDemoMode('day30')
      expect(useAppStore.getState().highlights.length).toBeGreaterThan(0)

      // Then back to day1
      setDemoMode('day1')
      const { highlights, notes, essay } = useAppStore.getState()
      expect(highlights.length).toBe(0)
      expect(notes.length).toBe(0)
      expect(essay.length).toBe(0)
    })
  })

  describe('View Role Toggle', () => {
    it('starts in teacher role', () => {
      const { viewRole } = useAppStore.getState()
      expect(viewRole).toBe('teacher')
    })

    it('can toggle to student role', () => {
      const { setViewRole } = useAppStore.getState()
      setViewRole('student')
      expect(useAppStore.getState().viewRole).toBe('student')
    })
  })

  describe('Classroom Management', () => {
    it('has demo classroom pre-seeded with code CLIMATE-2026', () => {
      const { getClassroomByShareCode } = useAppStore.getState()
      const demoClassroom = getClassroomByShareCode('CLIMATE-2026')

      expect(demoClassroom).toBeDefined()
      expect(demoClassroom?.title).toBe('Climate Change: Science and Society')
      expect(demoClassroom?.topicId).toBe('climate-change')
    })

    it('can create a new classroom with generated share code', () => {
      const { createClassroom, createdClassrooms } = useAppStore.getState()
      const initialCount = createdClassrooms.length

      const newClassroom = createClassroom({
        topicId: 'artificial-intelligence',
        title: 'AI Ethics',
        assignmentPrompt: 'Write about AI',
      })

      expect(newClassroom.shareCode).toBeTruthy()
      expect(newClassroom.topicId).toBe('artificial-intelligence')
      expect(useAppStore.getState().createdClassrooms.length).toBe(initialCount + 1)
    })

    it('can look up classroom by ID', () => {
      const { getClassroomById, getClassroomByShareCode } = useAppStore.getState()
      const demoClassroom = getClassroomByShareCode('CLIMATE-2026')

      if (demoClassroom) {
        const foundById = getClassroomById(demoClassroom.id)
        expect(foundById).toEqual(demoClassroom)
      }
    })
  })

  describe('Student Classroom Joining', () => {
    it('can join a classroom', () => {
      const { getClassroomByShareCode, joinClassroom } = useAppStore.getState()
      const demoClassroom = getClassroomByShareCode('CLIMATE-2026')

      if (demoClassroom) {
        joinClassroom(demoClassroom)
        expect(useAppStore.getState().hasJoinedClassroom(demoClassroom.id)).toBe(true)
      }
    })

    it('tracks joined classrooms in history', () => {
      const { getClassroomByShareCode, joinClassroom, joinedClassrooms } = useAppStore.getState()
      const demoClassroom = getClassroomByShareCode('CLIMATE-2026')

      if (demoClassroom) {
        joinClassroom(demoClassroom)
        const updated = useAppStore.getState().joinedClassrooms
        expect(updated.length).toBe(joinedClassrooms.length + 1)
        expect(updated[0].classroom.shareCode).toBe('CLIMATE-2026')
      }
    })
  })

  describe('Research Data Management', () => {
    it('can add highlights', () => {
      const { addHighlight } = useAppStore.getState()

      addHighlight({
        id: 'h1',
        text: 'Test highlight',
        articleId: 'article-1',
        articleTitle: 'Test Article',
      })

      expect(useAppStore.getState().highlights.length).toBe(1)
      expect(useAppStore.getState().highlights[0].text).toBe('Test highlight')
    })

    it('can add notes', () => {
      const { addNote } = useAppStore.getState()

      addNote({
        id: 'n1',
        content: 'Test note',
      })

      expect(useAppStore.getState().notes.length).toBe(1)
      expect(useAppStore.getState().notes[0].content).toBe('Test note')
    })

    it('can update essay content', () => {
      const { setEssay } = useAppStore.getState()

      setEssay('My essay about climate change...')
      expect(useAppStore.getState().essay).toBe('My essay about climate change...')
    })
  })
})

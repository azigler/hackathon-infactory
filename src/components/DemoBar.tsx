import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore } from '../lib/stores/app-store'

// Check if demo controls should be visible
// For hackathon demo: always visible
// To hide in production later, check import.meta.env.DEV or ?demo=true param
function useDemoControlsVisible() {
  // Always show for hackathon demo
  return true
}

// Extract classroom ID from current path
function extractClassroomId(pathname: string): string | null {
  // Match /teacher/review/:classroomId or /student/classroom/:classroomId
  const teacherMatch = pathname.match(/\/teacher\/review\/([^/]+)/)
  const studentMatch = pathname.match(/\/student\/classroom\/([^/]+)/)
  return teacherMatch?.[1] || studentMatch?.[1] || null
}

export function DemoBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { demoMode, viewRole, setDemoMode, setViewRole } = useAppStore()
  const isVisible = useDemoControlsVisible()

  const isTeacherRoute = location.pathname.startsWith('/teacher')
  const isStudentRoute = location.pathname.startsWith('/student')
  const isAtlanticRoute = location.pathname.startsWith('/atlantic')

  // Track previous non-Atlantic route for toggle behavior
  const [previousRoute, setPreviousRoute] = useState<string | null>(null)
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    // When navigating TO atlantic, save the previous route
    if (isAtlanticRoute && !prevPathRef.current.startsWith('/atlantic')) {
      setPreviousRoute(prevPathRef.current)
    }
    prevPathRef.current = location.pathname
  }, [location.pathname, isAtlanticRoute])

  // Handle Atlantic button click - toggle between Atlantic and previous page
  const handleAtlanticToggle = () => {
    if (isAtlanticRoute && previousRoute) {
      navigate(previousRoute)
    } else {
      navigate('/atlantic')
    }
  }

  const handleRoleChange = (role: 'teacher' | 'student') => {
    setViewRole(role)

    // Try to preserve classroom context when switching roles
    const classroomId = extractClassroomId(location.pathname)

    if (role === 'teacher' && !isTeacherRoute) {
      // Switching to teacher - go to review page if we have a classroom, otherwise dashboard
      if (classroomId) {
        navigate(`/teacher/review/${classroomId}`)
      } else {
        navigate('/teacher')
      }
    } else if (role === 'student' && !isStudentRoute) {
      // Switching to student - go to research workspace if we have a classroom, otherwise dashboard
      if (classroomId) {
        navigate(`/student/classroom/${classroomId}`)
      } else {
        navigate('/student')
      }
    }
  }

  // Don't render if not in demo mode
  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-atlantic-charcoal/95 backdrop-blur-sm border-b border-atlantic-gold/30">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Demo Label */}
        <div className="flex items-center gap-2">
          <span className="text-atlantic-gold text-xs font-bold uppercase tracking-wider">
            Demo Controls
          </span>
          <span className="text-atlantic-silver text-xs">
            The Beat - Atlantic Classroom
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {/* Role Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-atlantic-silver text-xs uppercase tracking-wider">View:</span>
            <div className="flex rounded overflow-hidden border border-atlantic-slate">
              <button
                onClick={() => handleRoleChange('teacher')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  viewRole === 'teacher'
                    ? 'bg-atlantic-gold text-white'
                    : 'bg-atlantic-slate/50 text-atlantic-silver hover:bg-atlantic-slate'
                }`}
              >
                Teacher
              </button>
              <button
                onClick={() => handleRoleChange('student')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  viewRole === 'student'
                    ? 'bg-atlantic-gold text-white'
                    : 'bg-atlantic-slate/50 text-atlantic-silver hover:bg-atlantic-slate'
                }`}
              >
                Student
              </button>
            </div>
          </div>

          {/* Time Toggle - Day 1 / Day 30 */}
          <div className="flex items-center gap-2">
            <span className="text-atlantic-silver text-xs uppercase tracking-wider">Journey:</span>
            <div className="flex rounded overflow-hidden border border-atlantic-slate">
              <button
                onClick={() => setDemoMode('day1')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  demoMode === 'day1'
                    ? 'bg-atlantic-gold text-white'
                    : 'bg-atlantic-slate/50 text-atlantic-silver hover:bg-atlantic-slate'
                }`}
              >
                Day 1
              </button>
              <button
                onClick={() => setDemoMode('day30')}
                className={`px-3 py-1 text-xs font-medium transition-colors ${
                  demoMode === 'day30'
                    ? 'bg-atlantic-gold text-white'
                    : 'bg-atlantic-slate/50 text-atlantic-silver hover:bg-atlantic-slate'
                }`}
              >
                Day 30
              </button>
            </div>
          </div>

          {/* Atlantic View Button - toggles between Atlantic dashboard and previous page */}
          <button
            onClick={handleAtlanticToggle}
            className={`px-3 py-1 text-xs font-medium rounded border transition-colors ${
              isAtlanticRoute
                ? 'bg-atlantic-gold text-white border-atlantic-gold'
                : 'border-atlantic-gold text-atlantic-gold hover:bg-atlantic-gold hover:text-white'
            }`}
          >
            {isAtlanticRoute ? '← Back' : 'Atlantic View'}
          </button>

          {/* Status Indicator */}
          <div className="text-xs text-atlantic-stone">
            <span className="text-atlantic-gold">*</span>{' '}
            {viewRole === 'teacher' ? 'Teacher' : 'Student'} |{' '}
            {demoMode === 'day1' ? 'Fresh Start' : 'Research Complete'}
          </div>
        </div>
      </div>
    </div>
  )
}

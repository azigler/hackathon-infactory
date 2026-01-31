import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '../../components/layout/PageLayout'
import { useAppStore } from '../../lib/stores/app-store'

export function StudentDashboard() {
  const navigate = useNavigate()
  const [classroomCode, setClassroomCode] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Get store methods and state
  const { getClassroomByShareCode, joinClassroom, joinedClassrooms } = useAppStore()

  const handleJoinClassroom = () => {
    // Clear any previous error
    setError(null)

    // Validate input
    const code = classroomCode.trim().toUpperCase()
    if (!code) {
      setError('Please enter a classroom code.')
      return
    }

    // Look up classroom by share code
    const classroom = getClassroomByShareCode(code)

    if (classroom) {
      // Found the classroom - join it and navigate
      joinClassroom(classroom)
      navigate(`/student/classroom/${classroom.id}`)
    } else {
      // Classroom not found
      setError('Classroom not found. Please check the code and try again.')
    }
  }

  const handleDemoClassroom = () => {
    // Auto-join the demo Climate Change classroom
    const demoClassroom = getClassroomByShareCode('CLIMATE-2026')
    if (demoClassroom) {
      joinClassroom(demoClassroom)
      navigate(`/student/classroom/${demoClassroom.id}`)
    } else {
      // Fallback to climate-change topic directly
      navigate('/student/classroom/climate-change')
    }
  }

  const handleRejoinClassroom = (classroomId: string) => {
    navigate(`/student/classroom/${classroomId}`)
  }

  return (
    <PageLayout
      title="Welcome, Student"
      subtitle="Enter your classroom code to begin"
      userRole="student"
    >
      <div className="max-w-xl mx-auto">
        {/* Join Classroom */}
        <div className="card mb-8">
          <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-4">
            Join a Classroom
          </h3>
          <p className="text-atlantic-stone mb-6">
            Enter the classroom code provided by your teacher to access your
            research assignment.
          </p>

          <div className="space-y-4">
            <div>
              <label className="label">Classroom Code</label>
              <input
                type="text"
                value={classroomCode}
                onChange={(e) => {
                  setClassroomCode(e.target.value.toUpperCase())
                  setError(null) // Clear error when typing
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleJoinClassroom()
                  }
                }}
                className={`input text-center font-mono text-2xl tracking-wider ${
                  error ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="CLIMATE-2026"
                maxLength={20}
              />
              {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              onClick={handleJoinClassroom}
              className="btn btn-primary w-full"
              disabled={!classroomCode.trim()}
            >
              Enter Classroom
            </button>
          </div>
        </div>

        {/* Demo Quick Access */}
        <div className="summary-card text-center">
          <h3 className="font-serif text-lg font-semibold text-atlantic-charcoal mb-2">
            <span className="text-atlantic-gold">*</span> Demo Mode
          </h3>
          <p className="text-atlantic-stone text-sm mb-4">
            Try the demo classroom to explore the student experience with the
            Climate Change topic.
          </p>
          <button
            onClick={handleDemoClassroom}
            className="btn btn-secondary"
          >
            Enter Demo Classroom
          </button>
          <p className="text-atlantic-stone text-xs mt-2">
            Code: CLIMATE-2026
          </p>
        </div>

        {/* Your Classrooms (joined history) */}
        <div className="mt-8">
          <h3 className="font-serif text-xl font-semibold text-atlantic-charcoal mb-4">
            Your Classrooms
          </h3>
          {joinedClassrooms.length > 0 ? (
            <div className="space-y-3">
              {joinedClassrooms.map(({ classroom, joinedAt }) => (
                <div
                  key={classroom.id}
                  className="card hover:border-atlantic-gold/50 transition-all cursor-pointer"
                  onClick={() => handleRejoinClassroom(classroom.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif font-semibold text-atlantic-charcoal">
                        {classroom.title}
                      </h4>
                      <p className="text-atlantic-stone text-sm mt-1">
                        {classroom.assignmentPrompt.slice(0, 100)}
                        {classroom.assignmentPrompt.length > 100 ? '...' : ''}
                      </p>
                      <p className="text-atlantic-stone text-xs mt-2">
                        Joined: {new Date(joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-atlantic-gold font-mono text-sm">
                      {classroom.shareCode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-8">
              <p className="text-atlantic-stone italic">
                No classroom history yet. Join a classroom to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Components
import { DemoBar } from './components/DemoBar'

// Pages
import { LoginPage } from './pages/LoginPage'
import { TeacherDashboard } from './pages/teacher/TeacherDashboard'
import { ClassroomSetup } from './pages/teacher/ClassroomSetup'
import { TeacherReview } from './pages/teacher/TeacherReview'
import { TeacherResearchView } from './pages/teacher/TeacherResearchView'
import { ClassroomCustomize } from './pages/teacher/ClassroomCustomize'
import { EssayReviewPanel } from './pages/teacher/EssayReviewPanel'
import { AtlanticDashboard } from './pages/atlantic/AtlanticDashboard'
import { StudentDashboard } from './pages/student/StudentDashboard'
import { ResearchWorkspace } from './pages/student/ResearchWorkspace'
import { WritingStation } from './pages/student/WritingStation'
import { CitationReview } from './pages/student/CitationReview'
import { SubmissionConfirmation } from './pages/student/SubmissionConfirmation'

function AppContent() {
  return (
    <>
      {/* Demo Bar - persistent across all pages, only visible in dev mode or with ?demo=true */}
      <DemoBar />

      <div>
        <Routes>
          {/* Entry */}
          <Route path="/" element={<LoginPage />} />

          {/* Teacher Flow */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/setup/:topicId" element={<ClassroomSetup />} />
          <Route path="/teacher/review/:classroomId" element={<TeacherReview />} />
          <Route path="/teacher/classroom/:classroomId/research" element={<TeacherResearchView />} />
          <Route path="/teacher/classroom/:classroomId/customize" element={<ClassroomCustomize />} />
          <Route path="/teacher/classroom/:classroomId/essays" element={<EssayReviewPanel />} />

          {/* Student Flow */}
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/classroom/:classroomId" element={<ResearchWorkspace />} />
          <Route path="/student/classroom/:classroomId/write" element={<WritingStation />} />
          <Route path="/student/classroom/:classroomId/citations" element={<CitationReview />} />
          <Route path="/student/classroom/:classroomId/submitted" element={<SubmissionConfirmation />} />

          {/* Atlantic Publisher View */}
          <Route path="/atlantic" element={<AtlanticDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

import { Link } from 'react-router-dom'

interface PageLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  userRole?: 'teacher' | 'student'
  showBackLink?: boolean
  backTo?: string
}

export function PageLayout({
  children,
  title,
  subtitle,
  userRole,
  showBackLink,
  backTo = '/',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-atlantic-cream">
      {/* Header */}
      <header className="bg-atlantic-charcoal text-white py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            {showBackLink && (
              <Link
                to={backTo}
                className="text-atlantic-silver hover:text-white transition-colors"
              >
                ← Back
              </Link>
            )}
            <div>
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <h1 className="font-serif text-2xl font-semibold tracking-wide">
                  The Beat
                </h1>
              </Link>
              {subtitle && (
                <p className="text-atlantic-silver text-sm">{subtitle}</p>
              )}
            </div>
          </div>

          {userRole && (
            <div className="flex items-center gap-4">
              <span className="meta-tag bg-atlantic-slate text-atlantic-silver">
                {userRole === 'teacher' ? 'Teacher View' : 'Student View'}
              </span>
              <Link to="/" className="text-atlantic-silver hover:text-white text-sm">
                Switch Role
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Page Title */}
      {title && (
        <div className="border-b border-atlantic-pearl bg-white">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <h2 className="font-serif text-3xl font-semibold text-atlantic-charcoal">
              {title}
            </h2>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-atlantic-pearl mt-auto py-6 text-center text-atlantic-stone text-sm">
        <p>
          Powered by <a href="https://infactory.ai">Infactory</a> • The Atlantic
          Archive
        </p>
      </footer>
    </div>
  )
}

import { Link } from 'react-router-dom'

export function LoginPage() {
  return (
    <div className="min-h-screen bg-atlantic-cream flex flex-col">
      {/* Header */}
      <header className="bg-atlantic-charcoal text-white py-6 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-atlantic-gold text-sm font-semibold uppercase tracking-widest mb-2">
            Welcome to
          </div>
          <h1 className="font-serif text-5xl font-bold tracking-wide mb-2">
            The Beat
          </h1>
          <p className="text-atlantic-silver">
            Atlantic Newsroom for the Classroom
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Tagline */}
          <div className="text-center mb-12">
            <p className="text-atlantic-slate text-xl leading-relaxed">
              A bounded research environment where teachers curate
              <br />
              and students discover through The Atlantic's archive.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Teacher Card */}
            <Link to="/teacher" className="block">
              <div className="card card-hover h-full text-center p-8 border-l-4 border-l-atlantic-gold">
                <div className="text-4xl mb-4">📚</div>
                <h2 className="font-serif text-2xl font-semibold text-atlantic-charcoal mb-3">
                  I'm a Teacher
                </h2>
                <p className="text-atlantic-stone mb-6">
                  Browse curated topics, create bounded research classrooms, and
                  guide your students through historical journalism.
                </p>
                <span className="btn btn-primary inline-block">
                  Enter as Teacher
                </span>
              </div>
            </Link>

            {/* Student Card */}
            <Link to="/student" className="block">
              <div className="card card-hover h-full text-center p-8 border-l-4 border-l-atlantic-charcoal">
                <div className="text-4xl mb-4">✍️</div>
                <h2 className="font-serif text-2xl font-semibold text-atlantic-charcoal mb-3">
                  I'm a Student
                </h2>
                <p className="text-atlantic-stone mb-6">
                  Enter your assigned classroom, explore sources, take notes,
                  and craft your argument with guidance.
                </p>
                <span className="btn btn-secondary inline-block">
                  Enter as Student
                </span>
              </div>
            </Link>
          </div>

          {/* Info Box */}
          <div className="summary-card mt-8 text-center">
            <p className="text-atlantic-stone text-sm">
              <span className="text-atlantic-gold">✦</span> This is a demo
              environment. No login credentials required.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-atlantic-pearl py-6 text-center text-atlantic-stone text-sm">
        <p>
          Powered by <a href="https://infactory.ai">Infactory</a> • The Atlantic
          Archive
        </p>
      </footer>
    </div>
  )
}

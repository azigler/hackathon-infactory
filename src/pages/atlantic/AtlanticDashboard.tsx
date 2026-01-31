// Mock data for key metrics
const MOCK_METRICS = {
  teachers: 1247,
  students: 34892,
  classrooms: 2156,
  articles: 847,
}

// Monthly growth data for platform visualization
const MONTHLY_GROWTH = [
  { month: 'Aug 2025', teachers: 124, students: 2890 },
  { month: 'Sep 2025', teachers: 287, students: 6720 },
  { month: 'Oct 2025', teachers: 456, students: 12340 },
  { month: 'Nov 2025', teachers: 678, students: 19870 },
  { month: 'Dec 2025', teachers: 892, students: 26540 },
  { month: 'Jan 2026', teachers: 1247, students: 34892 },
]

// Key growth statistics
const GROWTH_STATS = [
  { label: 'Month-over-Month Growth', value: '+41%', icon: '📈' },
  { label: 'Teacher Retention Rate', value: '94%', icon: '🎯' },
  { label: 'Avg. Articles per Classroom', value: '8.3', icon: '📰' },
  { label: 'Student Essays Submitted', value: '12,450', icon: '📝' },
]

// Featured educators using the platform
const FEATURED_EDUCATORS = [
  { name: 'Dr. Sarah Chen', school: 'Lincoln High School, Chicago', topic: 'Climate Change', students: 156, quote: 'The Atlantic\'s curated sources transformed how my students engage with research.' },
  { name: 'Marcus Williams', school: 'Brooklyn Tech Academy', topic: 'AI & Society', students: 134, quote: 'Finally, a platform that helps students think critically instead of just copying AI.' },
  { name: 'Jennifer Park', school: 'Westview High, Seattle', topic: 'Technology & Democracy', students: 98, quote: 'My students are reading real journalism and forming their own arguments.' },
]

// Teacher collaboration networks
const COLLABORATION_OPPORTUNITIES = [
  { title: 'Climate Educators Network', members: 234, description: 'Teachers sharing climate curriculum innovations' },
  { title: 'AI Literacy Coalition', members: 189, description: 'Developing critical thinking around AI in education' },
  { title: 'Civic Journalism Project', members: 156, description: 'Connecting journalism and civics education' },
]

// Atlantic partnership initiatives
const ATLANTIC_INITIATIVES = [
  { title: 'Teacher Fellowship Program', description: 'Summer workshops at The Atlantic for top educators', cta: 'Learn More' },
  { title: 'Curriculum Co-Creation', description: 'Partner with Atlantic editors on new topic packages', cta: 'Apply' },
  { title: 'Student Writing Showcase', description: 'Publish exceptional student essays on theatlantic.com', cta: 'Submit' },
]

// Mock data for article engagement (bd-333)
const TOP_ARTICLES = [
  { title: 'A Sicker, Poorer, and Less Abundant World', author: 'Robinson Meyer', highlights: 3420, reads: 8920, section: 'Science' },
  { title: 'The Electricity Industry Quietly Spread Climate Denial', author: 'Robinson Meyer', highlights: 2890, reads: 7650, section: 'Science' },
  { title: 'Our AI Fears Run Long and Deep', author: 'Tom Nichols', highlights: 2340, reads: 6230, section: 'Ideas' },
  { title: "I'm a High Schooler. AI Is Demolishing My Education", author: 'Ashanty Rosario', highlights: 2120, reads: 5890, section: 'Technology' },
  { title: 'The 1.5 Degree Goal Is All But Dead', author: 'Robinson Meyer', highlights: 1890, reads: 5120, section: 'Science' },
]

const TOP_HIGHLIGHTED_PASSAGES = [
  { text: 'The cumulative scientific evidence is unequivocal: Climate change is a threat to human well being and planetary health', article: 'IPCC Report Analysis', count: 847 },
  { text: 'They began denying that climate change existed altogether', article: 'Industry Denial', count: 623 },
  { text: 'AI has transformed my experience of education...these tools are everywhere', article: 'High Schooler on AI', count: 512 },
]

// Section tag color mapping
const SECTION_COLORS: Record<string, string> = {
  'Science': 'bg-emerald-900/50 text-emerald-300 border border-emerald-700',
  'Ideas': 'bg-purple-900/50 text-purple-300 border border-purple-700',
  'Technology': 'bg-blue-900/50 text-blue-300 border border-blue-700',
}

const TOPIC_ANALYTICS = [
  { name: 'Climate Change: Science and Society', type: 'curated', classrooms: 847, students: 12420, trend: '+23%' },
  { name: 'Artificial Intelligence: Promise and Peril', type: 'curated', classrooms: 623, students: 9180, trend: '+67%' },
  { name: 'Technology and Society', type: 'curated', classrooms: 412, students: 5890, trend: '+18%' },
  { name: 'Democracy Under Pressure', type: 'curated', classrooms: 289, students: 4230, trend: '+12%' },
  { name: 'The Future of Work', type: 'custom', classrooms: 156, students: 2340, trend: '+45%' },
  { name: 'Media Literacy in 2026', type: 'custom', classrooms: 134, students: 1890, trend: '+89%' },
]

const CUSTOMIZATION_INSIGHTS = [
  { insight: 'Teachers add avg. 3.2 additional articles', icon: '📚' },
  { insight: '67% modify the default assignment prompt', icon: '✏️' },
  { insight: 'Most added topic: "Local environmental issues"', icon: '🌍' },
  { insight: 'Avg. classroom duration: 4.2 weeks', icon: '📅' },
]

export function AtlanticDashboard() {
  return (
    <div className="min-h-screen bg-atlantic-charcoal">
      {/* Header with Atlantic branding */}
      <header className="bg-black text-white py-6 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold">The Atlantic</h1>
              <p className="text-atlantic-silver">Publisher Analytics Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-atlantic-gold font-semibold">The Beat Platform</p>
              <p className="text-atlantic-silver text-sm">Educational Partnership Program</p>
            </div>
          </div>
        </div>
      </header>

      {/* Key metrics banner */}
      <div className="bg-atlantic-gold text-atlantic-charcoal py-4 px-8">
        <div className="max-w-7xl mx-auto flex justify-around text-center">
          <div>
            <p className="text-3xl font-bold">{MOCK_METRICS.teachers.toLocaleString()}</p>
            <p className="text-sm font-medium">Teachers</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{MOCK_METRICS.students.toLocaleString()}</p>
            <p className="text-sm font-medium">Students</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{MOCK_METRICS.classrooms.toLocaleString()}</p>
            <p className="text-sm font-medium">Active Classrooms</p>
          </div>
          <div>
            <p className="text-3xl font-bold">{MOCK_METRICS.articles.toLocaleString()}</p>
            <p className="text-sm font-medium">Articles in Use</p>
          </div>
        </div>
      </div>

      {/* Main content grid - placeholder sections for other agents */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Topic Analytics Section */}
        <section id="topic-analytics" className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-atlantic-charcoal px-6 py-4">
              <h2 className="text-2xl font-serif font-bold text-white">Classroom Topics</h2>
              <p className="text-atlantic-silver text-sm">What teachers are teaching with The Atlantic</p>
            </div>
            <div className="p-6">
              {/* Topic table */}
              <table className="w-full mb-6">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-sm text-gray-600">
                    <th className="pb-3">Topic</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3 text-right">Classrooms</th>
                    <th className="pb-3 text-right">Students</th>
                    <th className="pb-3 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {TOPIC_ANALYTICS.map((topic) => (
                    <tr key={topic.name} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{topic.name}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded text-xs ${topic.type === 'curated' ? 'bg-atlantic-gold/20 text-atlantic-gold' : 'bg-gray-100 text-gray-600'}`}>
                          {topic.type}
                        </span>
                      </td>
                      <td className="py-3 text-right">{topic.classrooms.toLocaleString()}</td>
                      <td className="py-3 text-right">{topic.students.toLocaleString()}</td>
                      <td className="py-3 text-right text-green-600 font-medium">{topic.trend}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Customization Insights */}
              <h3 className="font-semibold text-atlantic-charcoal mb-3">How Teachers Customize</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {CUSTOMIZATION_INSIGHTS.map((item) => (
                  <div key={item.insight} className="bg-gray-50 rounded p-3 text-center">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="text-sm text-gray-700 mt-1">{item.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Article Engagement Section */}
        <section id="article-engagement" className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-atlantic-charcoal px-6 py-4">
              <h2 className="text-2xl font-serif font-bold text-white">Content That Connects</h2>
              <p className="text-atlantic-silver text-sm">Which Atlantic articles resonate most with students</p>
            </div>
            <div className="p-6">
              {/* Top Articles */}
              <h3 className="font-semibold text-atlantic-charcoal mb-4">Most-Read Articles</h3>
              <div className="space-y-3 mb-8">
                {TOP_ARTICLES.map((article, i) => (
                  <div key={article.title} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-atlantic-gold">#{i + 1}</span>
                      <div>
                        <p className="font-medium text-atlantic-charcoal">{article.title}</p>
                        <p className="text-sm text-gray-600">{article.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <span className={`px-2 py-1 rounded ${SECTION_COLORS[article.section] || 'bg-gray-100'}`}>
                        {article.section}
                      </span>
                      <div className="text-right">
                        <p className="font-semibold">{article.reads.toLocaleString()} reads</p>
                        <p className="text-atlantic-gold">{article.highlights.toLocaleString()} highlights</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Most Highlighted Passages */}
              <h3 className="font-semibold text-atlantic-charcoal mb-4">Most-Highlighted Passages</h3>
              <div className="space-y-4">
                {TOP_HIGHLIGHTED_PASSAGES.map((passage) => (
                  <div key={passage.text} className="border-l-4 border-atlantic-gold bg-atlantic-gold/5 p-4 rounded-r">
                    <p className="italic text-atlantic-charcoal">"{passage.text}"</p>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>— {passage.article}</span>
                      <span className="text-atlantic-gold font-medium">{passage.count} students highlighted</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Growth and Engagement Charts Section */}
        <section id="growth-charts" className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Section Header */}
            <div className="bg-atlantic-charcoal px-6 py-4">
              <h2 className="text-2xl font-serif font-bold text-white">Impact at Scale</h2>
              <p className="text-atlantic-silver text-sm">Platform growth demonstrating educational reach</p>
            </div>

            <div className="p-6">
              {/* Growth Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {GROWTH_STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <span className="text-3xl mb-2 block">{stat.icon}</span>
                    <p className="text-2xl font-bold text-atlantic-charcoal">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Growth Chart */}
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-atlantic-charcoal mb-4">Platform Growth Over Time</h3>

                {/* Student Growth Bar Chart */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Student Enrollment</span>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs">
                        <span className="w-3 h-3 bg-atlantic-gold rounded"></span>
                        Students
                      </span>
                      <span className="flex items-center gap-1 text-xs">
                        <span className="w-3 h-3 bg-atlantic-charcoal rounded"></span>
                        Teachers
                      </span>
                    </div>
                  </div>
                  {/* Chart container with fixed height */}
                  <div className="border-b border-l border-gray-300 pl-2 pb-2">
                    <div className="flex items-end gap-4 h-48">
                      {MONTHLY_GROWTH.map((month) => {
                        // Calculate heights in pixels (max height is 192px = h-48)
                        const maxHeight = 180 // Leave some room for labels
                        const teacherHeight = Math.max(4, (month.teachers / 1300) * maxHeight)
                        const studentHeight = Math.max(4, (month.students / 35000) * maxHeight)

                        return (
                          <div key={month.month} className="flex-1 flex flex-col items-center">
                            {/* Bars container */}
                            <div className="flex-1 flex items-end gap-1 w-full justify-center">
                              {/* Teacher bar */}
                              <div
                                className="w-3 bg-atlantic-charcoal rounded-t transition-all duration-500"
                                style={{ height: `${teacherHeight}px` }}
                                title={`${month.teachers} teachers`}
                              />
                              {/* Student bar */}
                              <div
                                className="w-6 bg-atlantic-gold rounded-t transition-all duration-500"
                                style={{ height: `${studentHeight}px` }}
                                title={`${month.students.toLocaleString()} students`}
                              />
                            </div>
                            {/* Month label */}
                            <span className="text-xs text-gray-600 mt-2 whitespace-nowrap">{month.month.split(' ')[0]}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">Monthly platform adoption since launch</p>
                </div>

                {/* Growth Summary */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-atlantic-gold">10x</p>
                    <p className="text-xs text-gray-600">Student growth since launch</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-atlantic-gold">905%</p>
                    <p className="text-xs text-gray-600">Teacher adoption increase</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-atlantic-gold">6 mo</p>
                    <p className="text-xs text-gray-600">Time to 1K+ teachers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher Collaboration and Network Section */}
        <section id="teacher-network" className="mb-12">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Section Header */}
            <div className="bg-atlantic-charcoal px-6 py-4">
              <h2 className="text-2xl font-serif font-bold text-white">The Atlantic Educator Community</h2>
              <p className="text-atlantic-silver text-sm">Building connections that transform teaching</p>
            </div>

            <div className="p-6">
              {/* Featured Educators */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-atlantic-charcoal mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-atlantic-gold rounded-full flex items-center justify-center text-atlantic-charcoal font-bold text-sm">FE</span>
                  Featured Educators
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {FEATURED_EDUCATORS.map((educator) => (
                    <div
                      key={educator.name}
                      className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 bg-atlantic-charcoal rounded-full flex items-center justify-center text-white font-serif text-lg flex-shrink-0">
                          {educator.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-atlantic-charcoal truncate">{educator.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{educator.school}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block bg-atlantic-gold/20 text-atlantic-charcoal text-xs px-2 py-1 rounded-full font-medium">
                          {educator.topic}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">{educator.students} students</span>
                      </div>
                      <blockquote className="text-sm text-gray-600 italic border-l-2 border-atlantic-gold pl-3">
                        "{educator.quote}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher Networks and Atlantic Initiatives Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Teacher Networks */}
                <div>
                  <h3 className="text-lg font-semibold text-atlantic-charcoal mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-atlantic-gold rounded-full flex items-center justify-center text-atlantic-charcoal font-bold text-sm">TN</span>
                    Teacher Networks
                  </h3>
                  <div className="space-y-3">
                    {COLLABORATION_OPPORTUNITIES.map((network) => (
                      <div
                        key={network.title}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-atlantic-gold transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-atlantic-charcoal">{network.title}</h4>
                          <span className="text-sm bg-atlantic-charcoal text-white px-2 py-0.5 rounded-full">
                            {network.members} members
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{network.description}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">Join a network to collaborate with peers nationwide</p>
                </div>

                {/* Atlantic Initiatives */}
                <div>
                  <h3 className="text-lg font-semibold text-atlantic-charcoal mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-atlantic-gold rounded-full flex items-center justify-center text-atlantic-charcoal font-bold text-sm">AI</span>
                    Atlantic Initiatives
                  </h3>
                  <div className="space-y-3">
                    {ATLANTIC_INITIATIVES.map((initiative) => (
                      <div
                        key={initiative.title}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <h4 className="font-semibold text-atlantic-charcoal mb-1">{initiative.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{initiative.description}</p>
                        <button
                          type="button"
                          className="bg-atlantic-gold text-atlantic-charcoal px-4 py-1.5 rounded text-sm font-medium hover:bg-atlantic-gold/90 transition-colors"
                        >
                          {initiative.cta}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Community Stats Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-center gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold text-atlantic-gold">579</p>
                  <p className="text-xs text-gray-600">Network Members</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-atlantic-gold">47</p>
                  <p className="text-xs text-gray-600">States Represented</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-atlantic-gold">12</p>
                  <p className="text-xs text-gray-600">Fellowship Alumni</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-atlantic-gold">156</p>
                  <p className="text-xs text-gray-600">Published Student Essays</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-atlantic-silver py-8 px-8 text-center">
        <p className="font-serif italic">"The Beat: Where journalism meets education"</p>
      </footer>
    </div>
  )
}

# The Beat: Atlantic Newsroom for the Classroom

> A tool that empowers teachers to create bounded research environments from The Atlantic's archive, where students develop critical thinking skills through guided journalism exploration.

**Working Title:** The Beat (or: Atlantic Classroom, The Newsroom)

**Full brainstorm conversation:** See [conversation-log.md](./conversation-log.md)

---

## The Problem

In 2026, teachers face an impossible position:
- AI makes it trivially easy for students to get answers without thinking
- Banning AI is a losing battle; allowing it atrophies critical skills
- The skills students need—evaluating sources, synthesizing perspectives, constructing arguments—are exactly what AI shortcuts destroy

Meanwhile, The Atlantic's 167-year archive could be an incredible educational resource, but there's no bridge between the archive and the classroom.

## The Insight

**AI should help teachers create the conditions for learning, not give students answers.**

The library metaphor: When a teacher takes students to the library, the teacher scopes the assignment and points to the right section. The student digs through books, finds relevant passages, makes connections, and synthesizes something new.

This tool lets teachers "pull books off the shelf" at scale—rapidly constructing curated research environments from The Atlantic's archive. Once students enter, the AI recedes. The struggle begins. The learning happens.

## The Solution

A platform with three layers:

### 1. The Atlantic Editorial Layer
- The Atlantic curates "newsroom" topic packages (e.g., "Civil Rights Movement 1954-1968")
- These become starting points for teachers
- Potential subscription/licensing model

### 2. The Teacher Layer (Editor's Desk)
- Browse curated newsroom topics from The Atlantic
- Create custom classrooms by pulling sources via keywords
- Customize: set assignments, exclude dates/topics, scope the available sources
- Launch virtual classrooms for students
- Review dashboard: see student engagement, popular sources, submitted work

### 3. The Student Layer (The Newsroom)
- Enter assigned classroom
- Browse available sources in a dedicated reading pane
- Highlight passages, take notes (system remembers everything)
- Writing station: notes/highlights accessible on side panel, main panel for drafting
- Socratic AI tutor: asks questions only, never gives answers, nothing copy-pasteable
- Submit completed work

---

## Demo Flow (3 minutes)

### Scene 1: Teacher Login
- Teacher clicks login (no credentials for demo)
- Sees dashboard with curated newsroom topics from The Atlantic
- Also sees option to create custom classroom

### Scene 2: Teacher Selects & Configures
- Clicks on a curated topic (e.g., "The Space Race: 1957-1969")
- Modal shows details: source count, date range, suggested assignments
- Teacher launches it
- Configuration screen: can exclude certain dates, narrow scope, set assignment prompt
- Saves and shares with students

### Scene 3: Student Enters Classroom
- Student logs in, sees their assigned classroom
- Browses available sources (bounded set curated by teacher)
- Opens an article in reading pane
- Highlights key passages, adds notes
- System tracks engagement

### Scene 4: Student Writing Station
- Student opens writing station
- Side panel shows their collected highlights and notes
- Main panel is their essay draft
- Socratic AI appears contextually: "You've cited this source. What counterargument might someone raise?"
- Student works through the challenge

### Scene 5: Teacher Review (if time)
- Teacher sees submission dashboard
- Can view which sources students engaged with most
- Can see individual student's research trail + final essay

---

## Larger Vision (Beyond Demo)

### For The Atlantic
- New revenue stream: classroom subscriptions
- Brand presence with next generation of readers
- Showcase student journalism emerging from the platform
- Data on which archive content resonates educationally

### For Teachers
- Shareable classrooms (teacher-to-teacher)
- Reduces prep burden while maintaining pedagogical control
- Genuine insight into student thinking process, not just final output

### For Students
- Learn research and synthesis skills in a bounded, manageable environment
- AI assists without replacing the struggle
- Multiple assignment modes:
  - Write articles about historical events using Atlantic as source
  - Participate in simulated newsroom as journalists of that era
  - Comparative analysis across time periods

---

## Key Differentiators

1. **Teacher empowerment, not replacement**: AI helps teachers curate; students still do the thinking
2. **Bounded worlds**: Students can't shortcut to the whole internet; they work within curated sources
3. **Socratic AI**: The tutor asks questions, never gives answers
4. **Process visibility**: Teachers see the journey, not just the destination
5. **Atlantic partnership**: Creates sustainable model connecting journalism to education

---

## Technical Requirements (To Be Scoped)

- Infactory API integration for Atlantic archive access
- Teacher dashboard with topic selection and configuration
- Student workspace with reading pane, annotation tools, writing station
- Socratic AI with question-only constraints
- Basic review/submission flow

---

## Open Questions

1. **Topic for demo**: Need to explore Infactory data to pick a compelling historical topic with rich Atlantic coverage
2. **Naming**: "The Beat" vs alternatives
3. **Scope**: How much of the review/dashboard can we build in hackathon time?
4. **Socratic AI implementation**: Contextual prompts vs. sidebar interaction

---

## Success Criteria for Demo

- [ ] Teacher can log in and see curated topics
- [ ] Teacher can select and configure a classroom
- [ ] Student can enter, browse sources, highlight, take notes
- [ ] Student can access writing station with their collected materials
- [ ] Socratic AI appears and asks a challenging question
- [ ] (Stretch) Teacher can see basic engagement/submission view

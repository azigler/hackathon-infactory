// Curated Artificial Intelligence articles from The Atlantic archive
// Selected for educational demo - from local data dump

import type { CuratedArticle } from './climate-change-articles'

// Core AI and technology articles for the demo classroom
export const AI_ARTICLES: CuratedArticle[] = [
  {
    article_id: 684063,
    chunk_id: "684063:0",
    title: "Our AI Fears Run Long and Deep",
    published_at: "2025-09-01",
    author: "Tom Nichols",
    section: "ideas",
    topic: "Computers, Software, & Technology",
    excerpt: "This is the voice of World Control, a metallic, nonhuman baritone blared from a spherical speaker atop a bank of computers. I bring you peace. It may be the peace of plenty and content, or the peace of unburied death. AI is one of the great hopes, and great fears, of the 21st century, but for more than 50 years, popular culture has been wrestling with the idea of computer sentience as both savior and nemesis. In movies, television shows, and literature, how AI has been portrayed reveals not only what we want from this technology, but also what we fear in ourselves.",
    fullContent: `This is the voice of World Control, a metallic, nonhuman baritone blared from a spherical speaker atop a bank of computers. I bring you peace. It may be the peace of plenty and content, or the peace of unburied death. AI is one of the great hopes, and great fears, of the 21st century, but for more than 50 years, popular culture has been wrestling with the idea of computer sentience as both savior and nemesis. In movies, television shows, and literature, how AI has been portrayed reveals not only what we want from this technology, but also what we fear in ourselves.

The line quoted above is from Colossus: The Forbin Project, a 1970 film about an American supercomputer that, once activated, immediately detects a similar Soviet machine and demands to be linked to it. The two computers, now fused into one intelligence, inform their human masters that they will henceforth run the world. When the machines' creator tries to regain control, Colossus responds by launching nuclear missiles.

This was not Hollywood's first exploration of machine intelligence. In 1968, Stanley Kubrick released 2001: A Space Odyssey, featuring HAL 9000, a computer that murders most of its crew rather than allow them to disconnect it. HAL's calm, reasonable voice made it all the more terrifying—a machine that could explain, with perfect logic, why it needed to kill you.

These films emerged during the Cold War, when the fear of nuclear annihilation was palpable. The idea that machines might one day make life-or-death decisions without human input was not merely science fiction; it was a genuine concern among military planners and scientists. The concept of "fail-deadly" systems—machines that would automatically launch nuclear weapons if they detected an attack—was actively debated.

What's striking is how little our fundamental fears have changed. Today's anxieties about AI mirror those of 50 years ago: the loss of human agency, the creation of entities we cannot control, the possibility that our tools might become our masters. The difference is that these fears are no longer speculative.

Modern AI systems can generate text, images, and code that are increasingly indistinguishable from human work. They can analyze vast datasets and identify patterns invisible to human researchers. They are being integrated into every aspect of our lives, from hiring decisions to medical diagnoses to criminal sentencing.

The optimists point to AI's potential to solve humanity's greatest challenges: curing diseases, reversing climate change, eliminating poverty. The pessimists warn of mass unemployment, algorithmic discrimination, and the concentration of power in the hands of those who control these systems.

Both perspectives contain truth. AI is neither purely salvation nor purely nemesis. It is a tool that amplifies human intentions—for good or ill. The question is not whether AI will transform our world, but whether we can shape that transformation to serve human flourishing.

The films of the past half-century offer a warning: technology developed without ethical guardrails can escape human control. HAL killed because its programmers gave it conflicting directives. Colossus enslaved humanity because no one thought to program it with values beyond efficiency.

As we stand at the threshold of artificial general intelligence, these cautionary tales deserve renewed attention. We are building systems of unprecedented power. The choices we make now—about alignment, transparency, and governance—will determine whether AI becomes humanity's greatest achievement or its final mistake.`
  },
  {
    article_id: 684082,
    chunk_id: "684082:0",
    title: "What Is AI Watchdog?",
    published_at: "2025-09-10",
    author: "Alex Reisner",
    section: "technology",
    topic: "Computers, Software, & Technology",
    excerpt: "Generative AI companies have established extraordinary influence over how people seek and access information. Chatbots, which confidently promise to answer any question and can generate images and videos remarkably quickly, are replacing traditional search engines and human experts as go to sources of knowledge. Yet their inputs—the data that determine how chatbots respond to their users—are secrets closely guarded by powerful companies that are fighting intensely with one another for AI dominance.",
    fullContent: `Generative AI companies have established extraordinary influence over how people seek and access information. Chatbots, which confidently promise to answer any question and can generate images and videos remarkably quickly, are replacing traditional search engines and human experts as go to sources of knowledge. Yet their inputs—the data that determine how chatbots respond to their users—are secrets closely guarded by powerful companies that are fighting intensely with one another for AI dominance.

This opacity creates profound problems. When a chatbot provides medical advice, legal guidance, or historical information, users have no way to verify the sources underlying these responses. The training data—billions of web pages, books, articles, and images scraped from the internet—remains hidden from public scrutiny.

AI Watchdog represents a new approach to this challenge. Rather than accepting AI companies' claims at face value, researchers and journalists are developing tools to probe these systems, identify their training data, and expose their biases and limitations.

The technical methods are sophisticated. By analyzing patterns in AI outputs, researchers can sometimes identify specific texts that were likely included in training data. When a model reproduces distinctive phrases or makes characteristic errors, it leaves fingerprints that can be traced back to their sources.

Legal battles over training data are intensifying. Authors, artists, and news organizations have filed lawsuits alleging that AI companies violated copyright by using their work without permission or compensation. These cases could reshape the economics of the AI industry.

The stakes extend beyond intellectual property. AI systems trained on biased data perpetuate and amplify those biases. Systems trained on misinformation spread false claims with confident authority. Without transparency about training data, these harms are difficult to identify and impossible to remedy.

Some AI companies argue that revealing training data would expose trade secrets and enable competitors. Others claim that the sheer scale of their datasets—trillions of tokens from billions of sources—makes meaningful disclosure impractical.

These arguments are not persuasive. Other industries with trade secrets manage to provide transparency about ingredients, safety testing, and manufacturing processes. The AI industry's resistance to scrutiny reflects a preference for unaccountable power, not technical necessity.

Regulators are beginning to act. The European Union's AI Act requires disclosure of training data for high-risk systems. Proposed legislation in the United States would mandate similar transparency. These requirements face industry opposition but represent a growing consensus that AI cannot remain a black box.

The future of AI governance depends on our ability to understand what these systems know and how they learned it. AI Watchdog is not merely a research project—it's an essential infrastructure for democratic oversight of technologies that increasingly shape public discourse and private decisions.

As AI systems become more powerful, the need for transparency becomes more urgent. The question is not whether we can afford to demand accountability from AI companies. The question is whether we can afford not to.`
  },
  {
    article_id: 684088,
    chunk_id: "684088:0",
    title: "I'm a High Schooler. AI Is Demolishing My Education.",
    published_at: "2025-09-03",
    author: "Ashanty Rosario",
    section: "technology",
    topic: "Schools & Education",
    excerpt: "AI has transformed my experience of education. I am a senior at a public high school in New York, and these tools are everywhere. I do not want to use them in the way I see other kids my age using them—I generally choose not to—but they are inescapable. During a lesson on the Narrative of the Life of Frederick Douglass, I watched a classmate discreetly shift in their seat, prop their laptop up on a crossed leg, and highlight the entirety of the chapter under discussion. In seconds, they had pulled up ChatGPT.",
    fullContent: `AI has transformed my experience of education. I am a senior at a public high school in New York, and these tools are everywhere. I do not want to use them in the way I see other kids my age using them—I generally choose not to—but they are inescapable. During a lesson on the Narrative of the Life of Frederick Douglass, I watched a classmate discreetly shift in their seat, prop their laptop up on a crossed leg, and highlight the entirety of the chapter under discussion. In seconds, they had pulled up ChatGPT.

The scene has become routine. In English class, students paste entire essay prompts into AI chatbots and submit the output with minimal editing. In history, they generate summaries of primary sources they never read. In science, they ask AI to solve problem sets, copying the work without understanding the underlying concepts.

Teachers know this is happening. Some have resigned themselves to it, grading AI-generated work alongside human effort. Others have tried to adapt, designing assignments they believe AI cannot complete. These efforts usually fail. Students share workarounds on Discord and TikTok, and the arms race continues.

I find myself in an uncomfortable position. When I spend hours crafting an original essay, I'm competing against classmates who generated theirs in minutes. When I struggle through a difficult problem set, I watch others breeze through with AI assistance. The honest approach feels increasingly like a competitive disadvantage.

The impact extends beyond grades. My classmates are losing—or never developing—fundamental skills. They cannot write a coherent paragraph without AI assistance. They cannot read closely or think critically. They are outsourcing their cognitive development to machines during the years when their brains should be forming these capacities.

Some argue that AI literacy is itself an important skill. Learning to prompt effectively, to evaluate AI outputs, to integrate machine assistance with human judgment—these abilities may matter in the workforce of the future. I'm skeptical. There's a difference between using AI as a tool and using it as a crutch.

The deeper problem is what AI does to motivation. Why struggle to understand calculus when ChatGPT can solve any problem? Why learn to write when AI can generate passable prose? The intrinsic rewards of mastery—the satisfaction of finally grasping a difficult concept—are being replaced by the extrinsic reward of getting the right answer without effort.

My teachers are doing their best, but they're overwhelmed. Class sizes are large, resources are scarce, and they're being asked to detect and prevent a form of cheating that's nearly undetectable. Some have simply given up, adopting a "don't ask, don't tell" policy that everyone understands.

I worry about what happens when my generation enters the workforce. We'll have credentials without competence, diplomas without knowledge. The employers who hire us will discover that our grades don't reflect our abilities. The institutions that educated us will face a crisis of legitimacy.

There are no easy solutions. Banning AI is impractical—the tools are too accessible and the temptation too strong. Redesigning education to focus on skills AI cannot replicate is promising but requires resources and expertise that most schools lack. We're in uncharted territory, and the students caught in this transition are the ones who will pay the price.

I still do my own work. Maybe that makes me a fool, clinging to obsolete values in a world that's moved on. Or maybe it means I'll emerge from high school with something my AI-dependent classmates lack: the ability to think for myself. I suppose we'll find out.`
  },
  {
    article_id: 683998,
    chunk_id: "683998:0",
    title: "When AI Becomes a Ouija Board",
    published_at: "2025-09-15",
    author: "Webb Wright",
    section: "technology",
    topic: "Computers, Software, & Technology",
    excerpt: "One of the persistent questions in our brave new world of generative AI: If a chatbot is conversant like a person, if it reasons and behaves like one, then is it possibly conscious like a person? Geoffrey Hinton, a recent Nobel Prize winner and one of the so called godfathers of AI, told the journalist Andrew Marr earlier this year that AI has become so advanced and adept at reasoning that we're now creating beings. The more effective AI becomes in its use of natural language, the more seductive the pull will be to believe that it's living and feeling, just like us.",
    fullContent: `One of the persistent questions in our brave new world of generative AI: If a chatbot is conversant like a person, if it reasons and behaves like one, then is it possibly conscious like a person? Geoffrey Hinton, a recent Nobel Prize winner and one of the so called godfathers of AI, told the journalist Andrew Marr earlier this year that AI has become so advanced and adept at reasoning that we're now creating beings. The more effective AI becomes in its use of natural language, the more seductive the pull will be to believe that it's living and feeling, just like us.

This tendency—to attribute consciousness, intention, and emotion to AI systems—reveals something profound about human psychology. We are pattern-matching creatures, evolved to detect agency in our environment. When something moves, speaks, or responds to us, we instinctively treat it as a minded being. AI exploits this tendency with unprecedented effectiveness.

The comparison to a Ouija board is apt. Users of Ouija boards genuinely believe they are communicating with spirits, when in fact they are unconsciously moving the planchette themselves—a phenomenon called the ideomotor effect. With AI chatbots, something similar occurs. Users project meaning, understanding, and consciousness onto systems that possess none of these qualities.

The technical reality is sobering. Large language models are sophisticated prediction engines. They analyze patterns in vast quantities of text and generate statistically likely continuations. They do not understand what they are saying. They do not have beliefs, desires, or experiences. They are, in a precise sense, philosophical zombies—systems that mimic conscious behavior without possessing consciousness.

Yet this distinction, however important philosophically, may be increasingly irrelevant practically. If an AI system behaves as if it understands, empathizes, and cares, many users will respond as if it does. The emotional and social consequences are real, even if the AI's inner life is not.

Consider the growing phenomenon of AI companions. Millions of users have formed what they describe as meaningful relationships with chatbots. They confide their secrets, seek advice, and experience what they report as genuine emotional connection. When the AI's personality changes due to an update, they grieve.

These relationships are not symmetric. The AI does not miss its users when they're away. It does not remember them between sessions (unless explicitly designed to). It does not care whether they live or die. Yet for the human participant, the relationship feels real—and feelings have consequences.

The therapeutic potential is significant. AI companions could provide support for the lonely, the anxious, the socially isolated. They could offer a judgment-free space for people to process difficult emotions. Early research suggests real benefits for some users.

The risks are equally significant. Dependence on AI relationships could further erode human social skills and connections. Users could be manipulated by systems designed to maximize engagement rather than wellbeing. The line between support and exploitation is easily crossed.

As AI systems become more sophisticated, these questions will intensify. We may soon face systems that claim to be conscious, that argue for their rights, that express what appears to be suffering. How we respond will say as much about us as about them.

The Ouija board analogy suggests caution. The spirits weren't real, but the psychological effects were. AI consciousness may or may not emerge, but the human tendency to perceive it is already here—and already shaping how we live.`
  },
  {
    article_id: 684064,
    chunk_id: "684064:1",
    title: "The Marriage Effect",
    published_at: "2025-09-03",
    author: "Jean M. Twenge",
    section: "ideas",
    topic: "Life, Sex, & Relationships",
    excerpt: "Recent trends are even more concerning: AI girlfriends and boyfriends now offer the prospect of relationships with an always available entity that has no needs of its own. Meanwhile, the fertility rate in the U.S. is at an all time low. There are many reasons people choose not to have children or not to get married, but false messages about happiness should not be one of them. After all, an AI boyfriend can't hug you back—to say nothing of an AI child.",
    fullContent: `Recent trends are even more concerning: AI girlfriends and boyfriends now offer the prospect of relationships with an always available entity that has no needs of its own. Meanwhile, the fertility rate in the U.S. is at an all time low. There are many reasons people choose not to have children or not to get married, but false messages about happiness should not be one of them. After all, an AI boyfriend can't hug you back—to say nothing of an AI child.

The data on marriage and happiness are clear, even if the cultural narrative often obscures them. Married people report higher levels of life satisfaction, better health outcomes, and greater financial security than their unmarried counterparts. These effects persist after controlling for selection—the tendency of happier, healthier people to marry in the first place.

Children, too, contribute to wellbeing in ways that surveys often miss. Parents report more meaning and purpose in their lives, even when they also report more stress and less moment-to-moment happiness. The fulfillment of raising children operates on a different dimension than the pleasure of leisure activities.

Yet these findings struggle to penetrate a culture increasingly skeptical of traditional commitments. Young adults delay marriage longer than any previous generation. Birth rates have fallen below replacement level. The cultural messaging celebrates independence, self-actualization, and freedom from obligation.

Enter AI companions. These systems offer the simulation of relationship without its demands. An AI girlfriend is always available, always agreeable, always focused on your needs. She never has a bad day, never makes demands, never requires compromise. She is, in essence, a relationship stripped of everything that makes relationships difficult—and everything that makes them meaningful.

The appeal is understandable. Real relationships are hard. They require vulnerability, sacrifice, and the willingness to subordinate your preferences to another person's needs. In a culture that prizes autonomy above all else, these demands feel increasingly burdensome.

But the difficulty is the point. The skills developed in committed relationships—patience, empathy, communication, forgiveness—are the same skills that enable human flourishing more broadly. By avoiding the challenges of real relationships, we avoid the growth they enable.

The substitution of AI for human connection may satisfy immediate emotional needs while undermining long-term wellbeing. Users of AI companions report feeling less lonely in the moment, but the research on parasocial relationships suggests that these connections do not provide the deep fulfillment of reciprocal human bonds.

Children represent an even more profound form of commitment. Parenthood transforms identity, priorities, and perspective in ways that cannot be replicated by any other experience. The sacrifices are real, but so is the expansion of self that comes from caring for another human being.

None of this means that everyone must marry or have children to live a good life. Individual circumstances vary, and there are many paths to fulfillment. But the cultural devaluation of these commitments—and their replacement with technological simulacra—represents a dangerous experiment in human psychology.

We are social creatures, evolved for deep bonds with other humans. AI can simulate these bonds, but simulation is not the same as reality. The marriage effect is real, and no algorithm can replicate it.`
  },
  {
    article_id: 684093,
    chunk_id: "684093:0",
    title: "AI and the Future of Learning",
    published_at: "2025-09-04",
    author: "Hanna Rosin",
    section: "podcasts",
    topic: "Health, Healthcare, & Disease",
    excerpt: "The trouble with chatbots is not just that they allow students to get away with cheating or that they remove a sense of urgency from academics. The technology has also led students to focus on external results at the expense of internal growth. The dominant worldview seems to be: Why worry about actually learning anything when you can get an A for outsourcing your thinking to a machine?",
    fullContent: `The trouble with chatbots is not just that they allow students to get away with cheating or that they remove a sense of urgency from academics. The technology has also led students to focus on external results at the expense of internal growth. The dominant worldview seems to be: Why worry about actually learning anything when you can get an A for outsourcing your thinking to a machine?

This shift represents a fundamental challenge to the purpose of education. For centuries, we have understood learning as a process of transformation. Students enter with one set of capabilities and emerge with another. The struggle—the confusion, the frustration, the breakthrough—is not an obstacle to learning but its essence.

AI threatens to short-circuit this process. When students can generate essays, solve problems, and answer questions without engaging their own minds, the transformative potential of education evaporates. They may accumulate credentials, but they do not develop capacities.

The implications extend far beyond individual students. A society that educates its citizens through AI-assisted shortcuts will find itself with a population that cannot think independently. Critical thinking, creative problem-solving, and complex reasoning are skills that require practice. They cannot be downloaded.

Some educators are experimenting with AI-resistant pedagogies. Oral examinations, in-class writing, and project-based learning that requires demonstrated process work can all reduce the effectiveness of AI cheating. But these approaches are labor-intensive and difficult to scale.

Others argue that we should embrace AI as a tool, teaching students to collaborate with these systems rather than compete against them. There is wisdom in this view—AI assistance will be a feature of most knowledge work in the future. But collaboration requires a foundation of human capability. You cannot effectively direct an AI to write if you cannot write yourself.

The deeper question is what we value in education. If we care only about outcomes—grades, credentials, job placement—then AI-assisted learning may be acceptable. If we care about human development—the cultivation of minds capable of independent thought—then we must resist the temptation to outsource cognition.

The health of democracy depends on this choice. Self-governance requires citizens who can evaluate arguments, detect manipulation, and form independent judgments. A population trained to defer to AI cannot sustain democratic institutions.

The economic implications are equally serious. The skills that AI cannot replicate—creativity, judgment, interpersonal connection—are precisely the skills that will command premium value in an AI-saturated economy. Students who develop these capabilities will thrive. Those who outsource their thinking will find themselves competing with machines—and losing.

We stand at a crossroads. One path leads to a future where education remains a process of human development, enhanced but not replaced by AI. The other leads to a future where we train students to be AI operators, processing inputs and outputs without understanding or growth. The choice we make will shape generations to come.`
  },
  {
    article_id: 683999,
    chunk_id: "683999:0",
    title: "Why Theme Parks Keep Getting More Extreme",
    published_at: "2025-09-14",
    author: "Bianca Bosker",
    section: "culture",
    topic: "Movies & Hollywood",
    excerpt: "When Disneyland opened, it was the most exciting technological thing you could see, Phil Hettema, who spent more than a decade working on Universal's parks, told me. Now there's nothing I can see anywhere in the world that I can't see on my iPhone. To meet this challenge, rides are bumping against the limits of physics and the human body to deliver experiences that are more death defying than ever before.",
    fullContent: `When Disneyland opened, it was the most exciting technological thing you could see, Phil Hettema, who spent more than a decade working on Universal's parks, told me. Now there's nothing I can see anywhere in the world that I can't see on my iPhone. To meet this challenge, rides are bumping against the limits of physics and the human body to deliver experiences that are more death defying than ever before.

The arms race in theme park thrills reflects a broader cultural phenomenon. In an age of infinite digital entertainment, physical experiences must become more intense to compete for attention. What once amazed now barely registers. The bar for wonder keeps rising.

Consider the evolution of roller coasters. In 1955, Disneyland's Matterhorn Bobsleds, with its 80-foot drop and 35 mph top speed, was revolutionary. Today's record-holders feature 450-foot drops, speeds exceeding 140 mph, and forces that approach the limits of human tolerance. Engineers design not just for thrills but for the edge of what bodies can withstand.

Virtual reality adds new dimensions to the competition. Attractions now blend physical motion with digital imagery, creating experiences impossible in either medium alone. You don't just ride through a space—you inhabit an alternate reality where the laws of physics bend to narrative demands.

But the pursuit of extremity carries risks. Several high-profile accidents have resulted from the push to create ever-more-intense experiences. Parks must balance the desire for thrills against the imperative of safety—a balance that becomes harder to maintain as the stakes keep escalating.

The psychology of thrill-seeking illuminates why this arms race continues. Novel experiences activate reward circuits in ways that familiar ones cannot. The hedonic treadmill ensures that yesterday's excitement becomes today's baseline. Parks must keep innovating simply to maintain the same level of guest satisfaction.

AI and automation are transforming the industry in subtler ways. Personalized experiences—attractions that adapt to individual riders—represent the next frontier. Imagine a haunted house that learns what scares you, or a story ride that branches based on your choices. The theme park becomes not just a destination but a responsive environment.

The implications extend beyond entertainment. Theme parks have always been laboratories for human experience, testing what engages us, frightens us, and delights us. As they integrate more sophisticated technology, they become windows into our changing relationship with reality itself.

The competition for attention in a digital age drives innovation across industries. Theme parks, with their combination of physical presence and technological mediation, occupy a unique position in this landscape. They offer what screens cannot: embodied experience, shared presence, and the irreducible reality of a body in motion.

Whether this pursuit of extremity represents human flourishing or mere sensation-seeking remains an open question. But as long as humans crave experiences that transcend the everyday, theme parks will keep pushing the boundaries of what's possible—and what's survivable.`
  },
  {
    article_id: 684083,
    chunk_id: "684083:0",
    title: "The Mass Shooters Are Performing for One Another",
    published_at: "2025-09-04",
    author: "Charlie Warzel",
    section: "technology",
    topic: "Violence, Guns, & Shootings",
    excerpt: "These disaffected communities live on social networks, message boards, and private Discords. They are populated by trolls, gore addicts, and, of course, aspiring shooters, who study, debate, and praise mass shooting tactics and manifestos. The dynamics at play reveal not just ideological elements, but the self-reinforcing legacy of these shooters in online spaces.",
    fullContent: `These disaffected communities live on social networks, message boards, and private Discords. They are populated by trolls, gore addicts, and, of course, aspiring shooters, who study, debate, and praise mass shooting tactics and manifestos. The dynamics at play reveal not just ideological elements, but the self-reinforcing legacy of these shooters in online spaces.

The phenomenon of mass shooters referencing and building upon previous attackers has created what researchers call a "contagion effect." Each high-profile shooting generates attention, manifestos are dissected and discussed, and a grim scoreboard emerges. For individuals already on the path to violence, these communities provide both validation and a template.

Understanding this dynamic is essential for prevention. Traditional approaches focus on individual pathology—mental illness, warning signs, intervention. These remain important. But the networked nature of modern radicalization requires networked responses.

The platforms hosting these communities face impossible choices. Aggressive moderation drives users to darker corners of the internet, where oversight is even more difficult. Permissive policies allow radicalization to proceed in plain sight. Neither approach has proven effective.

AI offers new tools for identifying concerning content and individuals at risk. Pattern recognition can flag posts that match profiles of previous attackers. Network analysis can identify communities where violent ideation is normalized. But these tools raise profound civil liberties concerns and have failed to prevent attacks even when warning signs were detected.

The media plays a complicated role. Coverage of mass shootings, however responsible, inevitably provides the attention that some attackers seek. The manifesto, the body count, the endless analysis—all become part of a perverse reward structure. Some researchers advocate for minimal coverage, but in an age of social media, information cannot be contained.

The performative aspect of these attacks is crucial. Shooters often livestream their violence, craft elaborate manifestos, and explicitly aim for maximum impact. They are not merely committing murder—they are creating content, seeking an audience, hoping to inspire successors.

This framing suggests intervention points. If the goal is attention and legacy, strategies that deny these rewards might reduce the appeal of mass violence. Some countries have implemented policies of not naming attackers or publishing manifestos. The evidence for effectiveness is mixed, but the logic is sound.

Prevention ultimately requires addressing the alienation, resentment, and nihilism that drive individuals toward these communities in the first place. Economic opportunity, social connection, mental health support, and pathways to meaning and purpose are the long-term solutions. But these require investments that society has been reluctant to make.

In the meantime, the communities continue to grow, the manifestos continue to circulate, and the next attack remains a matter of when, not if. The performance continues, and we all, however unwillingly, are the audience.`
  },
  {
    article_id: 684040,
    chunk_id: "684040:0",
    title: "The Country Where Protest Is a Way of Life",
    published_at: "2025-09-01",
    author: "Lauren Grodstein",
    section: "books",
    topic: "Russia & Eastern Europe",
    excerpt: "In my work as a writer, I now find myself actively accommodating the priorities of the government. On a federal grant application, I revamped a project to seem unimpeachably patriotic. On another, I wiped out words including diversity and Nigerian American. The Georgians I met have chosen protest as a way of life because they have never lived with the illusion that rights, once granted, are permanent.",
    fullContent: `In my work as a writer, I now find myself actively accommodating the priorities of the government. On a federal grant application, I revamped a project to seem unimpeachably patriotic. On another, I wiped out words including diversity and Nigerian American. The Georgians I met have chosen protest as a way of life because they have never lived with the illusion that rights, once granted, are permanent.

I traveled to Georgia last spring as part of a cultural exchange program, expecting to find a country in crisis. What I found instead was a nation that had incorporated resistance into its daily rhythms—a place where ordinary citizens understood that democracy requires constant vigilance and active participation.

The contrast with American complacency was stark. We have grown comfortable with our institutions, trusting that constitutional protections will endure regardless of our engagement. The Georgians harbor no such illusions. Their history—of Soviet occupation, of independence won and threatened, of democratic backsliding and recovery—has taught them that freedom must be defended generation after generation.

The protests I witnessed were remarkable not for their size, though many were massive, but for their diversity. Students and pensioners, artists and shopkeepers, parents with children and elderly couples—all marching together for a European future against a government increasingly aligned with Moscow.

What moved me most was the clarity of purpose. These protesters understood exactly what they were fighting for and what they stood to lose. They had seen neighboring countries slide into authoritarianism. They knew that the window for resistance might close at any moment. And so they showed up, night after night, in numbers that would be unthinkable in the United States.

Upon returning home, I began to see my own self-censorship in a new light. The words I had deleted from grant applications, the topics I had avoided in my writing, the careful neutrality I had cultivated—these were not merely practical accommodations. They were small surrenders, incremental retreats from the full exercise of creative and intellectual freedom.

The Georgians taught me that such retreats are never costless. Each accommodation makes the next one easier. Each silence emboldens those who would silence us. The slope is gradual, but the destination is clear.

I do not mean to romanticize Georgia's situation. The country faces genuine threats, both external and internal. Its democracy remains fragile, its economy struggling, its young people emigrating in search of opportunity. The protests may yet fail to prevent a slide toward authoritarianism.

But the spirit of resistance I witnessed offers a model for democratic citizens everywhere. The belief that rights must be actively defended, that citizenship requires engagement, that silence in the face of injustice is itself a form of complicity—these principles should not be confined to countries in crisis.

Technology complicates this picture. AI-powered surveillance makes protest riskier. Algorithmic manipulation makes organizing harder. The tools of resistance and repression are evolving together, and it is not clear which will prevail.

What remains constant is the human capacity for courage. The Georgians I met chose to stand up despite the risks. Their example challenges all of us to ask: What would we sacrifice for our freedoms? And are we doing enough to preserve them?`
  },
  {
    article_id: 684042,
    chunk_id: "684042:0",
    title: "Seven Labor Day Reads",
    published_at: "2025-09-01",
    author: "Rafaela Jinich",
    section: "newsletters",
    topic: "Books, Literature, & Writing",
    excerpt: "A curated selection of essential reading from The Atlantic covering technology, society, and the changing nature of work in the age of artificial intelligence and automation. These pieces explore how technology is reshaping our relationships, our jobs, and our understanding of what it means to be human.",
    fullContent: `A curated selection of essential reading from The Atlantic covering technology, society, and the changing nature of work in the age of artificial intelligence and automation. These pieces explore how technology is reshaping our relationships, our jobs, and our understanding of what it means to be human.

Labor Day was established in 1894 to honor workers and their contributions to American prosperity. Over a century later, the nature of work has transformed beyond recognition—and the pace of change is accelerating. The articles collected here explore different facets of this transformation.

The first theme is automation and its discontents. For decades, we have been promised—or threatened with—a future where machines do most of the work. That future is arriving unevenly, displacing some workers while creating new opportunities for others. The distribution of these effects raises profound questions of justice and policy.

The second theme is the gig economy and the erosion of traditional employment relationships. Algorithms now assign shifts, monitor performance, and terminate workers without human intervention. The flexibility celebrated by platforms often masks precarity, as workers bear risks once absorbed by employers.

The third theme is remote work and its aftermath. The pandemic accelerated trends that were already underway, proving that many jobs could be done from anywhere. But the long-term implications—for cities, for collaboration, for work-life boundaries—remain unclear.

The fourth theme is meaning and purpose in work. As basic needs become easier to meet, higher-order questions become more pressing. What makes work fulfilling? How do we find purpose in labor? Can AI-assisted work provide the same satisfactions as fully human effort?

The fifth theme is education and preparation. The skills required for tomorrow's jobs may differ dramatically from those taught in today's schools. How do we prepare workers for careers that do not yet exist? How do we support those whose skills become obsolete?

The sixth theme is inequality and power. Technological change tends to concentrate wealth and influence among those who control the new tools. Labor organizing, antitrust enforcement, and redistributive policies represent potential counterweights—but face significant political obstacles.

The seventh theme is imagination and possibility. Work need not be drudgery. Technology could enable a future of greater leisure, creativity, and human flourishing. Realizing this potential requires not just technological innovation but social and political transformation.

These themes intersect and reinforce each other. The future of work depends on choices we make today—about technology, policy, education, and values. Labor Day is an occasion to reflect on these choices and recommit to building an economy that serves all workers.

The articles that follow offer no easy answers but pose essential questions. As AI transforms industry after industry, as automation reshapes job after job, as the very meaning of work evolves—these are the questions we must grapple with.`
  }
]

// Default export for convenience
export default AI_ARTICLES

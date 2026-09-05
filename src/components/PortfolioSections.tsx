import { type CSSProperties } from 'react'
import sierraCollegeImg from '../../asset/education/Sierra College.PNG'
import sjsuImg from '../../asset/education/SJSU.PNG'
import transferImg from '../../asset/education/transfer_icon.PNG'
import bubbleImg from '../../asset/skill-bubble/bubble.PNG'
import './PortfolioSections.css'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

type BubbleSize = 'sm' | 'md' | 'lg'

type SkillBubble = {
  name: string
  /** Devicon SVG URL. */
  icon?: string
  monogram?: string
  size: BubbleSize
  /** Vertical offset in rem. */
  float: number
}

const PROJECTS = [
  {
    title: 'AGENTIS – AI Clinical Trial Matching Assistant',
    meta: 'IBM SkillsBuild · Team of 4',
    href: 'https://www.youtube.com/watch?v=bZ-Ext1nx0M',
    linkLabel: 'Watch demo',
    points: [
      'Built an AI multi-agent system that matches patients to clinical trials using ClinicalTrials.gov data.',
      'Developed ranking logic and output formatting to prioritize trials with eligibility + rationale.',
      'Parsed natural language patient profiles into structured inputs using RAG and agent workflows.',
      'Reduced manual trial search time by 60–70% for clinical research coordinators.',
    ],
  },
  {
    title: 'Hand Tracking Magic Spell Simulator',
    meta: 'Python · OpenCV · MediaPipe · TensorFlow/Keras',
    href: 'https://github.com/ythaw/Cast-Magic-Spell',
    linkLabel: 'GitHub',
    points: [
      'Real-time webcam spell caster with MediaPipe Hand Landmarker and pinch-to-draw tracking.',
      'Collected 200+ sigil samples and trained a CNN on 64×64 grayscale images (fire, water, earth).',
      'Closed-ring casting pipeline triggers elemental effects at ≥90% model confidence.',
    ],
  },
  {
    title: 'Wordle Clone',
    meta: 'React · JavaScript',
    href: 'https://wordle-clone-by-lone.vercel.app/',
    linkLabel: 'Live demo',
    points: [
      'Interactive Wordle-style game with external API word validation.',
      'Custom guess evaluation for repeated letters and partial matches.',
      'React Hooks for guesses, keyboard input, and game progression.',
    ],
  },
  {
    title: 'Movie Discovery Web Application',
    meta: 'React · Vite · Axios · TMDB API',
    href: 'https://wtmdb.onrender.com/',
    linkLabel: 'Live demo',
    points: [
      'Responsive app to fetch and display movie data from the TMDB API.',
      'Async data fetching and client-side state with React Hooks and Axios.',
    ],
  },
] as const

const SKILL_GROUPS: { label: string; skills: SkillBubble[] }[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg`, size: 'md', float: -0.55 },
      { name: 'HTML', icon: `${DEVICON}/html5/html5-original.svg`, size: 'sm', float: 0.45 },
      { name: 'CSS', icon: `${DEVICON}/css3/css3-original.svg`, size: 'md', float: -0.2 },
      { name: 'Python', icon: `${DEVICON}/python/python-original.svg`, size: 'lg', float: 0.35 },
      { name: 'Java', icon: `${DEVICON}/java/java-original.svg`, size: 'sm', float: -0.7 },
      { name: 'C++', icon: `${DEVICON}/cplusplus/cplusplus-original.svg`, size: 'md', float: 0.55 },
    ],
  },
  {
    label: 'AI / ML',
    skills: [
      { name: '', monogram: 'AI', size: 'md', float: 0.4 },
      { name: '', monogram: 'RAG', size: 'sm', float: -0.65 },
      { name: 'Prompt Engineering', monogram: 'PE', size: 'md', float: 0.15 },
      { name: 'Computer Vision', icon: `${DEVICON}/opencv/opencv-original.svg`, size: 'lg', float: -0.35 },
      { name: 'TensorFlow', icon: `${DEVICON}/tensorflow/tensorflow-original.svg`, size: 'md', float: 0.5 },
    ],
  },
  {
    label: 'Frameworks',
    skills: [
      { name: 'React', icon: `${DEVICON}/react/react-original.svg`, size: 'lg', float: -0.45 },
      { name: 'OpenCV', icon: `${DEVICON}/opencv/opencv-original.svg`, size: 'md', float: 0.5 },
      { name: 'MediaPipe', icon: `${DEVICON}/google/google-original.svg`, size: 'sm', float: -0.25 },
      { name: 'Bootstrap', icon: `${DEVICON}/bootstrap/bootstrap-original.svg`, size: 'md', float: 0.35 },
      { name: 'Tailwind', icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg`, size: 'sm', float: -0.6 },
      { name: 'JavaFX', icon: `${DEVICON}/java/java-original.svg`, size: 'md', float: 0.2 },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', icon: `${DEVICON}/git/git-original.svg`, size: 'lg', float: -0.3 },
      { name: 'Figma', icon: `${DEVICON}/figma/figma-original.svg`, size: 'md', float: 0.45 },
    ],
  },
]

export function PortfolioSections() {
  return (
    <div className="portfolio">
      <section id="about" className="portfolio__hero">
        <div className="portfolio__hero-inner">
          <h1 className="portfolio__name">
            <span className="portfolio__name-first">Yin Phyu Phyu</span>
            <span className="portfolio__name-last">Thaw</span>
          </h1>
          <div className="portfolio__hero-aside">
            <p className="portfolio__role">
              B.S. Computer Science · SJSU · GPA 3.9
            </p>
            <p className="portfolio__lede">
              I build playful interfaces and practical AI tools—from clinical-trial matching
              agents to webcam spell casters. Currently a website officer at AI/ML Club at SJSU
              and exploring frontend, computer vision, and multi-agent systems. 
            </p>
          </div>
        </div>
      </section>

      <section id="education" className="portfolio__section">
        <div className="portfolio__section-inner portfolio__section-inner--wide">
          <h2 className="portfolio__heading">Education</h2>
          <p className="portfolio__support">Where I’ve been learning and building.</p>

          <div className="portfolio__edu-path" aria-label="Education path from Sierra College to San José State University">
            <article className="portfolio__edu-stop">
              <img
                className="portfolio__edu-art"
                src={sierraCollegeImg}
                alt=""
                draggable={false}
              />
              <h3 className="portfolio__edu-school">Sierra College</h3>
              <p className="portfolio__edu-meta">A.S.-T Computer Science · May 2025</p>
            </article>

            <div className="portfolio__edu-transfer">
              <img
                className="portfolio__edu-plane"
                src={transferImg}
                alt=""
                draggable={false}
              />
              <p className="portfolio__edu-transfer-label">Transferred!</p>
            </div>

            <article className="portfolio__edu-stop">
              <img
                className="portfolio__edu-art"
                src={sjsuImg}
                alt=""
                draggable={false}
              />
              <h3 className="portfolio__edu-school">
                San José State University
                <span className="portfolio__edu-current">
                  <span className="portfolio__edu-current-dot" aria-hidden="true" />
                  current
                </span>
              </h3>
              <p className="portfolio__edu-meta">B.S. Computer Science · Expected May 2027</p>
              <p className="portfolio__edu-detail">GPA 3.9</p>
            </article>
          </div>
        </div>
      </section>

      <section id="work" className="portfolio__section">
        <div className="portfolio__section-inner">
          <h2 className="portfolio__heading">Projects</h2>
          <p className="portfolio__support">A few things I’ve built recently.</p>

          <div className="portfolio__project-list">
            {PROJECTS.map((project) => (
              <article key={project.title} className="portfolio__project">
                <div className="portfolio__project-head">
                  <h3 className="portfolio__project-title">{project.title}</h3>
                  <a
                    className="portfolio__project-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.linkLabel}
                  </a>
                </div>
                <p className="portfolio__project-meta">{project.meta}</p>
                <ul className="portfolio__project-points">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="portfolio__section">
        <div className="portfolio__section-inner portfolio__section-inner--skills">
          <h2 className="portfolio__heading portfolio__heading--skills">Skills</h2>
          <p className="portfolio__support portfolio__support--center">
            Tools I reach for most often.
          </p>

          <div className="portfolio__skills">
            {SKILL_GROUPS.map((group) => (
              <div key={group.label} className="portfolio__skill-row">
                <h3 className="portfolio__skill-label">{group.label}</h3>
                <ul className="portfolio__skill-bubbles">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={[
                        'portfolio__skill-bubble',
                        `portfolio__skill-bubble--${skill.size}`,
                      ].join(' ')}
                      style={{ '--skill-float': `${skill.float}rem` } as CSSProperties}
                    >
                      <span className="portfolio__skill-bubble-frame" aria-hidden="true">
                        <img src={bubbleImg} alt="" draggable={false} />
                      </span>
                      <span className="portfolio__skill-bubble-content">
                        {skill.icon ? (
                          <img
                            className="portfolio__skill-icon"
                            src={skill.icon}
                            alt=""
                            draggable={false}
                            loading="lazy"
                          />
                        ) : (
                          <span className="portfolio__skill-monogram" aria-hidden="true">
                            {skill.monogram}
                          </span>
                        )}
                        <span className="portfolio__skill-name">{skill.name}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio__section portfolio__section--contact">
        <div className="portfolio__section-inner">
          <h2 className="portfolio__heading">Contact</h2>
          <p className="portfolio__support">Say hi—I’m always up for a chat.</p>

          <ul className="portfolio__contact-list">
            <li>
              <a href="mailto:yppthaw@gmail.com">yppthaw@gmail.com</a>
            </li>
            <li>
              <a href="tel:+19168460491">(916) 846-0491</a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/yin-thaw" target="_blank" rel="noreferrer">
                linkedin.com/in/yin-thaw
              </a>
            </li>
            <li>
              <a href="https://github.com/ythaw" target="_blank" rel="noreferrer">
                github.com/ythaw
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default PortfolioSections

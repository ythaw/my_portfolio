import { type CSSProperties } from 'react'
import sierraCollegeImg from '../../asset/education/Sierra College.PNG'
import sjsuImg from '../../asset/education/SJSU.PNG'
import transferImg from '../../asset/education/transfer_icon.PNG'
import bubbleImg from '../../asset/skill-bubble/bubble.PNG'
import blackjackPreview from '../../asset/projects/blackjack.png'
import cookPreview from '../../asset/projects/cook.png'
import wordlePreview from '../../asset/projects/wordle.png'
import wtmdPreview from '../../asset/projects/wtmd.png'
import agentisPreview from '../../asset/projects/AGENTIS.png'
import castPreview from '../../asset/projects/cast.png'
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

const FEATURED_PROJECTS = [
  {
    id: 'agentis',
    windowTitle: 'AGENTIS',
    title: 'AGENTIS',
    blurb: 'An AI clinical trial matching assistant that understands patient profiles.',
    tags: ['Python', 'RAG', 'AI'],
    preview: agentisPreview,
    primary: {
      label: 'view project',
      href: 'https://www.youtube.com/watch?v=bZ-Ext1nx0M',
    },
    tilt: -2.8,
  },
  {
    id: 'lets-cook',
    windowTitle: "Let's Cook",
    title: "Let's Cook – AI-Assisted Cooking Companion",
    blurb: 'A pantry-smart cooking buddy that tracks groceries and makes dinner decisions easier.',
    tags: ['TypeScript', 'React Native', 'AI'],
    preview: cookPreview,
    primary: {
      label: 'view project',
      href: 'https://www.youtube.com/watch?v=773cCLWPJAA',
    },
    github: 'https://github.com/ythaw/Let-sCook',
    tilt: 1.2,
  },
  {
    id: 'spell',
    windowTitle: 'Magic Spell Simulator',
    title: 'Hand Tracking Magic Spell Simulator',
    blurb: 'Cast spells with your hands using computer vision.',
    tags: ['Python', 'OpenCV'],
    preview: castPreview,
    primary: {
      label: 'view project',
      href: 'https://github.com/ythaw/Cast-Magic-Spell',
    },
    github: 'https://github.com/ythaw/Cast-Magic-Spell',
    tilt: 0.6,
  },
  {
    id: 'wordle',
    windowTitle: 'Wordle Clone',
    title: 'Wordle Clone',
    blurb: 'A simple word game built with React.',
    tags: ['React', 'JavaScript'],
    preview: wordlePreview,
    primary: {
      label: 'live demo',
      href: 'https://wordle-clone-by-lone.vercel.app/',
    },
    tilt: 2.4,
  },
  {
    id: 'movies',
    windowTitle: 'Movie Discovery',
    title: 'Movie Discovery Web Application',
    blurb: 'Browse and discover movies with data from the TMDB API.',
    tags: ['React', 'Vite', 'Axios'],
    preview: wtmdPreview,
    primary: {
      label: 'live demo',
      href: 'https://wtmdb.onrender.com/',
    },
    tilt: -1.6,
  },
  {
    id: 'game-manager',
    windowTitle: 'Game Manager',
    title: 'Game Manager',
    blurb: 'A JavaFX game hub with Snake and Blackjack built in.',
    tags: ['Java', 'JavaFX'],
    preview: blackjackPreview,
    primary: {
      label: 'view demo',
      href: 'https://drive.google.com/file/d/1dl8GaAkFa3fc4eVlUHRBUGIs5ar_9Uf_/view?pli=1',
    },
    tilt: 1.8,
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

      <section id="work" className="portfolio__section portfolio__section--projects">
        <div className="portfolio__section-inner portfolio__section-inner--projects">
          <h2 className="portfolio__heading portfolio__heading--center">Projects</h2>
          <p className="portfolio__support portfolio__support--center">
            Things I’ve built recently.
          </p>

          <div className="portfolio__clothesline" aria-label="Featured projects">
            <ul className="portfolio__project-cards">
              {FEATURED_PROJECTS.map((project) => (
                <li
                  key={project.id}
                  className="portfolio__project-card"
                  style={{ '--project-tilt': `${project.tilt}deg` } as CSSProperties}
                >
                  <span className="portfolio__project-pin" aria-hidden="true" />

                  <article className="portfolio__project-sheet">
                    <div className="portfolio__project-window">
                      <div className="portfolio__project-window-bar">
                        <span className="portfolio__project-window-dots" aria-hidden="true">
                          <i /><i /><i />
                        </span>
                        <span className="portfolio__project-window-title">{project.windowTitle}</span>
                      </div>
                      <div className="portfolio__project-media">
                        {'preview' in project && project.preview ? (
                          <img
                            className="portfolio__project-media-img"
                            src={project.preview}
                            alt={`${project.title} preview`}
                            draggable={false}
                            loading="lazy"
                          />
                        ) : (
                          <span className="portfolio__project-media-label" aria-hidden="true">
                            preview soon
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="portfolio__project-title">{project.title}</h3>
                    <p className="portfolio__project-blurb">{project.blurb}</p>

                    <ul className="portfolio__project-tags">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>

                    <div className="portfolio__project-actions">
                      <a
                        className="portfolio__project-action portfolio__project-action--primary"
                        href={project.primary.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.primary.label}
                        <span aria-hidden="true"> →</span>
                      </a>
                      {('github' in project) && project.github && (
                        <>
                          <span className="portfolio__project-action-sep" aria-hidden="true">|</span>
                          <a
                            className="portfolio__project-action"
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub
                          </a>
                        </>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
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

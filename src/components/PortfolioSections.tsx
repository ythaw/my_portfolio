import { useEffect, useState, type CSSProperties } from 'react'
import sierraCollegeImg from '../../asset/education/Sierra College.PNG'
import sjsuImg from '../../asset/education/SJSU.PNG'
import transferImg from '../../asset/education/transfer_icon.PNG'
import bubbleImg from '../../asset/skill-bubble/bubble.PNG'
import blackjackPreview from '../../asset/projects/blackjack.webp'
import cookPreview from '../../asset/projects/cook.webp'
import wordlePreview from '../../asset/projects/wordle.webp'
import wtmdPreview from '../../asset/projects/wtmd.webp'
import agentisPreview from '../../asset/projects/AGENTIS.webp'
import castPreview from '../../asset/projects/cast.webp'
import aboutBookImg from '../../asset/aboutme/book.png'
import aboutNoteImg from '../../asset/aboutme/note.png'
import aboutNoteCardImg from '../../asset/aboutme/note-card.png'
import './PortfolioSections.css'

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons'

type BubbleSize = 'sm' | 'md' | 'lg'

type SkillBubble = {
  name: string
  icon?: string
  monogram?: string
  size: BubbleSize
  float: number
}

const FEATURED_PROJECTS = [
  {
    id: 'agentis',
    windowTitle: 'AGENTIS',
    title: 'AGENTIS',
    blurb: 'An AI clinical trial matching assistant for easy matching of patients and trials.',
    tags: ['RAG', 'AI', 'watsonX Orchestrate'],
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
    blurb: 'Cast spells with your hands using computer vision - inspired by Witch Hat Atelier.',
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
      { name: 'TypeScript', icon: `${DEVICON}/typescript/typescript-original.svg`, size: 'lg', float: 0.35 },
      { name: 'HTML', icon: `${DEVICON}/html5/html5-original.svg`, size: 'sm', float: 0.45 },
      { name: 'CSS', icon: `${DEVICON}/css3/css3-original.svg`, size: 'md', float: -0.2 },
      { name: 'Python', icon: `${DEVICON}/python/python-original.svg`, size: 'lg', float: 0.15 },
      { name: 'Java', icon: `${DEVICON}/java/java-original.svg`, size: 'sm', float: -0.7 },
      { name: 'C++', icon: `${DEVICON}/cplusplus/cplusplus-original.svg`, size: 'md', float: 0.55 },
    ],
  },
  {
    label: 'AI / ML',
    skills: [
      { name: 'AI Agents', monogram: 'AI', size: 'md', float: 0.4 },
      { name: 'RAG', monogram: 'RAG', size: 'sm', float: -0.65 },
      { name: 'Prompt Engineering', monogram: 'PE', size: 'md', float: 0.15 },
      { name: 'Computer Vision', icon: `${DEVICON}/opencv/opencv-original.svg`, size: 'lg', float: -0.35 },
    ],
  },
  {
    label: 'Libraries & Frameworks',
    skills: [
      { name: 'React', icon: `${DEVICON}/react/react-original.svg`, size: 'lg', float: -0.45 },
      { name: 'OpenCV', icon: `${DEVICON}/opencv/opencv-original.svg`, size: 'md', float: 0.5 },
      { name: 'MediaPipe', icon: `${DEVICON}/google/google-original.svg`, size: 'sm', float: -0.25 },
      { name: 'TensorFlow', icon: `${DEVICON}/tensorflow/tensorflow-original.svg`, size: 'md', float: 0.3 },
      { name: 'Keras', icon: `${DEVICON}/keras/keras-original.svg`, size: 'sm', float: -0.55 },
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
      { name: 'Vite', icon: `${DEVICON}/vitejs/vitejs-original.svg`, size: 'sm', float: -0.5 },
      { name: 'Axios', icon: `${DEVICON}/axios/axios-plain.svg`, size: 'md', float: 0.25 },
    ],
  },
]

function chunkSkillRows(skills: readonly SkillBubble[], maxPerRow = 4): SkillBubble[][] {
  // Languages (7): prefer a balanced 3 + 4 instead of 4 + 3.
  if (skills.length === 7) {
    return [skills.slice(0, 3), skills.slice(3)]
  }

  const rows: SkillBubble[][] = []
  for (let i = 0; i < skills.length; i += maxPerRow) {
    rows.push(skills.slice(i, i + maxPerRow))
  }
  return rows
}

export function PortfolioSections() {
  const [learningOpen, setLearningOpen] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 800px)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(max-width: 800px)')
    const sync = () => setIsNarrow(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (!learningOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLearningOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [learningOpen])

  const showLearningNote = !isNarrow || learningOpen

  const copyEmail = async () => {
    const email = 'yppthaw@gmail.com'
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      const field = document.createElement('textarea')
      field.value = email
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.left = '-9999px'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      document.body.removeChild(field)
    }
    setEmailCopied(true)
    window.setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <div className="portfolio">
      <section id="about" className="portfolio__hero">
        <div className="portfolio__about-board">
          <div className="portfolio__about-stack">
            <img
              className="portfolio__about-layer portfolio__about-layer--book"
              src={aboutBookImg}
              alt=""
              draggable={false}
            />
            <img
              className="portfolio__about-layer portfolio__about-layer--note"
              src={aboutNoteImg}
              alt=""
              draggable={false}
            />

            <div className="portfolio__about-copy">
              <button
                type="button"
                className="portfolio__about-learning-toggle"
                aria-expanded={learningOpen}
                aria-controls="about-learning-note"
                onClick={() => setLearningOpen(true)}
              >
                what I&apos;m learning
              </button>

              <h1 className="portfolio__about-heading">Thinking, Building, Experimenting</h1>
              <p className="portfolio__about-name">Yin Phyu Phyu Thaw</p>
              <p className="portfolio__about-role">CS student · SJSU · GPA 3.9</p>
              <p className="portfolio__about-body">
                AI tools, interactive experiences, and little experiments.
              </p>

              <ul className="portfolio__about-tags">
                <li className="portfolio__about-tag portfolio__about-tag--mint">
                  AI-powered tools
                </li>
                <li className="portfolio__about-tag portfolio__about-tag--peach">
                  Computer vision
                </li>
                <li className="portfolio__about-tag portfolio__about-tag--sky">
                  Interactive apps
                </li>
              </ul>

              <a
                className="portfolio__about-footer"
                href="https://www.ai-ml-club-sjsu.com/"
                target="_blank"
                rel="noreferrer"
              >
                Website Officer · SJSU AI/ML Club
              </a>
            </div>

            {learningOpen && (
              <button
                type="button"
                className="portfolio__about-learning-backdrop"
                aria-label="Close currently learning note"
                onClick={() => setLearningOpen(false)}
              />
            )}

            {showLearningNote && (
              <aside
                id="about-learning-note"
                className={[
                  'portfolio__about-learning',
                  learningOpen && 'portfolio__about-learning--open',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  className="portfolio__about-learning-note"
                  src={aboutNoteCardImg}
                  alt=""
                  draggable={false}
                />
                <div className="portfolio__about-learning-content">
                  <h2 className="portfolio__about-learning-title">currently learning</h2>
                  <ul className="portfolio__about-learning-list">
                    <li>AI agents</li>
                    <li>React / TypeScript</li>
                    <li>Computer Vision</li>
                    <li>bash scripting</li>
                    <li>Database / SQL</li>
                  </ul>
                </div>
              </aside>
            )}
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
                loading="lazy"
                decoding="async"
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
                loading="lazy"
                decoding="async"
              />
              <p className="portfolio__edu-transfer-label">Transferred!</p>
            </div>

            <article className="portfolio__edu-stop">
              <img
                className="portfolio__edu-art"
                src={sjsuImg}
                alt=""
                draggable={false}
                loading="lazy"
                decoding="async"
              />
              <h3 className="portfolio__edu-school">
                San José State University
                <span className="portfolio__edu-current">
                  <span className="portfolio__edu-current-dot" aria-hidden="true" />
                  current
                </span>
              </h3>
              <p className="portfolio__edu-meta">B.S. Computer Science · Expected December 2027</p>
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
                            decoding="async"
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
                <div className="portfolio__skill-rows">
                  {chunkSkillRows(group.skills).map((row, rowIndex) => (
                    <ul
                      key={`${group.label}-${rowIndex}`}
                      className="portfolio__skill-bubbles"
                    >
                      {row.map((skill) => (
                        <li
                          key={skill.name}
                          className={[
                            'portfolio__skill-bubble',
                            `portfolio__skill-bubble--${skill.size}`,
                          ].join(' ')}
                          style={{ '--skill-float': `${skill.float}rem` } as CSSProperties}
                        >
                          <span className="portfolio__skill-bubble-frame" aria-hidden="true">
                            <img src={bubbleImg} alt="" draggable={false} loading="lazy" decoding="async" />
                          </span>
                          <span className="portfolio__skill-bubble-content">
                            {skill.icon ? (
                              <img
                                className="portfolio__skill-icon"
                                src={skill.icon}
                                alt=""
                                draggable={false}
                                loading="lazy"
                                decoding="async"
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
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="portfolio__section portfolio__section--contact">
        <div className="portfolio__section-inner portfolio__section-inner--contact">
          <h2 className="portfolio__contact-heading">Leave a note.</h2>

          <div className="portfolio__contact-folder">
            <span className="portfolio__contact-tab">OPEN INVITATION</span>

            <div className="portfolio__contact-card">
              <p className="portfolio__contact-prompt">you can find me here:</p>

              <ul className="portfolio__contact-links">
                <li>
                  <button
                    type="button"
                    className={[
                      'portfolio__contact-link',
                      emailCopied && 'portfolio__contact-link--copied',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => void copyEmail()}
                    aria-label={emailCopied ? 'Email copied to clipboard' : 'Copy email to clipboard'}
                  >
                    {emailCopied ? 'copied to clipboard!' : 'yppthaw@gmail.com'}
                  </button>
                </li>
                <li>
                  <a
                    className="portfolio__contact-link"
                    href="https://www.linkedin.com/in/yin-thaw"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/yin-thaw
                  </a>
                </li>
                <li>
                  <a
                    className="portfolio__contact-link"
                    href="https://github.com/ythaw"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/ythaw
                  </a>
                </li>
              </ul>

              <p className="portfolio__contact-closing">Let&apos;s make something useful.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PortfolioSections

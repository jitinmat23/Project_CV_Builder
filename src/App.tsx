import { useRef, useState, type ChangeEvent } from 'react'
import html2pdf from 'html2pdf.js'
import './App.css'

type Experience = {
  position: string
  company: string
  dates: string
  description: string[]
}

type Education = {
  degree: string
  institution: string
  dates: string
  grade: string
}

type Certification = {
  name: string
  url: string
}

type Language = {
  name: string
  level: string
}

type SkillCategory = {
  category: string
  skills: string
}

function App() {
  /* =====================================================
     PERSONAL INFORMATION
     ===================================================== */

  const [name, setName] = useState('Jitin Mathew Thomas')
  const [jobTitle, setJobTitle] = useState('Software Test Engineer')
  const [email, setEmail] = useState('jitinmat23@gmail.com')
  const [phone, setPhone] = useState('+49 179 729 43 90')
  const [location, setLocation] = useState('85051 Ingolstadt')
  const [nationality, setNationality] = useState('Deutsch')
  const [drivingLicence, setDrivingLicence] = useState('B Klasse')
  const [birthday, setBirthday] = useState('23.04.1993, Mysuru')

  const [linkedin, setLinkedin] = useState(
    'linkedin.com/in/jitin-mathew-thomas-84115bb1'
  )

  const [linkedinUrl, setLinkedinUrl] = useState(
    'https://www.linkedin.com/in/jitin-mathew-thomas-84115bb1/'
  )

  const [xing, setXing] = useState('xing.com/profile/Jitin_Mathew')

  const [xingUrl, setXingUrl] = useState(
    'https://www.xing.com/'
  )

  const [github, setGithub] = useState(
    'github.com/jitinmathew'
  )

  const [githubUrl, setGithubUrl] = useState(
    'https://github.com/jitinmathew'
  )

  const [photo, setPhoto] = useState('')

  const [profile, setProfile] = useState(
    'Software Test Engineer with over 4 years’ experience in test automation, system testing and test strategy development. Experience in process optimisation and team leadership.'
  )

  /* =====================================================
     SKILLS
     ===================================================== */

  const [skillCategories, setSkillCategories] =
    useState<SkillCategory[]>([
      {
        category: 'Programming Language',
        skills: 'Python, C/C++',
      },
      {
        category: 'Simulation Tools',
        skills:
          'MATLAB/Simulink, ASCET, IPG CarMaker, Wireshark',
      },
      {
        category: 'Test Tools',
        skills:
          'GTest, TPT, Testweaver, Silver, IDeX, ODIS, OBD, DoIP',
      },
      {
        category: 'Development & Project Management',
        skills:
          'Codebeamer, Windchill RV&S, Engineering Client, Smaragd, JIRA, Confluence',
      },
      {
        category: 'DevOps & Systems',
        skills: 'Jenkins, Git, GitHub, WSL',
      },
      {
        category: 'CAD & Simulation',
        skills: 'Siemens NX, CATIA V5, AutoCAD',
      },
      {
        category: 'EDV',
        skills: 'Microsoft Office, LaTeX, Power BI',
      },
    ])

  /* =====================================================
     WORK EXPERIENCE
     ===================================================== */

  const [experiences, setExperiences] =
    useState<Experience[]>([
      {
        position: 'Senior Consultant',
        company: 'ESPRiT Engineering GmbH, Ingolstadt',
        dates: '11/2021 - Heute',
        description: [
          'Head of the Test Team for Powertrain Manager and Powertrain Observer at CARIAD.',
          'Translating customer requirements into test plans, test cases and test processes.',
          'Design and execution of simulations using virtual ECUs (vECUs).',
          'Dynamic testing to verify functional requirements.',
          'Development of Python scripts for test automation.',
          'Documentation of test results in accordance with project requirements.',
          'Migration of test projects from TPT to GTest.',
          'Close collaboration with developers and architects to analyse requirements.',
          'Conducting dynamic system tests, regression tests and fault analysis.',
          'Development and maintenance of unit and integration tests.',
          'Flashing software versions to electronic control units (ECUs).',
          'Analysis of log data and fault diagnosis.',
          'Preparation of test reports for approval.',
          'Conducting integration and regression tests.',
          'Validation of HMI functions in the HVAC sector.',
          'Error analysis and debugging.',
          'Improving test coverage.',
        ],
      },
      {
        position: 'Master Thesis - ACC',
        company:
          'Department of Electromobility, RPTU, Kaiserslautern',
        dates: '03/2021 - 09/2021',
        description: [
          'Design and implementation of an EACC system to minimise fuel consumption.',
          'Formulation as a mixed-integer quadratic programming problem with quadratic constraints (MIQCQP).',
          'Simulation and evaluation based on real driving data in various scenarios.',
          'Use of Bézier curves to model speed-dependent curve radii.',
          'Comparison of GPU- and CPU-based computation times for the optimisation problem.',
          'Integration and testing of the system in the driving simulator.',
        ],
      },
      {
        position: 'Internship',
        company: 'Battery Development, Mercedes-Benz AG',
        dates: '10/2019 - 03/2020',
        description: [
          'Concept development for battery housings for future electric vehicles.',
          'Investigation of thermal runaway and optimisation of safety components.',
        ],
      },
      {
        position: 'Product Design Engineer',
        company:
          'Mercedes-Benz Research and Development India',
        dates: '07/2015 - 08/2018',
        description: [
          'Development of door components for vehicle bodies, including simulation and series production.',
          'Optimisation in terms of corrosion protection, costs and quality.',
          'PLM-supported change management and 3D CAD design using NX.',
        ],
      },
    ])

  /* =====================================================
     EDUCATION
     ===================================================== */

  const [educations, setEducations] =
    useState<Education[]>([
      {
        degree: 'M.Sc. in Commercial Vehicle Technology',
        institution:
          'Technische Universität Kaiserslautern (now RPTU)',
        dates: '2018 - 2021',
        grade: '1.8',
      },
      {
        degree: 'B.E. Mechanical Engineering',
        institution:
          'The National Institute of Engineering, India',
        dates: '2011 - 2015',
        grade: '1.7',
      },
    ])

  /* =====================================================
     CERTIFICATIONS
     ===================================================== */

  const [certifications, setCertifications] =
    useState<Certification[]>([
      {
        name:
          'Certified Tester Advanced Level Test Analyst (ISTQB)',
        url: '',
      },
      {
        name:
          'Certified Professional for Requirements Engineering - Foundation Level (IREB)',
        url: '',
      },
      {
        name: 'Scrum Master',
        url: '',
      },
      {
        name:
          'Fundamentals of High Voltage Systems in Electric Vehicles (TÜV SÜD)',
        url: '',
      },
      {
        name:
          'Certified Tester Foundation Level (ISTQB)',
        url: '',
      },
    ])

  /* =====================================================
     LANGUAGES
     ===================================================== */

  const [languages, setLanguages] =
    useState<Language[]>([
      {
        name: 'Deutsch',
        level: 'B2',
      },
      {
        name: 'English',
        level: 'C1',
      },
      {
        name: 'Hindi',
        level: 'C1',
      },
      {
        name: 'Malayalam',
        level: 'C1',
      },
    ])

  /* =====================================================
     OTHER
     ===================================================== */

  const [publication, setPublication] =
    useState('IEEE VPPC Conference, 2021')

  const [publicationUrl, setPublicationUrl] =
    useState('')

  const [hobbies, setHobbies] =
    useState('Badminton, Travelling, Guitar, Cycling')

  const cvRef = useRef<HTMLDivElement>(null)

  /* =====================================================
     PHOTO UPLOAD
     ===================================================== */

  function handlePhotoUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      setPhoto(reader.result as string)
    }

    reader.readAsDataURL(file)
  }

  /* =====================================================
     HELPER
     ===================================================== */

  function getSafeUrl(url: string) {
    const trimmedUrl = url.trim()

    if (!trimmedUrl) {
      return ''
    }

    if (
      trimmedUrl.startsWith('https://') ||
      trimmedUrl.startsWith('http://') ||
      trimmedUrl.startsWith('mailto:')
    ) {
      return trimmedUrl
    }

    return `https://${trimmedUrl}`
  }

  /* =====================================================
     SKILLS FUNCTIONS
     ===================================================== */

  function addSkillCategory() {
    setSkillCategories([
      ...skillCategories,
      {
        category: 'New Skill Category',
        skills: '',
      },
    ])
  }

  function updateSkillCategory(
    index: number,
    field: keyof SkillCategory,
    value: string
  ) {
    const updated = [...skillCategories]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setSkillCategories(updated)
  }

  function deleteSkillCategory(index: number) {
    setSkillCategories(
      skillCategories.filter((_, i) => i !== index)
    )
  }

  /* =====================================================
     EXPERIENCE FUNCTIONS
     ===================================================== */

  function addExperience() {
    setExperiences([
      ...experiences,
      {
        position: 'New Position',
        company: 'Company',
        dates: '',
        description: ['New responsibility'],
      },
    ])
  }

  function updateExperience(
    index: number,
    field: keyof Experience,
    value: string
  ) {
    const updated = [...experiences]

    if (field === 'description') {
      updated[index].description = value.split('\n')
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      }
    }

    setExperiences(updated)
  }

  function deleteExperience(index: number) {
    setExperiences(
      experiences.filter((_, i) => i !== index)
    )
  }

  /* =====================================================
     EDUCATION FUNCTIONS
     ===================================================== */

  function addEducation() {
    setEducations([
      ...educations,
      {
        degree: 'New Degree',
        institution: 'Institution',
        dates: '',
        grade: '',
      },
    ])
  }

  function updateEducation(
    index: number,
    field: keyof Education,
    value: string
  ) {
    const updated = [...educations]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setEducations(updated)
  }

  function deleteEducation(index: number) {
    setEducations(
      educations.filter((_, i) => i !== index)
    )
  }

  /* =====================================================
     CERTIFICATION FUNCTIONS
     ===================================================== */

  function addCertification() {
    setCertifications([
      ...certifications,
      {
        name: 'New Certification',
        url: '',
      },
    ])
  }

  function updateCertification(
    index: number,
    field: keyof Certification,
    value: string
  ) {
    const updated = [...certifications]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setCertifications(updated)
  }

  function deleteCertification(index: number) {
    setCertifications(
      certifications.filter((_, i) => i !== index)
    )
  }

  /* =====================================================
     LANGUAGE FUNCTIONS
     ===================================================== */

  function addLanguage() {
    setLanguages([
      ...languages,
      {
        name: 'New Language',
        level: 'B1',
      },
    ])
  }

  function updateLanguage(
    index: number,
    field: keyof Language,
    value: string
  ) {
    const updated = [...languages]

    updated[index] = {
      ...updated[index],
      [field]: value,
    }

    setLanguages(updated)
  }

  function deleteLanguage(index: number) {
    setLanguages(
      languages.filter((_, i) => i !== index)
    )
  }

  /* =====================================================
     PDF DOWNLOAD
     ===================================================== */

  function downloadPDF() {
    if (!cvRef.current) return

    const element = cvRef.current

    const options = {
      margin: [8, 10, 8, 10],

      filename:
        `${name.replace(/\s+/g, '_')}_CV.pdf`,

      image: {
        type: 'jpeg' as const,
        quality: 0.98,
      },

      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      },

      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait' as const,
        compress: true,
      },

      pagebreak: {
        mode: ['css', 'legacy'],
      },
    }

    html2pdf()
      .set(options)
      .from(element)
      .save()
  }

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div className="app">

      {/* =================================================
          LEFT EDITOR
          ================================================= */}

      <div className="editor">

        <div className="editor-header">

          <h1>CV Builder</h1>

          <p>
            Edit the information below.
            The CV preview updates automatically.
          </p>

          <button
            className="download-button"
            onClick={downloadPDF}
          >
            Download PDF
          </button>

        </div>

        {/* =================================================
            PERSONAL INFORMATION
            ================================================= */}

        <section className="editor-section">

          <div className="editor-section-heading">
            <h2>Personal Information</h2>
          </div>

          <div className="editor-card personal-card">

            <label>
              Full Name

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </label>

            <label>
              Job Title

              <input
                value={jobTitle}
                onChange={(e) =>
                  setJobTitle(e.target.value)
                }
              />
            </label>

            <label>
              Email

              <input
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </label>

            <label>
              Phone

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />
            </label>

            <label>
              Location

              <input
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            </label>

            <label>
              Nationality

              <input
                value={nationality}
                onChange={(e) =>
                  setNationality(e.target.value)
                }
              />
            </label>

            <label>
              Driving Licence

              <input
                value={drivingLicence}
                onChange={(e) =>
                  setDrivingLicence(e.target.value)
                }
              />
            </label>

            <label>
              Date / Place of Birth

              <input
                value={birthday}
                onChange={(e) =>
                  setBirthday(e.target.value)
                }
              />
            </label>

            {/* LINKEDIN */}

            <label>
              LinkedIn Display Text

              <input
                value={linkedin}
                onChange={(e) =>
                  setLinkedin(e.target.value)
                }
              />
            </label>

            <label>
              LinkedIn URL

              <input
                type="url"
                placeholder="https://www.linkedin.com/in/..."
                value={linkedinUrl}
                onChange={(e) =>
                  setLinkedinUrl(e.target.value)
                }
              />
            </label>

            {/* XING */}

            <label>
              XING Display Text

              <input
                value={xing}
                onChange={(e) =>
                  setXing(e.target.value)
                }
              />
            </label>

            <label>
              XING URL

              <input
                type="url"
                placeholder="https://www.xing.com/profile/..."
                value={xingUrl}
                onChange={(e) =>
                  setXingUrl(e.target.value)
                }
              />
            </label>

            {/* GITHUB */}

            <label>
              GitHub Display Text

              <input
                value={github}
                onChange={(e) =>
                  setGithub(e.target.value)
                }
              />
            </label>

            <label>
              GitHub URL

              <input
                type="url"
                placeholder="https://github.com/..."
                value={githubUrl}
                onChange={(e) =>
                  setGithubUrl(e.target.value)
                }
              />
            </label>

            {/* PHOTO */}

            <label>
              Profile Photo

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </label>

          </div>

        </section>

        {/* =================================================
            PROFILE
            ================================================= */}

        <section className="editor-section">

          <h2>Profile</h2>

          <div className="editor-card">

            <textarea
              className="profile-editor"
              value={profile}
              onChange={(e) =>
                setProfile(e.target.value)
              }
            />

          </div>

        </section>

        {/* =================================================
            PROFESSIONAL SKILLS
            ================================================= */}

        <section className="editor-section">

          <div className="section-title-row">

            <h2>Professional Skills</h2>

            <button onClick={addSkillCategory}>
              + Add
            </button>

          </div>

          {skillCategories.map(
            (skill, index) => (

              <details
                className="editor-item"
                key={index}
                open={index === 0}
              >

                <summary>

                  <div className="item-summary">

                    <span className="item-number">
                      {index + 1}
                    </span>

                    <div>

                      <strong>
                        {skill.category ||
                          'New Skill Category'}
                      </strong>

                      <span>
                        {skill.skills ||
                          'No skills added'}
                      </span>

                    </div>

                  </div>

                </summary>

                <div className="item-body">

                  <label>
                    Category

                    <input
                      value={skill.category}
                      onChange={(e) =>
                        updateSkillCategory(
                          index,
                          'category',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Skills

                    <input
                      value={skill.skills}
                      onChange={(e) =>
                        updateSkillCategory(
                          index,
                          'skills',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteSkillCategory(index)
                    }
                  >
                    Delete Skill Category
                  </button>

                </div>

              </details>

            )
          )}

        </section>

        {/* =================================================
            WORK EXPERIENCE
            ================================================= */}

        <section className="editor-section">

          <div className="section-title-row">

            <h2>Work Experience</h2>

            <button onClick={addExperience}>
              + Add Experience
            </button>

          </div>

          {experiences.map(
            (experience, index) => (

              <details
                className="editor-item"
                key={index}
                open={index === 0}
              >

                <summary>

                  <div className="item-summary">

                    <span className="item-number">
                      {index + 1}
                    </span>

                    <div>

                      <strong>
                        {experience.position ||
                          'New Position'}
                      </strong>

                      <span>
                        {experience.company ||
                          'Company'}
                      </span>

                      <small>
                        {experience.dates}
                      </small>

                    </div>

                  </div>

                </summary>

                <div className="item-body">

                  <label>
                    Position

                    <input
                      value={experience.position}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          'position',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Company

                    <input
                      value={experience.company}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          'company',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Dates

                    <input
                      value={experience.dates}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          'dates',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Responsibilities

                    <span className="helper-text">
                      Enter one bullet point per line.
                    </span>

                    <textarea
                      value={experience.description.join(
                        '\n'
                      )}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          'description',
                          e.target.value
                        )
                      }
                    />

                  </label>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteExperience(index)
                    }
                  >
                    Delete Experience
                  </button>

                </div>

              </details>

            )
          )}

        </section>

        {/* =================================================
            EDUCATION
            ================================================= */}

        <section className="editor-section">

          <div className="section-title-row">

            <h2>Education</h2>

            <button onClick={addEducation}>
              + Add Education
            </button>

          </div>

          {educations.map(
            (education, index) => (

              <details
                className="editor-item"
                key={index}
                open={index === 0}
              >

                <summary>

                  <div className="item-summary">

                    <span className="item-number">
                      {index + 1}
                    </span>

                    <div>

                      <strong>
                        {education.degree ||
                          'New Degree'}
                      </strong>

                      <span>
                        {education.institution ||
                          'Institution'}
                      </span>

                      <small>
                        {education.dates}
                      </small>

                    </div>

                  </div>

                </summary>

                <div className="item-body">

                  <label>
                    Degree

                    <input
                      value={education.degree}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          'degree',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Institution

                    <input
                      value={
                        education.institution
                      }
                      onChange={(e) =>
                        updateEducation(
                          index,
                          'institution',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Dates

                    <input
                      value={education.dates}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          'dates',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Grade

                    <input
                      value={education.grade}
                      onChange={(e) =>
                        updateEducation(
                          index,
                          'grade',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteEducation(index)
                    }
                  >
                    Delete Education
                  </button>

                </div>

              </details>

            )
          )}

        </section>

        {/* =================================================
            CERTIFICATIONS
            ================================================= */}

        <section className="editor-section">

          <div className="section-title-row">

            <h2>Certifications</h2>

            <button onClick={addCertification}>
              + Add Certification
            </button>

          </div>

          {certifications.map(
            (certification, index) => (

              <details
                className="editor-item"
                key={index}
                open={index === 0}
              >

                <summary>

                  <div className="item-summary">

                    <span className="item-number">
                      {index + 1}
                    </span>

                    <div>

                      <strong>
                        {certification.name ||
                          'New Certification'}
                      </strong>

                      {certification.url && (
                        <span>
                          Link added
                        </span>
                      )}

                    </div>

                  </div>

                </summary>

                <div className="item-body">

                  <label>
                    Certification

                    <input
                      value={
                        certification.name
                      }
                      onChange={(e) =>
                        updateCertification(
                          index,
                          'name',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Certification Link

                    <span className="helper-text">
                      Optional. Enter the webpage for
                      this certification.
                    </span>

                    <input
                      type="url"
                      placeholder="https://..."
                      value={
                        certification.url
                      }
                      onChange={(e) =>
                        updateCertification(
                          index,
                          'url',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteCertification(index)
                    }
                  >
                    Delete Certification
                  </button>

                </div>

              </details>

            )
          )}

        </section>

        {/* =================================================
            LANGUAGES
            ================================================= */}

        <section className="editor-section">

          <div className="section-title-row">

            <h2>Languages</h2>

            <button onClick={addLanguage}>
              + Add Language
            </button>

          </div>

          {languages.map(
            (language, index) => (

              <details
                className="editor-item"
                key={index}
                open={index === 0}
              >

                <summary>

                  <div className="item-summary">

                    <span className="item-number">
                      {index + 1}
                    </span>

                    <div>

                      <strong>
                        {language.name ||
                          'New Language'}
                      </strong>

                      <span>
                        {language.level}
                      </span>

                    </div>

                  </div>

                </summary>

                <div className="item-body">

                  <label>
                    Language

                    <input
                      value={language.name}
                      onChange={(e) =>
                        updateLanguage(
                          index,
                          'name',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <label>
                    Level

                    <input
                      value={language.level}
                      onChange={(e) =>
                        updateLanguage(
                          index,
                          'level',
                          e.target.value
                        )
                      }
                    />
                  </label>

                  <button
                    className="delete-button"
                    onClick={() =>
                      deleteLanguage(index)
                    }
                  >
                    Delete Language
                  </button>

                </div>

              </details>

            )
          )}

        </section>

        {/* =================================================
            PUBLICATION
            ================================================= */}

        <section className="editor-section">

          <h2>Publication</h2>

          <div className="editor-card">

            <label>
              Publication

              <input
                value={publication}
                onChange={(e) =>
                  setPublication(e.target.value)
                }
              />
            </label>

            <label>
              Publication Link

              <span className="helper-text">
                Optional. Enter the webpage, DOI or
                publication URL.
              </span>

              <input
                type="url"
                placeholder="https://..."
                value={publicationUrl}
                onChange={(e) =>
                  setPublicationUrl(e.target.value)
                }
              />
            </label>

          </div>

        </section>

        {/* =================================================
            HOBBIES
            ================================================= */}

        <section className="editor-section">

          <h2>Hobbies</h2>

          <div className="editor-card">

            <input
              value={hobbies}
              onChange={(e) =>
                setHobbies(e.target.value)
              }
            />

          </div>

        </section>

      </div>

      {/* =================================================
          RIGHT CV PREVIEW
          ================================================= */}

      <div className="preview">

        <div
          className="cv"
          ref={cvRef}
        >

          {/* =================================================
              HEADER
              ================================================= */}

          <div className="cv-top">

            <div className="cv-photo-column">

              {photo ? (

                <img
                  src={photo}
                  alt="Profile"
                  className="cv-profile-photo"
                />

              ) : (

                <div className="cv-photo-placeholder">
                  PHOTO
                </div>

              )}

            </div>

            <div className="cv-header">

              <div className="cv-header-content">

                <h1>
                  {name}
                </h1>

                <div className="header-rule"></div>

                <h3>
                  {jobTitle}
                </h3>

              </div>

            </div>

          </div>

          {/* =================================================
              CV BODY
              ================================================= */}

          <div className="cv-content">

            {/* =================================================
                SIDEBAR
                ================================================= */}

            <aside className="cv-sidebar">

              {/* CONTACT */}

              <section className="sidebar-section">

                <h2>CONTACT</h2>

                <div className="contact-row">
                  {location}
                </div>

                <div className="contact-row">
                  {phone}
                </div>

                <div className="contact-row">
                  {email}
                </div>

                {linkedin && (
                  <div className="contact-row">

                    {linkedinUrl ? (
                      <a
                        href={getSafeUrl(
                          linkedinUrl
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkedin}
                      </a>
                    ) : (
                      linkedin
                    )}

                  </div>
                )}

                {xing && (
                  <div className="contact-row">

                    {xingUrl ? (
                      <a
                        href={getSafeUrl(xingUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {xing}
                      </a>
                    ) : (
                      xing
                    )}

                  </div>
                )}

                {github && (
                  <div className="contact-row">

                    {githubUrl ? (
                      <a
                        href={getSafeUrl(
                          githubUrl
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {github}
                      </a>
                    ) : (
                      github
                    )}

                  </div>
                )}

                <div className="contact-row">
                  {drivingLicence}
                </div>

                <div className="contact-row">
                  {birthday}
                </div>

                <div className="contact-row">
                  Nationality: {nationality}
                </div>

              </section>

              {/* EDUCATION */}

              <section className="sidebar-section">

                <h2>EDUCATION</h2>

                {educations.map(
                  (education, index) => (

                    <div
                      className="sidebar-entry"
                      key={index}
                    >

                      <strong>
                        {education.dates}
                      </strong>

                      <b>
                        {education.degree}
                      </b>

                      <span>
                        {education.institution}
                      </span>

                      <span>
                        Note: {education.grade}
                      </span>

                    </div>

                  )
                )}

              </section>

              {/* ADVANCED TRAINING */}

              <section className="sidebar-section">

                <h2>
                  ADVANCED TRAINING
                </h2>

                {certifications.map(
                  (certification, index) => (

                    <div
                      className="sidebar-entry"
                      key={index}
                    >

                      {certification.url ? (

                        <a
                          href={getSafeUrl(
                            certification.url
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {certification.name}
                        </a>

                      ) : (

                        certification.name

                      )}

                    </div>

                  )
                )}

              </section>

              {/* LANGUAGES */}

              <section className="sidebar-section">

                <h2>LANGUAGES</h2>

                {languages.map(
                  (language, index) => (

                    <div
                      className="language-row"
                      key={index}
                    >

                      <span>
                        {language.name}
                      </span>

                      <strong>
                        {language.level}
                      </strong>

                    </div>

                  )
                )}

              </section>

              {/* PUBLICATION */}

              <section className="sidebar-section">

                <h2>PUBLICATION</h2>

                {publicationUrl ? (

                  <p>
                    <a
                      href={getSafeUrl(
                        publicationUrl
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {publication}
                    </a>
                  </p>

                ) : (

                  <p>
                    {publication}
                  </p>

                )}

              </section>

              {/* HOBBIES */}

              <section className="sidebar-section">

                <h2>HOBBIES</h2>

                <p>
                  {hobbies}
                </p>

              </section>

            </aside>

            {/* =================================================
                MAIN CONTENT
                ================================================= */}

            <main className="cv-main">

              {/* PROFILE */}

              <section className="cv-section">

                <h2>PROFILE</h2>

                <p>
                  {profile}
                </p>

              </section>

              {/* SKILLS */}

              <section className="cv-section">

                <h2>
                  PROFESSIONAL SKILLS
                </h2>

                <div className="skills-list">

                  {skillCategories.map(
                    (skill, index) => (

                      <div
                        className="skill-category"
                        key={index}
                      >

                        <strong>
                          {skill.category}:
                        </strong>

                        <span>
                          {skill.skills}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </section>

              {/* WORK EXPERIENCE */}

              <section className="cv-section">

                <h2>
                  WORK EXPERIENCE
                </h2>

                {experiences.map(
                  (experience, index) => (

                    <article
                      className="experience-entry"
                      key={index}
                    >

                      <div className="experience-header">

                        <div>

                          <h3>
                            {experience.position}
                          </h3>

                          <div className="company">
                            {experience.company}
                          </div>

                        </div>

                        <span className="date-badge">
                          {experience.dates}
                        </span>

                      </div>

                      <div className="experience-bullets">

                        {experience.description
                          .filter(
                            (item) =>
                              item.trim() !== ''
                          )
                          .map(
                            (
                              item,
                              bulletIndex
                            ) => (

                              <div
                                className="experience-bullet"
                                key={bulletIndex}
                              >

                                <span className="bullet-symbol">
                                  •
                                </span>

                                <span className="bullet-text">
                                  {item}
                                </span>

                              </div>

                            )
                          )}

                      </div>

                    </article>

                  )
                )}

              </section>

            </main>

          </div>

        </div>

      </div>

    </div>
  )
}

export default App
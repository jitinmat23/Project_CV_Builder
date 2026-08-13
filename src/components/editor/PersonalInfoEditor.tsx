import { useCV } from '../../context/CVContext'

export default function PersonalInfoEditor() {
  const { cv, updatePersonal, updatePhoto } = useCV()

  const fields = [
    ['name', 'Full Name'],
    ['jobTitle', 'Job Title'],
    ['email', 'Email'],
    ['phone', 'Phone'],
    ['location', 'Location'],
    ['nationality', 'Nationality'],
    ['drivingLicence', 'Driving Licence'],
    ['birthday', 'Date / Place of Birth'],
    ['linkedin', 'LinkedIn Display Text'],
    ['linkedinUrl', 'LinkedIn URL'],
    ['xing', 'XING Display Text'],
    ['xingUrl', 'XING URL'],
    ['github', 'GitHub Display Text'],
    ['githubUrl', 'GitHub URL'],
  ] as const

  return (
    <div className="editor-card personal-card">
      {fields.map(([field, label]) => (
        <label key={field}>
          {label}
          <input
            type={field.endsWith('Url') ? 'url' : 'text'}
            placeholder={field.endsWith('Url') ? 'https://...' : undefined}
            value={cv.personal[field]}
            onChange={e => updatePersonal(field, e.target.value)}
          />
        </label>
      ))}

      <label>
        Profile Photo
        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) updatePhoto(file)
          }}
        />
      </label>
    </div>
  )
}

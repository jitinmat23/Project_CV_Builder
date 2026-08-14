import { useState } from 'react'
import { useCV } from '../../context/CVContext'

export default function ProfileManager() {
  const {
    profiles,
    activeProfileId,
    createProfile,
    duplicateProfile,
    renameProfile,
    deleteProfile,
    selectProfile,
  } = useCV()

  const [renameId, setRenameId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')

  function handleCreate() {
    // Deliberately no prompt/modal here.
    // This makes the button work immediately and reliably.
    createProfile('New CV')
  }

  function startRename(id: string, currentName: string) {
    setRenameId(id)
    setRenameValue(currentName)
  }

  function saveRename() {
    if (!renameId) return

    const name = renameValue.trim()
    if (!name) return

    renameProfile(renameId, name)
    setRenameId(null)
    setRenameValue('')
  }

  function cancelRename() {
    setRenameId(null)
    setRenameValue('')
  }

  return (
    <section className="profile-manager">
      <div className="profile-manager-header">
        <div className="profile-manager-heading">
          <h2>MY CV PROFILES</h2>
          <p>
            Create separate CVs for different career targets.
          </p>
        </div>

        <button
          type="button"
          className="profile-create-button"
          onClick={handleCreate}
        >
          + New CV
        </button>
      </div>

      <div className="profile-list">
        {profiles.map(profile => {
          const isActive = profile.id === activeProfileId
          const isRenaming = renameId === profile.id

          return (
            <article
              className={`profile-card${isActive ? ' active' : ''}`}
              key={profile.id}
            >
              <button
                type="button"
                className="profile-select"
                onClick={() => selectProfile(profile.id)}
              >
                <span className="profile-icon">
                  {isActive ? '✓' : 'CV'}
                </span>

                <span className="profile-info">
                  {isRenaming ? (
                    <input
                      autoFocus
                      className="profile-rename-input"
                      value={renameValue}
                      onChange={event => setRenameValue(event.target.value)}
                      onClick={event => event.stopPropagation()}
                      onKeyDown={event => {
                        if (event.key === 'Enter') saveRename()
                        if (event.key === 'Escape') cancelRename()
                      }}
                    />
                  ) : (
                    <strong>{profile.name}</strong>
                  )}

                  {isActive && (
                    <small className="profile-status">Active CV</small>
                  )}
                </span>
              </button>

              <div className="profile-actions">
                {isRenaming ? (
                  <>
                    <button
                      type="button"
                      className="profile-action save"
                      onClick={saveRename}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="profile-action"
                      onClick={cancelRename}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="profile-action"
                    onClick={() => startRename(profile.id, profile.name)}
                  >
                    Rename
                  </button>
                )}

                <button
                  type="button"
                  className="profile-action"
                  onClick={() => duplicateProfile(profile.id)}
                >
                  Duplicate
                </button>

                <button
                  type="button"
                  className="profile-action delete"
                  onClick={() => deleteProfile(profile.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

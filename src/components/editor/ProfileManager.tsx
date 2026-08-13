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

  const [renameId, setRenameId] =
    useState<string | null>(null)

  const [renameValue, setRenameValue] =
    useState('')

  function handleCreate() {
    // Create immediately.
    // The new CV will become active automatically.
    createProfile('New CV')
  }

  function startRename(
    id: string,
    currentName: string
  ) {
    setRenameId(id)
    setRenameValue(currentName)
  }

  function saveRename() {
    if (!renameId) {
      return
    }

    const name =
      renameValue.trim()

    if (!name) {
      return
    }

    renameProfile(
      renameId,
      name
    )

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

        <div>

          <h2>
            MY CV PROFILES
          </h2>

          <p>
            Create separate CVs for
            different career targets.
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

          const isActive =
            profile.id ===
            activeProfileId

          const isRenaming =
            renameId ===
            profile.id

          return (

            <div
              className={`profile-card ${
                isActive
                  ? 'active'
                  : ''
              }`}
              key={profile.id}
            >

              <button
                type="button"
                className="profile-select"
                onClick={() =>
                  selectProfile(
                    profile.id
                  )
                }
              >

                <span className="profile-icon">

                  {isActive
                    ? '✓'
                    : 'CV'}

                </span>

                <span className="profile-info">

                  {isRenaming ? (

                    <input
                      autoFocus
                      className="profile-rename-input"
                      value={
                        renameValue
                      }
                      onChange={e =>
                        setRenameValue(
                          e.target.value
                        )
                      }
                      onClick={e =>
                        e.stopPropagation()
                      }
                      onKeyDown={e => {

                        if (
                          e.key ===
                          'Enter'
                        ) {
                          saveRename()
                        }

                        if (
                          e.key ===
                          'Escape'
                        ) {
                          cancelRename()
                        }

                      }}
                    />

                  ) : (

                    <strong>
                      {profile.name}
                    </strong>

                  )}

                  <small>
                    {profile.cv.personal.jobTitle ||
                      'CV profile'}
                  </small>

                </span>

              </button>

              <div className="profile-actions">

                {isRenaming ? (

                  <>
                    <button
                      type="button"
                      onClick={
                        saveRename
                      }
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={
                        cancelRename
                      }
                    >
                      Cancel
                    </button>
                  </>

                ) : (

                  <button
                    type="button"
                    onClick={() =>
                      startRename(
                        profile.id,
                        profile.name
                      )
                    }
                  >
                    Rename
                  </button>

                )}

                <button
                  type="button"
                  onClick={() =>
                    duplicateProfile(
                      profile.id
                    )
                  }
                >
                  Duplicate
                </button>

                <button
                  type="button"
                  className="profile-delete"
                  onClick={() =>
                    deleteProfile(
                      profile.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          )

        })}

      </div>

    </section>
  )
}
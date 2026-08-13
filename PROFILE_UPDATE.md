# Multiple CV Profiles update

Replace these complete files in your project:

- `src/context/CVContext.tsx`
- `src/components/editor/ProfileManager.tsx` (new)
- `src/components/editor/CVEditor.tsx`
- `src/App.tsx`

Add the CSS from `src/profile-manager.css` to the END of your existing `src/App.css`.

Then run:

```bash
npm run build
npm run dev
```

The existing single-CV localStorage data under `cv-builder-data-v1` is automatically migrated into the first profile.

Features:
- Create New CV
- Switch between CV profiles
- Rename CV
- Duplicate CV
- Delete CV
- Automatic saving of all profiles
- Each profile has independent CV data
- Existing CV data is migrated
- PDF download uses the currently selected profile

import './styles/index.css'

import { CVProvider } from './context/CVContext'

import CVEditor from './components/editor/CVEditor'
import CVPreview from './components/preview/CVPreview'

function App() {
  return (
    <CVProvider>
      <div className="app">
        <CVEditor />
        <CVPreview />
      </div>
    </CVProvider>
  )
}

export default App

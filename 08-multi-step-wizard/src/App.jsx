import './App.css'
import { OnboardingProvider } from './components/OnboardingProvider';
import Wizard from './components/Wizard';

function App() {
  return (
    <>
    <OnboardingProvider>
      <div className="min-h-screen bg-slate-900 text-white p-8 flex justify-center items-center">
        <Wizard />
      </div>
    </OnboardingProvider>
    </>
  )
}

export default App;
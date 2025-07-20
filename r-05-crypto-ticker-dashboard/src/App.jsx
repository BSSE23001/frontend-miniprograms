import './App.css'
// import CryptoDashboard from './components/CryptoDashboard'
import CryptoDashboardOpt from './components/CryptoDashboardOpt'

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className='text-3xl font-bold mb-5'>Crypto Tinker Dashboard</h1>
        {/* <CryptoDashboard /> */}
        <CryptoDashboardOpt />
      </div>
    </>
  )
}

export default App

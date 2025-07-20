import './App.css'
import UserSearch from './components/UserSearch'

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <h1 className='text-4xl font-bold mb-6'>Github User Search</h1>
        <UserSearch />
      </div>
    </>
  )
}

export default App

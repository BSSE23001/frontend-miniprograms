import './App.css'
import Counter from './components/Counter'

function App() {
  return (
    <>
      <div className="App">
        <h1>Multiple Counters Example</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Render multiple instances of the Counter component, each with different props */}
          <Counter init_val={0} step={1} title='Standard Counter' />
          <Counter init_val={10} step={5} title='Fast Counter' />
          <Counter init_val={-5} step={2} title='Negatice Start Counter' />
          <Counter title='Default Counter' />
        </div>
      </div>
    </>
  )
}

export default App

import CriptoSearchForm from "./components/CriptoSearchForm"

function App() {

  return (
    <>
      <div className="container">
        <h1 className="app-title">
          <span>Cryptocurrency</span> Quotes
        </h1>

        <div className="content">
          <CriptoSearchForm />
        </div>
      </div>
      
    </>
  )
}

export default App

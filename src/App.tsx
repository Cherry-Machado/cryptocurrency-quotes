import CriptoSearchForm from "./components/CriptoSearchForm"

// The main application component that renders the cryptocurrency quote search form and the overall layout of the app.
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

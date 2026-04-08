import { useEffect, useState } from "react"
import CriptoSearchForm from "./components/CriptoSearchForm"
import { useCryptoStore } from "./store"
import CryptoPriceDisplay from "./components/CryptoPriceDisplay"
import dayBackground from "./assets/theme-switch/Day.svg"
import moonIcon from "./assets/theme-switch/Moon.svg"
import nightBackground from "./assets/theme-switch/Night.svg"
import sunIcon from "./assets/theme-switch/Sun.svg"

const THEME_STORAGE_KEY = "crypto-quotes-theme"

// The main application component that renders the cryptocurrency quote search form and the overall layout of the app.
function App() {
  const fetchCryptos = useCryptoStore((state) => state.fetchCryptos)
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") {
      return "light"
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return savedTheme === "dark" ? "dark" : "light"
  })

  // Load the cryptocurrency list once when the app first mounts.
  useEffect(() => {
    fetchCryptos()
  }, [fetchCryptos])

  useEffect(() => {
    document.body.dataset.theme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const isLightMode = theme === "light"

  return (
    <>
      <button
        aria-checked={isLightMode}
        aria-label={`Switch to ${isLightMode ? "dark" : "light"} mode`}
        className={`theme-switch ${isLightMode ? "is-light" : "is-dark"}`}
        onClick={() =>
          setTheme((currentTheme) =>
            currentTheme === "dark" ? "light" : "dark",
          )
        }
        role="switch"
        type="button"
      >
        <span className="sr-only">
          {isLightMode ? "Light mode is active" : "Dark mode is active"}
        </span>

        <span className="theme-switch__track" aria-hidden="true">
          <img
            alt=""
            className="theme-switch__bg theme-switch__bg--night"
            src={nightBackground}
          />
          <img
            alt=""
            className="theme-switch__bg theme-switch__bg--day"
            src={dayBackground}
          />
          <span className="theme-switch__thumb">
            <img
              alt=""
              className="theme-switch__icon theme-switch__icon--moon"
              src={moonIcon}
            />
            <img
              alt=""
              className="theme-switch__icon theme-switch__icon--sun"
              src={sunIcon}
            />
          </span>
        </span>
      </button>

      <div className="container">
        <h1 className="app-title">
          <span>Cryptocurrency</span> Quotes
        </h1>

        <div className="content">
          <CriptoSearchForm />
          <CryptoPriceDisplay />
        </div>
      </div>
    </>
  )
}

export default App

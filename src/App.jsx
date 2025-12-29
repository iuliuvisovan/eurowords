import { useState, useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from 'react-simple-maps'
import { europeanCountries, countryTranslations, findCountryByName } from './countryData'
import './App.css'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

// Europe bounding box for the map
const europeCenter = [15, 54]
const europeZoom = 4

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  const handleSearch = (e) => {
    const term = e.target.value
    setSearchTerm(term)

    if (term.trim()) {
      const found = findCountryByName(term)
      setSelectedCountry(found)
    } else {
      setSelectedCountry(null)
    }
  }

  const translations = useMemo(() => {
    if (!selectedCountry) return {}
    return countryTranslations[selectedCountry] || {}
  }, [selectedCountry])

  const countryName = selectedCountry ? europeanCountries[selectedCountry]?.name : ''

  return (
    <div className="app">
      <header className="header">
        <h1>EuroWords</h1>
        <p className="subtitle">See how country names are written across Europe</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Type a country name (e.g., Germany, Romania)..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          {selectedCountry && (
            <div className="found-indicator">
              Found: <strong>{countryName}</strong>
            </div>
          )}
          {searchTerm && !selectedCountry && (
            <div className="not-found-indicator">
              Country not found. Try: Germany, Romania
            </div>
          )}
        </div>
      </header>

      <div className="map-container">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: europeCenter,
            scale: 600,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <ZoomableGroup center={europeCenter} zoom={1} minZoom={0.5} maxZoom={4}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#e8e8e8"
                    stroke="#fff"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { fill: '#d0d0d0', outline: 'none' },
                      pressed: { outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Render country name labels */}
            {selectedCountry && Object.entries(europeanCountries).map(([code, data]) => {
              const translation = translations[code]
              if (!translation) return null

              return (
                <Marker key={code} coordinates={data.coordinates}>
                  <text
                    textAnchor="middle"
                    className="country-label"
                    style={{
                      fontFamily: 'system-ui, sans-serif',
                      fontSize: code === selectedCountry ? '14px' : '10px',
                      fontWeight: code === selectedCountry ? 'bold' : 'normal',
                      fill: code === selectedCountry ? '#c41e3a' : '#333',
                      textShadow: '1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white',
                    }}
                  >
                    {translation}
                  </text>
                </Marker>
              )
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <footer className="footer">
        <p>Scroll to zoom, drag to pan</p>
      </footer>
    </div>
  )
}

export default App

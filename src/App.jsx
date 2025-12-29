import { useState, useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps'
import { europeanCountries, countryTranslations } from './countryData'
import './App.css'

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

// Map country names to ISO codes for highlighting
const countryNameToISO = {
  "Germany": "DEU",
  "Romania": "ROU",
}

// Available countries (the ones we have translations for)
const availableCountries = [
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
]

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const translations = useMemo(() => {
    if (!selectedCountry) return {}
    return countryTranslations[selectedCountry] || {}
  }, [selectedCountry])

  const selectedCountryData = availableCountries.find(c => c.code === selectedCountry)

  const handleCountryClick = (code) => {
    setSelectedCountry(selectedCountry === code ? null : code)
  }

  const getCountryFill = (geo) => {
    const countryName = geo.properties.name
    const isoCode = countryNameToISO[countryName]

    // Highlight the selected country
    if (selectedCountry === 'DE' && isoCode === 'DEU') return '#2563eb'
    if (selectedCountry === 'RO' && isoCode === 'ROU') return '#2563eb'

    return '#e5e7eb'
  }

  return (
    <div className="app">
      <header className="header">
        <h1>EuroWords</h1>
        <p className="subtitle">Click a country to see how its name is written across Europe</p>

        <div className="country-buttons">
          {availableCountries.map(country => (
            <button
              key={country.code}
              className={`country-btn ${selectedCountry === country.code ? 'active' : ''}`}
              onClick={() => handleCountryClick(country.code)}
            >
              <span className="flag">{country.flag}</span>
              <span className="name">{country.name}</span>
            </button>
          ))}
        </div>

        {selectedCountryData && (
          <div className="selected-indicator">
            Showing: <strong>{selectedCountryData.name}</strong>
          </div>
        )}
      </header>

      <div className="map-container">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            center: [15, 52],
            scale: 700,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryFill(geo)}
                  stroke="#fff"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { outline: 'none' },
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

            const isSelected = code === selectedCountry

            return (
              <Marker key={code} coordinates={data.coordinates}>
                <text
                  textAnchor="middle"
                  dy={isSelected ? 0 : 0}
                  className={`country-label ${isSelected ? 'selected' : ''}`}
                >
                  {translation}
                </text>
              </Marker>
            )
          })}
        </ComposableMap>
      </div>
    </div>
  )
}

export default App

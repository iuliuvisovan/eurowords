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

const geoNameToCode = {
  ...Object.fromEntries(
    Object.entries(europeanCountries).map(([code, data]) => [data.name, code])
  ),
  "Bosnia and Herzegovina": "BA",
  "Bosnia and Herz.": "BA",
  "Bosnia Herzegovina": "BA",
  "Bosnia-Herzegovina": "BA",
  "Macedonia": "MK",
  "Republic of North Macedonia": "MK",
}
const availableCountryCodes = new Set(Object.keys(countryTranslations))

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const translations = useMemo(() => {
    if (!selectedCountry) return {}
    return countryTranslations[selectedCountry] || {}
  }, [selectedCountry])

  const handleGeoClick = (geo) => {
    const name = geo.properties.name
    const code = geoNameToCode[name]

    if (code && availableCountryCodes.has(code)) {
      setSelectedCountry(selectedCountry === code ? null : code)
    }
  }

  const getCountryFill = (geo) => {
    const name = geo.properties.name
    const code = geoNameToCode[name]

    // Highlight clickable countries
    if (code && availableCountryCodes.has(code)) {
      return selectedCountry === code ? "#2563eb" : "#93c5fd"
    }

    return "#e5e7eb"
  }

  const isClickable = (geo) => {
    const name = geo.properties.name
    const code = geoNameToCode[name]
    return code && availableCountryCodes.has(code)
  }

  return (
    <div className="app">
      {!selectedCountry && (
        <div className="floating-hint">
          Click on a country
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [15, 52],
          scale: 700,
        }}
        className="map"
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
                onClick={() => handleGeoClick(geo)}
                className={isClickable(geo) ? 'clickable' : ''}
                style={{
                  default: { outline: 'none' },
                  hover: {
                    fill: isClickable(geo) ? '#3b82f6' : '#e5e7eb',
                    outline: 'none',
                    cursor: isClickable(geo) ? 'pointer' : 'default'
                  },
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
                className={`country-label ${isSelected ? 'selected' : ''}`}
              >
                {translation}
              </text>
            </Marker>
          )
        })}
      </ComposableMap>
    </div>
  )
}

export default App

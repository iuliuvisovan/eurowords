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

const flagOverrides = {
  XK: "🇽🇰",
}

const countryLanguages = {
  PT: "Portuguese",
  ES: "Spanish",
  FR: "French",
  AD: "Catalan",
  BE: "Dutch/French/German",
  NL: "Dutch",
  DE: "German",
  LI: "German",
  CH: "German/French/Italian/Romansh",
  AT: "German",
  IT: "Italian",
  MC: "French",
  SM: "Italian",
  VA: "Italian/Latin",
  SI: "Slovene",
  HR: "Croatian",
  BA: "Bosnian/Serbian/Croatian",
  RS: "Serbian",
  ME: "Montenegrin",
  AL: "Albanian",
  MK: "Macedonian",
  GR: "Greek",
  BG: "Bulgarian",
  RO: "Romanian",
  MD: "Romanian",
  UA: "Ukrainian",
  BY: "Belarusian/Russian",
  PL: "Polish",
  CZ: "Czech",
  SK: "Slovak",
  HU: "Hungarian",
  LT: "Lithuanian",
  LV: "Latvian",
  EE: "Estonian",
  FI: "Finnish/Swedish",
  SE: "Swedish",
  NO: "Norwegian",
  DK: "Danish",
  IE: "Irish/English",
  GB: "English",
  IS: "Icelandic",
  RU: "Russian",
  TR: "Turkish",
  GE: "Georgian",
  AM: "Armenian",
  AZ: "Azerbaijani",
  CY: "Greek/Turkish",
  MT: "Maltese/English",
  LU: "Luxembourgish/French/German",
  XK: "Albanian/Serbian",
}

const getFlagEmoji = (code) => {
  if (!code) return ""
  if (flagOverrides[code]) return flagOverrides[code]
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(0x1f1e6 + char.charCodeAt(0) - 65))
}

function App() {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [hoveredCountry, setHoveredCountry] = useState(null)
  const [hoveredCountryCode, setHoveredCountryCode] = useState(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const selectedCountryName = selectedCountry
    ? europeanCountries[selectedCountry]?.name
    : null
  const selectedCountryFlag = selectedCountry
    ? getFlagEmoji(selectedCountry)
    : ""

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
      return selectedCountry === code ? "#059669" : "#ffffff"
    }

    return "rgba(255, 255, 255, 0.2)"
  }

  const isClickable = (geo) => {
    const name = geo.properties.name
    const code = geoNameToCode[name]
    return code && availableCountryCodes.has(code)
  }

  const getHoverLabel = (geo) => {
    const name = geo.properties.name
    const code = geoNameToCode[name]
    const language = code ? countryLanguages[code] : null
    return language ? `${name} - ${language}` : name
  }

  return (
    <div className="app">
      <div className="floating-hint">
        {selectedCountryName
          ? `${selectedCountryFlag} What "${selectedCountryName}" is called in different European languages`
          : "Click on a country"}
      </div>
      {hoveredCountry && (
        <div
          className="hover-tooltip"
          style={{
            left: cursorPos.x + 12,
            top: cursorPos.y + 12,
          }}
        >
          {hoveredCountry}
        </div>
      )}

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [15, 50],
          scale: 800,
        }}
        className="map"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name
              const code = geoNameToCode[name]
              const clickable = code && availableCountryCodes.has(code)
              const isSelected = code && selectedCountry === code

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryFill(geo)}
                  stroke="#90a4b8"
                  strokeWidth={0.5}
                  onClick={() => handleGeoClick(geo)}
                  onMouseEnter={() => {
                    setHoveredCountry(getHoverLabel(geo))
                    setHoveredCountryCode(code || null)
                  }}
                  onMouseLeave={() => {
                    setHoveredCountry(null)
                    setHoveredCountryCode(null)
                  }}
                  onMouseMove={(event) => {
                    setCursorPos({ x: event.clientX, y: event.clientY })
                  }}
                  className={clickable ? 'clickable' : ''}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      fill: clickable
                        ? (isSelected ? "#059669" : "#a7f3d0")
                        : 'rgba(229, 231, 235, 0.6)',
                      outline: 'none',
                      cursor: clickable ? 'pointer' : 'default'
                    },
                    pressed: { outline: 'none' },
                  }}
                />
              )
            })
          }
        </Geographies>

        {/* Render country name labels */}
        {selectedCountry && Object.entries(europeanCountries).map(([code, data]) => {
          const translation = translations[code]
          if (!translation) return null

          const isSelected = code === selectedCountry
          const labelOffsets = {
            NO: { lat: -3, dx: 0 },
            SE: { lat: -3, dx: -50 },
            FI: { lat: -3, dx: 0 },
          }
          const labelCoords = [
            data.coordinates[0],
            data.coordinates[1] + (labelOffsets[code]?.lat || 0),
          ]
          const labelDx = labelOffsets[code]?.dx || 0
          return (
            <Marker key={code} coordinates={labelCoords}>
              <text
                textAnchor="middle"
                className={`country-label ${isSelected ? 'selected' : ''}`}
                dx={labelDx}
              >
                {`${getFlagEmoji(code)} ${translation}`}
              </text>
            </Marker>
          )
        })}
        {!selectedCountry && hoveredCountryCode && europeanCountries[hoveredCountryCode] && (
          <Marker
            coordinates={europeanCountries[hoveredCountryCode].coordinates}
          >
            <text textAnchor="middle" className="hover-flag">
              {getFlagEmoji(hoveredCountryCode)}
            </text>
          </Marker>
        )}
      </ComposableMap>
    </div>
  )
}

export default App

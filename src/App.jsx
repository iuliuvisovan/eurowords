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

const groupBaseColors = {
  1: "#00ff88",
  2: "#00ffff",
  3: "#0057ff",
  4: "#c084fc",
  5: "#00b7ff",
  6: "#ffae00",
  7: "#ff5a00",
  0: "#00c26a",
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
      if (selectedCountry) {
        if (code === selectedCountry) return getGroupColor(1, 0.9)
        const translationEntry = translations[code]
        const groupNumber = translationEntry ? translationEntry.groupNumber : 0
        return getGroupColor(groupNumber, 0.75)
      }
      return "#ffffff"
    }

    return "rgba(229, 231, 235, 0.6)"
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

  const toRgba = (hex, alpha) => {
    const value = hex.replace("#", "")
    const r = parseInt(value.slice(0, 2), 16)
    const g = parseInt(value.slice(2, 4), 16)
    const b = parseInt(value.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const getGroupColor = (groupNumber, alpha) => {
    const hex = groupBaseColors[groupNumber] || groupBaseColors[0]
    return toRgba(hex, alpha)
  }

  const getBaseLabelSize = (name) => {
    if (!name) return 8
    if (name.length >= 22) return 6
    if (name.length >= 18) return 6.5
    if (name.length >= 14) return 7
    return 8
  }

  return (
    <div className="app">
      <div className="floating-hint">
        {selectedCountryName ? (
          <>
            {selectedCountryFlag} What "
            <span className="title-country">{selectedCountryName}</span>
            " is called in different European languages
          </>
        ) : (
          "Click on a country"
        )}
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
              const hoverFill = clickable
                ? (selectedCountry
                  ? (code === selectedCountry
                    ? getGroupColor(1, 1)
                    : (() => {
                      const translationEntry = translations[code]
                      const groupNumber = translationEntry ? translationEntry.groupNumber : 0
                      return getGroupColor(groupNumber, 1)
                    })())
                  : (isSelected ? getGroupColor(1, 1) : "rgba(167, 243, 208, 0.9)"))
                : "rgba(229, 231, 235, 0.6)"

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryFill(geo)}
                  stroke="#1f2937"
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
                      fill: hoverFill,
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
          const translationEntry = translations[code]
          if (!translationEntry) return null
          const translation = translationEntry.value

          const isSelected = code === selectedCountry
          const labelOffsets = {
            NO: { lat: -3, dx: 0 },
            SE: { lat: -3, dx: -50 },
            FI: { lat: -3, dx: 0 },
            EE: { lat: 0, dx: 10 },
            LV: { lat: 0, dx: 0 },
            FR: { lat: 0, dx: 0, dy: 10 },
          }
          const labelCoords = [
            data.coordinates[0],
            data.coordinates[1] + (labelOffsets[code]?.lat || 0),
          ]
          const labelDx = labelOffsets[code]?.dx || 0
          const labelDy = labelOffsets[code]?.dy || 0
          const sizeFactor = data.sizeFactor || 5
          const baseLabelSize = getBaseLabelSize(selectedCountryName)
          const fontSize = (baseLabelSize + sizeFactor * 0.9 + (isSelected ? 3 : 0)) * 0.85
          return (
            <Marker key={code} coordinates={labelCoords}>
              <text
                textAnchor="middle"
                className={`country-label ${isSelected ? 'selected' : ''}`}
                dx={labelDx}
                dy={labelDy}
                style={{ fontSize: `${fontSize}px` }}
              >
                <tspan className="label-flag">
                  {getFlagEmoji(code)}
                </tspan>
                <tspan> {translation}</tspan>
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

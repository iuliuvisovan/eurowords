// Country positions (approximate center coordinates for label placement)
// Using longitude, latitude format for react-simple-maps
export const europeanCountries = {
  // Country code: { name: English name, coordinates: [lng, lat] }
  PT: { name: "Portugal", coordinates: [-8.2, 39.5] },
  ES: { name: "Spain", coordinates: [-3.7, 40.4] },
  FR: { name: "France", coordinates: [2.3, 46.6] },
  BE: { name: "Belgium", coordinates: [4.4, 50.8] },
  NL: { name: "Netherlands", coordinates: [5.3, 52.1] },
  DE: { name: "Germany", coordinates: [10.4, 51.2] },
  CH: { name: "Switzerland", coordinates: [8.2, 46.8] },
  AT: { name: "Austria", coordinates: [14.5, 47.5] },
  IT: { name: "Italy", coordinates: [12.6, 42.5] },
  SI: { name: "Slovenia", coordinates: [14.9, 46.1] },
  HR: { name: "Croatia", coordinates: [15.9, 45.1] },
  BA: { name: "Bosnia", coordinates: [17.7, 43.9] },
  RS: { name: "Serbia", coordinates: [21.0, 44.0] },
  ME: { name: "Montenegro", coordinates: [19.3, 42.7] },
  AL: { name: "Albania", coordinates: [20.1, 41.3] },
  MK: { name: "North Macedonia", coordinates: [21.7, 41.5] },
  GR: { name: "Greece", coordinates: [22.0, 39.0] },
  BG: { name: "Bulgaria", coordinates: [25.5, 42.7] },
  RO: { name: "Romania", coordinates: [25.0, 45.9] },
  MD: { name: "Moldova", coordinates: [28.8, 47.0] },
  UA: { name: "Ukraine", coordinates: [32.0, 49.0] },
  BY: { name: "Belarus", coordinates: [28.0, 53.5] },
  PL: { name: "Poland", coordinates: [19.1, 52.0] },
  CZ: { name: "Czechia", coordinates: [15.5, 49.8] },
  SK: { name: "Slovakia", coordinates: [19.5, 48.7] },
  HU: { name: "Hungary", coordinates: [19.5, 47.2] },
  LT: { name: "Lithuania", coordinates: [24.0, 55.2] },
  LV: { name: "Latvia", coordinates: [24.6, 56.9] },
  EE: { name: "Estonia", coordinates: [25.0, 58.6] },
  FI: { name: "Finland", coordinates: [26.0, 64.0] },
  SE: { name: "Sweden", coordinates: [18.6, 62.0] },
  NO: { name: "Norway", coordinates: [8.5, 62.0] },
  DK: { name: "Denmark", coordinates: [9.5, 56.0] },
  IE: { name: "Ireland", coordinates: [-8.0, 53.4] },
  GB: { name: "United Kingdom", coordinates: [-2.0, 54.0] },
  IS: { name: "Iceland", coordinates: [-19.0, 65.0] },
  RU: { name: "Russia", coordinates: [40.0, 56.0] },
  TR: { name: "Turkey", coordinates: [35.0, 39.0] },
  CY: { name: "Cyprus", coordinates: [33.4, 35.1] },
  MT: { name: "Malta", coordinates: [14.4, 35.9] },
  LU: { name: "Luxembourg", coordinates: [6.1, 49.8] },
  XK: { name: "Kosovo", coordinates: [20.9, 42.6] },
};

// Translations of country names in different European languages
// Key: Country code (which country's name we're translating)
// Value: Object with language codes as keys and translations as values
export const countryTranslations = {
  DE: { // Germany in different languages
    PT: "Alemanha",
    ES: "Alemania",
    FR: "Allemagne",
    BE: "Allemagne",
    NL: "Duitsland",
    DE: "Deutschland",
    CH: "Deutschland",
    AT: "Deutschland",
    IT: "Germania",
    SI: "Nemčija",
    HR: "Njemačka",
    BA: "Njemačka",
    RS: "Nemačka",
    ME: "Njemačka",
    AL: "Gjermania",
    MK: "Германија",
    GR: "Γερμανία",
    BG: "Германия",
    RO: "Germania",
    MD: "Germania",
    UA: "Німеччина",
    BY: "Нямеччына",
    PL: "Niemcy",
    CZ: "Německo",
    SK: "Nemecko",
    HU: "Németország",
    LT: "Vokietija",
    LV: "Vācija",
    EE: "Saksamaa",
    FI: "Saksa",
    SE: "Tyskland",
    NO: "Tyskland",
    DK: "Tyskland",
    IE: "An Ghearmáin",
    GB: "Germany",
    IS: "Þýskaland",
    RU: "Германия",
    TR: "Almanya",
    CY: "Γερμανία",
    MT: "Il-Ġermanja",
    LU: "Däitschland",
    XK: "Gjermania",
  },
  RO: { // Romania in different languages
    PT: "Roménia",
    ES: "Rumania",
    FR: "Roumanie",
    BE: "Roumanie",
    NL: "Roemenië",
    DE: "Rumänien",
    CH: "Rumänien",
    AT: "Rumänien",
    IT: "Romania",
    SI: "Romunija",
    HR: "Rumunjska",
    BA: "Rumunija",
    RS: "Румунија",
    ME: "Rumunija",
    AL: "Rumania",
    MK: "Романија",
    GR: "Ρουμανία",
    BG: "Румъния",
    RO: "România",
    MD: "România",
    UA: "Румунія",
    BY: "Румынія",
    PL: "Rumunia",
    CZ: "Rumunsko",
    SK: "Rumunsko",
    HU: "Románia",
    LT: "Rumunija",
    LV: "Rumānija",
    EE: "Rumeenia",
    FI: "Romania",
    SE: "Rumänien",
    NO: "Romania",
    DK: "Rumænien",
    IE: "An Rómáin",
    GB: "Romania",
    IS: "Rúmenía",
    RU: "Румыния",
    TR: "Romanya",
    CY: "Ρουμανία",
    MT: "Ir-Rumanija",
    LU: "Rumänien",
    XK: "Rumania",
  },
  GB: { // United Kingdom in different languages
    PT: "Reino Unido",
    ES: "Reino Unido",
    FR: "Royaume-Uni",
    BE: "Royaume-Uni",
    NL: "Verenigd Koninkrijk",
    DE: "Vereinigtes Königreich",
    CH: "Vereinigtes Königreich",
    AT: "Vereinigtes Königreich",
    IT: "Regno Unito",
    SI: "Združeno kraljestvo",
    HR: "Ujedinjeno Kraljevstvo",
    BA: "Ujedinjeno Kraljevstvo",
    RS: "Ujedinjeno Kraljevstvo",
    ME: "Ujedinjeno Kraljevstvo",
    AL: "Mbretëria e Bashkuar",
    MK: "Обединето Кралство",
    GR: "Ηνωμένο Βασίλειο",
    BG: "Обединеното кралство",
    RO: "Marea Britanie",
    MD: "Marea Britanie",
    UA: "Велика Британія",
    BY: "Вялікабрытанія",
    PL: "Wielka Brytania",
    CZ: "Spojené království",
    SK: "Spojené kráľovstvo",
    HU: "Egyesült Királyság",
    LT: "Jungtinė Karalystė",
    LV: "Apvienotā Karaliste",
    EE: "Ühendkuningriik",
    FI: "Yhdistynyt kuningaskunta",
    SE: "Storbritannien",
    NO: "Storbritannia",
    DK: "Storbritannien",
    IE: "An Ríocht Aontaithe",
    GB: "United Kingdom",
    IS: "Bretland",
    RU: "Великобритания",
    TR: "Birleşik Krallık",
    CY: "Ηνωμένο Βασίλειο",
    MT: "Ir-Renju Unit",
    LU: "Vereenegt Kinnekräich",
    XK: "Mbretëria e Bashkuar",
  },
};

// Function to find country by name (case-insensitive, partial match)
export function findCountryByName(searchTerm) {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return null;

  // First check English names
  for (const [code, data] of Object.entries(europeanCountries)) {
    if (data.name.toLowerCase().includes(term)) {
      return code;
    }
  }

  // Then check translations
  for (const [countryCode, translations] of Object.entries(countryTranslations)) {
    for (const translation of Object.values(translations)) {
      if (translation.toLowerCase().includes(term)) {
        return countryCode;
      }
    }
  }

  return null;
}

// Get all translations for a country code
export function getTranslationsForCountry(countryCode) {
  return countryTranslations[countryCode] || null;
}

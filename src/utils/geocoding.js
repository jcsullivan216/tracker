// Military base and location coordinates lookup
// This provides approximate coordinates for common DoD locations

const locationCoordinates = {
  // Army installations
  'Fort Bliss, TX': [31.8133, -106.4217],
  'Fort Carson, CO': [38.7376, -104.7889],
  'Fort Liberty, NC': [35.1418, -79.0061],
  'Fort Cavazos, TX': [31.1327, -97.7782],
  'Fort Eisenhower, GA': [33.4167, -82.1167],
  'Fort Meade, MD': [39.1086, -76.7294],
  'Fort Huachuca, AZ': [31.5545, -110.3447],
  'Fort Moore, GA': [32.3597, -84.9556],
  'Fort Campbell, KY': [36.6681, -87.4742],
  'Fort Sam Houston, TX': [29.4563, -98.4380],
  'Fort Drum, NY': [44.0489, -75.7586],
  'Fort Drum, NY / Europe': [44.0489, -75.7586],
  'JBLM, WA': [47.0879, -122.5795],
  'JBLM, WA / Hawaii': [47.0879, -122.5795],
  'Schofield Barracks, HI': [21.4958, -158.0650],

  // Navy installations
  'San Diego, CA': [32.7157, -117.1611],
  'NAS Whidbey Island, WA': [48.3515, -122.6557],
  'NAS Jacksonville, FL': [30.2358, -81.6806],
  'NAS Pensacola, FL': [30.3505, -87.3097],
  'NAS Pensacola Corry Station, FL': [30.4274, -87.2828],
  'Norfolk, VA': [36.8508, -76.2859],
  'Virginia Beach, VA': [36.8529, -75.9780],
  'Monterey, CA': [36.6002, -121.8947],
  'Wahiawa, Oahu, HI': [21.5028, -158.0236],
  'Wahiawa, HI': [21.5028, -158.0236],
  'Pearl Harbor, HI': [21.3547, -157.9597],
  'JB Pearl Harbor-Hickam, HI': [21.3469, -157.9389],

  // Air Force installations
  'Offutt AFB, NE': [41.1183, -95.9125],
  'Davis-Monthan AFB, AZ': [32.1665, -110.8831],
  'JB Langley-Eustis, VA': [37.0833, -76.3606],
  'Eglin AFB, FL': [30.4833, -86.5254],
  'Robins AFB, GA': [32.6400, -83.5919],
  'JBSA-Lackland, TX': [29.3842, -98.6170],
  'JBSA-Lackland (Medina Annex), TX': [29.3300, -98.8500],
  'Shaw AFB, SC': [33.9706, -80.4706],
  'Beale AFB, CA': [39.1361, -121.4367],
  'Eielson AFB, AK': [64.6656, -147.1022],
  'Wright-Patterson AFB, OH': [39.8261, -84.0536],

  // Space Force
  'Peterson SFB, CO': [38.8236, -104.7003],
  'Buckley SFB, CO': [39.7017, -104.7517],

  // Marine Corps
  'Camp Pendleton, CA': [33.3886, -117.5653],
  'Camp Lejeune, NC': [34.6667, -77.3500],
  'Kaneohe Bay, HI': [21.4500, -157.7694],
  'MCB Hawaii': [21.4500, -157.7694],
  'Camp Hansen, Okinawa': [26.4531, 127.8953],
  'MCAS Iwakuni, Japan': [34.1436, 132.2356],
  'Yuma, AZ': [32.6540, -114.6276],
  'Quantico, VA': [38.5215, -77.2927],

  // Overseas
  'Wiesbaden, Germany': [50.0833, 8.2500],
  'Ramstein AB, Germany': [49.4369, 7.6003],
  'Vicenza, Italy': [45.5500, 11.5333],
  'Korea': [37.5665, 126.9780],
  'Osan AB, Korea': [37.0906, 127.0306],
  'Kadena AB, Japan': [26.3516, 127.7692],
  'RAF Mildenhall, UK': [52.3617, 0.4864],
  'UK': [51.5074, -0.1278],
  'Misawa, Japan': [40.7031, 141.3686],
  'Okinawa, Japan': [26.3344, 127.8056],

  // SOCOM/Special locations
  'Hurlburt Field, FL': [30.4272, -86.6894],
  'Harrisburg ANG Base, PA': [40.1989, -76.7631],
  'McEntire JNGB, SC': [33.9208, -80.8006],

  // Other
  'Pacific Theater': [20.0, 140.0],
  'Various': [38.9072, -77.0369], // Default to DC
  'Fleet-wide': [38.9072, -77.0369],
  'Fleet-wide (CSGs)': [38.9072, -77.0369],
  'Various (Jacksonville, Whidbey)': [38.0, -100.0],
  'Various (Pendleton, Lejeune, Hawaii)': [33.3886, -117.5653],
  'Various (SF Groups)': [38.9072, -77.0369],
  'Various (Hurlburt, Cannon)': [30.4272, -86.6894],
};

// Parse location string and return coordinates
export function getCoordinates(location) {
  if (!location) return null;

  // Direct lookup
  if (locationCoordinates[location]) {
    return locationCoordinates[location];
  }

  // Try partial matches
  const locationLower = location.toLowerCase();
  for (const [key, coords] of Object.entries(locationCoordinates)) {
    if (locationLower.includes(key.toLowerCase()) || key.toLowerCase().includes(locationLower)) {
      return coords;
    }
  }

  // Try to extract state/country and use approximate coordinates
  const stateMatch = location.match(/,\s*([A-Z]{2})$/);
  if (stateMatch) {
    const stateCoords = {
      'TX': [31.0, -100.0],
      'CA': [36.7, -119.4],
      'VA': [37.4, -78.6],
      'NC': [35.5, -79.0],
      'FL': [27.6, -81.5],
      'GA': [32.2, -83.6],
      'MD': [39.0, -76.6],
      'CO': [39.0, -105.5],
      'HI': [21.3, -157.8],
      'WA': [47.4, -120.5],
      'AZ': [34.0, -111.0],
      'NE': [41.5, -100.0],
      'NY': [42.1, -74.9],
      'KY': [37.8, -84.3],
      'SC': [33.8, -81.2],
      'OH': [40.4, -82.9],
      'AK': [64.2, -152.5],
      'PA': [41.2, -77.2],
    };
    if (stateCoords[stateMatch[1]]) {
      return stateCoords[stateMatch[1]];
    }
  }

  // Default to Washington DC for unknown locations
  return [38.9072, -77.0369];
}

// Get all items with their coordinates
export function getItemsWithCoordinates(items) {
  return items
    .map(item => {
      const location = item.location || item.organization;
      const coords = getCoordinates(location);
      return coords ? { ...item, coordinates: coords } : null;
    })
    .filter(Boolean);
}

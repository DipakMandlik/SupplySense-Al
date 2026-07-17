// Simple linear projection of India-bounding lat/lng onto a 0-100 viewBox,
// used to place network nodes over the stylized India silhouette.
const LNG_MIN = 68;
const LNG_MAX = 97;
const LAT_MIN = 6;
const LAT_MAX = 37;

export function projectLatLng(lat: number, lng: number) {
  const x = ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 100;
  return {
    x: Math.min(100, Math.max(0, x)),
    y: Math.min(100, Math.max(0, y)),
  };
}

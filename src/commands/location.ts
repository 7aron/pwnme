async function fetchLocationInfo(): Promise<string[]> {
  const info: string[] = [];
  const labelColor = "style='color: #ff4500;'";

  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    info.push("<br>");
    info.push(`<span ${labelColor}>IP Address:</span> ${data.ip}`);
    info.push(`<span ${labelColor}>City:</span> ${data.city}`);
    info.push(`<span ${labelColor}>Region:</span> ${data.region}`);
    info.push(`<span ${labelColor}>Country:</span> ${data.country_name}`);
    info.push(`<span ${labelColor}>Latitude:</span> ${data.latitude}`);
    info.push(`<span ${labelColor}>Longitude:</span> ${data.longitude}`);
    info.push(`<span ${labelColor}>ISP:</span> ${data.org}`);
    info.push("<br>");
  } catch (error) {
    info.push("<br>");
    info.push("Failed to fetch IP information.");
    info.push("<br>");
  }
  return info;
}

export function getLocation(callback: (lines: string[]) => void): void {
  fetchLocationInfo().then(ipInfo => {
    callback(ipInfo);
  }).catch(error => {
    callback(["<br>", "Failed to fetch IP information.", "<br>"]);
  });
}

const createTools = (): string[] => {
    const tools: string[] = [];
    const SPACE = "&nbsp;";
  
    const TOOLS = [
      { name: "Burp Suite", description: "Web security testing" },
      { name: "Nmap", description: "Network scanner" },
      { name: "Metasploit", description: "Penetration testing framework" },
      { name: "Wireshark", description: "Network protocol analyzer" },
      { name: "John the Ripper", description: "Password cracker" },
      { name: "Hydra", description: "Login cracker" },
      { name: "SQLmap", description: "SQL injection tool" },
      { name: "Aircrack-ng", description: "WiFi security suite" },
      { name: "Nikto", description: "Web server scanner" },
      { name: "Dirb", description: "Web content scanner" },
      { name: "Gobuster", description: "Directory/File brute-forcer" },
      { name: "ffuf", description: "Fuzzing tool" },
      { name: "Steghide", description: "Steganography tool" },
      { name: "ExifTool", description: "Metadata reader" },
      { name: "HashCat", description: "Advanced password recovery" },
      { name: "Beef", description: "Browser exploitation framework" },
      { name: "Recon-ng", description: "Web reconnaissance framework" },
      { name: "Nessus", description: "Vulnerability scanner" },
    ];
  
    tools.push("<br>");
    tools.push("Your arsenal for happy pentesting:");
    tools.push("<br>");
  
    TOOLS.forEach(tool => {
      let string = '';
      string += `<div style="display: flex; align-items: center;">`;
      string += SPACE.repeat(2);
      string += `<strong style="color: #ff4500; width: 150px; display: inline-block;">${tool.name}</strong>`;
      string += ` ${tool.description}`;
      string += `</div>`;
      tools.push(string);
    });
  
    tools.push("<br>");
    tools.push(`${TOOLS.length} Tool(s)`);
    tools.push("<br>");
    return tools;
}
  
export const TOOLS = createTools();

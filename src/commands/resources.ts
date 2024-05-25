const createResources = (): string[] => {
  const resources: string[] = [];
  const SPACE = "&nbsp;";

  const RESOURCES = [
    { name: "GTFOBins", url: "https://gtfobins.github.io/" },
    { name: "PentestMonkey", url: "http://pentestmonkey.net/" },
    { name: "Exploit Database", url: "https://www.exploit-db.com/" },
    { name: "OWASP", url: "https://owasp.org/" },
    { name: "CrackStation", url: "https://crackstation.net/" },
    { name: "CyberChef", url: "https://gchq.github.io/CyberChef/" },
    { name: "RevShells", url: "https://revshells.com/" },
    { name: "HackerOne", url: "https://www.hackerone.com/" },
    { name: "Bugcrowd", url: "https://www.bugcrowd.com/" }
  ];

  resources.push("<br>");
  resources.push("List of resources to use for your LEGAL hacking:");
  resources.push("<br>");

  RESOURCES.forEach(resource => {
    let string = '';
    string += SPACE.repeat(2);
    string += `<i class='fa-solid fa-link'></i> <strong style="color: #20C20E;">${resource.name}</strong>`;
    string += SPACE.repeat(20 - resource.name.length); 
    string += `<a target='_blank' href='${resource.url}'>${resource.url}</a>`;
    resources.push(string);
  });

  resources.push("<br>");
    resources.push(`${RESOURCES.length} Resource(s)`);
    resources.push("<br>");
    return resources;
}

export const RESOURCES = createResources();

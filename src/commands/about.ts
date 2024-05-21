import command from '../../config.json' assert {type: 'json'};

const createAbout = (): string[] => {
  const about: string[] = [];
  const SPACE = "&nbsp;";

  const EMAIL = "Email";
  const GITHUB = "Instagram";
  const LINKEDIN = "Linkedin";
  const TRYHACKME = "TryHackMe";  

  const email = `<i class='fa-solid fa-envelope'></i> ${EMAIL}`;   
  const github = `<i class='fa-brands fa-instagram'></i> ${GITHUB}`;
  const linkedin = `<i class='fa-brands fa-linkedin'></i> ${LINKEDIN}`;
  const tryhackme = `<i class='fa-brands fa-hackerrank'></i> ${TRYHACKME}`;  // Added icon for TryHackMe

  let string = "";

  about.push("<br>");
  const aboutGreeting = command.aboutGreeting.split('\n').join('<br>');
  about.push(aboutGreeting);
  about.push("<br>");

  string += SPACE.repeat(2);
  string += email;
  string += SPACE.repeat(17 - EMAIL.length);
  string += `<a target='_blank' href='mailto:${command.social.email}'>${command.social.email}</a>`;
  about.push(string);

  string = '';
  string += SPACE.repeat(2);
  string += github;
  string += SPACE.repeat(17 - GITHUB.length);
  string += `<a target='_blank' href='https://instagram.com/${command.social.github}'>instagram/${command.social.github}</a>`;
  about.push(string);

  string = '';
  string += SPACE.repeat(2);
  string += linkedin;
  string += SPACE.repeat(17 - LINKEDIN.length);  
  string += `<a target='_blank' href='https://www.linkedin.com/in/${command.social.linkedin}'>linkedin/${command.social.linkedin}</a>`;
  about.push(string);

  // Adding TryHackMe link section
  string = '';
  string += SPACE.repeat(2);
  string += tryhackme;
  string += SPACE.repeat(17 - TRYHACKME.length);  
  string += `<a target='_blank' href='https://tryhackme.com/p/Mounatth/'>Mounatth</a>`;  
  about.push(string);

  about.push("<br>");
  return about;
}

export const ABOUT = createAbout();

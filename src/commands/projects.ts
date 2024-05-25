import command from '../../config.json' assert {type: 'json'};

const createProject = (): string[] => {
  let string = "";
  const projects: string[] = [];
  const files = `${command.projects.length} File(s)`;
  const SPACE = "&nbsp;";

  projects.push("<br>");

  command.projects.forEach((ele) => {
    const projectName = ele[0];
    const projectDescription = ele[1];
    const projectUrl = ele[2];
    let link = `<a href="${projectUrl}" target="_blank">${projectName}</a>`;
    string += SPACE.repeat(2);
    string += link;
    string += SPACE.repeat(17 - projectName.length);
    string += projectDescription;
    projects.push(string);
    string = '';
  });

  projects.push("<br>");
  projects.push(files);
  projects.push("<br>");
  return projects;
}

export const PROJECTS = createProject();

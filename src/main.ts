import command from '../config.json' assert {type: 'json'};
import { HELP } from "./commands/help";
import { BANNER } from "./commands/banner";
import { ABOUT } from "./commands/about"
import { DEFAULT } from "./commands/default";
import { PROJECTS } from "./commands/projects";
import { createWhoami } from "./commands/whoami";
import { RESOURCES } from "./commands/resources";
import { TOOLS } from "./commands/tools";
import { getLocation } from "./commands/location";
import { EQUIPMENT } from './commands/equipment';

const BOOKS = [
  "The Hacker Playbook [1,2,3] by Peter Kim",
  "The Pentester's Blueprint by Phillip L. Wylie and Kim Crawley",
  "Social Engineering: The Art of Human Hacking by Christopher Hadnagy",
  "The Art of Invisibility by Kevin Mitnick",
  "Black Hat Python by Justin Seitz",
  "Metasploit: The Penetration Tester's Guide by David Kennedy",
  "Practical Malware Analysis by Michael Sikorski",
  "Advanced Penetration Testing by Wil Allsopp",
  "Web Application Hacker's Handbook by Dafydd Stuttard",
  "Penetration Testing: A Hands-On Introduction to Hacking by Georgia Weidman",
];

// Function to handle the 'books' command
function listBooks() {
  const booksMessage = ["Here are some books about penetration testing you might like:", "<br>"];
  BOOKS.forEach((book) => {
    booksMessage.push(`<span class='command'>${book}</span>`);
  });
  booksMessage.push("<br>");
  booksMessage.push(`${BOOKS.length} Book(s)`);
  booksMessage.push("<br>");
  writeLines(booksMessage);
}

//mutWriteLines gets deleted and reassigned
let mutWriteLines = document.getElementById("write-lines");
let historyIdx = 0
let tempInput = ""
let userInput : string;
let isSudo = false;
let isPasswordInput = false;
let passwordCounter = 0;
let bareMode = false;

//WRITELINESCOPY is used to during the "clear" command
const WRITELINESCOPY = mutWriteLines;
const TERMINAL = document.getElementById("terminal");
const USERINPUT = document.getElementById("user-input") as HTMLInputElement;
const INPUT_HIDDEN = document.getElementById("input-hidden");
const PASSWORD = document.getElementById("password-input");
const PASSWORD_INPUT = document.getElementById("password-field") as HTMLInputElement;
const PRE_HOST = document.getElementById("pre-host");
const PRE_USER = document.getElementById("pre-user");
const HOST = document.getElementById("host");
const USER = document.getElementById("user");
const PROMPT = document.getElementById("prompt");
const COMMANDS = ["me", "help", "about", "projects", "whoami", "banner", "books", "resources", "tools", "location", "equipment", "clear"];
const HISTORY : string[] = [];
const SUDO_PASSWORD = command.password;

const scrollToBottom = () => {
  const MAIN = document.getElementById("main");
  if(!MAIN) return

  MAIN.scrollTop = MAIN.scrollHeight;
}

function userInputHandler(e : KeyboardEvent) {
  const key = e.key;

  switch(key) {
    case "Enter":
      e.preventDefault();
      if (!isPasswordInput) {
        enterKey();
      } else {
        passwordHandler();
      }

      scrollToBottom();
      break;
    case "Escape":
      USERINPUT.value = "";
      break;
    case "ArrowUp":
      arrowKeys(key);
      e.preventDefault();
      break;
    case "ArrowDown":
      arrowKeys(key);
      break;
    case "Tab":
      tabKey();
      e.preventDefault();
      break;
  }
}

function enterKey() {
  if (!mutWriteLines || !PROMPT) return
  const resetInput = "";
  let newUserInput;
  userInput = USERINPUT.value;

  if (bareMode) {
    newUserInput = userInput;
  } else {
    newUserInput = `<span class='output'>${userInput}</span>`;
  }

  HISTORY.push(userInput);
  historyIdx = HISTORY.length

  //if clear then early return
  if (userInput === 'clear') {
    commandHandler(userInput.toLowerCase().trim());
    USERINPUT.value = resetInput;
    userInput = resetInput;
    return
  }

  const div = document.createElement("div");
  div.innerHTML = `<span id="prompt">${PROMPT.innerHTML}</span> ${newUserInput}`;

  if (mutWriteLines.parentNode) {
    mutWriteLines.parentNode.insertBefore(div, mutWriteLines);
  }

  /*
  if input is empty or a collection of spaces, 
  just insert a prompt before #write-lines
  */
  if (userInput.trim().length !== 0) {
      commandHandler(userInput.toLowerCase().trim());
  }
  
  USERINPUT.value = resetInput;
  userInput = resetInput; 
}

function tabKey() {
  let currInput = USERINPUT.value;

  for (const ele of COMMANDS) {
    if(ele.startsWith(currInput)) {
      USERINPUT.value = ele;
      return
    }
  }
}

function arrowKeys(e : string) {
  switch(e){
    case "ArrowDown":      
      if (historyIdx !== HISTORY.length) {
          historyIdx += 1;
          USERINPUT.value = HISTORY[historyIdx];
          if (historyIdx === HISTORY.length) USERINPUT.value = tempInput;  
      }      
      break;
    case "ArrowUp":
      if (historyIdx === HISTORY.length) tempInput = USERINPUT.value;
      if (historyIdx !== 0) {
        historyIdx -= 1;
        USERINPUT.value = HISTORY[historyIdx];
      }
      break;
  }
}

function commandHandler(input : string) {
  if(input.startsWith("rm -rf") && input.trim() !== "rm -rf") {
    if (isSudo) {
      if(input === "rm -rf src" && !bareMode) {
        bareMode = true;

        setTimeout(() => {
          if(!TERMINAL || !WRITELINESCOPY) return
          TERMINAL.innerHTML = "";
          TERMINAL.appendChild(WRITELINESCOPY);
          mutWriteLines = WRITELINESCOPY;
        });

        easterEggStyles();
        setTimeout(() => {
          writeLines(["What made you think that was a good idea?", "<br>"]);
        }, 200)

        setTimeout(() => {
          writeLines(["Now everything is ruined.", "<br>"]);
        }, 1200)

        } else if (input === "rm -rf src" && bareMode) {
          writeLines(["there's no more src folder.", "<br>"])
        } else {
          if(bareMode) {
            writeLines(["What else are you trying to delete?", "<br>"])
          } else {
            writeLines(["<br>", "Directory not found.", "type <span class='command'>'ls'</span> for a list of directories.", "<br>"]);
          }
        } 
      } else {
        writeLines(["Permission denied.", "<br>"]);
    }
    return
  }

  switch(input) {
    case 'clear':
      setTimeout(() => {
        if(!TERMINAL || !WRITELINESCOPY) return
        TERMINAL.innerHTML = "";
        TERMINAL.appendChild(WRITELINESCOPY);
        mutWriteLines = WRITELINESCOPY;
      })
      break;
    case 'banner':
      if(bareMode) {
        writeLines(["RootMe v6.0.9", "<br>"])
        break;
      }
      writeLines(BANNER);
      break;
    case 'help':
      if(bareMode) {
        writeLines(["maybe restarting your browser will fix this.", "<br>"])
        break;
      }
      writeLines(HELP);
      break;
    case 'whoami':      
      if(bareMode) {
        writeLines([`${command.username}`, "<br>"])
        break;
      }
      writeLines(createWhoami());
      break;
    case 'about':
      if(bareMode) {
        writeLines(["Nothing to see here.", "<br>"])
        break;
      }
      writeLines(ABOUT);
      break;
    case 'projects':
      if(bareMode) {
        writeLines(["I don't want you to break the other projects.", "<br>"])
        break;
      } 
      writeLines(PROJECTS);
      break;
    case 'books':
      if(bareMode) {
        writeLines(["You dont deserve it.", "<br>"])
        break;
        }
      listBooks()
      break;  
    case 'resources':
      if(bareMode) {
        writeLines(["I could tell you, but you tried to hack me.", "<br>"])
        break;
        }
      writeLines(RESOURCES)
      break;  
    case 'tools':
      if(bareMode) {
        writeLines(["No more tools, nothing! You are bad GUY!.", "<br>"])
        break;
        }
      writeLines(TOOLS)
      break; 
    case 'location':
      if(bareMode) {
        writeLines(["Now I know your location!", "<br>"])
        getLocation(writeLines)
        break;
        }
      getLocation(writeLines)
      break;
     case 'equipment':
    if (bareMode) {
      writeLines(["You don't need to know about these gadgets.", "<br>"]);
      break;
    }
    writeLines(EQUIPMENT);
    break;      
    case 'cat':
      if(bareMode) {
        writeLines(["Usage: cat [file]", "<br>"])
        break;
        }
      writeLines(["NOT HERE","<br>"])
      break;   
    case 'cat flag.txt':
      if(bareMode) {
        writeLines(["aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1rSWVfcUJleVpTWQ==", "<br>"])
        break;
        }
      writeLines(["You will not find it HERE!", "<br>"]) 
      break; 
    case 'find':
      if(bareMode){
        writeLines(["Usage: find / -type -perm -user", "<br>"])
        writeLines(["<br>"])
        writeLines(["Don't forget to redirect error messages", "<br>"])
        break;
      }
      writeLines(["This is a very useful command but again, not HERE!", "<br>"]) 
      break; 

    case 'find / -type f -perm -4000 -user root -ls 2>/dev/null':
      if(bareMode){
        writeLines(["Congrats! I know this part was a little bit hard:", "<br>"])
        writeLines(["Sorry, Not Sorry!", "<br>"])
        writeLines(["<br>"])
        writeLines(["MNT{AKCKBAKI_BEPAPUDAKI_IKCKBAKI_BEPADUDAKI_JUPA_JUPA_JUPAPAJUPA}", "<br>"])
        break;
      }
      writeLines(["You will not find it HERE!", "<br>"]) 
      break;                            
    case 'books':
      listBooks();
      break;
    case 'resources':
      writeLines(RESOURCES);  
      break; 
    case 'tools':
      writeLines(TOOLS);  
      break;   
    case 'location':
      getLocation(writeLines);  
      break;  
      
    case 'rm -rf':
      if (bareMode) {
        writeLines(["don't try again.", "<br>"])
        break;
      }

      if (isSudo) {
        writeLines(["Usage: <span class='command'>'rm -rf &lt;dir&gt;'</span>", "<br>"]);
      } else {
        writeLines(["Permission denied.", "<br>"])
      }
        break;
    case 'sudo':
      if(bareMode) {
        writeLines(["no.", "<br>"])
        break;
      }
      if(!PASSWORD) return
      isPasswordInput = true;
      USERINPUT.disabled = true;

      if(INPUT_HIDDEN) INPUT_HIDDEN.style.display = "none";
      PASSWORD.style.display = "block";
      setTimeout(() => {
        PASSWORD_INPUT.focus();
      }, 100);

      break;
      case 'ls':
        if (bareMode) {
          writeLines([
            "<ul>",
            "<li>about</li>",
            "<li>projects</li>",
            "<li>location</li>",
            "<li>tools</li>",
            "<li>flag.txt</li>",
            "<li>find</li>",
            "<li>books</li>",
            "<li>resources</li>",
            "<li>equipment</li>",
            "<li>banner</li>",
            "<li>cat</li>",
            "<li>clear</li>",
            "</ul>",
            "<br>"
          ]);
          break;
        }

      if (isSudo) {
        writeLines(["src", "<br>"]);
      } else {
        writeLines(["Permission denied.", "<br>"]);
      }
      break;
    default:
      if(bareMode) {
        writeLines(["type 'help'", "<br>"])
        break;
      }

      writeLines(DEFAULT);
      break;
  }  
}



function writeLines(message : string[]) {
  message.forEach((item, idx) => {
    displayText(item, idx);
  });
}

function displayText(item : string, idx : number) {
  setTimeout(() => {
    if(!mutWriteLines) return
    const p = document.createElement("p");
    p.innerHTML = item;
    mutWriteLines.parentNode!.insertBefore(p, mutWriteLines);
    scrollToBottom();
  }, 40 * idx);
}

function revertPasswordChanges() {
    if (!INPUT_HIDDEN || !PASSWORD) return
    PASSWORD_INPUT.value = "";
    USERINPUT.disabled = false;
    INPUT_HIDDEN.style.display = "block";
    PASSWORD.style.display = "none";
    isPasswordInput = false;

    setTimeout(() => {
      USERINPUT.focus();
    }, 200)
}

function passwordHandler() {
  if (passwordCounter === 2) {
    if (!INPUT_HIDDEN || !mutWriteLines || !PASSWORD) return
    writeLines(["<br>", "INCORRECT PASSWORD.", "DENIED.", "<br>"])
    revertPasswordChanges();
    passwordCounter = 0;
    return
  }

  if (PASSWORD_INPUT.value === SUDO_PASSWORD) {
    if (!mutWriteLines || !mutWriteLines.parentNode) return
    writeLines(["<br>", "PERMISSION GRANTED.", "Try <span class='command'>'rm -rf'</span>", "<br>"])
    revertPasswordChanges();
    isSudo = true;
    return
  } else {
    PASSWORD_INPUT.value = "";
    passwordCounter++;
  }
}

function easterEggStyles() {   
  const bars = document.getElementById("bars");
  const body = document.body;
  const main = document.getElementById("main");
  const span = document.getElementsByTagName("span");

  if (!bars) return
  bars.innerHTML = "";
  bars.remove()

  if (main) main.style.border = "none";

  body.style.backgroundColor = "black";
  body.style.fontFamily = "VT323, monospace";
  body.style.fontSize = "20px";
  body.style.color = "white";

  for (let i = 0; i < span.length; i++) {
    span[i].style.color = "white";
  }

  USERINPUT.style.backgroundColor = "black";
  USERINPUT.style.color = "white";
  USERINPUT.style.fontFamily = "VT323, monospace";
  USERINPUT.style.fontSize = "20px";
  if (PROMPT) PROMPT.style.color = "white";

}

const initEventListeners = () => {
  if(HOST) {
    HOST.innerText= command.hostname;
  }

  if(USER) {
    USER.innerText = command.username;
  }

  if(PRE_HOST) {
    PRE_HOST.innerText= command.hostname;
  }

  if(PRE_USER) {
    PRE_USER.innerText = command.username;
  } 

  window.addEventListener('load', () => {
    writeLines(BANNER);
  });
  
  USERINPUT.addEventListener('keypress', userInputHandler);
  USERINPUT.addEventListener('keydown', userInputHandler);
  PASSWORD_INPUT.addEventListener('keypress', userInputHandler);

  window.addEventListener('click', () => {
    USERINPUT.focus();
  });

  console.log(`%cThis is easier to decrypt: --. . -..- .- -- .. -.-`, "color: #20C20E; font-size: 10px;");
}

initEventListeners();

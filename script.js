// ===================================
// HACKFORCE - JAVASCRIPT
// ===================================

// === COUNTER ANIMATION ===
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// === INTERSECTION OBSERVER FOR COUNTERS ===
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            animateCounter(entry.target);
            entry.target.classList.add('counted');
        }
    });
}, observerOptions);

// Observe all stat numbers
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    statNumbers.forEach(stat => counterObserver.observe(stat));
});

// === TERMINAL MODE ===
const modeToggle = document.getElementById('modeToggle');
const mainContent = document.getElementById('mainContent');
const terminalMode = document.getElementById('terminalMode');
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

let isTerminalMode = false;
let commandHistory = [];
let historyIndex = -1;

// Terminal commands
const commands = {
    help: () => {
        return `
<span style="color: #FFD700;">Available Commands:</span>
  <span style="color: #00D9FF;">help</span>       - Show this help message
  <span style="color: #00D9FF;">about</span>      - Learn about HackForce
  <span style="color: #00D9FF;">team</span>       - View team members
  <span style="color: #00D9FF;">goals</span>      - View 2025 goals
  <span style="color: #00D9FF;">skills</span>     - List our expertise areas
  <span style="color: #00D9FF;">discord</span>    - Get Discord invite link
  <span style="color: #00D9FF;">contact</span>    - Show contact information
  <span style="color: #00D9FF;">clear</span>      - Clear terminal screen
  <span style="color: #00D9FF;">exit</span>       - Return to visual mode
  <span style="color: #00D9FF;">whoami</span>     - Display user information
  <span style="color: #00D9FF;">banner</span>     - Show HackForce banner
        `;
    },

    about: () => {
        return `
<span style="color: #FFD700;">╔════════════════════════════════════════════════════════════╗</span>
<span style="color: #FFD700;">║</span>                    ABOUT HACKFORCE                      <span style="color: #FFD700;">║</span>
<span style="color: #FFD700;">╚════════════════════════════════════════════════════════════╝</span>

<span style="color: #00D9FF;">Name:</span> HackForce
<span style="color: #00D9FF;">Slogan:</span> "Force in every flag"
<span style="color: #00D9FF;">Founded:</span> 2025
<span style="color: #00D9FF;">Status:</span> Active & Growing

<span style="color: #6B2FFF;">Mission:</span>
HackForce is an emerging elite cybersecurity CTF team dedicated 
to mastering the art of ethical hacking and competitive problem-solving.
We're building a community of passionate security enthusiasts ready 
to take on the world's most challenging capture-the-flag competitions.
        `;
    },

    team: () => {
        return `
<span style="color: #FFD700;">╔════════════════════════════════════════════════════════════╗</span>
<span style="color: #FFD700;">║</span>                    TEAM MEMBERS                         <span style="color: #FFD700;">║</span>
<span style="color: #FFD700;">╚════════════════════════════════════════════════════════════╝</span>

<span style="color: #FFD700;">👑 CAPTAIN</span>
  ├─ <span style="color: #00D9FF;">Kr0nos</span>
  ├─ Role: Founder & Team Captain
  ├─ Status: <span style="color: #00FF00;">●</span> Active
  └─ Quote: "Building the force, one challenge at a time."

<span style="color: #6B2FFF;">🌟 RECRUITING</span>
  └─ We're looking for passionate hackers to join our team!
     Apply via Discord: https://discord.gg/3tBTtQr6
        `;
    },

    goals: () => {
        return `
<span style="color: #FFD700;">╔════════════════════════════════════════════════════════════╗</span>
<span style="color: #FFD700;">║</span>                     2025 GOALS                          <span style="color: #FFD700;">║</span>
<span style="color: #FFD700;">╚════════════════════════════════════════════════════════════╝</span>

  <span style="color: #00D9FF;">🎯</span> Participate in 10+ CTF competitions
  <span style="color: #00D9FF;">🏆</span> Secure Top 10 placements
  <span style="color: #00D9FF;">📈</span> Build strong CTFtime ranking
  <span style="color: #00D9FF;">👥</span> Expand team to 5+ active members
  <span style="color: #00D9FF;">📝</span> Publish quality writeups
  <span style="color: #00D9FF;">🔥</span> Establish HackForce reputation
        `;
    },

    skills: () => {
        return `
<span style="color: #FFD700;">╔════════════════════════════════════════════════════════════╗</span>
<span style="color: #FFD700;">║</span>                  EXPERTISE AREAS                        <span style="color: #FFD700;">║</span>
<span style="color: #FFD700;">╚════════════════════════════════════════════════════════════╝</span>

  <span style="color: #00D9FF;">🔓 Web Exploitation</span>
     └─ Finding and exploiting web vulnerabilities

  <span style="color: #00D9FF;">🔐 Cryptography</span>
     └─ Breaking ciphers and encryption systems

  <span style="color: #00D9FF;">⚙️  Reverse Engineering</span>
     └─ Deconstructing binaries and understanding behavior

  <span style="color: #00D9FF;">💣 Binary Exploitation</span>
     └─ Exploiting memory corruption vulnerabilities

  <span style="color: #00D9FF;">🔍 Forensics</span>
     └─ Analyzing artifacts and recovering hidden data

  <span style="color: #00D9FF;">🕵️  OSINT</span>
     └─ Gathering intelligence from open sources
        `;
    },

    discord: () => {
        return `
<span style="color: #FFD700;">╔════════════════════════════════════════════════════════════╗</span>
<span style="color: #FFD700;">║</span>                  DISCORD SERVER                         <span style="color: #FFD700;">║</span>
<span style="color: #FFD700;">╚════════════════════════════════════════════════════════════╝</span>

<span style="color: #00D9FF;">Join our community:</span>
  └─ <span style="color: #6B2FFF;">https://discord.gg/3tBTtQr6</span>

<span style="color: #00D9FF;">What you'll find:</span>
  ├─ CTF discussions and team coordination
  ├─ Challenge writeups and solutions
  ├─ Learning resources and tips
  ├─ Recruitment opportunities
  └─ Community of passionate hackers

<span style="color: #FFD700;">See you there! 💬</span>
        `;
    },

    contact: () => {
        return `
<span style="color: #FFD700;">╔════════════════════════════════════════════════════════════╗</span>
<span style="color: #FFD700;">║</span>                  CONTACT INFO                           <span style="color: #FFD700;">║</span>
<span style="color: #FFD700;">╚════════════════════════════════════════════════════════════╝</span>

<span style="color: #00D9FF;">Primary Contact:</span>
  └─ Discord: <span style="color: #6B2FFF;">https://discord.gg/3tBTtQr6</span>

<span style="color: #00D9FF;">Team Captain:</span>
  └─ Kr0nos

<span style="color: #00D9FF;">For:</span>
  ├─ Recruitment inquiries
  ├─ Collaboration opportunities
  ├─ General questions
  └─ CTF invitations
        `;
    },

    clear: () => {
        terminalOutput.innerHTML = '';
        return '';
    },

    exit: () => {
        toggleTerminal();
        return '';
    },

    whoami: () => {
        return `
<span style="color: #00D9FF;">User:</span> hackforce_visitor
<span style="color: #00D9FF;">Role:</span> Guest
<span style="color: #00D9FF;">Access Level:</span> Public
<span style="color: #00D9FF;">Status:</span> <span style="color: #00FF00;">Connected</span>
<span style="color: #00D9FF;">Location:</span> HackForce Terminal v1.0
        `;
    },

    banner: () => {
        return `
<span style="color: #00D9FF;">
╦ ╦┌─┐┌─┐┬┌─╔═╗┌─┐┬─┐┌─┐┌─┐
╠═╣├─┤│  ├┴┐╠╣ │ │├┬┘│  ├┤ 
╩ ╩┴ ┴└─┘┴ ┴╚  └─┘┴└─└─┘└─┘
</span>
<span style="color: #FFD700;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color: #6B2FFF;">   Force in every flag   </span>
<span style="color: #FFD700;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
        `;
    },

    ls: () => {
        return `
<span style="color: #00D9FF;">about.txt</span>
<span style="color: #00D9FF;">team.txt</span>
<span style="color: #00D9FF;">goals.txt</span>
<span style="color: #00D9FF;">skills.txt</span>
<span style="color: #6B2FFF;">discord/</span>
<span style="color: #6B2FFF;">contact/</span>
        `;
    },

    echo: (args) => {
        return args.join(' ');
    }
};

// Toggle terminal mode
function toggleTerminal() {
    isTerminalMode = !isTerminalMode;
    
    if (isTerminalMode) {
        mainContent.classList.add('hidden');
        terminalMode.classList.remove('hidden');
        terminalInput.focus();
        
        // Display welcome message
        if (terminalOutput.innerHTML === '') {
            const welcomeMsg = `
<span style="color: #FFD700;">╔════════════════════════════════════════════════════════════╗</span>
<span style="color: #FFD700;">║</span>          WELCOME TO HACKFORCE TERMINAL v1.0            <span style="color: #FFD700;">║</span>
<span style="color: #FFD700;">╚════════════════════════════════════════════════════════════╝</span>

<span style="color: #6B2FFF;">Force in every flag</span>

Type <span style="color: #00D9FF;">'help'</span> for available commands.
Type <span style="color: #00D9FF;">'exit'</span> to return to visual mode.

`;
            terminalOutput.innerHTML = welcomeMsg;
        }
    } else {
        mainContent.classList.remove('hidden');
        terminalMode.classList.add('hidden');
    }
}

// Handle terminal input
function handleCommand(input) {
    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    commandHistory.push(input);
    historyIndex = commandHistory.length;

    // Display command
    const commandLine = `<div><span style="color: #00D9FF;">hackforce@terminal:~$</span> ${input}</div>`;
    terminalOutput.innerHTML += commandLine;

    // Execute command
    let output = '';
    if (commands[cmd]) {
        if (cmd === 'echo') {
            output = commands[cmd](args);
        } else {
            output = commands[cmd]();
        }
    } else if (input.trim() !== '') {
        output = `<span style="color: #FF5F56;">Command not found: ${cmd}</span>\nType 'help' for available commands.`;
    }

    if (output) {
        terminalOutput.innerHTML += `<div>${output}</div>`;
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Event listeners
if (modeToggle) {
    modeToggle.addEventListener('click', toggleTerminal);
}

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value;
            handleCommand(input);
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const input = terminalInput.value.toLowerCase();
            const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            }
        }
    });
}

// === SMOOTH SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === SCROLL ANIMATIONS ===
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

// Apply animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(section);
    });
});

// === CURSOR EFFECT (Optional) ===
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    
    // You can add custom cursor effects here if desired
});

// === PERFORMANCE OPTIMIZATION ===
// Lazy load images when they come into view
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// === CONSOLE MESSAGE ===
console.log('%c⚡ HACKFORCE ⚡', 'color: #00D9FF; font-size: 30px; font-weight: bold;');
console.log('%cForce in every flag', 'color: #6B2FFF; font-size: 16px;');
console.log('%cInterested in joining? Visit: https://discord.gg/3tBTtQr6', 'color: #FFD700; font-size: 14px;');
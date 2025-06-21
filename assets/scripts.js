document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const introLines = [
    "PS C:\\> Connect-Lyssacape'sDomain",
    "##############################",
    "Welcome!",
    "",
    "You've successfully connected to Lyssacape's Domain.",
    "",
    "I’m Alyssa Capehart — I automate the onboarding workflows your IT department still cries about.",
    "PowerShell is my love language. REST APIs are my coping mechanism.",
    "",
    "Type 'show-projects' to see what I've replaced humans with.",
    "##############################",
    "",
    "Please choose a command:"
  ];

  let lineIndex = 0;
  let charIndex = 0;

  function typeLine() {
    if (lineIndex < introLines.length) {
      const line = introLines[lineIndex];
      const isBannerLine = lineIndex > 0 && lineIndex < introLines.length - 1;
      const typed = line.slice(0, charIndex);
      const styledLine = isBannerLine
        ? `<span class="banner-line">${typed}</span>`
        : typed;

      let lines = output.innerHTML.split('\n');
      lines = lines.map(l => l.replace(/<span class="cursor"><\/span>/g, ''));

      const isFinalLine = lineIndex === introLines.length - 1;
      const withCursor = styledLine + (isFinalLine || charIndex < line.length ? '<span class="cursor"></span>' : '');

      lines[lines.length - 1] = withCursor;
      output.innerHTML = lines.join('\n');

      charIndex++;
      if (charIndex <= line.length) {
        setTimeout(typeLine, 20);
      } else {
        if (!isFinalLine) {
          lines[lines.length - 1] = styledLine;
          output.innerHTML = lines.join('\n') + '\n';
        }
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 100);
      }
    } else {
      enableCommandButtons();
    }
  }

  typeLine();

  function enableCommandButtons() {
    const btnContainer = document.createElement('div');
    btnContainer.id = "button-container";
    btnContainer.innerHTML = `
      <button class="cli-btn" data-cmd="show-projects">Get Projects</button>
      <button class="cli-btn" data-cmd="get-info">Get Info</button>
    `;
    document.getElementById('terminal').appendChild(btnContainer);

    document.querySelectorAll('.cli-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const command = e.target.dataset.cmd;
        animateCommand(command, () => {
          output.innerHTML += `<div class="write-cyan">Processing...</div>`;
          scrollToBottom();
          setTimeout(() => runCommand(command), 500);
        });
      });
    });
  }

  function animateCommand(commandText, callback) {
    let i = 0;
    function type() {
      if (i <= commandText.length) {
        const lines = output.innerHTML.split('\n');
        lines[lines.length - 1] = `PS C:\\> ${commandText.slice(0, i)}<span class="cursor"></span>`;
        output.innerHTML = lines.join('\n');
        scrollToBottom();
        i++;
        setTimeout(type, 30);
      } else {
        output.innerHTML = output.innerHTML.replace(/<span class="cursor"><\/span>/g, '') + '\n';
        callback();
      }
    }
    type();
  }

  function runCommand(command) {
    switch (command.toLowerCase()) {
      case 'show-projects':
        const projects = [
          {
            title: "Graph API Automation",
            description: "Automates Entra ID provisioning across systems.",
            link: "https://github.com/yourusername/graph-api-automation"
          },
          {
            title: "Freshservice Auto-Ticketing",
            description: "Closes onboarding tickets when workflows complete.",
            link: "https://github.com/yourusername/freshservice-ticketing"
          }
        ];

        projects.forEach(p => {
          output.innerHTML += `<div class="write-yellow">Title:       ${p.title}</div>`;
          output.innerHTML += `<div class="write-cyan">Description: ${p.description}</div>`;
          output.innerHTML += `<div class="write-green">Link:        <a href="${p.link}" target="_blank">${p.link}</a></div>\n`;
        });
        break;
      case 'get-info':
        output.innerHTML += `<div class="write-green">Alyssa Capehart: Cloud Systems Engineer</div>`;
        output.innerHTML += `<div class="write-cyan">Specializing in PowerShell, Graph, Entra ID, and enterprise onboarding automation.</div>`;
        break;

      default:
        output.innerHTML += `<div class="write-red">❌ '${command}' is not recognized, even though you clicked it. Brutal.</div>`;
    }
    scrollToBottom();
  }

  function scrollToBottom() {
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const introLines = [
    "PS C:\\> Connect-Lyssacape",
    "##############################",
     "",
    "Welcome!",
    "",
    "You've successfully connected to Lyssacape's Domain.",
    "",
    "I’m Alyssa Capehart — I automate the processes your IT department still cries about.",
    "PowerShell is my love language.",
    "",
    "##############################",
    "",
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
      <button class="cli-btn" data-cmd="get-projects">get-projects</button>
      <button class="cli-btn" data-cmd="get-info">get-info</button>
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
      case 'get-projects':
        const projects = [
          {
            title: "Enterprise Onboarding/Offboarding Lifecycle Automation",
            description: "A complete process that reads HRIS data and takes the appropriate action on a user's access across multiple systems.",
            link: "TBA"
          },
          {
            title: "TBD",
            description: "TBD",
            link: "TBD"
          }
        ];

        projects.forEach(p => {
          output.innerHTML += `<div class="write-white">Title:       ${p.title}</div>`;
          output.innerHTML += `<div class="write-white">Description: ${p.description}</div>`;
          output.innerHTML += `<div class="write-white">Link:        <a href="${p.link}" target="_blank">${p.link}</a></div>\n`;
        });
        break;
      case 'get-info':
        output.innerHTML += `<div class="write-white">Name: Alyssa Capehart</div>`;
        output.innerHTML += `<div class="write-white">Title: Cloud System Administrator</div>`;
        output.innerHTML += `<div class="write-white">Description: Specializing in enterprise automation and Identity and Access Management.</div>`;
        break;

      default:
        output.innerHTML += `<div class="write-red">'${command}' is not recognized, even though you clicked it? Sorry about that, I'm probably working on it.</div>`;
    }
    scrollToBottom();
  }

  function scrollToBottom() {
    const terminal = document.getElementById('terminal');
    terminal.scrollTop = terminal.scrollHeight;
  }
});

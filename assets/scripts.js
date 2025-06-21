document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const fullLine = 'PS C:\\> Press Enter to type a command';
  let index = 0;

  function typeNextChar() {
    if (index <= fullLine.length) {
      output.innerHTML = fullLine.slice(0, index) + '<span class="cursor"></span>';
      index++;
      setTimeout(typeNextChar, 40);
    } else {
      output.innerHTML = fullLine + '<span class="cursor"></span>\n';
      enableCommandListener();
    }
  }

  typeNextChar();

  function enableCommandListener() {
    document.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const command = prompt('PS C:\\> Enter command');
        output.innerHTML += `\nPS C:\\> ${command}\n`;

        switch (command?.toLowerCase()) {
          case 'show-projects':
            await showProjects();
            break;
          case 'clear':
          case 'cls':
            output.innerHTML = '';
            index = 0;
            typeNextChar(); // Restart typing prompt
            break;
          default:
            output.innerHTML += `'${command}' is not recognized as a valid command.\n`;
        }
      }
    });
  }

  async function showProjects() {
    try {
      const res = await fetch('data/projects.json');
      const projects = await res.json();

      projects.forEach(p => {
        output.innerHTML += `
Title:       ${p.title}
Description: ${p.description}
Link:        ${p.link}\n`;
      });
    } catch (err) {
      output.innerHTML += `Error loading projects: ${err.message}\n`;
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');
  const line = 'PS C:\\> Press Enter to type a command';
  let index = 0;

  // Typing effect for initial line
  function typeNextChar() {
    if (index <= line.length) {
      output.innerHTML = line.slice(0, index) + '<span class="cursor"></span>';
      index++;
      setTimeout(typeNextChar, 40); // Adjust speed here
    } else {
      output.innerHTML = line + '<span class="cursor"></span>\n';
      enableCommandListener();
    }
  }

  typeNextChar();

  // Wait for Enter key to prompt for a command
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
            typeNextChar(); // Restart typing after clear
            break;
          default:
            output.innerHTML += `'${command}' is not recognized as a valid command.\n`;
        }
      }
    });
  }

  // Load project list from JSON
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

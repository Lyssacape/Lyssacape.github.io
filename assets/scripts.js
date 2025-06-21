document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');

  const line = 'PS C:\\> Press Enter to type a command';
  let index = 0;

  function typeNextChar() {
    if (index <= line.length) {
      output.innerHTML = line.slice(0, index) + '<span class="cursor">_</span>';
      index++;
      setTimeout(typeNextChar, 50); // Adjust typing speed (ms)
    } else {
      // Start listening for Enter after typing is done
      enableCommandListener();
    }
  }

  typeNextChar(); // Start typing on load

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
            output.innerHTML = ''; // Clear screen
            index = 0;
            typeNextChar(); // Re-type after clear
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

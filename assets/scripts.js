document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const output = document.getElementById('output');

  // Show the initial default terminal line
  output.innerHTML = `Press Enter to type a command<span class="cursor">_</span>\n`;

  document.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const command = prompt('PS C:\\> Enter command'); // placeholder input
      if (command === 'show-projects') {
        showProjects();
      } else {
        output.innerHTML += `\nPS C:\\> ${command}\n'${command}' is not recognized as a valid command.\n`;
      }
    }
  });

  async function showProjects() {
  output.innerHTML += "\nPS C:\\> show-projects\n";
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

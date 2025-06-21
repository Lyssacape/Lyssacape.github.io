document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('input');
  const output = document.getElementById('output');

  // Simulated command processing
  document.addEventListener('keydown', async (e) => {
    if (e.key === 'Enter') {
      const command = prompt('PS C:\\> Enter command'); // Replace with real input later
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
        output.innerHTML += `\n[${p.title}]\n${p.description}\n${p.link}\n`;
      });
    } catch (err) {
      output.innerHTML += `Error loading projects: ${err.message}\n`;
    }
  }
});

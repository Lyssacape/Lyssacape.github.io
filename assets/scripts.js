document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');

  const introLines = [
    "PS C:\\> Connect-Lyssacape",
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
    "PS C:\\> Press Enter to type a command"
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

      // Remove existing cursor
      output.innerHTML = output.innerHTML.replace(/<span class="cursor"><\/span>$/, '');

      // Add current line with cursor
      const currentLine = styledLine + '<span class="cursor"></span>';

      // Overwrite or append line
      const lines = output.innerHTML.split('\n');
      lines[lines.length - 1] = currentLine;
      output.innerHTML = lines.join('\n');

      charIndex++;
      if (charIndex <= line.length) {
        setTimeout(typeLine, 20); // character speed
      } else {
        output.innerHTML += '\n';
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 100); // delay between lines
      }
    } else {
      enableCommandListener();
    }
  }

  typeLine();

  function enableCommandListener() {
    document.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter') {
        const command = prompt('PS C:\\> Enter command');
        output.innerHTML += `\nPS C:\\> ${command}\n`;

        switch (command?.toLowerCase()) {
          case 'show-projects':
            output.innerHTML += "(This command is coming soon... or maybe I already automated it to run silently?)\n";
            break;
          case 'clear':
          case 'cls':
            output.innerHTML += "(No, you can't clear the banner. It's staying. It's art.)\n";
            break;
          case '':
            break;
          default:
            output.innerHTML += `'${command}' is not recognized as a valid command, but I appreciate your optimism.\n`;
        }
      }
    });
  }
});

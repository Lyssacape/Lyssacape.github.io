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

    let lines = output.innerHTML.split('\n');

    // Remove all existing cursors
    lines = lines.map(l => l.replace(/<span class="cursor"><\/span>/g, ''));

    // If this is the final line, keep the blinking cursor forever
    const isFinalLine = lineIndex === introLines.length - 1;

    // Add cursor if still typing or it's the final line
    const withCursor = styledLine + (isFinalLine || charIndex < line.length ? '<span class="cursor"></span>' : '');

    lines[lines.length - 1] = withCursor;
    output.innerHTML = lines.join('\n');

    charIndex++;
      if (charIndex <= line.length) {
        setTimeout(typeLine, 20);
      } else {
        if (!isFinalLine) {
          // Done typing this line, add line break and move to next
          lines[lines.length - 1] = styledLine; // remove trailing cursor
          output.innerHTML = lines.join('\n') + '\n';
        }
        lineIndex++;
        charIndex = 0;
        setTimeout(typeLine, 100);
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

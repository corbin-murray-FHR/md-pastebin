# Quickstart: Syntax Highlighting

## Usage

To use syntax highlighting in your markdown pastes, use standard fenced code blocks with a language identifier.

### Example

```markdown
Here is some PowerShell code:

\`\`\`powershell
Get-Process | Where-Object { $\_.CPU -gt 10 }
\`\`\`

And some JavaScript:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`
```

## Features

- **Syntax Highlighting**: Automatically applied based on the language tag.
- **Line Numbers**: Displayed on the left side of the code block.
- **Copy Button**: Hover over the code block to see a "Copy" button in the top-right corner. Click to copy the code to your clipboard.
- **Theme Support**: Colors automatically adapt to Light and Dark modes.

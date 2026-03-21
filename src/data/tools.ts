export interface Tool {
  id: string
  title: string
  description: string
  code: {
    code: string;
    copy: string;
  }
}

export const imports = `import { defineTools } from 'toolry'\n\n`
export const tools: Tool[] = [
  {
    id: 'web-open',
    title: 'Open Website',
    description: 'Open a URL in your default browser.',
    code: createToolCode(`{
  name: 'web:open',
  description: 'Open a website in your default browser',
  category: 'Web',
  args: {
    url: { type: 'text', description: 'URL', default: 'https://toolry.webry.com' },
  },
  run: ({ url }) => \`open "\${url}"\`,
}`),
  },
  {
    id: 'uuid',
    title: 'UUID',
    description: 'Generate a UUID and copy to clipboard.',
    code: createToolCode(`{
  name: 'uuid',
  description: 'Generate a UUID and copy to clipboard',
  category: 'Generators',
  askToRun: false,
  run: () => \`uuidgen | tr -d '\\n' | wl-copy && echo "→ copied to clipboard"\`,
}`),
  },
  {
    id: 'timestamp',
    title: 'Timestamp',
    description: 'Generate current Unix timestamp in milliseconds and copy to clipboard.',
    code: createToolCode(`{
  name: 'timestamp',
  description: 'Generate current Unix timestamp in milliseconds and copy to clipboard',
  category: 'Generators',
  askToRun: false,
  run: () => \`date +%s%3N | tr -d '\\n' | wl-copy && echo "→ copied to clipboard"\`,
}`),
  },
]

function createToolCode(code: string) {
  return {
    code: `${imports}export const defineTools(${code})`,
    copy: '\n' + code.split('\n').join('\n  ') + ',',
  }
}

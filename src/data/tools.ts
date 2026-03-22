export interface Tool {
  id: string;
  exportName: string;
  addPath: string;
  title: string;
  description: string;
  code: {
    code: string;
    copy: string;
  };
}

const imports = `import { defineTool } from 'toolry'\n\n`;

export const tools: Tool[] = [
  {
    id: "web-open",
    exportName: "webOpen",
    addPath: "web/open",
    title: "Open Website",
    description: "Open a URL in your default browser.",
    code: createToolCode(
      "webOpen",
      `{
  name: 'web:open',
  description: 'Open a website in your default browser',
  category: 'Web',
  args: {
    url: { type: 'text', description: 'URL', default: 'https://toolry.webry.com' },
  },
  run: ({ url }) => \`open "\${url}"\`,
}`,
    ),
  },
  {
    id: "uuid",
    exportName: "uuid",
    addPath: "generators/uuid",
    title: "UUID",
    description: "Generate a UUID and copy to clipboard.",
    code: createToolCode(
      "uuid",
      `{
  name: 'uuid',
  description: 'Generate a UUID and copy to clipboard',
  category: 'Generators',
  askToRun: false,
  run: () => \`uuidgen | tr -d '\\n' | wl-copy && echo "→ copied to clipboard"\`,
}`,
    ),
  },
  {
    id: "timestamp",
    exportName: "timestamp",
    addPath: "generators/timestamp",
    title: "Timestamp",
    description: "Generate current Unix timestamp in milliseconds and copy to clipboard.",
    code: createToolCode(
      "timestamp",
      `{
  name: 'timestamp',
  description: 'Generate current Unix timestamp in milliseconds and copy to clipboard',
  category: 'Generators',
  askToRun: false,
  run: () => \`date +%s%3N | tr -d '\\n' | wl-copy && echo "→ copied to clipboard"\`,
}`,
    ),
  },
];

function createToolCode(exportName: string, body: string) {
  const exportLine = `export const ${exportName} = defineTool(${body})`;
  return {
    code: `${imports}${exportLine}`,
    copy: exportLine,
  };
}

'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [history, setHistory] = useState([
    { type: 'system', text: 'AI CLI Coder v1.0.0 - Type your coding request' }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = async (cmd) => {
    if (!cmd.trim()) return;

    setHistory(prev => [...prev, { type: 'input', text: `> ${cmd}` }]);
    setInput('');
    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 800));

    const response = generateCodeResponse(cmd);
    setHistory(prev => [...prev, { type: 'output', text: response }]);
    setIsProcessing(false);
  };

  const generateCodeResponse = (cmd) => {
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd.includes('function') || lowerCmd.includes('create a function')) {
      return `// Generated function
function processData(input) {
  const result = input.map(item => item * 2);
  return result.filter(val => val > 0);
}

module.exports = processData;`;
    }

    if (lowerCmd.includes('react component') || lowerCmd.includes('component')) {
      return `import React from 'react';

export default function CustomComponent({ title, data }) {
  return (
    <div className="container">
      <h1>{title}</h1>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}`;
    }

    if (lowerCmd.includes('api') || lowerCmd.includes('endpoint')) {
      return `export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;

    try {
      const result = await processData(data);
      res.status(200).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}`;
    }

    if (lowerCmd.includes('class') || lowerCmd.includes('create a class')) {
      return `class DataProcessor {
  constructor(config) {
    this.config = config;
    this.data = [];
  }

  addData(item) {
    this.data.push(item);
  }

  process() {
    return this.data.map(item =>
      this.config.transform(item)
    );
  }

  reset() {
    this.data = [];
  }
}

module.exports = DataProcessor;`;
    }

    if (lowerCmd.includes('help')) {
      return `Available commands:
- "create a function" - Generate a JavaScript function
- "react component" - Generate a React component
- "api endpoint" - Generate an API handler
- "create a class" - Generate a JavaScript class
- "express server" - Generate an Express.js server
- "clear" - Clear terminal
- "help" - Show this help message`;
    }

    if (lowerCmd === 'clear') {
      setHistory([{ type: 'system', text: 'AI CLI Coder v1.0.0 - Type your coding request' }]);
      return '';
    }

    if (lowerCmd.includes('express') || lowerCmd.includes('server')) {
      return `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server running' });
});

app.post('/api/data', (req, res) => {
  const { data } = req.body;
  res.json({ received: data, timestamp: Date.now() });
});

app.listen(port, () => {
  console.log(\`Server listening on port \${port}\`);
});`;
    }

    return `// AI-generated code for: ${cmd}

function solution() {
  // Implementation based on your request
  const result = {
    status: 'success',
    data: []
  };

  return result;
}

// Export for use
module.exports = solution;`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isProcessing) {
      processCommand(input);
    }
  };

  return (
    <div style={{
      background: '#0a0a0a',
      color: '#00ff00',
      minHeight: '100vh',
      fontFamily: 'Monaco, Consolas, monospace',
      fontSize: '14px',
      padding: '20px'
    }}>
      <div
        ref={terminalRef}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: '#000',
          border: '1px solid #333',
          borderRadius: '4px',
          padding: '20px',
          minHeight: '80vh',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        {history.map((entry, idx) => (
          <div key={idx} style={{
            marginBottom: '10px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: entry.type === 'system' ? '#00ffff' :
                   entry.type === 'input' ? '#ffff00' : '#00ff00'
          }}>
            {entry.text}
          </div>
        ))}

        {isProcessing && (
          <div style={{ color: '#888' }}>Processing...</div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <span style={{ color: '#00ff00', marginRight: '8px' }}>{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#00ff00',
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
            placeholder={isProcessing ? '' : 'Enter command...'}
          />
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '20px auto 0',
        color: '#666',
        fontSize: '12px',
        textAlign: 'center'
      }}>
        Type "help" for available commands | Press Enter to execute
      </div>
    </div>
  );
}

import { spawn } from 'child_process';
import { EOL } from 'os';

// Start the MCP server in a separate process
const server = spawn('ts-node', ['--esm', 'src/index.ts'], {
  stdio: ['pipe', 'pipe', process.stderr]
});

console.log('Starting MCP server...');

// Prepare to send messages to the server
let messagesToSend = [
  // Initialize request
  {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      clientInfo: {
        name: 'TestClient',
        version: '1.0.0'
      },
      protocolVersion: '2024-11-05',
      capabilities: {
        tools: {}
      }
    }
  },
  // List tools request
  {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list'
  },
  // Call hello tool
  {
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'hello',
      arguments: {
        name: 'World'
      }
    }
  }
];

// Send messages to the server
function sendNextMessage() {
  if (messagesToSend.length > 0) {
    const message = messagesToSend.shift();
    console.log('Sending message:', JSON.stringify(message));
    server.stdin.write(JSON.stringify(message) + EOL);
  }
}

// Process responses from the server
let buffer = '';
server.stdout.on('data', (data) => {
  const chunk = data.toString();
  buffer += chunk;
  
  try {
    // Try to parse complete JSON objects from the buffer
    const lines = buffer.split(EOL);
    for (let i = 0; i < lines.length - 1; i++) {
      if (lines[i].trim()) {
        const response = JSON.parse(lines[i]);
        console.log('Received response:', JSON.stringify(response, null, 2));
        
        // Send the next message when we get a response
        if (response.id) {
          setTimeout(sendNextMessage, 100);
        }
      }
    }
    // Keep the last (potentially incomplete) line
    buffer = lines[lines.length - 1];
  } catch (error) {
    // If we can't parse the JSON, we might have an incomplete message
    // Just continue collecting data
  }
});

// Handle errors
server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

// Clean up when the server exits
server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Start sending messages
setTimeout(() => {
  sendNextMessage();
}, 1000);

// Handle process termination
process.on('SIGINT', () => {
  console.log('Terminating server...');
  server.kill();
  process.exit(0);
});

// Timeout after 10 seconds
setTimeout(() => {
  console.log('Test timeout reached, terminating...');
  server.kill();
  process.exit(1);
}, 10000); 
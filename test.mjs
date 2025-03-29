import { McpClient } from '@modelcontextprotocol/sdk/client/mcp.js';
import { ProcessTransport } from '@modelcontextprotocol/sdk/client/process.js';

async function main() {
  try {
    console.log('Starting test client...');
    
    // Create a transport that starts the server in a separate process
    const transport = new ProcessTransport({
      command: 'ts-node',
      args: ['--esm', 'src/index.ts'],
      stderr: 'inherit'
    });
    
    // Create the client
    const client = new McpClient();
    
    // Connect to the server
    await client.connect(transport);
    console.log('Connected to server');
    
    // Initialize the client-server connection
    const initResult = await client.initialize({
      clientName: 'TestClient',
      clientVersion: '1.0.0',
      protocolVersion: '2024-11-05'
    });
    
    console.log('Server initialized:', initResult);
    
    // Call the hello tool
    console.log('Calling hello tool...');
    const result = await client.runTool('hello', { name: 'World' });
    console.log('Tool result:', result);
    
    // Close the connection
    await client.disconnect();
    console.log('Test completed successfully');
    
  } catch (error) {
    console.error('Error during test:', error);
    process.exit(1);
  }
}

main(); 
import { spawn } from "child_process";
import { McpClient } from "@modelcontextprotocol/sdk/client/mcp.js";
import { ProcessTransport } from "@modelcontextprotocol/sdk/client/process.js";

async function runTest() {
  console.log("Starting MCP client test...");
  
  // Create the client transport
  const transport = new ProcessTransport({
    command: "ts-node",
    args: ["--esm", "src/index.ts"]
  });
  
  // Create and connect the client
  const client = new McpClient();
  
  try {
    await client.connect(transport);
    console.log("Client connected to server");
    
    // Initialize the server
    const initResult = await client.initialize({
      clientName: "TestClient",
      clientVersion: "1.0.0",
      protocolVersion: "2024-11-05"
    });
    
    console.log("Server initialized:", initResult);
    
    // Call the hello tool
    console.log("Calling 'hello' tool...");
    const helloResult = await client.runTool("hello", { name: "World" });
    console.log("Hello tool result:", helloResult);
    
  } catch (error) {
    console.error("Error during client test:", error);
  } finally {
    // Close the connection
    await client.disconnect();
    console.log("Test completed");
  }
}

runTest(); 
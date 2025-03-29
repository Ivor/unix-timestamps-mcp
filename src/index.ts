#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "UnixTimestampServer",
  version: "1.0.0"
});

// Add a simple hello tool
server.tool(
  "hello",
  { name: z.string() },
  async ({ name }) => ({
    content: [{ type: "text", text: `Hello, ${name}!` }]
  })
);

// Start the server using stdio transport
const run = async () => {
  console.error("Starting MCP server...");
  
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP server connected via stdio transport");
  } catch (error) {
    console.error("Error running MCP server:", error);
    process.exit(1);
  }
};

// Execute the server
run(); 
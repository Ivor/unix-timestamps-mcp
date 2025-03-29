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

// Add a tool to convert ISO8601 date times to Unix timestamps
server.tool(
  "iso8601_to_unix",
  "Converts an ISO8601 date time string to a Unix timestamp (seconds since epoch)",
  { iso8601: z.string() },
  async ({ iso8601 }) => {
    try {
      // Parse the ISO8601 string into a Date object
      const date = new Date(iso8601);
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return {
          content: [{ 
            type: "text", 
            text: `Error: "${iso8601}" is not a valid ISO8601 date time string.` 
          }],
          isError: true
        };
      }
      
      // Convert to Unix timestamp (seconds since epoch)
      const unixTimestamp = Math.floor(date.getTime() / 1000);
      
      return {
        content: [{ 
          type: "text", 
          text: `Unix Timestamp: ${unixTimestamp}

Original ISO8601: ${iso8601}
Parsed as: ${date.toUTCString()}` 
        }]
      };
    } catch (error) {
      return {
        content: [{ 
          type: "text", 
          text: `Error converting ISO8601 to Unix timestamp: ${error instanceof Error ? error.message : String(error)}` 
        }],
        isError: true
      };
    }
  }
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
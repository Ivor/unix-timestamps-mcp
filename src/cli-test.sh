#!/bin/bash

# Start the server in one terminal
echo "Starting the MCP server..."
ts-node --esm src/index.ts &
SERVER_PID=$!

# Wait a moment for the server to start
sleep 2

# Use npx to run the MCP client CLI from the SDK
echo "Testing the 'hello' tool..."
echo '{"name": "World"}' | npx @modelcontextprotocol/sdk client tool hello

# Cleanup
kill $SERVER_PID
echo "Test completed" 
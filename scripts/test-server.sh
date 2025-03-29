#!/bin/bash

# Make sure the scripts directory exists
mkdir -p $(dirname "$0")

# Path to the MCP server script
SERVER_SCRIPT="../src/index.ts"
SERVER_LOG="server.log"

# Start the server in the background and log output
echo "Starting MCP server..."
cd $(dirname "$0")
ts-node --esm $SERVER_SCRIPT > $SERVER_LOG 2>&1 &
SERVER_PID=$!

# Give the server a moment to start up
sleep 1

# Function to test a tool
function test_tool() {
    local TOOL_NAME=$1
    local PARAMS=$2
    
    echo "Testing tool: $TOOL_NAME with params: $PARAMS"
    echo $PARAMS | npx @modelcontextprotocol/sdk client tool $TOOL_NAME
    if [ $? -eq 0 ]; then
        echo "✅ $TOOL_NAME test passed"
    else
        echo "❌ $TOOL_NAME test failed"
    fi
}

# Test the hello tool
test_tool "hello" '{"name": "World"}'

# Cleanup
echo "Stopping MCP server (PID: $SERVER_PID)..."
kill $SERVER_PID
wait $SERVER_PID 2>/dev/null

echo "Server log from $SERVER_LOG:"
cat $SERVER_LOG

echo "Test completed" 
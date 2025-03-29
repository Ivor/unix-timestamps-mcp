# Unix Timestamps MCP Server

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg) <!-- Assuming MIT License, please update if incorrect -->
![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg) <!-- Update status as needed -->

A lightweight MCP server for converting ISO 8601 date/time strings to Unix timestamps.

## Features

- **ISO 8601 to Unix Timestamp Conversion**: Provides a tool (`iso8601_to_unix`) to convert standard ISO 8601 date/time strings into Unix timestamps (seconds since the epoch).
- **Input Validation**: Basic check to ensure the input string is a valid date recognized by JavaScript's `Date` parser.
- **Error Handling**: Returns an error message if the input string is not a valid ISO 8601 date/time.

## Installation

### Prerequisites

- Node.js (version 18 or higher recommended)
- `npm` or `npx` (usually included with Node.js)

### Client Configuration (Claude Desktop)

To use this server with a client like Claude Desktop, add the following configuration to your client's settings file (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "unix_timestamps_mcp": {
      "command": "npx",
      "args": ["-y", "github:Ivor/unix-timestamps-mcp"]
    }
  }
}
```

## Usage

This server provides tools accessible via an MCP client.

### Available Tools

#### Tool: `iso8601_to_unix(iso8601: string)`

Converts an ISO 8601 formatted date/time string into a Unix timestamp (seconds since epoch).

- **Input Parameter**: `iso8601` (string) - The date/time string in ISO 8601 format (e.g., `"2024-07-26T10:00:00Z"`, `"2024-07-26T12:00:00+02:00"`).
- **Output**: Text containing the calculated Unix timestamp and confirmation of the parsed date. Example:

  ```
  Unix Timestamp: 1721988000

  Original ISO8601: 2024-07-26T10:00:00Z
  Parsed as: Fri, 26 Jul 2024 10:00:00 GMT
  ```

- **Error Handling**: Returns an error message if the input string is not a valid ISO 8601 date/time.

### Examples in Claude Desktop

1.  Configure the server as shown in the Installation section.
2.  Use the `iso8601_to_unix` tool in your prompts:
    - "Convert '2023-03-15T12:00:00Z' to a Unix timestamp: `iso8601_to_unix(iso8601: '2023-03-15T12:00:00Z')`"
    - "What is the Unix timestamp for '2024-01-01T00:00:00-05:00'? `iso8601_to_unix(iso8601: '2024-01-01T00:00:00-05:00')`"

## License

This project is licensed under the MIT License. See the LICENSE file for details. (Please create a LICENSE file or update this section if using a different license).

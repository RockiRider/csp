#!/bin/bash

# Check if a file path is provided as an argument
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <file_path>"
    exit 1
fi

file_path="$1"

# Check if the file exists
if [ ! -f "$file_path" ]; then
    echo "Error: File does not exist."
    exit 1
fi

# Generate SHA-256 hash of the file content in binary format and then base64 encode it
openssl dgst -sha256 -binary "$file_path" | base64
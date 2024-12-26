#!/bin/bash

# Find all directories containing node_modules and remove them
find . -type d -name "node_modules" -exec rm -rf {} +

echo "node_modules directories have been removed from all apps and packages."
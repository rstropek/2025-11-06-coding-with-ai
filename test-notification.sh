#!/bin/bash

# Test script to send notifications to the running app
# Usage: ./test-notification.sh

echo "Sending test notification to http://localhost:3000/api/notifications"

curl -X POST http://localhost:3000/api/notifications \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build Completed",
    "text": "Frontend build completed successfully.",
    "icon": "check-circle"
  }'

echo ""
echo "Notification sent!"

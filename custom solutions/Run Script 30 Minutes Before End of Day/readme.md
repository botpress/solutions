# Routine using hooks

This After Server Start hook creates a routine that will run every day, 30 minutes before the end of the day, just once. It will consider other Botpress nodes to avoid duplication (using a lock).

**To use:**

1. Create an after_server_start hook using the script attached (routine.js)
2. Modify the runTask function with your code to create the desired task
3. Restart server

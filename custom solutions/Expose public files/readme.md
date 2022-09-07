# Expose public files

This solution will create a url that can be used to expose files from a public folder

# How to install

1. Create the after_server_start hook available in this folder (create_files_router.js) as a global hook in your server, and restart your server

2. Create a folder called 'myfiles' in the global folder using the advanced editor (only)
    1. In the code editor, click on 'Advanced Editor'
    
    ![image](https://user-images.githubusercontent.com/13484138/188656031-7833563f-96db-4563-b104-094a9b40ac3c.png)
    
    2. Click on the '+' to create a new file
    
    ![image](https://user-images.githubusercontent.com/13484138/188652875-0180c52b-a7f8-4566-b334-ea35b29a2e4b.png)
    
    3. Create any file, for example 'file.js' or 'file.html', include 'global/myfiles/' before to specify our global public folder (important)
    
    ![image](https://user-images.githubusercontent.com/13484138/188892413-411f4b65-7316-42da-975e-40f344bd7021.png)
    
    4. Create and save the file
    
    ![image](https://user-images.githubusercontent.com/13484138/188892500-e556d227-f8f8-413f-baa2-2829e42e8770.png)


# How to use it

Access the URL bellow to access that file from any browser

http://{EXPOSED_BOTPRESS_URL}/api/v1/bots/___/mod/files/{FILENAME}

Example: http://localhost:3000/api/v1/bots/___/mod/files/file.js

![image](https://user-images.githubusercontent.com/13484138/188892812-2ffab880-0317-4514-ba3c-3265f9f14795.png)

You can also include ?download=true to your URL to download the file instead

Example: http://localhost:3000/api/v1/bots/___/mod/files/file.js?download=true

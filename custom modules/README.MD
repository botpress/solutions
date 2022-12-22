## Purpose
This folder contains custom modules built in the past that our users have found helpful. **Please note we are not maintaining these modules, which means they may not work with the latest version of Botpress.**
You are welcome to use these modules directly or use them as a pattern. 

## Uploading Modules
You generally have two options for uploading modules. 
1. UI
2. Terminal

### Uploading Modules via UI
1. Import the module of choice (for this example, we are using calendly.tgz) 
![image](https://user-images.githubusercontent.com/13484138/120817221-e9b0b300-c527-11eb-8b85-bd57c7258342.png)
![image](https://user-images.githubusercontent.com/28860442/128016920-fab85eff-b36c-4c7a-aa0c-491c3f0ea57d.png)
2. Restart Botpress
![image](https://user-images.githubusercontent.com/13484138/120817439-195fbb00-c528-11eb-9731-f289a8c398b7.png)
3. Unpack the module
![image](https://user-images.githubusercontent.com/28860442/128017785-a259adbb-7982-47b4-a7e8-79ccd7bd046a.png)
4. Enable the module
![image](https://user-images.githubusercontent.com/28860442/128017856-d48fd8df-0be1-4175-a754-e0603d4142af.png)
5. Restart Botpress by clicking the red gear in the bottom right of the screen<br>
![image](https://user-images.githubusercontent.com/104075132/209181112-49d0eb06-6419-4bb0-bbcf-3fda9c1d1ff4.png)
6. Click the Restart server now button<br>
![image](https://user-images.githubusercontent.com/104075132/209181396-5f457bbc-032e-48a7-8abb-a4897da733b9.png)
7. Wait for the restart dialogue box to go away<br>
![image](https://user-images.githubusercontent.com/104075132/209181686-256cc710-7fab-495e-a0e7-40e8d955df3d.png)



### Uploading Modules via Terminal
If available, the instructions for doing this will be included in the README file for the module as a Quickstart option. 

#### Continous Development
When you make changes to any portion of your module, you need to build it and restart Botpress.

You can type `yarn watch`, which will save you some time since the source will be compiled immediately every time you change. You will only have to restart Botpress.

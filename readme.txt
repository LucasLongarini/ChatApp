Name: Lucas Longarini
UCID: 30004486
Github Link: https://github.com/LucasLongarini/ChatApp

Instructions on how to run the code on linux machines:
    1. Open up the terminal in the linux machines or ssh, putty, etc... into the linux servers.
    2. In the directory of your choice run 'git clone https://github.com/LucasLongarini/ChatApp.git'
    3. run 'cd ChatApp'
    4. run 'cd server'
    5. run 'npm install'
    6. run 'Node app.js'

    Now the web server is running. The output should be: 
    'Server Listening on port 3000 (or another port if port 3000 is taken)'
    
    * If you are on the linux machines, you can open a web browser and go to 'localhost:3000'

    * If you are have remoted into the linux servers through ssh, putty, etc... you can port forward to your local machine.
    To do this do the following:
        1. Open a new terminal
        2. Run 'ssh -N -f -L localhost:10005:localhost:3000 <Your Cpsc Username>@linux.cpsc.ucalgary.ca'
        3. Enter in your password
        4. On your local machine, go to 'localhost:10005'
    You should now see the website.
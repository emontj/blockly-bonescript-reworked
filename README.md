Blockly Bonescript Rework
==================
## Project Description

This is a fork of the [Blockly visual programming editor](https://code.google.com/p/blockly) that adds support for using the [BoneScript library](http://beagleboard.org/bonescript) for physical computing with BeagleBone.

Check out the running [Playground Demo](http://jadonk.github.io/blockly-bonescript/static/tests/playground.html) from the original creators.
This version has some additional features, like the ability to execute code directly on the BeagleBone, and additional blocks.

## Setup
This is a node js server.  In order to set it up, clone this repository onto your BeagleBone with this command:

  ```git clone git@github.com:emontj/blockly-bonescript-reworked.git```


You may need to install node js on the BeagleBone if it is not already installed.

## Running the Program
Navigate into the repository folder on the BeagleBone and run:
  
  ```node ./server.js```

You may face some errors for missing dependencies.  These can usually be fixed with:
  
  ```npm install```
  
or:

  ```npm install <package-name>```

Once all packages are installed, you can run the above node command again and the server will start.  It must stay running when using the tool.
Next, go to a browser on a connected device and browse to:
  
  ```192.168.7.2:9000```
  
You should see the BeagleBone Block editor.  *Note that your device may have a slightly different IP, such as 192.168.6.2.  This can be found by running this command on the BeagleBone:
  
  ```ifconfig```
  
 Typically the BeagleBone either has 192.168.7.2 or 192.168.6.2.  The port will always be 9000
  
## How to add Blocks
For future developers who want to add new blocks to the tool, here are the steps:

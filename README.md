Blockly Bonescript Rework
==================
## Project Description

This is a fork of the [Blockly visual programming editor](https://code.google.com/p/blockly) that adds support for using the [BoneScript library](http://beagleboard.org/bonescript) for physical computing with BeagleBone.

Check out the running [Playground Demo](http://jadonk.github.io/blockly-bonescript/static/tests/playground.html) from the original creators.
This version has some additional features, like the ability to execute code directly on the BeagleBone, and additional blocks.

## Setup
- This is a node server.  In order to set it up, clone this repository onto your BeagleBone.
- You may need to install node on the BeagleBone if it is not already installed.

## Running the Program
Navigate into the repository folder on the BeagleBone and run:
  
  node ./server.js

You may face some errors for missing dependencies.  These can usually be fixed with:
  
  npm install
  
or:

  npm install <package-name>

Once all packages are installed, you can run the above node command again.  Then go to a browser on a connected device and enter:
  
  192.168.7.2:9000
  
You should see the BeagleBone Block editor.  *Note that you may have a slightly different IP, such as 192.168.6.2.  This can be found by running this command on the BeagleBone:
  
  ifconfig
  
 
  
## How to add Blocks
For future developers who want to add new blocks to the tool, here are the steps:

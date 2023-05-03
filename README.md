Blockly Bonescript Rework
==================
## Project Description

This is a fork of the [Blockly visual programming editor](https://code.google.com/p/blockly) that adds support for using the [BoneScript library](http://beagleboard.org/bonescript) for physical computing with BeagleBone.

Check out the running [Playground Demo](http://jadonk.github.io/blockly-bonescript/static/tests/playground.html) from the original creators.
This version has some additional features, like the ability to execute code directly on the BeagleBone, and additional blocks.

## Setup
This is a node js server.  In order to set it up, clone this repository onto your BeagleBone with this command:

  ```
  git clone git@github.com:emontj/blockly-bonescript-reworked.git
  ```


You may need to install node js on the BeagleBone if it is not already installed.

## Running the Program
Navigate into the repository folder on the BeagleBone and run:
  
  ```
  node ./index.js
  ```

You may face some errors for missing dependencies.  These can usually be fixed with:
  
  ```
  npm install
  ```
  
or:

  ```
  npm install <package-name>
  ```

Once all packages are installed, you can run the above node command again and the server will start.  It must stay running when using the tool.
Next, go to a browser on a connected device and browse to:
  
  ```
  192.168.7.2:9000
  ```
  
You should see the BeagleBone Block editor in the browser.  
*Note that your device may have a slightly different IP, such as 192.168.6.2.  This can be found by running this command on the BeagleBone:
  
  ```
  ifconfig
  ```
  
 Typically the BeagleBone either has 192.168.7.2 or 192.168.6.2.  The port will always be 9000
  
## How to add Blocks
For future developers who want to add new blocks to the tool, there are essentially three steps:
- Adding the block as an option to the front end tool
- Defining the block in JavaScript
- Defining the code the block executes

YOU MUST do all three of these steps.  Without doing all three steps, the new block may break the program (particularly if you add the front end XML without the backend components).
If you have worked with Blockly before, you will notice that the Blockly code is an old version of Blockly.  This is important to keep in mind.


### Adding the block as an option to the front end tool
This is done in XML within the HTML.  Go to playground.html in the parent folder, and look for the <category> and <block> tags.
You can add a new block here like so:
  ```
  <block type="bonescript_led_toggle">
    <value name="pin">
      <block type="bonescript_pin_digital">
        <title name="PIN">P9_11</title>
      </block>
    </value>
  </block>
  ```
  
Obviously, replace your values and block names.  The type value is important, as it's name links it to the javascript we will be defining next.

### Defining the block in JavaScript
For the JavaScript definition, go to static/language/common/bonescript.js and add the following code, again replacing values where needed.  **It is important that the bonescript_led_toggle part matches the "type=" value in the XML!**
  
```
 Blockly.Language.bonescript_led_toggle = {
    helpUrl: 'http://example.com/your_block_help_url/',
    init: function() {
      this.setColour(210);
      this.appendDummyInput()
          .appendTitle("LED Toggle");
      this.appendValueInput("pin")
          .setCheck("Pin")
          .appendTitle("Pin");
      this.appendDummyInput()
          .appendTitle("State")
          .appendTitle(new Blockly.FieldDropdown([["ON", "1"], ["OFF", "0"]]), "state");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('Toggle LED on or off');
    }
  };
```

Much of this code may not be needed if your block does not have a toggle or input.  To make creation of block definitions easier, use this tool: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
  
### Defining the code the block executes
This is referred to as the generator or generation code in the Blockly-sphere.  To add generator code for the custom block, go to /static/generators/javascript/bonescript.js and add the following code:
  
  ```
  Blockly.JavaScript.bonescript_led_toggle = function() {
  var value_pin = Blockly.JavaScript.valueToCode(this, 'pin', Blockly.JavaScript.ORDER_ATOMIC);
  var dropdown_state = this.getTitleValue('state');
  var on_off = Blockly.JavaScript.bonescript_var()

  if (dropdown_state == 1) {
    on_off = on_off + ".HIGH";
  } else if (dropdown_state == 0) {
    on_off = on_off + ".LOW";
  }

  var code = Blockly.JavaScript.bonescript_var() + '.digitalWrite(' + value_pin + ', ' + on_off + ');\n';
  return code;
  };
  ```
  
Again, change the name "bonescript_led_toggle" to match whatever your block is.  In this case, anything inside the function() { } block can be changed to whatever the block should actually do.  It just needs to return a string of the code to write.

#### Bonescript/Blockly Semantics
There are a few nuances left in the example above that may be important to you.  For one, any time you need to use a bonescript specific function, notice the "Blockly.JavaScript.bonescript_var()" line.  This is useful, as it automatically imports Bonescript to the code and writes it's identifier ("b" in bonescript's case).  If you were simply to write "b.digitalWrite" instead of inserting the bonescript_var() function, it would not import bonescript and the code wouldn't work.

Additionally, observe the first few lines to see how to work with getting passed parameters out of the blockly block to use.
  
Finally, note that you can use logic here before generating the final code.  In this case, there is an if else statement decoding the input from the blockly block and converting it to the respective bonescript value.
  
## Conclusion
This documentation covered:
  - Installation
  - Running the tool
  - Adding new features/blocks to the tool

Thanks for checking the tool out, and happy coding!


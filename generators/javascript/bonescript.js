/**
 * Copyright 2013 Texas Instruments Inc.
 * http://beagleboard.org/Support/BoneScript/blockly
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for BoneScript blocks
 * @author jdk@ti.com (Jason Kridner)
 */
'use strict';

goog.provide('Blockly.JavaScript.bonescript');

goog.require('Blockly.JavaScript');

Blockly.JavaScript.bonescript_var_get = function() {
  var code = Blockly.JavaScript.variableDB_.getName(this.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.bonescript_var_set = function() {
  var argument0 = Blockly.JavaScript.valueToCode(this, 'VALUE',
      Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.variableDB_.getName(
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

Blockly.JavaScript.bonescript_getplatform = function() {
  var statements_callback = Blockly.JavaScript.statementToCode(this, 'callback');
  var text_val = this.getTitleValue('VAR');
  var code = Blockly.JavaScript.bonescript_var() + '.getPlatform( function(' + text_val + '){\n   ' + statements_callback + '} );\n';
  return code;
};

Blockly.JavaScript.bonescript_var = function() {
  if (!Blockly.JavaScript.definitions_['bonescript_var']) {
    var varName = Blockly.JavaScript.variableDB_.getDistinctName('b', Blockly.Generator.NAME_TYPE);
    Blockly.JavaScript.definitions_['bonescript_var'] = 'var ' + varName + ' = require("bonescript");\n';
    Blockly.JavaScript.bonescript_var.varName = varName;
  }
  return Blockly.JavaScript.bonescript_var.varName;
};


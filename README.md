# Arm Assembly Helpers
*By Joshua Bernstein*

This is an extension to add syntax highlighting and instruction definitions for Armv8 assembly language. This extension is still very much a WIP. If you find any issues or bugs, please report them on the GitHub [here](https://github.com/joshbernsteint/arm_helpers), and I will try to resolve it quickly.

## Features

### Syntax Highlighting
![syntax coloring](./docs/color.png)   
This extension comes with full syntax highlighting support for VSCode. 
* Instructions (such as Add, Sub, Mov, etc...) are colored like functions in higher-level languages. 
* Register are colored as constants, and labels are colored as variables. 
* Directives that indicate sections of the file (like `.text`) or declaring symbols (like `.extern` or `.global`) are colored as keywords.
* Directives that declare memory space (such as `.quad` or `.string`) are colored as a Type declaration (such as the result of using typedef in C).
* Comments and strings are colored exactly like other languages.

### Instruction Definitions
By hovering over any instruction, you will be able to see its definition. This consits of how to call it, its operands, and what it does.
![code definitions](./docs/def.png)    
In the above image, by hovering over the `LDR` instruction, you can view how to call it and its operands via the first line. In this case, it takes a register as its first operand and an address for its second. This address can either be from just a register or from a register and signed 9-bit immediate number in brackets. Moreover, there is a brief description of what the instruction actually does, as well as describing its operands in greater detail. 

Many ARMv8 instructions are currently supported with this feature, but **not** all of them. If you have any requests please create an Issue on the GitHub.

This feature extends to non-instructions as well. Some directives also have this feature, where by hovering over them you get general information about it. Also, by hovering over escaped sequences in strings, you will be able to view their value as a decimal number. This feature is very dynamic and should work for any valid escape sequence.

![escaped sequence](./docs/escape.png)   
In the image above I write a newline character in its hex form (instead of `\n`), and it converts the hex number into decimal. It would also work as a normal newline character, or other escape sequences like (but not limited to) `\r, \t, \0`.

### Auto Completion
### Memory Label Docstrings

### Pre-made code snippets

## FAQ

## Contributing

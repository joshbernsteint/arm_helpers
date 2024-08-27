/* Joshua Bernstein */
/* I pledge my honor that I have abided by the Stevens Honor System. */
.text /* Code segment of the assembly program */
.global _start /* Allows the operating system to access this program */
.extern printf//We are using the C Library in this assignment

_start: /* Start of the assembly code */





.data /* data segment of the assembly program */
arr: .quad -40, -25, -1, 0, 100, 300//Array to be searched through
length: .quad 6//The length of the array
target: .quad -25//Target to be looked for in the array
msg1: .string "Target %ld is in the array.\n"
msg2: .string "Target %ld is not in the array.\n"//Message if target not found

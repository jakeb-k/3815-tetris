Source Code Files. 
1. sketch.js
This file contains all the code that is used to generate 
the tetris game. This is the code I write myself and uses
the framework that is linked to build the program. This file
uses the p5.js and p5.play.js libraries.
lines = 378
2. Index.html
This is the file where all neccessary scripts are linked
as well as the file that is ran on the live server when
the server is activated. The p5.js, p5.play.js and
p5.min.js must be linked to this file in order to work. 
lines = 28

Links that are neccesary to run game
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/addons/p5.sound.min.js"></script>
<script src="https://p5play.org/v3/planck.js"></script>
<script src="https://p5play.org/v3/p5.play.js"></script>
 <script src="sketch.js"></script>

The game WILL NOT WORK if not linked. 

Naming Conventions

Functions
functions are named using camelCase 
e.g. initBlock();

Variables
variables are named using camelCase

e.g. let currentState; let score;

Classes
Classes are known as groups in this framework and are
named using camelCase.
dblocks = new Group(); 

total lines = 406 
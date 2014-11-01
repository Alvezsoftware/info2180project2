"use strict";
var puzzlepieces;
var blankY;
var blankX;

window.onload = function ()
{
	var puzzle = document.getElementById('puzzlearea');
	
	puzzlepieces = puzzle.getElementsByTagName('div');

	for (var i=0; i<puzzlepieces.length; i++)
	{
		puzzlepieces[i].className = 'puzzlepiece';
		puzzlepieces[i].style.backgroundImage="url('manu.jpg')";
		puzzlepieces[i].style.backgroundSize="400px 400px";
		puzzlepieces[i].style.left = (i%4*100)+'px';
		puzzlepieces[i].style.top = (parseInt(i/4)*100) + 'px';
		puzzlepieces[i].style.backgroundPosition= '-' + puzzlepieces[i].style.left + ' ' + '-' + puzzlepieces[i].style.top;
		puzzlepieces[i].onmouseover = function()
		{
			if (checkmoves(parseInt(this.innerHTML)))
			{
				this.style.border = "2px solid red";
				this.style.color = "#006600";
			}
		};
		puzzlepieces[i].onmouseout = function()
		{
			this.style.border = "2px solid black";
			this.style.color = "#000000";
		};
	puzzlepieces[i].onclick = function()
		{
			if (checkmoves(parseInt(this.innerHTML)))
			{
				swap(this.innerHTML-1);
				if (checkFinish())
				{
					youWin();
				}
				return;
			}
		};
	}

	blankX = '300px';
	blankY = '300px';
/*this shuffles the tiles when the shuffle button is clicked*/
	var shuffle = document.getElementById('shufflebutton');
	shuffle.onclick = function()
	{

		for (var i=0; i<250; i++)
		{
			var rand = parseInt(Math.random()* 15) %4;
			if (rand === 0)
			{
				var tmp = moveUp(blankX, blankY);
				if ( tmp != -1)
				{
					swap(tmp);
				}
			}
			if (rand == 1)
			{
				var temp = moveDown(blankX, blankY);
				if ( temp != -1) 
				{
					swap(temp);
				}
			}

			if (rand == 2)
			{
				var tmp1 = moveLeft(blankX, blankY);
				if ( tmp1 != -1)
				{
					swap(tmp1);
				}
			}

			if (rand == 3)
			{
				var temp1 = moveRight(blankX, blankY);
				if (temp1 != -1)
				{
					swap(temp1);
				}
			}
		}
	};
};
/*This checks if there are any blank space for the tile to move into*/
function checkmoves(pos)
{
	if (moveLeft(blankX, blankY||moveDown(blankX, blankY))== (pos-1))
	{
		return true;
	}

	if (moveUp(blankX, blankY) || (moveRight(blankX, blankY)) == (pos-1))
	{
		return true;
	}
}
/*This you a background image of the actual puzzle when you put the puzzle together*/
function youWin()
{
	var body = document.getElementsByTagName('body');
	body[0].style.backgroundImage="url('manu.jpg')";
	body[0].style.backgroundSize="600px 700px";
	alert("YOU SOLVE THE PUZZLE!!" );
	location.reload();
}

function checkFinish()
{
	var check = true;
	for (var i = 0; i < puzzlepieces.length; i++) {
		var y = parseInt(puzzlepieces[i].style.top);
		var x = parseInt(puzzlepieces[i].style.left);

		if (x != (i%4*100) || y != parseInt(i/4)*100)
		{
			check = false;
			break;
		}
	}
	return check;
}
/*Moves the tile left*/
function moveLeft(x, y)
{
	var offsetX = parseInt(x);
	var offsetY = parseInt(y);

	if (offsetX > 0)
	{
		for (var i = 0; i < puzzlepieces.length; i++) 
		{
			if (parseInt(puzzlepieces[i].style.left) + 100 == offsetX && parseInt(puzzlepieces[i].style.top) == offsetY)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}
/*Moves the tile right*/
function moveRight (x, y) {
	var offsetX = parseInt(x);
	var offsetY = parseInt(y);
	if (offsetX < 300)
	{
		for (var i =0; i<puzzlepieces.length; i++){
			if (parseInt(puzzlepieces[i].style.left) - 100 == offsetX && parseInt(puzzlepieces[i].style.top) == offsetY) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}
/*Moves the tile up*/
function moveUp (x, y) {
	var offsetX = parseInt(x);
	var offsetY = parseInt(y);
	if (offsetY > 0)
	{
		for (var i=0; i<puzzlepieces.length; i++)
		{
			if (parseInt(puzzlepieces[i].style.top) + 100 == offsetY && parseInt(puzzlepieces[i].style.left) == offsetX) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}
/*Move tile down*/
function moveDown (x, y)
{
	var offsetX = parseInt(x);
	var offsetY = parseInt(y);
	if (offsetY < 300)
	{
		for (var i=0; i<puzzlepieces.length; i++)
		{
			if (parseInt(puzzlepieces[i].style.top) - 100 == offsetY && parseInt(puzzlepieces[i].style.left) == offsetX) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}

function swap (x,y) {
	var temp = puzzlepieces[x];
	puzzlepieces[x] = puzzlepieces[y];
	puzzlepieces[y] = temp;
}


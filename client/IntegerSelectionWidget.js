/*
 *  Ray Cloud Browser: interactively skim processed genomics data with energy
 *  Copyright (C) 2012, 2013 Sébastien Boisvert
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, version 3 of the License.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * A selection widget.
 *
 * \author Sébastien Boisvert
 */
function IntegerSelectionWidget(x,y,width,height,title,minimum,maximum){
	this.x=x;
	this.y=y;
	this.title=title;
	this.minimum=minimum;
	this.maximum=maximum;
	this.gotFinalChoice=false;
	this.finalChoice=minimum;

	var digits=0;

	var base=10;

	var exponent=0;

	while(1){
		var value=1;
		var i=0;
		while(i<exponent){
			value*=base;
			i+=1;
		}

		if(Math.floor(this.maximum/value)>0){
			digits++;
			exponent++;
		}else{
			break;
		}
	}

	this.minimums=[];
	this.maximums=[];
	this.digits=digits;
	this.symbols=[];

	var i=0;
	while(i++<digits){
		this.symbols.push(0);
	}

// first can not be 0
	this.symbols[0]++;

	this.width=width;
	this.height=height;

	var buttonDimension=25;

	var stepping=7;

	this.previousButton=new Button(this.x+this.width/2-buttonDimension/2-2,
		this.y+this.height-buttonDimension/2-stepping,
		buttonDimension,buttonDimension,"<<",false);

	this.nextButton=new Button(this.x+this.width/2+buttonDimension/2+2,
		this.y+this.height-buttonDimension/2-stepping,
		buttonDimension,buttonDimension,">>",false);

	this.okButton=new Button(this.x+this.width-buttonDimension/2-stepping,
		this.y+this.height-buttonDimension/2-stepping,
		buttonDimension,buttonDimension,"OK",false);

	this.finished=false;

	this.createButtons();
}

IntegerSelectionWidget.prototype.createButtons=function(){

	this.buttons=new Array();

	this.buttons.push(this.okButton);

	this.upButtons=[];
	this.downButtons=[];

	var i=0;

	var buttonDimension=15;
	while(i<this.digits){
		var downButton=new Button(this.x+this.width/20+250-i*20,
			this.y+150+20,
			buttonDimension,buttonDimension,"↓",false);

		var upButton=new Button(this.x+this.width/20+250-i*20,
			this.y+150-30,
			buttonDimension,buttonDimension,"↑",false);

		this.downButtons.push(downButton);
		this.upButtons.push(upButton);

		i++;
	}
}

IntegerSelectionWidget.prototype.draw=function(context){

	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height );
	context.fillStyle = '#FFF8F9';
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = 'black';
	context.stroke();

	context.fillStyle    = '#000000';
	context.font         = 'bold '+this.fontSize+'px Arial';
	context.fillText(this.title, this.x+this.width/20,this.y+20);

	if(!this.finished)
		context.fillText("Range: "+this.minimum+" to "+this.maximum, this.x+this.width/20+30,this.y+80);

	var i=0;
	while(i<this.digits){

		if(!this.finished)
			context.fillText(this.symbols[i], this.x+this.width/20+250-i*20,this.y+150);
		i++;
	}

	context.fillStyle    = '#000000';
	context.font         = ''+this.fontSize+'px Arial';

	if(this.finished){

		context.fillText(this.finalChoice, this.x+this.width/9,this.y+40);
		
		return;
	}

	var i=0;
	while(i<this.buttons.length){
		this.buttons[i++].draw(context,null);
	}

	//console.log("DownButtons: "+this.downButtons.length);

	i=0;
	while(i<this.downButtons.length){
		this.downButtons[i++].draw(context,null);
	}

	i=0;
	while(i<this.upButtons.length){
		this.upButtons[i++].draw(context,null);
	}
}

IntegerSelectionWidget.prototype.move=function(x,y){
	this.x+=x;
	this.y+=y;

	for(var i in this.buttons){
		this.buttons[i++].move(x,y);
	}
}

IntegerSelectionWidget.prototype.handleMouseDown=function(x,y){

	var result=false;
	var i=0;
	while(i<this.buttons.length){
		if(this.buttons[i].handleMouseDown(x,y)){
			result=true;
			break;
		}
		i++;
	}

	if(this.okButton.getState()){

		var base=10;
		var i=0;

		var value=0;

		while(i<this.digits){
			var toAdd=1;
			var j=0;
			while(j<i){
				toAdd*=base;
				j++;
			}

			value+=toAdd*this.symbols[i];
			i++;
		}

		this.finalChoice=value;
		this.gotFinalChoice=true;
	}

	if(result)
		return result;

	i=0;
	while(i<this.digits){
		if(this.upButtons[i].handleMouseDown(x,y)){
			//console.log("UpButton");
			this.symbols[i]++;
			return true;
		}
		i++;
	}

	i=0;
	while(i<this.digits){
		if(this.downButtons[i].handleMouseDown(x,y)){
			this.symbols[i]--;
			return true;
		}
		i++;
	}

	return false;
}

IntegerSelectionWidget.prototype.hasChoice=function(){
	return this.gotFinalChoice;
}

IntegerSelectionWidget.prototype.getChoice=function(){
	return this.finalChoice;
}

IntegerSelectionWidget.prototype.resetState=function(){
	this.gotFinalChoice=false;
	this.finished=true;
}
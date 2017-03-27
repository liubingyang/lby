// JavaScript Document
var box=document.getElementsByClassName('box')[0];
setInterval(function(){
		var rain=document.createElement('div');
		box.appendChild(rain);
		rain.style.height=parseInt(Math.random()*4+6)+'px';
		rain.style.width='1px';
		rain.style.background='#fff';	
		rain.style.zIndex='2';	
		rain.style.position='absolute';	
		rain.style.left=parseInt(Math.random()*200)+'px';	
		var n=0;
		setInterval(function(){
			n+=10;
			rain.style.top=n+'px';
			if(n==200){
				box.removeChild(rain)
			}	
		},50);
},20)


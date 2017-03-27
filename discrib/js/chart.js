window.onload = function() {
	var arr = [10, 20, 30, 40, 50, 15, 30, 20];
	arr2 = ['yellow', 'red', 'green', 'blue', 'white', 'black', 'pink', '#43f'];

	var sum = arr.reduce(function(num, itm) { //数组求和
		return num + itm
	});
	var cvs = document.getElementById('cvsS');
	var cxt = cvs.getContext('2d');
	var x = cvs.width / 2;
	var y = cvs.height / 2;
	var r = 150;

	cxt.beginPath();
	cxt.arc(x, y, r, 0, Math.PI * 2);
	cxt.closePath();
	cxt.fillStyle = '#ccc';
	cxt.fill();

	var drawS = function(m, n, c, r) {
		cxt.beginPath();
		cxt.lineTo(x, y);
		cxt.lineTo(x + r * Math.cos(m), y + r * Math.sin(m));
		cxt.arc(x, y, r, m, n);
		cxt.closePath();
		cxt.fillStyle = c;
		cxt.fill();
	};
	var all = 0;
	var alls = [0];
	for(var i = 0; i < arr.length; i++) {
		all += arr[i] / sum * Math.PI * 2;
		alls.push(all);
	}

	alls.push(0);
	console.log(alls);
	for(var i = 0; i < alls.length - 2; i++) {
		console.log(alls[i], alls[i + 1], arr2[2]);
		drawS(alls[i], alls[i + 1], arr2[i], r)
	}
	var max = function() { //最大值
		var max = 0;
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] > max) {
				max = arr[i]
			}
		}
		return max
	};

	//柱状图
	var cvs = document.getElementById('cvsB');
	var cxt = cvs.getContext('2d');
	var x = cvs.width / 2;
	var y = cvs.height / 2;
	//X坐标轴
	cxt.beginPath();
	cxt.moveTo(15, 250); //X轴53-752；
	cxt.lineTo(280, 250);
	cxt.lineTo(280, 255);
	cxt.lineTo(285, 249);
	cxt.lineTo(280, 243);
	cxt.lineTo(280, 248);
	cxt.lineTo(15, 248);
	cxt.closePath();
	cxt.fill();
	//Y坐标轴
	cxt.beginPath();
	cxt.moveTo(30, 275); //Y轴572-50；
	cxt.lineTo(30, 20);
	cxt.lineTo(25, 20);
	cxt.lineTo(31, 15);
	cxt.lineTo(37, 20);
	cxt.lineTo(32, 20);
	cxt.lineTo(32, 275);
	cxt.closePath();
	cxt.fill();
	//绘制1个柱状图
	var drawB = function(x1, x2, y1, y2, c) {
		cxt.beginPath();
		cxt.moveTo(x1, y1);
		cxt.lineTo(x1, y2);
		cxt.lineTo(x2, y2);
		cxt.lineTo(x2, y1);
		cxt.fillStyle = c;
		cxt.closePath();
		cxt.fill();
	};
	//根据数据绘制多条柱状图
	for(var i = 0; i < arr.length; i++) {
		var x1 = 23 + 250 / (arr.length * 2) * (2 * i + 1);
		var x2 = 23 + 250 / arr.length * (i + 1);
		var y1 = 248;
		var y2 = 272 - arr[i] / max() * 240;
		console.log(x2);
		console.log(y1);
		drawB(x1, x2, y1, y2, arr2[i])
	}
	drawB()

}
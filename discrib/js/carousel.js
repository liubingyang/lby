
$(function() {
	var lastX, lastY; //记录移动之前的位置
	var u = 0;
	var v = 0;
	var w = 0;
	$(document).on('mousedown', function(e) {
		e.preventDefault();
		$('.box').on('mousemove', function(e) {
			e.preventDefault();
			lastX = e.clientX;
			lastY = e.clientY;
			$('.pic').on('mousemove', function(e) {
				e.preventDefault();
				var x = e.clientX;
				var y = e.clientY;
				var numX = (x - lastX > 0) ? 1 : 0;
				var numY = (y - lastY > 0) ? 1 : 0;
				numX == 1 ? u++ : u--;
				numY == 1 ? v-- : v++;
				$('.box').on('mousewheel', function(e) {
					e.preventDefault()
					var del = e.originalEvent.wheelDelta;
					if(del > 0) {
						w++;
					} else { w-- }
					run(-500 + w / 200, v / 25, u / 25)
				});
				run(-500 + w / 200, v / 25, u / 25)
			})
		})
	});
	$(document).on('mouseup', function() {
		$('.box').unbind('mousemove');
		$('.pic').unbind('mousemove')
	})

	function run(m, n, x) {
		m = m || 0;
		n = n || 0;
		x = x || 0;
		$('.pic').css({ 'transform': 'translateZ(' + m + 'px) rotateX(' + (n - 30) + 'deg) rotateY(' + (x - 30) + 'deg)' })
	}
})
//渐变文字
window.onload = function() {
	var cvsBox = document.getElementById('box');
	var ctx = cvsBox.getContext('2d');
	ctx.textAlign = 'center';
	var gradient = ctx.createLinearGradient(0, 0, cvsBox.width, 0);
	gradient.addColorStop("0", "green");
	gradient.addColorStop("0.5", "yellow");
	gradient.addColorStop("1.0", "red");
	ctx.strokeStyle = gradient;
	ctx.font
	ctx.strokeText('鼠标拖动旋转，滑轮控制景深，不过效果并不理想，很遗憾', 250, 15)
	ctx.stroke()

}
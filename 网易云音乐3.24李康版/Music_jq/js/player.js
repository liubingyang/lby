function play(data){
	$.ajax({
			type:"get",
			url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+data,
			async:true,
			success: function(data){
				$('audio')[0].src=data.url;
				$('audio')[0].play();
			}
		});
	
}

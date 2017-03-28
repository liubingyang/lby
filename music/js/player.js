function play(data){
	$.ajax({
			type:"get",
			url:"https://musicapi.duapp.com/api.php?type=url&id="+data.id,			
			success: function(data){
				console.log(data)
				var url=data.data[0].url.replace(/http/,'https')
				$('#myvideo')[0].src=url;
				$('#myvideo')[0].play();				
			}
	});	
}

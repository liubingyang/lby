function play(data){
	$.ajax({
			type:"get",
			url:"https://musicapi.duapp.com/api.php?type=url&id="+data.id,
			async:true,
			success: function(data){
				console.log(data)
				$('#myvideo')[0].src=data.data[0].url;
				$('#myvideo')[0].play();				
			}
	});	
}

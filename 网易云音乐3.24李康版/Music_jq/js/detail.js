

(function(){
	function getPlayList(id, callback){

		$.ajax({
			type:"get",
			url:"https://api.imjad.cn/cloudmusic/?type=playlist&id="+id,
			async:true,
			success: function(data){
				
				if (data.code==200)
					callback(data.playlist);
			}
		});
	}
	
	
	var p = getUrlParams();
	
	
	getPlayList(p.id, function(data){
		
		var $musicList = $("#musicList");
		var template = $("#templateMusic").html();
		
		for(var i=0; i< data.tracks.length; i++){
			var music = data.tracks[i];
				
			var $template = $(template);
			$template.find(".music").html(music.name);
			$template.find(".artist").html(music.ar[0].name);
			$template.appendTo($musicList);
			
			$template.click(function(){
				
			})
		}
	});
})();

$(document).ready(function(){
	//初始化播放器
	Player.init();
	var playStatus = 'playing';
	//var playStatus = 'playing';
	//点击歌曲时自动播放该曲目
	$('m-list').live('click', function(e) {		
		var n = $(this).attr('id');	
		Player.play(n);
		//设置标题
		$("#title").text(Player.playList[n].name);
	}); 
	//监听播放按键, 播放第一首歌曲
	$('.play').click(function() {
		$(".m-list .item").attr('class', 'item ');
		$(".m-list .item").eq(Player.currentId).attr('class', 'item active');
		if (Player.currentId==-1)
		{
			Player.play(0);	//播放第一首
			//设置标题
			$(".m-list .item").attr('class', 'item ');
			$(".m-list .item").eq(0).attr('class', 'item active');
			$("#title").text(Player.playList[0].name);    
			$(".play").css("background-position","0 -60px");
		}else if (playStatus=='playing')
		{
			//设置播放按钮变暂停图标
			$(".play").css("background-position","-0 -0px");
			Player.stop();		//暂停播放
			playStatus = 'paused';
		}else if (playStatus=='paused')
		{
			//设置播放按钮变播放图标
			$(".play").css("background-position","0 -60px");
			Player.play(Player.currentId);		//继续播放
			playStatus = 'playing';
		}		
	});
	//监听下一首按键, 播放下一首歌曲
	$('.next').click(function() {
		Player.playNext();
		$(".m-list .item").attr('class', 'item ');
		$(".m-list .item").eq(Player.currentId).attr('class', 'item active');
		$("#title").text(Player.playList[Player.currentId].name);
	});
	//监听上一首按键, 播放上一首歌曲
	$('.prev').click(function() {
		Player.playPri();
		$(".m-list .item").attr('class', 'item ');
		$(".m-list .item").eq(Player.currentId).attr('class', 'item active');
		$("#title").text(Player.playList[Player.currentId].name);
	});
	//绑定播放进度条
    bindProgress();
    //绑定进度条事件
    function bindProgress() {
		var audio = $(Player.audioObj);
		//绑定timeupdate事件，音频播放时间改变时触发
		audio.bind("timeupdate",function() {
			var cTime = audio[0].currentTime;
			var tTime = audio[0].duration;
			//设置内部滚动条长度
			setCurrTime(cTime,tTime) ;
			//自动播放下一首
			if (cTime >= tTime) {
				Player.playNext();
				$(".m-list .item").attr('class', 'item ');
				$(".m-list .item").eq(Player.currentId).attr('class', 'item active');
				$("#title").text(Player.playList[Player.currentId].name);
			}
		});
    }
	//设置播放进度条, cTime表示当前音乐时间，tTime表示音乐总时间
    function setCurrTime(cTime,tTime) {
		var per = (tTime<=0)?0:cTime/tTime;
		var pPos = $(".m-progress p").width()*per;     
		$(".m-progress .bot").css("left",pPos);
		var time = parseInt(cTime);
		var Mi = parseInt(time/60) == 0 ? '00' : '0' + parseInt(time/60);
		var Se = time%60 < 10 ? '0' + time%60 : time%60;
		$(".m-progress .time").html(Mi +':'+ Se);
    }
});


    var searchHeader = document.getElementsByClassName('searchHeader')[0];       
    var touchTime = null;     
    var posY = null;
    var url ='http://47.107.224.220/wx/';
    //var url ='http://localhost:80/wx/'
    mui.init();	
	$.ajax({  
        type : "GET",       
        url: url+'wx_userindex.php',
        data : {
            loginId:localStorage.getItem('Myid')
        },
        dataType: 'json',  
        success : function(data) { 
             		for(var num in data){
					loadNews(data[num]['wx_friendId'],data[num]['wx_friendName'],'新消息',data[num]['tr_img']+'.jpg','晚上7:00');					
	                }   
	                refresh();
        }, 
        error : function(msg) {
            mui.toast('请求失败'); 
        }
    });
    function refresh(){
        $.ajax({ 
        type : "GET",
        url: url+'wx_userindex.php',
        data : {
            newMsg:localStorage.getItem('Myid')
        },
        dataType: 'json', 
        success : function(data) {
        	    for(var num in data){
                var newsMsg = '<span class="Msgout"> <span class="Msgin">'+data[num]['wx_msgNum']+'</span></span>';             	
        	    $('#newmsg'+data[num]['wx_friendId']).html(newsMsg);
        	    }
        },
        error : function(msg) {
            mui.toast('2请求失败'); 
        }
    });
    }
    
    
	//再加入这段代码
	(function($){
	    $(".mui-scroll-wrapper").scroll({
	        //bounce: false,//滚动条是否有弹力默认是true
	        //indicators: false, //是否显示滚动条,默认是true
	    }); 
	})(mui);		
				      	   	   		
	function loadNews(friendId,fiendName,msg,hpic,time) {				
		var news = document.getElementById('news');	
		var li = document.createElement('li');
		var picUrl = "./hpic/";
		var picHed = picUrl + hpic;
		li.setAttribute('class','mui-table-view-cell mui-media');		
		li.setAttribute('friendName',fiendName);
		li.setAttribute('friendId',friendId);
		li.setAttribute('friendImg',hpic)
        li.innerHTML = '<a href="javascript:;"><img class="mui-media-object mui-pull-left" src="' + picHed + '"><div class="mui-media-body friends">' + fiendName + '<h6 style="float: right;">'
        + time + '</h6></div><div id="msg"><h5>' + msg + '<h5></div><div class="newmsg" id="newmsg'+friendId+'"></div></div></a>';
		news.appendChild(li);		 
		li.addEventListener('tap',openChat);
	}
	
	function openChat(e) {
		
	    $.ajax({ 
		    async:true, 
			url:url+'wx_userindex.php',
			type:"GET", 
			dataType:"html",
			ontentType:'utf8',   
			data: {
				  myId:localStorage.getItem('Myid'),
				  friendId:$(this).attr('friendId')
				  },
			success: function(data){	
				    $('#newmsg'+$(this).attr('friendId')).html();					
			}, 
			error: function(){
				mui.toast("error");
			}
		});
		mui.openWindow({		  	
		    url: 'news.html', 	    
    	    id:'news.html',	    
		    extras:{
					friendName:$(this).attr('friendName'),
					friendId:$(this).attr('friendId'),
					friendImg:$(this).attr('friendImg')
					},		    
		    createNew:false	
        });
	}
	
    function seach_img(btn_name,js_name){
    	if(btn_name==js_name)
    	{
    		return true;
    	     console.log(js_name);
    	}
    }
	
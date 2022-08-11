$('.sidebar').append('<ul class="menu">'+
		
		'<li class="submenu"  id="list1">'+
		'<a href="login.html">'+
		'<div>'+
		'<i class="menu-icon fa fa-desktop"></i>'+
		'<span class="menu-title">exit</span>'+
		'</div>'+
		'</a>'+
		'</li>'+
		'</ul>')
	setTimeout(function(){
		var role=JSON.parse(window.localStorage.nowinfor)["role"]

		if (role=='manager') {
			
			$('#list1').before('<li class="submenu"><a href="table.html?'+
				'show='+
				'VideoName、videoIntroduction、VideoFile'+
				'&add='+
				'VideoName、videoIntroduction、VideoFile'+
				'&fujian='+
				'VideoFile'+
				'&fuwenben='+
				'videoIntroduction'+
				'&name='+
				'VideoManagement'+
				'">\
				<div>\
				<i class="menu-icon fa fa-th-large"></i>\
				<span class="menu-title">VideoManagement</span>\
				</div>\
				</a>\
				</li>')
			$('#list1').before('<li class="submenu"><a href="table.html?'+
				'show='+
				'Reviewer、commentTime、commentContent、VideoName、videoIntroduction、VideoFile'+
				'&add='+
				'Reviewer、commentTime、commentContent、VideoName、videoIntroduction、VideoFile'+
				'&fujian='+
				'VideoFile'+
				'&fuwenben='+
				'videoIntroduction'+
				'&name='+
				'CommentManagement'+
				'">\
				<div>\
				<i class="menu-icon fa fa-th-large"></i>\
				<span class="menu-title">CommentManagement</span>\
				</div>\
				</a>\
				</li>')
			$('#list1').before('<li class="submenu"><a href="table.html?'+
				'show='+
				'Collector、collectionTime、VideoName、videoIntroduction、VideoFile'+
				'&add='+
				'Collector、collectionTime、VideoName、videoIntroduction、VideoFile'+
				'&fujian='+
				'VideoFile'+
				'&fuwenben='+
				'videoIntroduction'+
				'&name='+
				'CollectionManagement'+
				'">\
				<div>\
				<i class="menu-icon fa fa-th-large"></i>\
				<span class="menu-title">CollectionManagement</span>\
				</div>\
				</a>\
				</li>')
			$('#list1').before('<li class="submenu"><a href="kong.html?'+
				'show='+
				''+
				'&add='+
				''+
				'&fujian='+
				''+
				'&fuwenben='+
				''+
				'&name='+
				'Video'+
				'">\
				<div>\
				<i class="menu-icon fa fa-th-large"></i>\
				<span class="menu-title">Video</span>\
				</div>\
				</a>\
				</li>')
		}else{
			$('#list1').before('<li class="submenu"><a href="table.html?'+
				'show='+
				'Reviewer、commentTime、commentContent、VideoName、videoIntroduction、VideoFile'+
				'&add='+
				'Reviewer、commentTime、commentContent、VideoName、videoIntroduction、VideoFile'+
				'&fujian='+
				'VideoFile'+
				'&fuwenben='+
				'videoIntroduction'+
				'&name='+
				'CommentManagement'+
				'">\
				<div>\
				<i class="menu-icon fa fa-th-large"></i>\
				<span class="menu-title">CommentManagement</span>\
				</div>\
				</a>\
				</li>')
			$('#list1').before('<li class="submenu"><a href="table.html?'+
				'show='+
				'Collector、collectionTime、VideoName、videoIntroduction、VideoFile'+
				'&add='+
				'Collector、collectionTime、VideoName、videoIntroduction、VideoFile'+
				'&fujian='+
				'VideoFile'+
				'&fuwenben='+
				'videoIntroduction'+
				'&name='+
				'CollectionManagement'+
				'">\
				<div>\
				<i class="menu-icon fa fa-th-large"></i>\
				<span class="menu-title">CollectionManagement</span>\
				</div>\
				</a>\
				</li>')
			$('#list1').before('<li class="submenu"><a href="kong.html?'+
				'show='+
				''+
				'&add='+
				''+
				'&fujian='+
				''+
				'&fuwenben='+
				''+
				'&name='+
				'Video'+
				'">\
				<div>\
				<i class="menu-icon fa fa-th-large"></i>\
				<span class="menu-title">Video</span>\
				</div>\
				</a>\
				</li>')
		}
	},500)
	function loadIndex(index){
		$('.submenu').each(function(i,o){
			if ($(o).find('.menu-title').text()==index) {
				$(o).find('a').attr('class','active')

			}else{
				$(o).find('a').removeClass('active')

			}

		})
	}
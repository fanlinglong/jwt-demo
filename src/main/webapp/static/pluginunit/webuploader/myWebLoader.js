function addWebUploader(x) {
	var elseFnc = {},
		FileQueuedHash = false,
		fileCount = 0,
		a = x.type,
		b = x.server,
		c = x.plugContainer,
		d = (typeof x.fileNumLimit == 'number') ? x.fileNumLimit : 5,
		e = (typeof x.paste == 'boolean') ? x.paste : false,
		f = (typeof x.dnd == 'boolean') ? x.dnd : false,
		g = (typeof x.disableGlobalDnd == 'boolean') ? x.disableGlobalDnd : false,
		h = (typeof x.chunked == 'boolean') ? x.chunked : false,
		i = (typeof x.fileSizeLimit == 'number') ? x.fileSizeLimit : false,
		j = (typeof x.fileSingleSizeLimit == 'number') ? x.fileSingleSizeLimit : false,
		uploaderList = x.uploaderList,
		uploaderButton = x.uploaderButton,
		thumbnailL = (typeof x.thumbnailL == 'number') ? x.thumbnailL : 100;
	//fileCount添加的数量
	//a=file文件上传
	//a=picture图片上传
	//b文件接收服务器端
	//c存放插件的容器
	//d验证文件数量
	//e是否可以通过粘贴添加截屏图片
	//f指定Drag And Drop拖拽的容器，如果不指定，则不启动
	//g是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开
	//h是否要分片处理大文件上传
	//i验证文件总大小是否超出限制, 超出则不允许加入队列
	//j验证单个文件大小是否超出限制, 超出则不允许加入队列

	if(e) {
		//		$.extend(elseFnc, {
		//			//监听paste事件的容器，通过粘贴添加截屏的图片
		//			paste: document.body
		//		})
		elseFnc["paste"] = document.body;
	}

	if(f) {
		//		$.extend(elseFnc, {
		//			//f指定Drag And Drop拖拽的容器，如果不指定，则不启动
		//			
		//		})
	}

	if(g) {
		//		console.log(1)
		//		$.extend(elseFnc, {
		//			//是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开
		//			disableGlobalDnd: true
		//		})
		elseFnc['disableGlobalDnd'] = true;
	}

	if(h) {
		//		$.extend(elseFnc, {
		//			//是否要分片处理大文件上传
		//			chunked: true
		//		})
		elseFnc['chunked'] = true;
	}

	if(i > 0) {
		//		$.extend(elseFnc, {
		//			//验证文件总大小是否超出限制, 超出则不允许加入队列
		//			fileSizeLimit: i * 1024 * 1024
		//		})
		elseFnc['fileSizeLimit'] = i * 1024 * 1024;
	}

	if(j > 0) {
		console.log(j)
		//		$.extend(elseFnc, {
		//			//验证单个文件大小是否超出限制, 超出则不允许加入队列
		//			fileSingleSizeLimit: j * 1024 * 1024
		//		})
		elseFnc['fileSingleSizeLimit'] = j;
	}

	if(a == 'file') {
		if(c != undefined) {
			var main = '<div id="thelist"></div>' +
				'<div class="btns">' +
				'<div id="picker">选择文件</div>' +
				'</div>';

			$(c).append(main)
			var $list = $('#thelist'),
				$button = '#picker';
		} else {
			var $list = $(uploaderList),
				$button = uploaderButton;
		}
		// 文件上传
		jQuery(function() {
			var $ = jQuery,
				//				$btn = $('#ctlBtn'),
				//				state = 'pending',
				uploader;

			//			uploader = WebUploader.create(Object.assign({
			//
			//				// 不压缩image
			//				resize: false,
			//
			//				// 自动上传。
			//				auto: true,
			//
			//				//验证文件总数量
			//				fileNumLimit: d,
			//
			//				// swf文件路径
			//				//				swf: 'https://cdn.staticfile.org/webuploader/0.1.5/Uploader.swf',
			//				swf: '../swf/Uploader.swf',
			//				// 文件接收服务端。
			//				//http://192.168.101.117:9080/ssmtest/upload.do
			//				server: b,
			//
			//				// 选择文件的按钮。可选。
			//				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			//				pick: $button
			//			}, elseFnc));

			uploader = WebUploader.create($.extend({

				// 不压缩image
				resize: false,

				// 自动上传。
				auto: true,

				//验证文件总数量
				fileNumLimit: d,

				// swf文件路径
				//				swf: 'https://cdn.staticfile.org/webuploader/0.1.5/Uploader.swf',
				swf: '../swf/Uploader.swf',
				// 文件接收服务端。
				//http://192.168.101.117:9080/ssmtest/upload.do
				server: b,

				// 选择文件的按钮。可选。
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: $button
			}, elseFnc));

			// 当有文件添加进来的时候
			uploader.on('fileQueued', function(file) {
				$list.append('<div id="' + file.id + '" class="item">' +
					'<h4 class="info">' + file.name + '</h4>' +
					'<p class="state">等待上传...</p>' +
					'</div>');
			});

			// 文件上传过程中创建进度条实时显示。
			uploader.on('uploadProgress', function(file, percentage) {
				var $li = $('#' + file.id),
					$percent = $li.find('.progress .progress-bar');

				// 避免重复创建
				if(!$percent.length) {
					$percent = $('<div class="progress progress-striped active">' +
						'<div class="progress-bar" role="progressbar" style="width: 0%">' +
						'</div>' +
						'</div>').appendTo($li).find('.progress-bar');
				}

				$li.find('p.state').text('上传中');

				$percent.css('width', percentage * 100 + '%');
			});

			uploader.on('uploadSuccess', function(file) {
				$('#' + file.id).find('p.state').text('已上传');
			});

			uploader.on('uploadError', function(file) {
				$('#' + file.id).find('p.state').text('上传出错');
			});

			uploader.on("error", function(type) {
				if(type == "F_EXCEED_SIZE") {
					alert("上传文件大小超过限制")
				}
			});

			uploader.on('uploadComplete', function(file) {
				$('#' + file.id).find('.progress').fadeOut();
			});

			uploader.on('all', function(type) {
				if(type === 'startUpload') {
					state = 'uploading';
				} else if(type === 'stopUpload') {
					state = 'paused';
				} else if(type === 'uploadFinished') {
					state = 'done';
				}

				//				if(state === 'uploading') {
				//					$btn.text('暂停上传');
				//				} else {
				//					$btn.text('开始上传');
				//				}
			});

			//			$btn.on('click', function() {
			//				if(state === 'uploading') {
			//					uploader.stop();
			//				} else {
			//					uploader.upload();
			//				}
			//			});
			//			console.log(uploader)
		});
	} else if(a == 'picture') {
		if(c != undefined) {
			var main = '<div id="fileList" class="uploader-list"></div>' +
				'<div id="filePicker">选择图片</div><button id="deleteLoad">删除图片</button>';
			$(c).append($(main));
			//			var $list = $('#fileList'),
			var $list = $('.uploader-list'),
				$button = '#filePicker';
		} else {
			var $list = $(uploaderList),
				$button = uploaderButton;
		}
		var asd = -1;
		// 图片上传demo
		jQuery(function() {
			var $ = jQuery,
				// 优化retina, 在retina下这个值是2
				ratio = window.devicePixelRatio || 1,

				// 缩略图大小
				thumbnailWidth = thumbnailL * ratio,
				thumbnailHeight = thumbnailL * ratio,

				// Web Uploader实例
				uploader;

			// 初始化Web Uploader
			//			uploader = WebUploader.create(Object.assign({
			//
			//				// 自动上传。
			//				auto: true,
			//
			//				// swf文件路径
			//				//				swf: BASE_URL + '/js/Uploader.swf',
			//
			//				// 文件接收服务端。
			//				//				server: 'http://webuploader.duapp.com/server/fileupload.php',
			//				//http://192.168.101.117:9080/ssmtest/upload.do
			//				server: b,
			//
			//				//验证文件总数量
			//				fileNumLimit: d,
			//
			//				// 选择文件的按钮。可选。
			//				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			//				pick: {
			//					id: $button,
			//					multiple: true
			//				},
			//				
			//				//允许拖拽
			////				dnd: $list,
			//				
			////				duplicate :false,
			//
			//				// 只允许选择文件，可选。
			//				accept: {
			//					title: 'Images',
			//					extensions: 'gif,jpg,jpeg,bmp,png',
			//					mimeTypes: 'image/jpg,image/jpeg,image/png'
			//				}
			//			}, elseFnc));

			uploader = WebUploader.create($.extend({

				// 自动上传。
				auto: true,

				// swf文件路径
				//				swf: BASE_URL + '/js/Uploader.swf',

				// 文件接收服务端。
				//				server: 'http://webuploader.duapp.com/server/fileupload.php',
				//http://192.168.101.117:9080/ssmtest/upload.do
				server: b,

				//验证文件总数量
				fileNumLimit: d,

				// 选择文件的按钮。可选。
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: {
					id: $button,
					multiple: true
				},

				//允许拖拽
				//				dnd: $list,

				//				duplicate :false,

				// 只允许选择文件，可选。
				accept: {
					title: 'Images',
					extensions: 'gif,jpg,jpeg,bmp,png',
					mimeTypes: 'image/jpg,image/jpeg,image/png'
				}
			}, elseFnc));

			//文件加进来之前
			uploader.on('beforeFileQueued', function(file) {
				asd++;
				if(!FileQueuedHash) {
					FileQueuedHash = true;
					return;
				}
				if(d != 2) {
					return;
				}
				uploader.reset();
				var $li2 = $('#WU_FILE_' + (file.id.substring(8) - 1));
				$li2.off().find('.file-panel').off().end().remove();
			})

			$('#deleteLoad').click(function() {
				//				uploader.reset();
				var $li2 = $('#WU_FILE_' + asd);
				$li2.off().find('.file-panel').off().end().remove();
			})

			//重复上传
			uploader.onError = function(code) {
				//      alert( 'Eroor: ' + code );
				console.log(code)
			};

			// 当有文件添加进来的时候
			uploader.on('fileQueued', function(file) {
				fileCount++;
				var $li = $(
						'<div id="' + file.id + '" class="file-item thumbnail">' +
						'<img>' +
						'<div class="info">' + file.name + '</div>' +
						'</div>'
					),
					$img = $li.find('img');

				$list.append($li);

				// 创建缩略图
				uploader.makeThumb(file, function(error, src) {
					if(error) {
						$img.replaceWith('<span>不能预览</span>');
						return;
					}

					$img.attr('src', src);
				}, thumbnailWidth, thumbnailHeight);

			});

			// 文件上传过程中创建进度条实时显示。
			uploader.on('uploadProgress', function(file, percentage) {
				var $li = $('#' + file.id),
					$percent = $li.find('.progress span');

				// 避免重复创建
				if(!$percent.length) {
					$percent = $('<p class="progress"><span></span></p>')
						.appendTo($li)
						.find('span');
				}

				$percent.css('width', percentage * 100 + '%');
			});

			uploader.on('uploadAccept', function(file, response) {
				var str = response._raw;
				var info = eval('(' + str + ')');
				console.log(info);
				//if ( hasError ) {
				//    // 通过return false来告诉组件，此文件上传有错。
				//    return false;
				//}
			});

			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			uploader.on('uploadSuccess', function(file) {
				$('#' + file.id).addClass('upload-state-done');
			});

			// 文件上传失败，现实上传出错。
			uploader.on('uploadError', function(file) {
				var $li = $('#' + file.id),
					$error = $li.find('div.error');

				// 避免重复创建
				if(!$error.length) {
					$error = $('<div class="error"></div>').appendTo($li);
				}

				$error.text('上传失败');
			});

			// 完成上传完了，成功或者失败，先删除进度条。
			uploader.on('uploadComplete', function(file) {
				$('#' + file.id).find('.progress').remove();
			});
			//			uploader.on('beforeFileQueued',function(file){ uploader.reset(); })

		});
	}
}
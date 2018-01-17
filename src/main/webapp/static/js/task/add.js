/**
 * Created by wangduo on 2017/12/12.
 */
var getInputval=function(name){
    return $("[name="+name+"]").find("input").val().replace(/\s+/g, "");
};

var getRadioval=function(name){
    return $("[name="+name+"]:checked").val();
};

function shijian(control){
    this.control=control;
    //radio按钮
    this.r_change=function(){
        switch(this.control.value){
            case 'on_line':
                $("[name='DName']").css("display","block");
                $("[name='DAddress']").css("display","block");
                $("[name='MName']").css("display","none");
                $("[name='MBtn']").css("display","none");
                if($(".uploader-list")[0]){
                    $(".uploader-list").css("display","none");
                }
                break;
            case 'off_line':
                $("[name='DName']").css("display","none");
                $("[name='DAddress']").css("display","none");
                $("[name='MName']").css("display","block");
                $("[name='MBtn']").css("display","block");
                if($(".uploader-list")[0]){
                    $(".uploader-list").css("display","block");
                }
                break;
        }
    }
}
$(function() {

    $('.zczDaAddBt')

    //上传功能
    var asd = -1, FileQueuedHash = false, fileCount = 0, $list = $('.zczDaAddList'), uploader = WebUploader
        .create({
            auto : true,
            //server : 'http://192.168.101.117:9080/ssmtest/upload.do',
            server:'datalist/uploadVideo.do',
            paste : document.body,
            pick : {
                id : '.zczDaAddBt',
                multiple : true
            },
            duplicate :true
        });

    //文件加进来之前
    uploader.on('beforeFileQueued', function(file) {
        asd++;
        if (!FileQueuedHash) {
            FileQueuedHash = true;
            return;
        }
        uploader.reset();
        var $li2 = $('#WU_FILE_' + (file.id.substring(8) - 1));
        $li2.off().find('.file-panel').off().end().remove();
    })

    //重复上传
    uploader.onError = function(code) {
        //      alert( 'Eroor: ' + code );
        console.log(code)
    };

    // 当有文件添加进来的时候
    uploader
        .on(
        'fileQueued',
        function(file) {
            fileCount++;
            $list.append('<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
            '</div>');
        });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function(file,response) {
       /* console.log(response);*/
        var fileTip=$('#'+file.id);
        fileTip.addClass('upload-state-done');
        fileTip.find("p:first").text("上传成功！");
        //存放临时路径
        $("[name='_videoURL']").find("input").val(JSON.parse(response._raw)["url"]);
    });

    //文件上传过程中，给item添加进度条
    uploader.on('uploadProgress',function(file,percentage){
     /*   var fileTip=$('#'+file.id);
        fileTip.append("<");*/
        var $li = $( '#'+file.id ),
            $percent = $li.find('.progress .progress-bar');

        // 避免重复创建
        if ( !$percent.length ) {
            $percent = $('<div class="progress progress-striped active">' +
            '<div class="progress-bar" role="progressbar" style="width: 0%">' +
            '</div>' +
            '</div>').appendTo( $li ).find('.progress-bar');
        }

        $li.find('p.state').text('上传中');

        $percent.css( 'width', percentage * 95 + '%' );
    });

    //判断响应的有效性
    uploader.on('uploadAccept',function(object,ret){

    })
})
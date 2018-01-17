//ztree
var setting = {
    check: {
        enable: false
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    view: {
        fontCss: getFont,
        nameIsHTML: true
    },
    callback: {
        onClick: zTreeOnClick
    }
};

function getFont(treeId, node) {
    return node.font ? node.font : {};
}

var zNodes = [];

$(function () {
    // 树状图切换
    $('.zczExZtreeTitle').on(
        'click',
        'li',
        function () {
            if (!$(this).hasClass('zczQLLCheck')) {
                var data_id = $(this).attr('data-id');
                $('.zczQLLCheck')
                    .removeClass('zczQLLCheck');
                $(this).addClass('zczQLLCheck');
                $('.ztreeBlock').removeClass('ztreeBlock');
                $("." + data_id).addClass('ztreeBlock');
                $(".zczQRTRContent").html("");
                $(".zczQRTBottom").html('');
                $("#targetType").find("option[value='0']")
                    .attr("selected", true);
                $('.zczQRBCList').html('');
                $(".zczQRBFoot").html('');

                //任务列表
                if ('zczExTaskZtree' == data_id) {
                    initZTree(-1);
                } else if ('zczExDeviceZtree' == data_id) {
                    initZTree(0);
                }
            }
        })

    // 播放器开始暂停按钮
    $('.zczExVideoBegin').click(function () {
        $('#video')[0].play();
    })

    // 图片切换
    $('.zczEvPicList').on('click', 'li', function () {
        if (!$(this).hasClass('zczEvPicCheck')) {
            $('.zczEvPicCheck').removeClass('zczEvPicCheck');
            $(this).addClass('zczEvPicCheck');
        }
    });

    // 初始化树
    initZTree(0)

});

function initZTree(type) {

    var that = $(".zczExDeviceZtree");
    if (-1 == type) {
        that = $(".zczExTaskZtree");
    }

    $.ajax({
        type: "POST",
        data: {type: type},
        url: getCtx() + "/snapshot/zTreeDatas.do",
        dataType: "json",
        async: false,
        success: function (data) {
            if (!data) {
                return;
            }
            zNodes = data;
            zNodes.forEach((item) => {
                item.font = {'color': '#fff'};
            });
        }
    });

    // ztree
    var zTree = $.fn.zTree.init(that, setting, zNodes);

    // 点击第一个节点
    var nodes = zTree.getNodes();
    if (nodes) {
        var firstNode = nodes[0];
        zTree.setting.callback.onClick(null, firstNode.id, firstNode);
        zTree.selectNode(firstNode)
    }
}

// 设备树点击事件
function zTreeOnClick(event, treeId, treeNode) {
    console.log(treeNode.name + ',' + treeNode.taskId);

    var taskId = treeNode.taskId;
    if (taskId != thObj.taskId) {
        thObj.taskId = taskId;

        thObj.topInfoFlag = false; // 无头部信息标识
        // 切换设备清空页面
        var html = '';
        html += '<div class="zczExTop">';
        html += '<div class="zczEB">';
        html += '<div class="zczExVideoBox imgScene">';
        html += '<img src="#" alt=""/>';
        html += '</div>';
        html += '</div>';
        html += '<div class="zczEvCarBox">';
        html += '</div>';
        html += '</div>';
        html += '<div class="zczExBottom">';
        html += '<h2>行人实时监拍</h2>';
        html += '<ul class="zczExSmollImgList person">';
        html += '</ul>';
        html += '<h2>骑行实时监拍</h2>';
        html += '<ul class="zczExSmollImgList bicycle mid">';
        html += '</ul>';
        html += '<h2>车辆实时监拍</h2>';
        html += '<ul class="zczExBigImgList vehicle">';
        html += '</ul>';
        html += '</div>';

        $('.zczExRight').empty().append(html);

        var personObj = $(".zczExSmollImgList.person");
        var bicycleObj = $(".zczExSmollImgList.bicycle");
        var vehicleObj = $(".zczExBigImgList.vehicle");

        thObj.personObj = personObj;
        thObj.vehicleObj = vehicleObj;
        thObj.bicycleObj = bicycleObj;
    }

};

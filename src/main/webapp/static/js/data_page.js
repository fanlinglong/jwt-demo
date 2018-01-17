//layer配置
layer.config({
    skin:'layui-layer-lan'
});

//操作
function operation(recordId,recordName){
    this.recordId=recordId;
    this.recordName=recordName;
    var me=this;
    this.deleteData=function(){
        layer.confirm("确定删除["+me.recordName+"]?",{icon:3,btn:['确定','取消']},
            function(index,layero){
                parent.$(".css_loading").css("display","block");
                $.ajax({
                    dataType: 'json', type: 'post', async: true, data: {recordId:me.recordId},
                    url: 'datalist/deleteData.do',
                    success: function (response) {
                        parent.$(".css_loading").css("display", "none");
                        var icon =2;
                        if(response.success==1) {
                            icon=1;
                        }
                        layer.alert(response.mess, {icon: icon});
                        layer.close(index);
                        $("#zczDataList").trigger("reloadGrid");
                    },
                    error: function (response) {
                        parent.$(".css_loading").css("display","none");
                        layer.alert(response.mess?response.mess:'未知错误，请与系统管理员联系。',{icon:2});
                        $("#zczDataList").trigger("reloadGrid");
                    }
                });
            });
    };
    this.updateData=function(){
        //修改文本
        var str="<div class='zczDataMain' style='background-color:#000333;color:#fff'><div class='select_bar' ><label>任务名称:</label><input name='updateName'></div></div>";
        layer.open({
            type : 1,
            shadeClose:false,
            title : [ "修改任务", "background-color:rgb(0,0,51);color:#fff;" ],
            content : str,
            area : [ "300px", "180px" ],
            btn : [ '<div>确定</div>', '取消' ],
            closeBtn : 0,
            btn1 : function(indexmain,layero){
                layer.confirm("确定修改["+me.recordName+"]?",{icon:3,btn:['确定','取消']},
                    function(index,layero){
                        parent.$(".css_loading").css("display","block");
                        $.ajax({
                            dataType: 'json', type: 'post', async: true, data: {recordId:me.recordId,taskName:$("[name='updateName']").val()},
                            url: 'datalist/editData.do',
                            success: function (response) {
                                parent.$(".css_loading").css("display", "none");
                                var icon =2;
                                if(response.success==1) {
                                    icon=1;
                                }
                                layer.alert(response.mess, {icon: icon});
                                layer.close(index);
                                layer.close(indexmain);
                                $("#zczDataList").trigger("reloadGrid");
                            },
                            error: function (response) {
                                parent.$(".css_loading").css("display","none");
                                layer.alert(response.mess?response.mess:'未知错误，请与系统管理员联系。',{icon:2});
                                layer.close(index);
                                layer.close(indexmain);
                                $("#zczDataList").trigger("reloadGrid");
                            }
                        })
                    });
        }
    });
    }
}

$(function() {
    /**添加任务**/
    function btn1(indexmain,layero){
        var input= $(layero).find("iframe")[0].contentWindow;
        var radioval=$(layero).find("iframe")[0].contentWindow.getRadioval("line_type");
        var yanzheng=[]//简单验证
            ,options={}//存放参数;
        switch(radioval){
            case 'on_line':
                options["type"]="on_line";
                input.getInputval("DName")?options["DName"]=input.getInputval("DName"):yanzheng.push("设备名称");
                input.getInputval("DAddress")?options["DAddress"]=input.getInputval("DAddress"):yanzheng.push("设备地址");
                break;
            case 'off_line':
                options["type"]="off_line";
                input.getInputval("_videoURL")?options["_videoURL"]=input.getInputval("_videoURL"):yanzheng.push("请上传视频！");
                input.getInputval("MName")?options["MName"]=input.getInputval("MName"):yanzheng.push("任务名称");
                break;
        }
        if(yanzheng.length==0){
            /**提交函数(内部)  用于非阻塞弹窗**/
            function to_run(){
                parent.$(".css_loading").css("display","block");
                $.ajax({dataType:'json', type:'post', async:true, data:options,
                    url:'datalist/submitVideo.do',
                    success:function(response){
                        if(response.success==1){
                            //刷新jqgrid
                            layer.alert("成功!",{icon:1},function(index){
                                $("#zczDataList").trigger("reloadGrid");
                                layer.close(index);
                                layer.close(indexmain);
                            });
                        }else{
                            layer.alert(response.mess, {icon:2});
                        }
                        parent.$(".css_loading").css("display","none");
                    },error:function(response){
                        layer.alert(response.mess, {icon:2});
                        parent.$(".css_loading").css("display","none");
                    }
                });
            }

            layer.confirm('确定添加吗？',{icon:3,btn:['确定','取消']},
                function(index,layero){
                    to_run();//非阻塞需要使用回调
                });
        }else{
            layer.msg(yanzheng.join(',')+'不能为空！',{icon:7,time:1600});
        }
    }

	// jqgrid初始化
	var jqZczdl = jQuery("#zczDataList")
			.jqGrid(
					{
						/*url : top._CTX + '/resources/json/JSONData.json',*/ // 组件创建完成之后请求数据的url
                        url:'datalist/queryAllData.do',
						datatype : "json", // 请求数据返回的类型。可选json,xml,txt
						colNames : [ '任务编号', '任务名称','任务类型', '任务处理状态', '任务处理进度'/*, '操作列'*/ ], // jqGrid的列显示名字
						colModel : [ // jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
								{
									name : 'record_id',
									index : 'record_id',
									width : 100
								},
								{
									name : 'file_name',
									index : 'file_name',
									width : 100
								},
								{
									name : 'camera_type',
									index : 'camera_type',
									width : 100,
                                    formatter : function(cellvalue) {
                                        var rs;
                                        switch(cellvalue){
                                            case -1 :
                                                rs="<span style='color:greenyellow'>离线任务</span>";
                                                break;
                                            case 0 :
                                                rs="<span style='color:#168EF3'>在线任务</span>";
                                                break
                                        }
                                        return rs;
                                    }
								},{
                                    name:'task_status',
                                    index:'task_status',
                                    width:100,
                                    formatter : function(cellvalue) {
                                        var rs;
                                        switch(cellvalue){
                                            case 0 :
                                                rs="<span style='color:#168EF3'>正在进行</span>";
                                                break;
                                            case 1 :
                                                rs="<span style='color:greenyellow'>处理完成</span>";
                                                break
                                        }
                                        return rs;
                                    }
                            }, {
									name : 'amount',
									index : 'amount',
                                    sortable:false,
									width : 100,
									formatter : function(cellvalue, options,
											rowObject) {
                                        /*console.log(rowObject);*/
                                        if(rowObject[2]==0){
                                            return "<span style='display:block;width:100%;text-align:center'>在线处理中...</span>"
                                        }else {
                                            var div = "<div class='zczDataBar'><div style='width:"
                                                + cellvalue
                                                + "'></div><span>"
                                                + cellvalue + "</span></div>";
                                            return div;
                                        }
									}
								}/*,
								{
									width : 60,
                                    align:'center',
									formatter : function(cellvalue, options,
											rowObject) {
										var a = "<a style='cursor:pointer' onclick='new operation("+rowObject[0]+",	&#39;"+rowObject[1]+"&#39;).deleteData()'>删除</a>&nbsp;&nbsp";
                                        a+="<a style='cursor:pointer' onclick='new operation("+rowObject[0]+",	&#39;"+rowObject[1]+"&#39;).updateData()'>修改</a>"
										return a;
									}
								}*/ ],
						rowNum : 10, // 一页显示多少条
						rowList : [10, 20, 30 ], // 可供用户选择一页显示多少条
						pager : '#zczDataPage', // 表格页脚的占位符(一般是div)的id
						sortname : 'record_id', // 初始化的时候排序的字段
						sortorder : "desc", // 排序方式,可选desc,asc
						mtype : "get", // 向后台请求数据的ajax的类型。可选post,get
						viewrecords : true,
						forceFit : true,
						//caption : "任务列表",// 表格的标题名字
						height : $('.zczDataBox').height() - 60,// 表格高度
						autowidth : true,
						hidegrid : false
					});
	/* 创建jqGrid的操作按钮容器 */
	/* 可以控制界面上增删改查的按钮是否显示 */
//	jQuery("#zczDataList").jqGrid('navGrid', '#zczDataPage', {
//		edit : false,
//		del : false,
//		search : false,
//		addtitle : "添加任务",
//		editGridRow : function() {
//		}
//	});

//	$('#add_zczDataList').off('click');

	$('#add_zczDataList').click(function() {
		layer.open({
			type : 2,
            shadeClose:false,
			title : [ "添加任务", "background-color:rgb(0,0,51);color:#fff;" ],
			content : "task/add.do",
			area : [ "300px", "300px" ],
			btn : [ '<div>确定</div>', '取消' ],
			closeBtn : 0,
			btn1 : function(indexmain,layero){
                btn1(indexmain,layero);
            }
		})
	})

/*    $("#queryCameraType").live('change',function(){
            console.log("change");
            var options = $(this).find("option");
            options.each(function (i, o) {
                console.log(i);
                console.log(o);
            });
    });*/

    /*
    $("[name='queryTaskType']").change(function(){
        var options=$(this).find("option");
        options.each(function(i,o){
            console.log(i);
            console.log(o);
        });
    });*/

    $("#query_button").on("click",function(){
        console.log("查询！");
        var queryName = $("[name='queryName']").val();
        var queryCameraType=$("[name='queryCameraType']").val();
        var queryTaskType=$("[name='queryTaskType']").val();
        console.log(queryCameraType);
        console.log(queryTaskType);
        $("#zczDataList").jqGrid('setGridParam',{
            url:"datalist/queryAllData.do",
            postData:{queryName:queryName,queryCameraType:queryCameraType,queryTaskType:queryTaskType}, //发送数据
            page:1,
            sidx:'record_id',
            sord:'desc'
        }).trigger("reloadGrid"); //重新载入
    });
	
	//刷新实现查询方法
	$('#refresh_zczDataList').click(function(){
		$("#query_button").trigger('click');
	})

})
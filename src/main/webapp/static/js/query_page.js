//ztree
var setting = {
	check : {
		enable : true
	},
	data : {
		simpleData : {
			enable : true
		}
	},
	view : {
		fontCss : getFont,
		nameIsHTML : true
	},
	callback : {
		onCheck : zTreeOnClick,
		onClick : function(event, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj(treeId);
			var nodes = zTree.getNodes();
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].id == treeNode.id) {
					if (treeNode.checked) {
						zTree.checkNode(nodes[i], false, false)
					} else {
						zTree.checkNode(nodes[i], true, true)
					}
					break;
				}
			}
		}
	}
};

// 图片加载完成后改变大小
function getImgWH(a) {
	var wx = $('.zczQRBCList>li>dl>dt').width(), hy = $('.zczQRBCList>li>dl>dt')
			.height();
	for (var i = 0; i < a.length; i++) {
		a[i].onload = function() {
			// console.log(this)
			var imgObj = new Image();
			imgObj.src = this.src;
			if (imgObj.width / imgObj.height > wx / hy) {
				this.style.width = "100%";
				this.style.height = "auto";
			} else {
				this.style.width = "auto";
				this.style.height = "100%";
			}
		}
	}
}

function getFont(treeId, node) {
	return node.font ? node.font : {};
}
function zTreeOnClick(event, treeId, treeNode) {
	console.log(1)
};
var zNodes = [
// {
// id: 1,
// pId: 0,
// name: "随意勾选 1",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 2,
// pId: 1,
// name: "随意勾选 1-1",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 111,
// pId: 11,
// name: "随意勾选 1-1-1",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 112,
// pId: 11,
// name: "随意勾选 1-1-2",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 12,
// pId: 1,
// name: "随意勾选 1-2",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 121,
// pId: 12,
// name: "随意勾选 1-2-1",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 122,
// pId: 12,
// name: "随意勾选 1-2-2",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 2,
// pId: 0,
// name: "随意勾选 2",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 21,
// pId: 2,
// name: "随意勾选 2-1",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 22,
// pId: 2,
// name: "随意勾选 2-2",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 221,
// pId: 22,
// name: "随意勾选 2-2-1",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 222,
// pId: 22,
// name: "随意勾选 2-2-2",
// font: {
// 'color': '#fff'
// }
// },
// {
// id: 23,
// pId: 2,
// name: "随意勾选 2-3",
// font: {
// 'color': '#fff'
// }
// }
];
// 行人特征数据
var hp_datas = {
	HP_SEX : [ '男', '女', '未知' ],// 性别
	HP_FIGURE : [ '胖', '瘦', '中等' ],// 体态
	HP_NATIONALITY : [ '汉族', '维吾尔族', '黑人', '白人', '未知' ],// 种族
	HP_AGE : [ '婴儿', '儿童', '青年', '中年', '老年', '未知' ],// 年龄段
	HP_CARRYING : [ '伞', '抱小孩', '手机', '眼镜', '太阳镜', '围巾', '腰带', '无', '未知' ],// 携带物
	HP_VIEWPOINT : [ '正面', '背面', '侧面' ],// 朝向
	HP_HEAD : [ '长发', '短发', '光头', '帽子', '未知' ],
	HP_HEAD_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ],
	HP_UP : [ 'T恤衫', '马甲/吊带/背心', '衬衫', '西装', '毛衣', '皮衣/夹克', '羽绒服', '大衣/风衣',
			'外套', '连衣裙', '无上衣', '未知' ],
	HP_UP_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色', '橙色',
			'多色', '未知' ],
	HP_UPTEXT : [ '纯色', '碎花', '条纹', '格子', '未知' ],
	HP_DOWN : [ '长裤', '短裤', '长裙', '短裙', '连衣裙', '未知' ],
	HP_DOWN_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ],
	HP_SHOE : [ '无鞋子', '皮鞋', '运动鞋', '靴子', '凉鞋', '未知' ],
	HP_SHOE_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ],
	HP_BAG : [ '无包', '单肩包', '双肩包', '拉杆箱', '钱包', '未知' ],
	HP_BAG_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ]
};
// 骑车人特征数据
var hcp_datas = {
	HCP_SEX : [ '男', '女', '未知' ],// 性别
	HCP_FIGURE : [ '胖', '瘦', '中等' ],// 体态
	HCP_NATIONALITY : [ '汉族', '维吾尔族', '黑人', '白人', '未知' ],// 种族
	HCP_AGE : [ '婴儿', '儿童', '青年', '中年', '老年', '未知' ],// 年龄段
	// HCP_CARRYING:['伞','抱小孩','手机','眼镜','太阳镜','围巾','腰带','无','未知'],//携带物
	HCP_VIEWPOINT : [ '正面', '背面', '侧面' ],// 朝向
	HCP_HEAD : [ '长发', '短发', '光头', '帽子', '未知' ],
	HCP_HEAD_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ],
	HCP_UP : [ 'T恤衫', '马甲/吊带/背心', '衬衫', '西装', '毛衣', '皮衣/夹克', '羽绒服', '大衣/风衣',
			'外套', '连衣裙', '无上衣', '未知' ],
	HCP_UP_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ],
	HCP_UPTEXT : [ '纯色', '碎花', '条纹', '格子', '未知' ],
	HCP_DOWN : [ '长裤', '短裤', '长裙', '短裙', '连衣裙', '未知' ],
	HCP_DOWN_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ],
	// HCP_SHOE:['无鞋子','皮鞋','运动鞋','靴子','凉鞋','未知'],
	// HCP_SHOE_COLOR:['黑色','白色','红色','黄色','蓝色','绿色','紫色','棕色','灰色','橙色','多色','未知'],
	HCP_BAG : [ '无包', '单肩包', '双肩包', '拉杆箱', '钱包', '未知' ],
	HCP_BAG_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ],
	HCP_EYE : [ '未遮挡', '眼镜', '墨镜', '未知' ],
	HCP_MOUTH : [ '未遮挡', '带口罩', '未知' ],
	HCP_SCARF : [ '无围脖', '普通围脖', '包头围脖' ],
	HCP_DOWN_COLOR : [ '黑色', '白色', '红色', '黄色', '蓝色', '绿色', '紫色', '棕色', '灰色',
			'橙色', '多色', '未知' ],
	HCP_DRIVERCOUNT : [ '0人', '1人', '2人', '更多人' ]
};
// 行人
var hp = '<li><span>性别：</span> <select name="" id="HP_SEX">'
		+ '<option value="">无</option>' + '<option value="0">男</option>'
		+ '<option value="1">女</option>' + '<option value="2">未知</option>'
		+ '</select></li>'
		+ '<li><span>体态：</span> <select name=""  id="HP_FIGURE">'
		+ '<option value="">无</option>' + '<option value="0">胖</option>'
		+ '<option value="1">瘦</option>' + '<option value="2">中等</option>'
		+ '</select></li>'
		+ '<li><span>种族：</span> <select name=""  id="HP_NATIONALITY">'
		+ '<option value="">无</option>' + '<option value="0">汉族</option>'
		+ '<option value="1">维吾尔族</option>' + '<option value="2">黑人</option>'
		+ '<option value="3">白人</option>' + '<option value="4">未知</option>'
		+ '</select></li>'
		+ '<li><span>年龄段：</span> <select name=""  id="HP_AGE">'
		+ '<option value="">无</option>' + '<option value="0">婴儿</option>'
		+ '<option value="1">儿童</option>' + '<option value="2">青年</option>'
		+ '<option value="3">中年</option>' + '<option value="4">老年</option>'
		+ '<option value="5">未知</option>' + '</select></li>'
		+ '<li><span>携带物：</span> <select name=""  id="HP_CARRYING">'
		+ '<option value="">无</option>' + '<option value="0">伞</option>'
		+ '<option value="1">抱小孩</option>' + '<option value="2">手机</option>'
		+ '<option value="3">眼镜</option>' + '<option value="4">太阳镜</option>'
		+ '<option value="5">围巾</option>' + '<option value="6">腰带</option>'
		+ '<option value="7">无</option>' + '<option value="8">未知</option>'
		+ '</select></li>'
		+ '<li><span>朝向：</span> <select name=""  id="HP_VIEWPOINT">'
		+ '<option value="">无</option>' + '<option value="0">正面</option>'
		+ '<option value="1">背面</option>' + '<option value="2">侧面</option>'
		+ '</select></li>'
		+ '<li><span>头部：</span> <select name=""  id="HP_HEAD">'
		+ '<option value="">无</option>' + '<option value="0">长发</option>'
		+ '<option value="1">短发</option>' + '<option value="2">光头</option>'
		+ '<option value="3">帽子</option>' + '<option value="4">未知</option>'
		+ '</select></li>'
		+ '<li><span>头部颜色：</span> <select name=""  id="HP_HEAD_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>'
		+ '<li><span>上衣类型：</span> <select name=""  id="HP_UP">'
		+ '<option value="">无</option>' + '<option value="0">T恤衫</option>'
		+ '<option value="1">马甲/吊带/背心</option>'
		+ '<option value="2">衬衫</option>' + '<option value="3">西装</option>'
		+ '<option value="4">毛衣</option>' + '<option value="5">皮衣/夹克</option>'
		+ '<option value="6">羽绒服</option>' + '<option value="7">大衣/风衣</option>'
		+ '<option value="8">外套</option>' + '<option value="9">连衣裙</option>'
		+ '<option value="10">无上衣</option>' + '<option value="11">未知</option>'
		+ '</select></li>'
		+ '<li><span>上衣颜色：</span> <select name=""  id="HP_UP_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>'
		+ '<li><span>上衣纹理：</span> <select name=""  id="HP_UPTEXT">'
		+ '<option value="">无</option>' + '<option value="0">纯色</option>'
		+ '<option value="1">碎花</option>' + '<option value="2">条纹</option>'
		+ '<option value="3">格子</option>' + '<option value="4">未知</option>'
		+ '</select></li>'
		+ '<li><span>下衣类型：</span> <select name=""  id="HP_DOWN">'
		+ '<option value="">无</option>' + '<option value="0">长裤</option>'
		+ '<option value="1">短裤</option>' + '<option value="2">长裙</option>'
		+ '<option value="3">短裙</option>' + '<option value="4">连衣裙</option>'
		+ '<option value="5">未知</option>' + '</select></li>'
		+ '<li><span>下衣颜色：</span> <select name=""  id="HP_DOWN_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>'
		+ '<li><span>鞋子类型：</span> <select name=""  id="HP_SHOE">'
		+ '<option value="">无</option>' + '<option value="0">无鞋子</option>'
		+ '<option value="1">皮鞋</option>' + '<option value="2">运动鞋</option>'
		+ '<option value="3">靴子</option>' + '<option value="4">凉鞋</option>'
		+ '<option value="5">未知</option>' + '</select></li>'
		+ '<li><span>鞋子颜色：</span> <select name=""  id="HP_SHOE_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>'
		+ '<li><span>包类型：</span> <select name=""  id="HP_BAG">'
		+ '<option value="">无</option>' + '<option value="0">无包</option>'
		+ '<option value="1">单肩包</option>' + '<option value="2">双肩包</option>'
		+ '<option value="3">拉杆箱</option>' + '<option value="4">钱包</option>'
		+ '<option value="5">未知</option>' + '</select></li>'
		+ '<li><span>包颜色：</span> <select name=""  id="HP_BAG_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>';
// 骑车人
var hcp = '<li><span>性别：</span> <select name="" id="HCP_SEX">'
		+ '<option value="">无</option>' + '<option value="0">男</option>'
		+ '<option value="1">女</option>' + '<option value="2">未知</option>'
		+ '</select></li>'
		+ '<li><span>体态：</span> <select name="" id="HCP_FIGURE">'
		+ '<option value="">无</option>' + '<option value="0">胖</option>'
		+ '<option value="1">瘦</option>' + '<option value="2">中等</option>'
		+ '</select></li>'
		+ '<li><span>种族：</span> <select name="" id="HCP_NATIONALITY">'
		+ '<option value="">无</option>' + '<option value="0">汉族</option>'
		+ '<option value="1">维吾尔族</option>' + '<option value="2">黑人</option>'
		+ '<option value="3">白人</option>' + '<option value="4">未知</option>'
		+ '</select></li>'
		+ '<li><span>年龄段：</span> <select name="" id="HCP_AGE">'
		+ '<option value="">无</option>' + '<option value="0">婴儿</option>'
		+ '<option value="1">儿童</option>' + '<option value="2">青年</option>'
		+ '<option value="3">中年</option>' + '<option value="4">老年</option>'
		+ '<option value="5">未知</option>' + '</select></li>'
		+ '<li><span>朝向：</span> <select name="" id=" HCP_VIEWPOINT">'
		+ '<option value="">无</option>' + '<option value="0">正面</option>'
		+ '<option value="1">背面</option>' + '<option value="2">侧面</option>'
		+ '</select></li>'
		+ '<li><span>头部：</span> <select name="" id="HCP_HEAD">'
		+ '<option value="">无</option>' + '<option value="0">长发</option>'
		+ '<option value="1">短发</option>' + '<option value="2">光头</option>'
		+ '<option value="3">帽子</option>' + '<option value="4">未知</option>'
		+ '</select></li>'
		+ '<li><span>头部颜色：</span> <select name="" id="HCP_HEAD_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>'
		+ '<li><span>上衣类型：</span> <select name="" id="HCP_UP">'
		+ '<option value="">无</option>' + '<option value="0">T恤衫</option>'
		+ '<option value="1">马甲/吊带/背心</option>'
		+ '<option value="2">衬衫</option>' + '<option value="3">西装</option>'
		+ '<option value="4">毛衣</option>' + '<option value="5">皮衣/夹克</option>'
		+ '<option value="6">羽绒服</option>' + '<option value="7">大衣/风衣</option>'
		+ '<option value="8">外套</option>' + '<option value="9">连衣裙</option>'
		+ '<option value="10">无上衣</option>' + '<option value="11">未知</option>'
		+ '</select></li>'
		+ '<li><span>上衣颜色：</span> <select name="" id="HCP_UP_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>'
		+ '<li><span>上衣纹理：</span> <select name="" id="HCP_UPTEXT">'
		+ '<option value="">无</option>' + '<option value="0">纯色</option>'
		+ '<option value="1">碎花</option>' + '<option value="2">条纹</option>'
		+ '<option value="3">格子</option>' + '<option value="4">未知</option>'
		+ '</select></li>'
		+ '<li><span>下衣类型：</span> <select name="" id="HCP_DOWN">'
		+ '<option value="">无</option>' + '<option value="0">长裤</option>'
		+ '<option value="1">短裤</option>' + '<option value="2">长裙</option>'
		+ '<option value="3">短裙</option>' + '<option value="4">连衣裙</option>'
		+ '<option value="5">未知</option>' + '</select></li>'
		+ '<li><span>下衣颜色：</span> <select name="" id="HCP_DOWN_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>'
		+ '<li><span>包类型：</span> <select name="" id="HCP_BAG">'
		+ '<option value="">无</option>' + '<option value="0">无包</option>'
		+ '<option value="1">单肩包</option>' + '<option value="2">双肩包</option>'
		+ '<option value="3">其他</option>' + '<option value="4">钱包</option>'
		+ '</select></li>'
		+ '<li><span>包颜色：</span> <select name="" id="HCP_BAG_COLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '</select></li>'
		+ '<li><span>眼睛：</span> <select name="" id="HCP_EYE">'
		+ '<option value="">无</option>' + '<option value="0">未遮挡</option>'
		+ '<option value="1">眼镜</option>' + '<option value="2">墨镜</option>'
		+ '<option value="3">未知</option>' + '</select></li>'
		+ '<li><span>嘴：</span> <select name="" id="HCP_MOUTH">'
		+ '<option value="">无</option>' + '<option value="0">未遮挡</option>'
		+ '<option value="1">带口罩</option>' + '<option value="2">未知</option>'
		+ '</select></li>'
		+ '<li><span>围脖：</span> <select name="" id="HCP_SCARF">'
		+ '<option value="">无</option>' + '<option value="0">无围脖</option>'
		+ '<option value="1">普通围脖</option>' + '<option value="2">包头围脖</option>'
		+ '</select></li>'
		+ '<li><span>车颜色：</span> <select name="" id="HCP_BICYCLECOLOR">'
		+ '<option value="">无</option>' + '<option value="0">黑色</option>'
		+ '<option value="1">白色</option>' + '<option value="2">红色</option>'
		+ '<option value="3">黄色</option>' + '<option value="4">蓝色</option>'
		+ '<option value="5">绿色</option>' + '<option value="6">紫色</option>'
		+ '<option value="7">棕色</option>' + '<option value="8">灰色</option>'
		+ '<option value="9">橙色</option>' + '<option value="10">多色</option>'
		+ '<option value="11">未知</option>' + '<option value="12">银色</option>'
		+ '</select></li>'
		+ '<li><span>驾驶人数：</span> <select name="" id="HCP_DRIVERCOUNT">'
		+ '<option value="">无</option>' + '<option value="0">0人</option>'
		+ '<option value="1">1人</option>' + '<option value="2">2人</option>'
		+ '<option value="3">更多人</option>' + '</select></li>'
		+ '<li><span>是否打伞：</span> <select name="" id="HCP_UMBRELLAFLAG">'
		+ '<option value="">无</option>' + '<option value="0">否</option>'
		+ '<option value="1">是</option>' + '</select></li>'
		+ '<li><span>是否携带物：</span> <select name="" id="HCP_CARRYING">'
		+ '<option value="">无</option>' + '<option value="0">无</option>'
		+ '<option value="1">有</option>' + '</select></li>';
// 车
var car = '<li><span>车牌号码：</span> <input name="" id="plate_number" style="width:150px;background-color: #0e2d51;border-color: #0c2645;color: #fff;"/></li>'
		+ '<li><span>车牌颜色：</span> <select name="" id="plate_color">'
		+ '<option value="">无</option>'
		+ '<option value="蓝">蓝</option>'
		+ '<option value="黄">黄</option>'
		+ '<option value="黑">黑</option>'
		+ '<option value="白">白</option>'
		+ '<option value="绿">绿</option>'
		+ '</select></li>'
		+ '<li><span>车身颜色：</span> <select name="" id="vehicle_color_id">'
		+ '</select></li>'
		// +'<li><span>车辆种类：</span> <select name="" id="kind_id"
		// onchange="kindvehicle()">'
		// +'</select></li>'
		+ '<li><span>车型：</span> <select name="" id="vehicle_id">'
		+ '</select></li>';
$.ajax({
	url : "getCameraTypes.do",
	async : false,
	type : "POST",
	data : {
		"cameraType" : "0"
	},
	dataType : "json",
	success : function(result) {
		if (result.length > 0) {
			$.each(result, function(i, n) {
				zNodes.push({
					id : n.recordId,
					pid : 2,
					name : n.taskName,
					taskId : n.taskId,
					font : {
						'color' : '#fff'
					}
				});
			});
		}
	}
});
var zNodes2 = [];
$.ajax({
	url : "getCameraTypes.do",
	async : false,
	type : "POST",
	data : {
		"cameraType" : "-1"
	},
	dataType : "json",
	success : function(result) {
		if (result.length > 0) {
			$.each(result, function(i, n) {
				zNodes2.push({
					id : n.recordId,
					pid : 2,
					name : n.taskName,
					taskId : n.taskId,
					font : {
						'color' : '#fff'
					}
				});
			});
		}
	}
});

$(document)
		.ready(
				function() {
					// 树状图
					$.fn.zTree.init($("#zczEquipmentZtree"), setting, zNodes);
					$.fn.zTree.init($("#zczTaskZtree"), setting, zNodes2);
					// var treeObj=$.fn.zTree.getZTreeObj("zczEquipmentZtree");
					// var checked = treeObj.getNodes();
					// console.log(checked);
					// 树状图切换
					$('.zczQLList')
							.on(
									'click',
									'li',
									function() {
										if (!$(this).hasClass('zczQLLCheck')) {
											var data_id = $(this).attr(
													'data-id');
											$('.zczQLLCheck').removeClass(
													'zczQLLCheck');
											$(this).addClass('zczQLLCheck');
											$('.ztreeBlock').removeClass(
													'ztreeBlock');
											$("#" + data_id).addClass(
													'ztreeBlock');
											$(".zczQRTRContent").html("");
											$(".zczQRTBottom").html('');
											$("#targetType").find(
													"option[value='0']").attr(
													"selected", true);
											$('.zczQRBCList').html('');
											$(".zczQRBFoot").html('')

											$('#WU_FILE_' + asd).off().find(
													'.file-panel').off().end()
													.remove();
											// $("#WU_FILE_2").find("img").attr("src","");
											$("#maxCount").val("20");
											$(".zczQRTLTPercentage").text("0%")
											$(".zczPercentage").css({
												"width" : "0px"
											});
											$(".zczSlider").css({
												"left" : "0px"
											});
										}
									})

					// 阀值滑块
					$('.zczPercentageSlider').on(
							'click',
							function(e) {
								if (!$(e.target).hasClass('zczSlider')) {
									var left = e.pageX - $(this).offset().left;
									$('.zczPercentage').css('width',
											left + "px");
									$('.zczSlider').css('left', left + "px");
									$('.zczQRTLTPercentage').html(
											parseInt(left / 125 * 100) + "%");
								}
							})

					$('.zczSlider').on(
							'mousedown',
							function() {
								$('body').on(
										'mousemove',
										function(e) {
											var left = e.pageX
													- $('.zczPercentageSlider')
															.offset().left;
											if (left < 0) {
												left = 0;
											} else if (left > 125) {
												left = 125;
											}
											$('.zczPercentage').css('width',
													left + "px");
											$('.zczSlider').css('left',
													left + "px");
											$('.zczQRTLTPercentage').html(
													parseInt(left / 125 * 100)
															+ "%");
										})
								$('body').one('mouseup', function() {
									$('body').off('mousemove');
								})
								$('body').one('mouseleave', function() {
									$('body').off('mousemove');
								})
							})

					// 上传功能
					var asd = -1, FileQueuedHash = false, fileCount = 0, $list = $('.zczQRTLImg'), uploader = WebUploader
							.create({
								auto : true,
								server : 'upload.do',
								paste : document.body,
								pick : {
									id : '.zczQRTLAdd',
									multiple : true
								},
								accept : {
									title : 'Images',
									extensions : 'gif,jpg,jpeg,bmp,png',
									mimeTypes : 'image/jpg,image/jpeg,image/png'
								},
								duplicate : true
							});
					// 文件加进来之前
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

					$('.zczQRTLDelete').click(function() {
						$("#targetType").val("0");
						$(".zczQRTRContent").html("");
						$(".zczQRTBottom").html('');
						initPram(asd);
					})

					// 重复上传
					uploader.onError = function(code) {
						// alert( 'Eroor: ' + code );
						console.log(code)
					};

					// 当有文件添加进来的时候
					uploader
							.on(
									'fileQueued',
									function(file) {
										fileCount++;
										var $li = $('<div id="'
												+ file.id
												+ '" class="file-item thumbnail">'
												+ '<img>' + '</div>'), $img = $li
												.find('img');

										$list.append($li);

										// 创建缩略图
										uploader
												.makeThumb(
														file,
														function(error, src) {
															if (error) {
																$img
																		.replaceWith('<span>不能预览</span>');
																return;
															}
															var x = file._info.width, y = file._info.height, xN, yN, tp, wx = $(
																	'.zczQRTLImg')
																	.width(), hy = $(
																	'.zczQRTLImg')
																	.height();
															if (x / y > wx / hy) {
																xN = wx;
																yN = hy / wx
																		* x;
																tp = (hy - yN) / 2;
															} else {
																xN = x / y * hy;
																yN = hy;
																tp = 0;
															}
															$img.attr('src',
																	src);
															$img
																	.css({
																		"width" : xN
																				+ "px",
																		"height" : yN
																				+ "px",
																		"margin-top" : tp
																				+ "px"
																	})
														});

									});
					var index = -1;
					uploader.on('startUpload', function() {
						index = layer.load(1);
					})
					// 文件上传成功，给item添加成功class, 用样式标记上传成功。
					uploader
							.on(
									'uploadSuccess',
									function(file, response) {
										// console.log(response);
										layer.close(index);
										$('#' + file.id).addClass(
												'upload-state-done');
										if (null == response) {
											$("#targetType").find(
													"option[value='0']").attr(
													"selected", true);
											return;
										}
										if (null == response.difference
												|| response.difference == "") {
											$("#targetType").find(
													"option[value='0']").attr(
													"selected", true);
											layer.alert("未识别信息!");
											return;
										}
										// var dd = '{"attribute" : {"kind_id" :
										// -1,"plate_color" : " ","plate_number"
										// : "δʶ ","vehicle_color_id" :
										// 6,"vehicle_id" : 486},"type_index" :
										// 4}'
										// var difference = eval('(' + dd +
										// ')');
										var difference = eval('('
												+ response.difference + ')');
										var type_index = difference.type_index;
										var attribute = difference.attribute;
										switch (type_index) {
										case 0:
											// 行人
											$("#targetType").find(
													"option[value='2']").attr(
													"selected", true);
											$(".zczQRTRContent").html(hp);
											$("#HP_SEX")
													.find(
															"option[value='"
																	+ attribute.sex_type
																	+ "']")
													.attr("selected", true);// 性别
											$("#HP_FIGURE")
													.find(
															"option[value='"
																	+ attribute.shape_type
																	+ "']")
													.attr("selected", true);// 体态
											$("#HP_NATIONALITY")
													.find(
															"option[value='"
																	+ attribute.nation_type
																	+ "']")
													.attr("selected", true);// 种族
											$("#HP_AGE")
													.find(
															"option[value='"
																	+ attribute.age_type
																	+ "']")
													.attr("selected", true);// 年龄段
											$("#HP_CARRYING")
													.find(
															"option[value='"
																	+ attribute.carrying_type
																	+ "']")
													.attr("selected", true);// 携带物
											$("#HP_VIEWPOINT")
													.find(
															"option[value='"
																	+ attribute.view_type
																	+ "']")
													.attr("selected", true);// 朝向
											$("#HP_HEAD")
													.find(
															"option[value='"
																	+ attribute.head_type
																	+ "']")
													.attr("selected", true);// 头部
											$("#HP_HEAD_COLOR")
													.find(
															"option[value='"
																	+ attribute.headcolor_type
																	+ "']")
													.attr("selected", true);// 头部颜色
											$("#HP_UP").find(
													"option[value='"
															+ attribute.up_type
															+ "']").attr(
													"selected", true);// 上衣类型
											$("#HP_UP_COLOR")
													.find(
															"option[value='"
																	+ attribute.upcolor_type
																	+ "']")
													.attr("selected", true);// 上衣颜色
											$("#HP_UPTEXT")
													.find(
															"option[value='"
																	+ attribute.uptext_type
																	+ "']")
													.attr("selected", true);// 上衣纹理
											$("#HP_DOWN")
													.find(
															"option[value='"
																	+ attribute.down_type
																	+ "']")
													.attr("selected", true);// 下衣类型
											$("#HP_DOWN_COLOR")
													.find(
															"option[value='"
																	+ attribute.downcolor_type
																	+ "']")
													.attr("selected", true);// 下衣颜色
											$("#HP_SHOE")
													.find(
															"option[value='"
																	+ attribute.shoe_type
																	+ "']")
													.attr("selected", true);// 鞋子类型
											$("#HP_SHOE_COLOR")
													.find(
															"option[value='"
																	+ attribute.shoecolor_type
																	+ "']")
													.attr("selected", true);// 鞋子颜色
											$("#HP_BAG")
													.find(
															"option[value='"
																	+ attribute.bag_type
																	+ "']")
													.attr("selected", true);// 包类型
											$("#HP_BAG_COLOR")
													.find(
															"option[value='"
																	+ attribute.bagcolor_type
																	+ "']")
													.attr("selected", true);// 包颜色
											$(".zczQRTBottom")
													.html(
															'<button id="searchButton" onclick="searchByPic('
																	+ "'"
																	+ decodeURIComponent(response.icepath)
																	+ "'"
																	+ ','
																	+ type_index
																	+ ',2)">开始检索</button>');
											break;
										case 1:
										case 2:
										case 3:
											// 骑车人
											$("#targetType").find(
													"option[value='1']").attr(
													"selected", true);
											$(".zczQRTRContent").html(hcp);
											$("#HCP_SEX")
													.find(
															"option[value='"
																	+ attribute.sex_type
																	+ "']")
													.attr("selected", true);// 性别
											$("#HCP_FIGURE")
													.find(
															"option[value='"
																	+ attribute.shape_type
																	+ "']")
													.attr("selected", true);// 体态
											$("#HCP_NATIONALITY")
													.find(
															"option[value='"
																	+ attribute.nation_type
																	+ "']")
													.attr("selected", true);// 种族
											$("#HCP_AGE")
													.find(
															"option[value='"
																	+ attribute.age_type
																	+ "']")
													.attr("selected", true);// 年龄段
											// $("#HCP_VIEWPOINT").find("option[value='"+attribute.sex_type+"']").attr("selected",true);//朝向
											$("#HCP_HEAD")
													.find(
															"option[value='"
																	+ attribute.head_type
																	+ "']")
													.attr("selected", true);// 头部
											// $("#HCP_HEAD_COLOR").find("option[value='"+attribute.sex_type+"']").attr("selected",true);//头部颜色
											$("#HCP_UP").find(
													"option[value='"
															+ attribute.up_type
															+ "']").attr(
													"selected", true);// 上衣类型
											$("#HCP_UP_COLOR")
													.find(
															"option[value='"
																	+ attribute.upcolor_type
																	+ "']")
													.attr("selected", true);// 上衣颜色
											$("#HCP_UPTEXT")
													.find(
															"option[value='"
																	+ attribute.uptext_type
																	+ "']")
													.attr("selected", true);// 上衣纹理
											$("#HCP_DOWN")
													.find(
															"option[value='"
																	+ attribute.down_type
																	+ "']")
													.attr("selected", true);// 下衣颜色
											$("#HCP_DOWN_COLOR")
													.find(
															"option[value='"
																	+ attribute.downcolor_type
																	+ "']")
													.attr("selected", true);// 下衣颜色
											$("#HCP_BAG")
													.find(
															"option[value='"
																	+ attribute.bag_type
																	+ "']")
													.attr("selected", true);// 包类型
											$("#HCP_BAG_COLOR")
													.find(
															"option[value='"
																	+ attribute.bagcolor_type
																	+ "']")
													.attr("selected", true);// 包颜色
											$("#HCP_EYE")
													.find(
															"option[value='"
																	+ attribute.eye_part
																	+ "']")
													.attr("selected", true);// 眼睛
											$("#HCP_MOUTH")
													.find(
															"option[value='"
																	+ attribute.mouth_part
																	+ "']")
													.attr("selected", true);// 嘴
											$("#HCP_SCARF").find(
													"option[value='"
															+ attribute.scarf
															+ "']").attr(
													"selected", true);// 围脖
											// $("#HCP_BICYCLECOLOR").find("option[value='"+attribute.sex_type+"']").attr("selected",true);//车颜色
											$("#HCP_DRIVERCOUNT")
													.find(
															"option[value='"
																	+ attribute.driver_count
																	+ "']")
													.attr("selected", true);// 驾驶人数
											$("#HCP_UMBRELLAFLAG")
													.find(
															"option[value='"
																	+ attribute.umbrella_flag
																	+ "']")
													.attr("selected", true);// 是否打伞
											$("#HCP_CARRYING")
													.find(
															"option[value='"
																	+ attribute.carrying_type
																	+ "']")
													.attr("selected", true);// 是否携带物
											$(".zczQRTBottom")
													.html(
															'<button id="searchButton" onclick="searchByPic('
																	+ "'"
																	+ decodeURIComponent(response.icepath)
																	+ "'"
																	+ ','
																	+ type_index
																	+ ',1)">开始检索</button>');
											break;
										case 4:
										case 5:
										case 6:
										case 7:
										case 8:
											// 车
											$("#targetType").find(
													"option[value='3']").attr(
													"selected", true);
											// 获取颜色
											$
													.ajax({
														url : "getVehicleColor.do",
														type : "POST",
														data : {},
														dataType : "json",
														success : function(
																result) {
															if (result == null
																	|| result.length < 1) {
																return;
															}
															var op = ""
															$
																	.each(
																			result,
																			function(
																					i,
																					n) {
																				op += '<option value="'
																						+ n.colorId
																						+ '">'
																						+ n.colorName
																						+ '</option>'
																			});
															$(
																	'#vehicle_color_id')
																	.html(op);
														}
													});
											// 获取种类
											// $.ajax({
											// url:"getVehicleKind.do",
											// type:"POST",
											// data: {},
											// dataType:"json",
											// success:function(vehicleKind){
											// console.log(vehicleKind);
											// if(vehicleKind == null ||
											// vehicleKind.length < 1){
											// return ;
											// }
											// var op=""
											// $.each(vehicleKind,function(i,n){
											// op+='<option
											// value="'+n.kindId+'">'+n.kindName+'</option>'
											// });
											// var par=vehicleKind[0].kindId;
											$
													.ajax({
														url : "getVehicle.do",
														type : "POST",
														data : {
															kindId : ''
														},
														dataType : "json",
														success : function(
																vehicle) {
															// console
															// .log(vehicle);
															if (vehicle == null
																	|| vehicle.length < 1) {
																return;
															}
															var op2 = ""
															$
																	.each(
																			vehicle,
																			function(
																					i,
																					n) {
																				op2 += '<option value="'
																						+ n.vehicleId
																						+ '">'
																						+ n.vehicleName
																						+ '</option>'
																			});
															// $('#kind_id').html(op);
															$('#vehicle_id')
																	.html(op2);
														}
													});
											// }
											// });
											$(".zczQRTRContent").html(car);
											$("#plate_number").val(
													attribute.plate_number);
											$("#plate_color")
													.find(
															"option[value='"
																	+ attribute.carrying_type
																	+ "']")
													.attr("selected", true);
											$("#vehicle_color_id")
													.find(
															"option[value='"
																	+ attribute.vehicle_color_id
																	+ "']")
													.attr("selected", true);//
											$("#vehicle_id")
													.find(
															"option[value='"
																	+ attribute.vehicle_id
																	+ "']")
													.attr("selected", true);//
											$(".zczQRTBottom")
													.html(
															'<button id="searchButton" onclick="searchByPic('
																	+ "'"
																	+ decodeURIComponent(response.icepath)
																	+ "'"
																	+ ','
																	+ type_index
																	+ ',3)">开始检索</button>');
											break;
										default:
											break;
										}

									});

					// 时间插件
					laydate.render({
						elem : '#zczTime1'
					});
					laydate.render({
						elem : '#zczTime2'
					});

					// 时间切换
					$('.zczQRTRTime').on('click', 'div', function() {
						if (!$(this).hasClass('zczTimeSearch')) {
							$('.zczTimeSearch').removeClass('zczTimeSearch');
							$(this).addClass('zczTimeSearch');
						}
					})

					// //测试数据
					// var list = "";
					// for(var i = 0; i < 50; i++) {
					// list += '<li>' +
					// '<dl>' +
					// '<dt>' +
					// '<img src="'+top._CTX+'/resources/img/test.png"/>' +
					// '</dt>' +
					// '<dd>100%</dd>' +
					// '</dl>' +
					// '<ul>' +
					// '<li>时间：</li>' +
					// '<li>目标类型：</li>' +
					// '<li>人员：</li>' +
					// '</ul>' +
					// '<span></span>' +
					// '</li>';
					// }
					// $('.zczQRBCList').append(list);

					// 切换目标
					var paramAttributes = {};
					$("#targetType")
							.on(
									"change",
									function() {
										var targetType = $(this).val();
										switch (targetType) {
										case '0':
											$(".zczQRTRContent").html("");
											$(".zczQRTBottom").html('');
											break;
										case '1':
											paramAttributes = bicycleParm();
											if (null == paramAttributes) {
												$(this).find(
														"option[value='0']")
														.attr("selected", true);
												layer.alert("请选择设备")
												return;
											}
											$(".zczQRTRContent").html(hcp);
											$(".zczQRTBottom")
													.html(
															'<button id="searchButton" onclick="searchBicycleAttributes()">开始检索</button>');
											break;
										case '2':
											paramAttributes = personPram();
											if (null == paramAttributes) {
												layer.alert("请选择设备");
												$(this).find(
														"option[value='0']")
														.attr("selected", true);
												return;
											}
											$(".zczQRTRContent").html(hp);
											$(".zczQRTBottom")
													.html(
															'<button id="searchButton" onclick="searchPersonAttributes()">开始检索</button>');
											break;
										case '3':
											paramAttributes = vehiclePram();
											if (null == paramAttributes) {
												layer.alert("请选择设备");
												$(this).find(
														"option[value='0']")
														.attr("selected", true);
												return;
											}
											// 获取颜色
											$
													.ajax({
														url : "getVehicleColor.do",
														type : "POST",
														data : {},
														dataType : "json",
														success : function(
																result) {
															if (result == null
																	|| result.length < 1) {
																return;
															}
															var op = '<option value="">无</option>';
															$
																	.each(
																			result,
																			function(
																					i,
																					n) {
																				op += '<option value="'
																						+ n.colorId
																						+ '">'
																						+ n.colorName
																						+ '</option>'
																			});
															$(
																	'#vehicle_color_id')
																	.html(op);
														}
													});
											// 获取种类
											// $.ajax({
											// url:"getVehicleKind.do",
											// type:"POST",
											// data: {},
											// dataType:"json",
											// success:function(vehicleKind){
											// console.log(vehicleKind);
											// if(vehicleKind == null ||
											// vehicleKind.length < 1){
											// return ;
											// }
											// var op=""
											// $.each(vehicleKind,function(i,n){
											// op+='<option
											// value="'+n.kindId+'">'+n.kindName+'</option>'
											// });
											// var par=vehicleKind[0].kindId;
											$
													.ajax({
														url : "getVehicle.do",
														type : "POST",
														data : {
															kindId : ''
														},
														dataType : "json",
														success : function(
																vehicle) {
															// console.log(vehicle);
															if (vehicle == null
																	|| vehicle.length < 1) {
																return;
															}
															var op2 = '<option value="">无</option>';
															$
																	.each(
																			vehicle,
																			function(
																					i,
																					n) {
																				op2 += '<option value="'
																						+ n.vehicleId
																						+ '">'
																						+ n.vehicleName
																						+ '</option>'
																			});
															// $('#kind_id').html(op);
															$('#vehicle_id')
																	.html(op2);
														}
													});
											// }
											// });
											$(".zczQRTRContent").html(car);
											$(".zczQRTBottom")
													.html(
															'<button id="searchButton" onclick="searchVehicle()">开始检索</button>');
											break;
										default:
											break;
										}
										initPram(asd);
									});
				});

function initPram(asd) {
	$('#WU_FILE_' + asd).off().find('.file-panel').off().end().remove();
	// $("#WU_FILE_2").find("img").attr("src","");
	$("#maxCount").val("20");
	$(".zczQRTLTPercentage").text("0%")
	$(".zczPercentage").css({
		"width" : "0px"
	});
	$(".zczSlider").css({
		"left" : "0px"
	});
	$('.zczQRBCList').html("");
	$(".zczQRBFoot").html("");
}
/**
 * 获取节点选中的数据
 * 
 * @returns 获取节点数据的数组
 */
function getTreeObj() {
	var id = $('.zczQLLCheck').attr("data-id");
	var treeObj = $.fn.zTree.getZTreeObj(id).getNodes();
	var taskIds = [];
	if (treeObj.length > 0) {
		for (var i = 0; i < treeObj.length; i++) {
			var checked = treeObj[i].checked;
			if (checked) {
				taskIds.push(treeObj[i].taskId);
			}
		}
		return taskIds;
	}
}
// 骑车人参数
function bicycleParm() {
	var taskids = getTreeObj();
	if (taskids.length < 1) {
		return;
	}
	return {
		sexType : $('#HCP_SEX').val(),
		shapeType : $('#HCP_FIGURE').val(),
		nationType : $('#HCP_NATIONALITY').val(),
		ageType : $('#HCP_AGE').val(),
		carryingType : $('#HCP_CARRYING').val(),
		viewType : $('#HCP_VIEWPOINT').val(),
		headType : $('#HCP_HEAD').val(),
		upType : $('#HCP_UP').val(),
		upcolorType : $('#HCP_UP_COLOR').val(),
		uptextType : $('#HCP_UPTEXT').val(),
		downType : $('#HCP_DOWN').val(),
		downcolorType : $('#HCP_DOWN_COLOR').val(),
		bagType : $('#HCP_BAG').val(),
		bagcolorType : $('#HCP_BAG_COLOR').val(),
		eyePart : $('#HCP_EYE').val(),
		mouthPart : $('#HCP_MOUTH').val(),
		scarf : $('#HCP_SCARF').val(),
		bicycleColor : $('#HCP_BICYCLECOLOR').val(),
		driverCount : $('#HCP_DRIVERCOUNT').val(),
		umbrellaFlag : $('#HCP_UMBRELLAFLAG').val(),
		page : 1,
		rows : 30,
		taskIds : taskids
	};
}
// 行人参数
function personPram() {
	var taskids = getTreeObj();
	if (taskids.length < 1) {
		return;
	}
	return {
		sexType : $('#HP_SEX').val(),
		shapeType : $('#HP_FIGURE').val(),
		nationType : $('#HP_NATIONALITY').val(),
		ageType : $('#HP_AGE').val(),
		carryingType : $('#HP_CARRYING').val(),
		viewType : $('#HP_VIEWPOINT').val(),
		headType : $('#HP_HEAD').val(),
		headcolorType : $('#HP_HEAD_COLOR').val(),
		upType : $('#HP_UP').val(),
		upcolorType : $('#HP_UP_COLOR').val(),
		uptextType : $('#HP_UPTEXT').val(),
		downType : $('#HP_DOWN').val(),
		downcolorType : $('#HP_DOWN_COLOR').val(),
		shoeType : $('#HP_SHOE').val(),
		shoecolorType : $('#HP_SHOE_COLOR').val(),
		bagType : $('#HP_BAG').val(),
		bagcolorType : $('#HP_BAG_COLOR').val(),
		page : 1,
		rows : 30,
		taskIds : taskids
	};
}
// 车的参数
function vehiclePram() {
	var taskids = getTreeObj();
	if (taskids.length < 1) {
		return;
	}
	return {
		plateNumber : ($('#plate_number').val() == null || $('#plate_number')
				.val() == "") ? null : $('#plate_number').val(),// 车牌号
		plateColor : ($('#plate_color').val() == null || $('#plate_color')
				.val() == "") ? null : $('#plate_color').val(),// 车牌颜色
		vehicleColorId : $('#vehicle_color_id').val(),// 车身颜色
		kindId : $('#kind_id').val(),// 车辆种类
		vehicleId : $('#vehicle_id').val(),// 车型
		page : 1,
		rows : 30,
		taskIds : taskids
	}
}

// 车的参数
function picPram(imgPath, type) {
	var taskids = getTreeObj();
	if (taskids.length < 1) {
		return;
	}
	return {
		imgPath : imgPath,
		threshold : parseFloat($(".zczQRTLTPercentage").text().replace(/%/, "")) / 100,
		count : parseInt($("#maxCount").val()),
		taskIds : taskids,
		type : type
	}
}
// 类型联动变化
function kindvehicle() {
	var par = $("#kind_id").val();
	$.ajax({
		url : "getVehicle.do",
		type : "POST",
		data : {
			kindId : par
		},
		dataType : "json",
		success : function(vehicle) {
			// console.log(vehicle);
			if (vehicle == null || vehicle.length < 1) {
				return;
			}
			var op = ""
			$.each(vehicle, function(i, n) {
				op += '<option value="' + n.vehicleId + '">' + n.vehicleName
						+ '</option>'
			});
			$('#vehicle_id').html(op);
		}
	})
}

/**
 * 搜索骑车人信息
 * 
 * @returns
 */
function searchBicycleAttributes() {
	paramAttributes = bicycleParm();
	if (null == paramAttributes) {
		return layer.alert("选择设备");
	}
	$.ajax({
		url : "getBicycleAttributes.do",
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			// console.log(result);
			var datas = result.datas;
			if (datas.length < 1) {
				$('.zczQRBCList').html("无数据");
				return;
			}
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(1, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$(".zczQRBFoot").html(QRBFoot(result.pagecount, result.total, 1));
			paramAttributes.page = result.condition.page;
		}
	});
}
/**
 * 搜行人的信息
 * 
 * @returns
 */
function searchPersonAttributes() {
	paramAttributes = personPram();
	if (null == paramAttributes) {
		return layer.alert("选择设备");
	}
	$.ajax({
		url : "getPersonAttributes.do",
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			// console.log(result);
			var datas = result.datas;
			if (datas.length < 1) {
				$('.zczQRBCList').html("无数据");
				return;
			}
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(2, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$(".zczQRBFoot").html(QRBFoot(result.pagecount, result.total, 2));
			paramAttributes.page = result.condition.page;
		}
	});
}
// 改变每页显示条数
function changeRows(v, obj) {
	var url = "";
	if (v == 1) {
		paramAttributes = bicycleParm();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		url = "getBicycleAttributes.do";
		paramAttributes.rows = $(obj).val();
	} else if (v == 2) {
		url = "getPersonAttributes.do";
		paramAttributes = personPram();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		paramAttributes.rows = $(obj).val();
	} else if (v == 3) {
		url = "getVehicleInfos.do";
		paramAttributes = vehiclePram();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		paramAttributes.rows = $(obj).val();
	}
	$.ajax({
		url : url,
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			// console.log(result);
			var datas = result.datas;
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(v, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$('.zczQRBFNPage').text(result.pagecount);
			$('.zczQRBFNTotal').text(result.total);
			paramAttributes.page = result.condition.page;
		}
	});
}

/**
 * 首页
 * 
 * @returns
 */
function home(v) {
	var url = "";
	if (v == 1) {
		url = "getBicycleAttributes.do";
		paramAttributes = bicycleParm();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		paramAttributes.rows = $("#changeRows").val();
		paramAttributes.page = 1;
	} else if (v == 2) {
		url = "getPersonAttributes.do";
		paramAttributes = personPram();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		paramAttributes.rows = $("#changeRows").val();
		paramAttributes.page = 1;
	} else if (v == 3) {
		url = "getVehicleInfos.do";
		paramAttributes = vehiclePram();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		paramAttributes.rows = $("#changeRows").val();
		paramAttributes.page = 1;
	}
	$.ajax({
		url : url,
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			var datas = result.datas;
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(v, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$('.zczQRBFNPage').text(result.pagecount);
			$('.zczQRBFNTotal').text(result.total);
			paramAttributes.page = result.condition.page;
		}
	});
}

/**
 * 搜车
 * 
 * @returns
 */
function searchVehicle() {
	paramAttributes = vehiclePram();
	if (null == paramAttributes) {
		return layer.alert("选择设备");
	}
	$.ajax({
		url : "getVehicleInfos.do",
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			// console.log(result);
			var datas = result.datas;
			if (datas == null || datas.length < 1) {
				$('.zczQRBCList').html("无数据");
				return;
			}
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(3, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$(".zczQRBFoot").html(QRBFoot(result.pagecount, result.total, 3));
			paramAttributes.page = result.condition.page;
		}
	});
}

function QRBFoot(pagecount, total, v) {
	return '<div class="zczQRBFNum">' + '共 <span class="zczQRBFNPage">'
			+ pagecount + '</span> 页， <span ' + 'class="zczQRBFNTotal">'
			+ total + '</span> 条，每页显 <select name="" onchange="changeRows(' + v
			+ ',this)" id="changeRows">' + '<option value="30">30</option>'
			+ '<option value="40">40</option>'
			+ '</select> 条，第<span class="zczNowPa">' + '</span>页</div>'
			+ '<div class="zczQRBFFlip">'
			+ '<div class="zczQRBFFlipHome" onclick="home(' + v + ')">首页</div>'
			+ '<div class="zczQRBFFlipPrevious" onclick="previous(' + v
			+ ')">上一页</div>' + '<div class="zczQRBFFlipNext" onclick="next('
			+ v + ')">下一页</div>'
			+ '<div class="zczQRBFFlipShadowe" onclick="shadowe(' + v
			+ ')">尾页</div>' + '<div class="zczQRBFFlipJump">'
			+ '跳转到<input type="text"  id="gopage"/>页' + '</div>'
			+ '<div class="zczQRBFFlipGo" onclick="goPage(' + v + ')">GO</div>'
			+ '</div>';
}

/**
 * 以图搜图
 * 
 * @returns
 */
function searchByPic(imgPath, type, v) {
	paramAttributes = picPram(imgPath, type);
	if (null == paramAttributes) {
		return layer.alert("选择设备");
	}
	index = layer.load(1);
	$.ajax({
		url : "getComparisonResult.do",
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			console.log(result);
			var datas = result;
			if (datas == null || datas.length < 1) {
				$('.zczQRBCList').html("无数据");
				layer.close(index);
				return;
			}
			var list = "";
			var local = "";
			$.each(datas, function(i, n) {
				var pers = "";
				if (v == 1) {
					// 骑车
					var bicycleAttribute = {
						traceId : n.traceId,
						taskId : n.taskId
					}
					$.ajax({
						url : 'getBicycleAttribute.do',
						async : false,
						type : "POST",
						data : JSON.stringify(bicycleAttribute),
						dataType : "json",
						contentType : "application/json",
						success : function(r) {
							if (null == r) {
								r = {
									sexType : '',
									shareType : '',
									nationType : '',
									ageType : '',
									viewType : '',
									headType : '',
									upType : '',
									upcolorType : '',
									uptextType : '',
									downType : '',
									downcolorType : '',
									bagType : '',
									bagcolorType : '',
									eyePart : '',
									mouthPart : '',
									scarf : '',
									bicycleColor : '',
									driverCount : '',
									umbrellaFlag : '',
									carryingType : '',
									left : 0,
									top : 0,
									right : 0,
									bottom : 0,
									traceId : n.traceId,
									taskId : n.taskId,
								}
							}
							r.score = (n.score * 100).toFixed(2) + "%";
							list += detailData(1, r);
						}
					});
				} else if (v == 2) {
					// 行人
					var personAttribute = {
						traceId : n.traceId,
						taskId : n.taskId
					}
					$.ajax({
						url : 'getPersonAttribute.do',
						async : false,
						type : "POST",
						data : JSON.stringify(personAttribute),
						dataType : "json",
						contentType : "application/json",
						success : function(r) {
							if (null == r) {
								r = {
									sexType : '',
									shareType : '',
									nationType : '',
									ageType : '',
									carryingType : '',
									viewType : '',
									headType : '',
									headcolorType : '',
									upType : '',
									upcolorType : '',
									uptextType : '',
									downType : '',
									downcolorType : '',
									shoeType : '',
									shoecolorType : '',
									bagType : '',
									bagcolorType : '',
									left : 0,
									top : 0,
									right : 0,
									bottom : 0,
									traceId : n.traceId,
									taskId : n.taskId,
								}
							}
							r.score = (n.score * 100).toFixed(2) + "%";
							list += detailData(2, r);
						}
					});
				} else if (v == 3) {
					// 车型
					// console.log(n);
					var vehicleInfo = {
						traceId : n.traceId,
						taskId : n.taskId
					}
					$.ajax({
						url : 'getVehicleInfo.do',
						async : false,
						type : "POST",
						data : JSON.stringify(vehicleInfo),
						dataType : "json",
						contentType : "application/json",
						success : function(r) {
							if (null == r) {
								r = {
									kindName : "未知",
									plateNumber : "未知",
									plateColor : "未知",
									colorName : "未知",
									vehicleName : "未知",
									left : 0,
									top : 0,
									right : 0,
									bottom : 0,
									traceId : n.traceId,
									taskId : n.taskId,
								}
							}
							r.score = (n.score * 100).toFixed(2) + "%";
							list += detailData(3, r);
						}
					})
				}
			})
			$('.zczQRBCList').html(list);
			$(".zczQRBFoot").html("");
			getImgWH($('.zczQRBCList').find('img'));
			layer.close(index);
		}
	})
}

/**
 * 上一页
 * 
 * @returns
 */
function previous(v) {
	var url = "";
	if (null == paramAttributes) {
		return layer.alert("选择设备");
	}
	if (paramAttributes.page - 1 <= 0) {
		layer.msg('已经是第一页!', {
			icon : 6,
			time : 2000
		// 2秒关闭（如果不配置，默认是3秒）
		}, function() {
			// do something
		});
		return;
	}
	if (v == 1) {
		url = "getBicycleAttributes.do";
	} else if (v == 2) {
		url = "getPersonAttributes.do";
	} else if (v == 3) {
		url = "getVehicleInfos.do";
	}
	paramAttributes.page = paramAttributes.page - 1;
	$.ajax({
		url : url,
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			// console.log(result);
			var datas = result.datas;
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(v, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$('.zczQRBFNPage').text(result.pagecount);
			$('.zczQRBFNTotal').text(result.total);
			paramAttributes.page = result.condition.page;
		}
	});
}
/**
 * 下一页
 * 
 * @returns
 */
function next(v) {
	if (null == paramAttributes) {
		return layer.alert("选择设备");
	}
	if (paramAttributes.page + 1 - $('.zczQRBFNPage').text() > 0) {
		layer.msg('已经是最后一页!', {
			icon : 6,
			time : 2000
		// 2秒关闭（如果不配置，默认是3秒）
		}, function() {
			// do something
		});
		return;
	}
	var url = "";
	if (v == 1) {
		// paramAttributes = bicycleParm();
		url = "getBicycleAttributes.do";
	} else if (v == 2) {
		// paramAttributes = personPram();
		url = "getPersonAttributes.do";
	} else if (v == 3) {
		url = "getVehicleInfos.do";
	}
	paramAttributes.page = paramAttributes.page + 1;
	$.ajax({
		url : url,
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			// console.log(result);
			var datas = result.datas;
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(v, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$('.zczQRBFNPage').text(result.pagecount);
			$('.zczQRBFNTotal').text(result.total);
			paramAttributes.page = result.condition.page;
		}
	});

}
/**
 * 尾页
 * 
 * @returns
 */
function shadowe(v) {
	var url = "";
	if ($('.zczQRBFNPage').text() == 0) {
		return;
	}
	if (v == 1) {
		paramAttributes = bicycleParm();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		url = "getBicycleAttributes.do";
	} else if (v == 2) {
		paramAttributes = personPram();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		url = "getPersonAttributes.do";
	} else if (v == 3) {
		url = "getVehicleInfos.do";
		paramAttributes = vehiclePram();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
	}
	paramAttributes.page = $('.zczQRBFNPage').text();
	$.ajax({
		url : url,
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			// console.log(result);
			var datas = result.datas;
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(v, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$('.zczQRBFNPage').text(result.pagecount);
			$('.zczQRBFNTotal').text(result.total);
			paramAttributes.page = result.condition.page;
		}
	});
}

/**
 * 跳转
 * 
 * @returns
 */
function goPage(v) {
	if (!/^[0-9]*$/.test($('#gopage').val())) {
		layer.msg('请输入正确的页码!', {
			icon : 6,
			time : 2000
		// 2秒关闭（如果不配置，默认是3秒）
		}, function() {
			// do something
		});
		return;
	}
	if ($('#gopage').val() - $('.zczQRBFNPage').text() > 0
			|| $('#gopage').val() <= 0) {
		layer.msg('最大' + $('.zczQRBFNPage').text() + '页!', {
			icon : 6,
			time : 2000
		// 2秒关闭（如果不配置，默认是3秒）
		}, function() {
			// do something
		});
		return;
	}
	var url = "";
	if (v == 1) {
		paramAttributes = bicycleParm();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		url = "getBicycleAttributes.do";
	} else if (v == 2) {
		paramAttributes = personPram();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
		url = "getPersonAttributes.do";
	} else if (v == 3) {
		url = "getVehicleInfos.do";
		paramAttributes = vehiclePram();
		if (null == paramAttributes) {
			return layer.alert("选择设备");
		}
	}
	paramAttributes.page = $('#gopage').val();
	$.ajax({
		url : url,
		type : "POST",
		data : JSON.stringify(paramAttributes),
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			// console.log(result);
			var datas = result.datas;
			var list = "";
			$.each(datas, function(i, n) {
				list += detailData(v, n);
			})
			$('.zczQRBCList').html(list);
			getImgWH($('.zczQRBCList').find('img'));
			$('.zczQRBFNPage').text(result.pagecount);
			$('.zczQRBFNTotal').text(result.total);
			paramAttributes.page = result.condition.page;
		}
	});
}

function detailData(v, n) {
	var pers = "";
	var local = '{left:' + n.left + ',top:' + n.top + ',right:' + n.right
			+ ',bottom:' + n.bottom + '}';
	switch (v) {
	case 1:
		// 骑车
		pers = '<li data-n="'
				+ local
				+ '">'
				+ '<dl>'
				+ '<dt>'
				+ '<img src="'
				+ decodeURIComponent(imgSrc(n.taskId, n.traceId))
				+ '"/>'
				+ '</dt>'
				+ '<dd>'
				+ ((n.score == "" || n.score == null) ? "" : n.score)
				+ '<ul>'
				+ '<li>目标类型：骑车</li>'
				+ '<li>性别：'
				+ (hcp_datas.HCP_SEX[n.sexType] == null ? "未知"
						: hcp_datas.HCP_SEX[n.sexType])
				+ '</li>'
				+ '<li>体态：'
				+ (hcp_datas.HCP_FIGURE[n.shareType] == null ? "未知"
						: hcp_datas.HCP_FIGURE[n.shareType])
				+ '</li>'
				+ '<li>种族：'
				+ (hcp_datas.HCP_NATIONALITY[n.nationType] == null ? "未知"
						: hcp_datas.HCP_NATIONALITY[n.nationType])
				+ '</li>'
				+ '<li>年龄段：'
				+ (hcp_datas.HCP_AGE[n.ageType] == null ? "未知"
						: hcp_datas.HCP_AGE[n.ageType])
				+ '</li>'
				+ '<li>朝向：'
				+ (hcp_datas.HCP_VIEWPOINT[n.viewType] == null ? "未知"
						: hcp_datas.HCP_VIEWPOINT[n.viewType])
				+ '</li>'
				+ '<li>头部：'
				+ (hcp_datas.HCP_HEAD[n.headType] == null ? "未知"
						: hcp_datas.HCP_HEAD[n.headType])
				+ '</li>'
				+ '<li>上衣类型：'
				+ (hcp_datas.HCP_UP[n.upType] == null ? "未知"
						: hcp_datas.HCP_UP[n.upType])
				+ '</li>'
				+ '<li>上衣颜色：'
				+ (hcp_datas.HCP_UP_COLOR[n.upcolorType] == null ? "未知"
						: hcp_datas.HCP_UP_COLOR[n.upcolorType])
				+ '</li>'
				+ '<li>上衣纹理：'
				+ (hcp_datas.HCP_UPTEXT[n.uptextType] == null ? "未知"
						: hcp_datas.HCP_UPTEXT[n.uptextType])
				+ '</li>'
				+ '<li>下衣类型：'
				+ (hcp_datas.HCP_DOWN[n.downType] == null ? "未知"
						: hcp_datas.HCP_DOWN[n.downType])
				+ '</li>'
				+ '<li>下衣颜色：'
				+ (hcp_datas.HCP_DOWN_COLOR[n.downcolorType] == null ? "未知"
						: hcp_datas.HCP_DOWN_COLOR[n.downcolorType])
				+ '</li>'
				+ '<li>包类型：'
				+ (hcp_datas.HCP_BAG[n.bagType] == null ? "未知"
						: hcp_datas.HCP_BAG[n.bagType])
				+ '</li>'
				+ '<li>包颜色：'
				+ (hcp_datas.HCP_BAG_COLOR[n.bagcolorType] == null ? "未知"
						: hcp_datas.HCP_BAG_COLOR[n.bagcolorType])
				+ '</li>'
				+ '<li>眼睛：'
				+ (hcp_datas.HCP_EYE[n.eyePart] == null ? "未知"
						: hcp_datas.HCP_EYE[n.eyePart])
				+ '</li>'
				+ '<li>嘴：'
				+ (hcp_datas.HCP_MOUTH[n.mouthPart] == null ? "未知"
						: hcp_datas.HCP_MOUTH[n.mouthPart])
				+ '</li>'
				+ '<li>围脖：'
				+ (hcp_datas.HCP_SCARF[n.scarf] == null ? "未知"
						: hcp_datas.HCP_SCARF[n.scarf])
				+ '</li>'
				+ '<li>车颜色：'
				+ (hcp_datas.HCP_DOWN_COLOR[n.bicycleColor] == null ? "未知"
						: hcp_datas.HCP_DOWN_COLOR[n.bicycleColor])
				+ '</li>'
				+ '<li>驾驶人数：'
				+ (hcp_datas.HCP_DRIVERCOUNT[n.driverCount] == null ? "未知"
						: hcp_datas.HCP_DRIVERCOUNT[n.driverCount])
				+ '</li>'
				+ '<li>是否打伞：'
				+ (n.umbrellaFlag == null ? '未知' : (n.umbrellaFlag == '0' ? '否'
						: '是'))
				+ '</li>'
				+ '<li>是否有携带物：'
				+ (n.carryingType == null ? '未知' : (n.carryingType == '0' ? '否'
						: '是')) + '</li>' + '</ul>' + '</dd>' + '</dl>'
				+ '</li>';
		break;
	case 2:
		// 行人
		pers = '<li data-n="'
				+ local
				+ '">'
				+ '<dl>'
				+ '<dt>'
				+ '<img src="'
				+ decodeURIComponent(imgSrc(n.taskId, n.traceId))
				+ '"/>'
				+ '</dt>'
				+ '<dd>'
				+ ((n.score == "" || n.score == null) ? "" : n.score)
				+ '<ul>'
				+ '<li>目标类型：行人</li>'
				+ '<li>人员：</li>'
				+ '<li>性别：'
				+ (hp_datas.HP_SEX[n.sexType] == null ? "未知"
						: hp_datas.HP_SEX[n.sexType])
				+ '</li>'
				+ '<li>体态：'
				+ (hp_datas.HP_FIGURE[n.shareType] == null ? "未知"
						: hp_datas.HP_FIGURE[n.shareType])
				+ '</li>'
				+ '<li>种族：'
				+ (hp_datas.HP_NATIONALITY[n.nationType] == null ? "未知"
						: hp_datas.HP_NATIONALITY[n.nationType])
				+ '</li>'
				+ '<li>年龄段：'
				+ (hp_datas.HP_AGE[n.ageType] == null ? "未知"
						: hp_datas.HP_AGE[n.ageType])
				+ '</li>'
				+ '<li>携带物：'
				+ (hp_datas.HP_CARRYING[n.carryingType] == null ? "未知"
						: hp_datas.HP_CARRYING[n.carryingType])
				+ '</li>'
				+ '<li>朝向：'
				+ (hp_datas.HP_VIEWPOINT[n.viewType] == null ? "未知"
						: hp_datas.HP_VIEWPOINT[n.viewType])
				+ '</li>'
				+ '<li>头部：'
				+ (hp_datas.HP_HEAD[n.headType] == null ? "未知"
						: hp_datas.HP_HEAD[n.headType])
				+ '</li>'
				+ '<li>头部颜色：'
				+ (hp_datas.HP_HEAD_COLOR[n.headcolorType] == null ? "未知"
						: hp_datas.HP_HEAD_COLOR[n.headcolorType])
				+ '</li>'
				+ '<li>上衣类型：'
				+ (hp_datas.HP_UP[n.upType] == null ? "未知"
						: hp_datas.HP_UP[n.upType])
				+ '</li>'
				+ '<li>上衣颜色：'
				+ (hp_datas.HP_UP_COLOR[n.upcolorType] == null ? "未知"
						: hp_datas.HP_UP_COLOR[n.upcolorType])
				+ '</li>'
				+ '<li>上衣纹理：'
				+ (hp_datas.HP_UPTEXT[n.uptextType] == null ? "未知"
						: hp_datas.HP_UPTEXT[n.uptextType])
				+ '</li>'
				+ '<li>下衣类型：'
				+ (hp_datas.HP_DOWN[n.downType] == null ? "未知"
						: hp_datas.HP_DOWN[n.downType])
				+ '</li>'
				+ '<li>下衣颜色：'
				+ (hp_datas.HP_DOWN_COLOR[n.downcolorType] == null ? "未知"
						: hp_datas.HP_DOWN_COLOR[n.downcolorType])
				+ '</li>'
				+ '<li>鞋子类型：'
				+ (hp_datas.HP_SHOE[n.shoeType] == null ? "未知"
						: hp_datas.HP_SHOE[n.shoeType])
				+ '</li>'
				+ '<li>鞋子颜色：'
				+ (hp_datas.HP_SHOE_COLOR[n.shoecolorType] == null ? "未知"
						: hp_datas.HP_SHOE_COLOR[n.shoecolorType])
				+ '</li>'
				+ '<li>包类型：'
				+ (hp_datas.HP_BAG[n.bagType] == null ? "未知"
						: hp_datas.HP_BAG[n.bagType])
				+ '</li>'
				+ '<li>包颜色：'
				+ (hp_datas.HP_BAG_COLOR[n.bagcolorType] == null ? "未知"
						: hp_datas.HP_BAG_COLOR[n.bagcolorType]) + '</li>'
				+ '</ul>' + '</dd>' + '</dl>' + '</li>';
		break;
	case 3:
		// 车型
		pers = '<li data-n="' + local + '">' + '<dl>' + '<dt>' + '<img src="'
				+ decodeURIComponent(imgSrc(n.taskId, n.traceId)) + '"/>'
				+ '</dt>' + '<dd>'
				+ ((n.score == "" || n.score == null) ? "" : n.score) + '<ul>'
				+ '<li>目标类型：车辆</li>' + '<li>车辆种类：'
				+ (n.kindName == null ? "未知" : n.kindName) + '</li>'
				+ '<li>车牌号码：' + (n.plateNumber == null ? "未知" : n.plateNumber)
				+ '</li>' + '<li>车牌颜色：'
				+ (n.plateColor == null ? "未知" : n.plateColor) + '</li>'
				+ '<li>车身颜色：' + (n.colorName == null ? "未知" : n.colorName)
				+ '</li>' + '<li>车型：'
				+ (n.vehicleName == null ? "未知" : n.vehicleName) + '</li>'
				+ '</ul>' + '</dd>' + '</dl>' + '</li>';
		break;
	default:
		break;
	}
	return pers;
}

function imgSrc(taskId, traceId) {
	return _imgPath + taskId + '/SnapshotLittle/' + traceId + '.jpg';
}
$(function() {
	$('body').append(
			'<div class="imgHover">' + '<div><img src="" /></div>' + '</div>');
	// 目标信息大图显示
	var Mhash = 1;
	$('.zczQRBCList')
			.on(
					'mouseover',
					'>li',
					function(e) {
						if (Mhash == 1) {
							var x = e.pageX, y = e.pageY, list = $(this).find(
									'ul'), data = $(this).attr('data-n');
							data = eval('(' + data + ')');
							$('.imgHover').css('display', 'block');
							$('.imgHover>div>img').attr(
									'src',
									$(this).find('img').attr('src').replace(
											'Little', ""));
							$('.imgHover').append(list.clone());
							if (x > 800) {
								$('.imgHover').css({
									"left" : (x - 860) + "px",
									"margin-right" : "30px",
									"margin-left" : "0"
								})
							} else {
								$('.imgHover').css({
									"left" : x + "px",
									"margin-left" : "30px",
									"margin-right" : "0"
								})
							}
							if (y > 700) {
								$('.imgHover').css('top', (y - 700) + "px");
							} else {
								$('.imgHover').css('top', "0");
							}
							var test = $('.imgHover>div>img')[0];
							test.onload = function(e) {
								$('.redFrame').remove();
								var imgObj = new Image();
								imgObj.src = test.src;
								if (imgObj.width / imgObj.height > 730 / 700) {
									test.style.width = "100%";
									test.style.height = "auto";
								} else {
									test.style.width = "auto";
									test.style.height = "100%";
								}
								var xH = this.offsetWidth / imgObj.width, yH = this.offsetHeight
										/ imgObj.height;
								var nDiv = "<span class='redFrame' style='width:"
										+ xH
										* (data.right - data.left)
										+ "px;height:"
										+ yH
										* (data.bottom - data.top)
										+ "px;left:"
										+ (xH * data.left + this.offsetLeft)
										+ "px;top:"
										+ (yH * data.top + this.offsetTop)
										+ "px;'></span>";
								$('.imgHover>div').append(nDiv);
							}
							Mhash = 2;
						}
					})
	$('.zczQRBCList').on('mousemove', '>li', function(e) {
		var x = e.pageX, y = e.pageY;
		console.log(x)
		if (x > 800) {
			$('.imgHover').css({
				"left" : (x - 860) + "px"
			})
		} else {
			$('.imgHover').css({
				"left" : x + "px"
			})
		}
		if (y > 700) {
			$('.imgHover').css('top', (y - 700) + "px");
		} else {
			$('.imgHover').css('top', "0");
		}
	})
	$('.zczQRBCList').on('mouseleave', '>li', function(e) {
		if (Mhash == 2) {
			$('.imgHover').find('ul').remove();
			$('.imgHover').css('display', 'none');
			Mhash = 1;
		}
	})

})

// 测试数据
// var list="";
// var datasss =[{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },{
// "kind_id" : -1,
// "plate_color" : " ",
// "plate_number" : "δʶ ",
// "vehicle_color_id" : 6,
// "vehicle_id" : 486
// },]
// // 车型
// $.each(datasss,function(i,n){
// var vehicle ="";
// $.ajax({
// url : 'getVehicleName.do',
// async:false,
// type : "POST",
// data : {vehicleId:n.vehicle_id},
// dataType : "json",
// success : function(result) {
// vehicle = result.vehicleName;
// }
// });
// //类型
// var kind ="";
// $.ajax({
// url : 'getKindName.do',
// async:false,
// type : "POST",
// data : {kindId:n.kind_id},
// dataType : "json",
// success : function(result) {
// kind = result.kindName;
// }
// });
// //颜色
// var color = "";
// $.ajax({
// url : 'getVehicleColorName.do',
// async:false,
// type : "POST",
// data : {vehicleColorId:n.vehicle_color_id},
// dataType : "json",
// success : function(result) {
// color = result.colorName;
// }
// });
// console.log(n.plate_color.replace(/^\s*$/, "").length);
// pers = '<li>车辆种类：' + (kind == null ?"未知":kind) + '</li>' +
// '<li>车牌号码：'+ (n.plate_number == null ? "未知":n.plate_number) + '</li>' +
// '<li>车牌颜色：'+ (n.plate_color.replace(/^\s*$/, "").length == 0?
// "未知":n.plate_color.replace(/^\s*$/, "")) + '</li>' +
// '<li>车身颜色：'+ (color == null ? "未知":color) + '</li>' +
// '<li>车型：'+ (vehicle == null ? "未知":vehicle) + '</li>';
// var local =
// '{left:'+n.left+',top:'+n.top+',right:'+n.right+',bottom:'+n.bottom+'}';
// list += '<li data-n="'+local+'">'
// + '<dl>'
// + '<dt>'
// + '<img src="'
// + decodeURIComponent('http://192.168.101.121:5000/'
// + n.taskId
// + '/SnapshotLittle/'
// + n.traceId + '.jpg')
// + '"/>' + '</dt>'
// + '<dd></dd>' + '</dl>'
// + '<ul>' +
// // '<li>时间：</li>' +
// '<li>目标类型：车</li>'
// + '<li>人员：</li>' + pers
// + '</ul>' + '<span></span>'
// + '</li>';
// })
// $('.zczQRBCList').html(list);
// getImgWH($('.zczQRBCList').find('img'));

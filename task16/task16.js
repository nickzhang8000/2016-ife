/**
 * Created by Whiskey on 2016/3/25.
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
//   封装addevent
var addHandler = function(elt, type, handler) {
    if (elt.addEventListener) {
        elt.addEventListener(type, handler, false);
    } else if (elt.attachEvent) {
        elt.attachEvent('on' + type, handler);
    } else {
        elt['on' + type] = handler;
    }
};
//   定义全局变量
var aqiData = {};
var cityInput = document.getElementById("aqi-city-input");
var aqiInput = document.getElementById("aqi-value-input");
var btn = document.getElementById("add-btn");
var table = document.getElementById("aqi-table");
var cityMsg = document.getElementById("city-msg");
var aqiMsg = document.getElementById("aqi-msg");



//焦点在城市输入框
cityInput.onfocus = function() {
    cityInput.value = ""; // 每次聚焦前清空input
    cityMsg.style.display = "inline"; // 激活span标签
    cityMsg.innerHTML = "请输入中文或英文城市名称"; //提示输入的格式要求
};
//焦点离开城市输入框
cityInput.onblur = function() {
//            定义判断城市名称的RegExp，匹配除了英文字母和汉字以外的字符
    var reCity = /[^a-zA-Z\u4e00-\u9fa5]/;
//        ReExp的.test（）方法返回布尔值，用定义的这条正则取匹配input输入框里的内容，结果为true则说明包含非法字符
    if (reCity.test(this.value)) {
        cityMsg.innerText = "含有非法字符"; //提示含有非法字符
        btn.disabled = "disabled"; // 设置添加按钮为不可用
//            如果input的value为空，提示城市不能为了空，设置按钮为不可用
    } else if (this.value === ""){
        cityMsg.innerHTML = "城市不能为空";
        btn.disabled = "disabled";
    } else {
        cityMsg.innerHTML = "OK";  //如果正常匹配，提示ok，解禁添加按钮
        btn.disabled = "";
    }
};

//    焦点在空气质量输入框
aqiInput.onfocus = function() {
    aqiInput.value = "";
    aqiMsg.style.display = "inline";
    aqiMsg.innerHTML = "请输入整数空气质量";
};

//    焦点离开空气质量输入框
aqiInput.onblur = function() {
    var reaqi = /\D/; // 匹配除了数字以外的字符
    if (reaqi.test(this.value)) {
        aqiMsg.innerHTML = "含有非常字符";
        btn.disabled = "disabled";
    } else if (this.value === "") {
        aqiMsg.innerHTML = "空气质量不能为空";
        btn.disabled = "disabled";
    } else {
        aqiMsg.innerHTML = "OK";
        btn.disabled = "";
    }
};
//        不知道为什么无效了
//    if (aqiMsg.innerHTML === "OK" && cityMsg.innerHTML === "OK") {
//        btn.disabled = "";
//    } else {
//        btn.disabled = "disabled";
//    }
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = cityInput.value.trim(); //.trim方法兼容ie9+，前面的正则已把空格归为非法字符
    var aqi = aqiInput.value.trim();
    aqiData[city] = aqi;
//        console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"; //添加表单的第一行
//        for-in可以用来枚举对象的属性，此处的city只是一个变量名，可以用i替换，相应116行的city也要替换成i
    for (var city in aqiData) {
        items += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td>" + "<button>删除</button></td></tr>";
    }
    table.innerHTML = items; // 把生成的表单添加到table

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addHandler(btn, "click", addBtnHandle);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    table.addEventListener("click", function (e) {
        if (e.target.nodeName.toLowerCase() === "button") {
            var delObj = e.target.parentNode.parentNode.firstChild.firstChild.nodeValue;
            console.log(delObj);
            delBtnHandle(delObj);
        }
    }, false);
}
init();

//_____因为用了onload函数,不能用JS方法直接设置全局变量了,所以需要提前预设全局变量,在函数里面赋值.
var show;
var aElements;
var showText;
var showA;
//[JS健壮]_____:确保html加载完再加载js,可以让scrip放在html任何位置都能成功运行JS
//window.onload =main;  //或者匿名函数,下面的是扩展性最强的
addLoadEvent(main);
function main(){
    //[平稳退化]______A1:在html里面,<a>的href不为'#',不要太依赖onclick
    //[向后兼容]______A2:确保老版本JS不发生错误,进行方法存在检查(这里只是略写),依赖什么元素就检测什么
    if(!document.getElementsByClassName)return false;
    if(!document.getElementById("waitForShow"))return false;
    createJsElement();
    createJsElementWork();

    /*var pp = document.createElement("h2");
    var ppText = document.createTextNode("fuck");
    pp.appendChild(ppText);//你一定要了解targetElement及其父元素
    ppText.insertBefore(pp,aaaa);*/

}
//创建JS事件所需组件,组件名字都是全局变量
function createJsElement(){
    if(!document.getElementById("showA"))return false;
    //html中添加一个<img id="rightImage" src="Image/white.jpg" height="550" width="1000" alt="There are something worry with my picture.">
    show = document.createElement("img");
    show.setAttribute("id","rightImage");
    show.setAttribute("src","../Image/white.jpg");
    show.setAttribute("height","550");
    show.setAttribute("width","1000");
    show.setAttribute("alt","There are something worry with my picture.");
    showA = document.getElementById("showA");
    showA.appendChild(show);
    //html中添加一个<p id="showText">Choose a picture.</p>
    showText = document.createElement("p");
    showText.setAttribute("id","showText");
    showText.appendChild(document.createTextNode("Choose a picture....."));
    insertAfter(showText,document.getElementById("waitForShow"));
    // 插到某元素前面: target.parentNode.insertBefore(newElement,target);
}
//进行JS的行为设置
function createJsElementWork() {
    //注意是<a>不是<li>
    aElements = document.getElementById("waitForShow").getElementsByTagName("a");
    //[分离JS]______A3:在JS里面设定onclick事件
    for (var i = 0;i < aElements.length; i++) {
        //随机选择事件
        if(i === (aElements.length -1)){
            //[平稳退化]如果JS方法用不了,就不压制默认的onclick方法:return !function,注意function要返回true.
            aElements[i].onclick = function () {
                return !showRandomImage();
            }
        }
        //指定选择事件
        else {
            aElements[i].onclick = function () {
                return !showImage(this);
            }
        }
    }
}
function showImage(aElement) {
    var newHref=aElement.getAttribute("href");
    show.setAttribute("src",newHref);
    var description = aElement.getAttribute("title");
    //设置文本是锦上添花,是可选的,用下面的if判断是代表一种'可选的功能'.可以避免html里text出问题导致整体爆炸
    if(document.getElementById("showText")){
        showText.firstChild.nodeValue = description;
    }
    //设置右侧图片超链接为弹出该图片,我靠?写在+里面要加引号啊?直接放到函数括号里不用?...
    //showA.setAttribute("onclick" , "showNewUrl('"+newHref+"'); return false;");
    //修正:由于一些兼容原因(一些浏览器让setAttrivute()传不给对象onclock,所以要用点号
    showA.onclick = function () {
        return !showNewUrl(newHref);
    };
    return true;
}
function showRandomImage() {
    var randoms=Math.floor(Math.random()*12+1);//floor:舍去小数部分,产生1到12整数
    var rHref ="../Image/"+ randoms +".jpg";
    show.setAttribute("src",rHref);
    if(document.getElementById("showText")){
        showText.firstChild.nodeValue = "There are random picture.";
    }
    showA.onclick = function () {
        return !showNewUrl(rHref);
    };
    return true;
}

function showNewUrl(url) {
    window.open(url,null,"width=1300,height=800");
    return true;
}
//实用方法
function addLoadEvent(func) {
    var oldonLoad = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    else {
        window.onload = function () {
            oldonLoad();
            func();
        }
    }
}
function  insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }
    else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }

}

new XMLHttpRequest()
//其它笔记:
//function不能放function里
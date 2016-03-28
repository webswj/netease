/* 网易云课堂大作业--网易产品教育部--史文俊版本 */
/* 以下为本页面需使用到的功能性函数 */
/* 判断IE版本 */
  var Sys = {};
  var ua = navigator.userAgent.toLowerCase();
    if (window.ActiveXObject){
      Sys.ie = ua.match(/msie ([\d.]+)/)[1];
    }

/* 页面加载时添加函数 */
    function addLoadEvent(func){
      var oldonload = window.onload;
      if(typeof window.onload != 'function'){
        window.onload = func;
      }else{
        window.onload = function(){
        oldonload();
        func();
        }
      }
    }

/* 移除classname */
    function reClassName(ele,classname){
      if (!!classname) {
      var classNames = ele.className.split(/\s+/);
      for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === classname) {
          classNames.splice(i, 1);
          break;
        }
      }
          ele.className = classNames.join(' ');
    }
    }

/* 添加classname */
    function addClassname(ele,classname){
      ele.className = ele.className ?[ele.className, classname].join(' ') : classname;
    }

/* 根据元素ID获取元素 */
    function $(id){
    return document.getElementById(id);
    }
/* getElementsByclassName兼容 */
  function getElementsByClassName(elm,clazz){
    if(elm.getElementsByClassName){
      return elm.getElementsByClassName(clazz);
    } else{
      var list = elm.getElementsByTagName('*'),result=[];
      for(var i=0;i<list.length;i++){
        if((' '+list[i].className+' ').indexOf(' '+clazz+' ') != -1){
          result.push(list[i]);
        }
      }
      return result;
    }
  }
/* 给一个element绑定一个针对event事件的响应，响应函数为handler，兼容IE */
    function addEvent(node,event,handler){
    event = event || window.event;
    if (!!node.addEventListener){
      node.addEventListener(event,handler,!1);
    }else{
      node.attachEvent('on'+event,handler);
    }
    }

/* 获取cookie值 */
    function getCookie(){
    var cookie ={},
    all = document.cookie;
    if(all === ''){
      return cookie;
    } 
    var list =all.split('; ');
    for (var i = 0; i < list.length; i++) {
      var item =list[i];
      var p = item.indexOf('=');
      var name = item.substring(0,p);
      name = decodeURIComponent(name);
      var value = item.substring(p+1);
      value = decodeURIComponent(value);
      cookie[name] = value;
    }
    return cookie;
    }

/* 设置cookie值 */
    function setCookie(name,value,expires,path,domain,secure){
    var cookie = encodeURIComponent(name)+'='+encodeURIComponent(value);
    if(expires){
      cookie +='; expires='+expires.toGMTString();
    }
    if(path){
      cookie += '; path='+path;
    }
    if(domain){
      cookie += '; domain='+domain;
    }
    if(secure){
      cookie += '; secure=' +secure;
    }
    document.cookie = cookie;
    }

/* 删除cookie */
    function removeCookie (name){
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval = getCookie(name); 
    if(cval!=null) {
      document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
    }  
    }

/* innerText的FF兼容 */
    if (!('innerText' in document.body)) {
      HTMLElement.prototype.__defineGetter__('innerText', function(){
        return this.textContent;
      });
      HTMLElement.prototype.__defineSetter__('innerText', function(s) {
        return this.textContent = s;
      });
    }  

/* preventDefault 兼容 */
    function preventDefault(event){
    if(event.preventDefault){
      event.preventDefault();
    }else{    
      event.returnValue = false;
    }
    }

/* 封装的get */
    function get(url,options,callback){
    var xhr = null;
    if(window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if ('XDomainRequest' in window && window.XDomainRequest !== null) {
        var xhr = new XDomainRequest();
        }else{
          xhr = new ActiveXObject("Microsoft.XMLHttp");
        }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          callback(xhr.responseText);
        } else {
          console.error('Request was unsuccessful: ' + xhr.status);
        }
      };
    }
    if (!!options) {
      var url = url + '?' + serialize(options);
    };
    xhr.open("get",url,true);
    xhr.send();

      function serialize(data){
      if (!data) {
        return "";
      };
      var pairs = [];
      for (var name in data) {
        if (!data.hasOwnProperty(name)) {
          continue;
        };
        if (typeof data[name] === "function") {
          continue;
        };
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
      };
      return pairs.join("&");
      console.log(pairs.join("&"));
    }
    }

/* dataset兼容IE低版本 */
    if (typeof(HTMLElement) !== 'undefined' && !HTMLElement.prototype.hasOwnProperty('dataset')) {
    Object.defineProperty(Element.prototype, 'dataset', {       
        get: function() {   
            var result = {}, 
                attr = null, 
                attrName = ''; 
            for (var i = 0; i < this.attributes.length; i++) { 
                attr = this.attributes[i]; 
                if ((attrName = attr.name).match(/^data-.*/)) { 
                    attrName = attrName.slice(5).replace(/-./g, function(firstAlpha) { 
                        return firstAlpha.slice(1).toUpperCase();
                    });
                    result[attrName] = attr.value; 
                }
            }
            return result;
        }
    });
}
/* 以上为本页面需使用到的函数、兼容 */

/* 顶部通知栏部分 */
  function toptips(){
    var top = $('g-top');
    var tip = top.getElementsByTagName('span')[0];
    var cookie = getCookie();
    if(!cookie.tip){
        top.style.display = 'block';
    }
    addEvent(tip,"click",function(event){
        setCookie('tip','no',new Date(2222,2));
        top.style.display = 'none';
    })
  } 
  addLoadEvent(toptips);
/* 轮播图部分 */
  var banner = document.getElementById("g-banner");
  var a_ul = banner.getElementsByTagName("ul")[0];
  var a_li = a_ul.getElementsByTagName("li");
  var a_i = banner.getElementsByTagName('i');
  var q = 0 ; //用于储存图片的index
  var boo = true ; // 用于图片切换停止函数判断
  /*轮播图动起来 5秒切换*/       
  function activeC(){
    if(q == a_li.length-1){
       q = 0;
      }else{
       q++;
      }
    for(var i =0;i<a_li.length;i++){
        a_i[i].parentNode.className = "";
        a_li[i].className = "";
       }
    a_i[q].parentNode.className = "u-iact" ;
    a_li[q].className = "u-active";
    }       
  var intervalId = setInterval(activeC,5000);
/* 鼠标悬停或离开图片时执行切换或停止 */
  banner.onmouseover = function(){
    if(boo){
      clearInterval(intervalId);
      boo = false;
      }
    };
  banner.onmouseout =function(){
    if(!boo){
      intervalId = setInterval(activeC,5000); 
      boo = true;
      }
    };
/* 点击图片上方小圆点切换图片 */
  var array_i = [];
  for(var i=0;i < a_i.length;i++){
    array_i.push(i);
  }
/* 给圆点添加自定义属性 */
  for(var i=0;i < a_i.length;i++){
    a_i[i].setAttribute('data-index',array_i[i]);
  }
/* 添加小圆点的事件 */
  addEvent(banner,'click',function(event){
    var target = event.target||event.srcElement;
    var o = (target.dataset).index;
    for(var i =0;i<a_li.length;i++){
      a_i[i].parentNode.className = "";
      a_li[i].className = "";
    }             
    a_i[o].parentNode.className = "u-iact";
    a_li[o].className = "u-active";
  })

/* 课程列表部分 */
  var url = "http://study.163.com/webDev/couresByCategory.htm";
  var course = document.getElementById("course");   
  var pageSize = 20;
  var pageType = 10;
  var pageNow = 2;
  var tab1 = $("tab1");
  var tab2 = $('tab2');
  var pageBegin =0 ;  //用于Aajx取回数据后给当前页面对应页码节点赋值index
  if(window.screen.width < 1205){ //根据屏幕大小更改pageSize的值
    pageSize = 15 ;
  }  
  addEvent(tab1,'click',function(event){//点击产品设计时执行
    if((tab1.className).indexOf("t-active") == -1){
      tab1.className += " t-active";
      tab2.className = (tab2.className).replace("t-active","");
    }
      pageType1 = tab1.getAttribute("data");
      pageNow = 1,pageType =pageType1;
      pageBegin = 0;                
      getCourse();
  preventDefault(event);
   })
  addEvent(tab2,'click',function(event){//点击编程语言时执行
    if((tab2.className).indexOf("t-active") == -1){
      tab2.className += " t-active"; 
      tab1.className= (tab1.className).replace("t-active","");        
    }
      pageType2 = tab2.getAttribute("data");
      pageNow = 1,pageType = pageType2;
      pageBegin = 0 ;      
      getCourse();
   preventDefault(event);   
   })               
/* 获取数据并创建对应的课程列表 */
  function getCourse(response){
    var options = {pageNo:pageNow,psize:pageSize,type:pageType}; 
    get(url,options,function(response){
      course.innerHTML="";//清除内容，重新获取数据
      var data =JSON.parse(response);
      var task ='<div class="course-list f-clear">\
                                    <a class="clist f-clear">\
                                        <img class="cl-pic">\
                                        <h3 class="cl-title"></h3>\
                                        <div class="cl-name"></div>\
                                        <div class="cl-num"></div>\
                                        <div class="cl-price"></div>\
                                        <div class="cl-kind"></div>\
                                        <div class="cl-description"></div>\
                                    </a>\
                                </div>';                                                  
      for(var i =0,list=data.list;i<list.length;i++){
        var courseContent =document.createElement("div");
        courseContent.className = 'course-content f-clear'; 
        courseContent.innerHTML = task;    
        course.appendChild(courseContent); 
        var pic = getElementsByClassName(course,'cl-pic')[i];
        var title = getElementsByClassName(course,'cl-title')[i];
        var name = getElementsByClassName(course,'cl-name')[i];
        var num = getElementsByClassName(course,'cl-num')[i];
        var price = getElementsByClassName(course,'cl-price')[i];
        var kind = getElementsByClassName(course,'cl-kind')[i];
        var description = getElementsByClassName(course,'cl-description')[i];    
        pic.src = list[i].middlePhotoUrl;
        pic.alt = list[i].name;
        title.innerText = list[i].name;
        name.innerText = list[i].provider;
        num.innerText = list[i].learnerCount;
        price.innerText =(list[i].price >0)?'￥'+(Number(list[i].price)).toFixed(2):'免费';
        kind.innerText = list[i].categoryName;
        description.innerText = list[i].description;
      }
      // console.log(data);
      createPageNo(data);
    });
  }
  addLoadEvent(getCourse);
//创建页码
  function createPageNo(data){  
    var page = document.createElement('div');
    page.className = 'course-pager';
    var pageHTML = '<a class="cl-last"></a>\
                    <a class="cl-pg"></a>\
                    <a class="cl-pg "></a>\
                    <a class="cl-pg"></a>\
                    <a class="cl-pg"></a>\
                    <a class="cl-pg"></a>\
                    <a class="cl-pg"></a>\
                    <a class="cl-pg"></a>\
                    <a class="cl-pg"></a>\
                    <a class="cl-next"></a>';
    page.innerHTML = pageHTML;                                
    course.appendChild(page);
    var allPage = data.totalPage;
    var arrayPage =[];
    for (var i = 0; i <= allPage; i++) {
      arrayPage.push(i);
     };
    var end = arrayPage[arrayPage.length-1] ;  
    var aPage = getElementsByClassName(course,'course-pager');
    var aList = aPage[0].getElementsByTagName('a');
    var numP = arrayPage.length - aList.length + 2 ;//因为有"<"和">"这二项，所以加 2    
    aList[0].innerText = '上一页';
    aList[9].innerText = '下一页';  
    for (var i = 0; i < aList.length; i++) {
      aList[i].setAttribute('data-item',arrayPage[pageBegin+i]);
      aList[i].setAttribute('data-pageindex',i);
      if(Sys.ie){
          aList[i].innerText = aList[i].getAttribute('data-item');
          if(aList[i].getAttribute('data-item') == "0" ||aList[i].getAttribute('data-item') == "undefined" ){
              aList[i].setAttribute('style','display:none');
          }
      }else{
          aList[i].innerText = (aList[i].dataset).item;
          if(aList[i].getAttribute('data-item') == "0" ||(aList[i].dataset).item  == "undefined"){
              aList[i].style.display ="none";
          }
      }

    };
 /* 添加选中状态 */
    for(var i=0;i < aList.length-1; i++){
      if(aList[i].getAttribute('data-item') == pageNow){
        var j = aList[i].getAttribute('data-pageindex');
        aList[j].setAttribute("class","cl-pg selected");
      }   
    }            
/* 选择页码更换页面 */
    var parent = aList[i].parentNode;
    var lastBt = getElementsByClassName(parent,"cl-last")[0];  
    var nextBt = getElementsByClassName(parent,"cl-next")[0];  
    addEvent(parent,'click',function(event){
      var target = event.target || event.srcElement; 
      pageNow = Number(target.getAttribute('data-item'));
      var options = {pageNo:pageNow,psize:pageSize,type:pageType}; 
      // console.log(options);
      getCourse();  
    });  
/* 点击“>"时向后翻页 */
    addEvent(nextBt,'click',function(event){
      var target = event.target || event.srcElement; 
      pageNow = Number(target.getAttribute('data-item'));
      var indexNum = Number(target.getAttribute('data-pageindex'));    
      if(pageNow !== 0 &&  indexNum !== 0 && pageBegin < numP-1 ){
          var options = {pageNo:pageNow,psize:pageSize,type:pageType}; 
          getCourse();  
          pageBegin +=5;       
        }else if(pageNow !== 0 &&  indexNum !== 0 ) {      
          pageBegin = numP;
          var options = {pageNo:pageNow,psize:pageSize,type:pageType};
          getCourse();        
        }
    });     
/* 点击“<”向前翻页 */ 
    addEvent(lastBt,'click',function(event){
      var target = event.target || event.srcElement;       
      pageNow = Number(target.getAttribute('data-item'));
      var indexNum = Number(target.getAttribute('data-pageindex')); 
      if(pageBegin > 8 ){
          var options = {pageNo:pageNow,psize:pageSize,type:pageType}; 
          getCourse();  
          pageBegin -=5;       
        }else{            
          pageBegin = 0 ;
          var options = {pageNo:pageNow,psize:pageSize,type:pageType}; 
          getCourse(); 
        }        
    })
  }
/* 最热排行榜 */
  var begin = 0 ; //用于排行榜滚动赋值起始索引设定
  function hot(response){
    var url_hot = 'http://study.163.com/webDev/hotcouresByCategory.htm';
    var options = {};
    get(url_hot,options,function(response){
      var hotData = JSON.parse(response);     
      var toptitle = document.getElementById('toptitle');
      toptitle.innerHTML = "";//清空内容，重新获取
/* 页面显示10个，创建10个 */
      for(var i=0;i<10;i++){
        var h_item = document.createElement('div');
        h_item.className = 'h-item';
        h_item.innerHTML = '<a class="f-clear">\
                            <img class="h-pic">\
                            <h3 class="h-tt"></h3>\
                            <span class="h-num"></span>\
                          </a>';
        toptitle.appendChild(h_item);
        var h_pic = toptitle.getElementsByTagName('img');
        var h_tt =  toptitle.getElementsByTagName('h3');
        var h_num = toptitle.getElementsByTagName('span'); 
        var j= begin + i ;
        h_pic[i].src = hotData[j].smallPhotoUrl;
        h_tt[i].innerText = hotData[j].name;
        h_num[i].innerText = hotData[j].learnerCount;
      }  
      begin++;
      if(begin > 10){
        begin = 0;  
      }             
    });
  }  
  addLoadEvent(hot);
  setInterval(hot,5000);  
/* 视频弹窗 */
  var video = document.getElementById('video');
  var vclose = document.getElementById('v-close');
  var gvideo = getElementsByClassName(document,'g-video')[0];
  var v = document.getElementById('v');
  addEvent(video,'click',function(event){
    gvideo.style.display ='block';
  })
  addEvent(vclose,'click',function(event){
    gvideo.style.display ='none';
    if(video && ! v.paused){
        v.pause();
    }
  })
/* 关闭登陆弹窗 */
  var g_login =document.getElementById('g-login');
  var lg_close =g_login.getElementsByTagName('span')[0];    
  addEvent(lg_close,'click',function(event){
    g_login.style.display = 'none';
  })
/* 关注按钮部分 */
  function follow(){  
    var head = document.getElementById('g-header');  
    var gz = getElementsByClassName(head,'u-gz')[0];
//页面刷新时，若已经登录，判断cookie
        var cookie = getCookie();
    if(cookie.loginSuc && cookie.loginSuc == 1){
      setFollow();
    }  
    addEvent(gz,'click',function(event){
      if(cookie.loginSuc && cookie.loginSuc == 1){
        follow_AIP();
        setFollow();
      }else if(!cookie.loginSuc || cookie.loginSuc == 0){
          disableSubmit(false);              
        var g_login =document.getElementById('g-login');
        g_login.style.display = 'block';        
      }
    })
  }
  addLoadEvent(follow);
/* 关注API */  
  function follow_AIP(){
      var url = 'http://study.163.com/webDev/attention.htm';
      get(url,null,function(responce){
        if(responce == 1){
          setCookie('followSuc','1',new Date(3333,3));    
          setFollow()
        }
      })
  }
/* 设置关注按钮 */
  function setFollow(){
    var cookie = getCookie();
    var head = document.getElementById('g-header');    
    var ygz = getElementsByClassName(head,'u-ygz')[0];
    var fansNum = getElementsByClassName(head,'u-fansNum')[0];    
    if (cookie.followSuc == 1) {
      gz.style.display = 'none';
      ygz.style.display = 'block';
      var fansInner = Number(fansNum.innerText);
      fansNum.innerText = fansInner+1;
    }
    else{
      gz.style.display = 'block';
      ygz.style.display = 'none';
    }
  }
/* 取消关注按钮 */  
    function clearFollow(){
    var cookie = getCookie();
    var head = document.getElementById('g-header');    
    var ygz = getElementsByClassName(head,'u-ygz')[0];
    var qxgz = getElementsByClassName(head,"u-qxgz")[0];
    var fansNum = getElementsByClassName(head,'u-fansNum')[0];
    addEvent(qxgz,"click",function(event){
        removeCookie("loginSuc");
        removeCookie("followSuc");
      gz.style.display = 'block';
      ygz.style.display = 'none';
      var fansInner = Number(fansNum.innerText);
      fansNum.innerText = fansInner-1;      
    })
    }
    addLoadEvent(clearFollow);
/* form表单登录验证 */
  var form =document.forms.lgform;
/* 禁用提交按钮 */
  function disableSubmit(boolean){
    if(boolean==true){
      form.bt.style.display = 'none';
    }
    if(boolean==false){
      form.bt.style.display = 'block';
    }
  }    
/* 当输入时隐藏label的内容 */
  addEvent(form,'input',function(event){
    var target = event.target||event.srcElement;
    var targetParent = target.parentNode;
    var label = targetParent.getElementsByTagName('label');
    for(var i=0;i<label.length;i++){
      label[i].style.display = 'none';
    }
  })
/* 验证密码  固定用户帐号：studyOnline ;固定用户密码：study.163.com ; */
  form.onsubmit = function(event){
    disableSubmit(true);
    var account = form.account.value;
    var pasword = form.password.value;
    if(account == ""){
      alert("请输入用户名");
      disableSubmit(false);   
    }else if(account != "studyOnline"){
      alert("账号输入错误");
      disableSubmit(false);  
    }else if(pasword == ""){
      alert("请输入密码");
      disableSubmit(false);       
    }else if(pasword != "study.163.com"){
      alert("密码错误！")
      disableSubmit(false);  
    }else if(account == "studyOnline" && pasword == "study.163.com"){
      disableSubmit(true); 
    }  
  /* md5加密数据以get方式提交 */
    var url = 'http://study.163.com/webDev/login.htm';
    var userName = md5(account);
    var password = md5(pasword);
    var options = {userName:userName,password:password};
    get(url,options,function(response){     
      if(response == 1){
        g_login.style.display = 'none';
        setCookie('loginSuc',1,new Date(3333,3)); 
        alert('登录成功');
        form.reset();                 
        follow_AIP();
      }
      else if(response == 0){
        setCookie('loginSuc',0,new Date(3333,3));  
        disableSubmit(false);              
      }
    });    
    return false;
  }
/* 离开页面(刷新或者关闭浏览器)清空cookies 由于顶部通知栏关闭后刷新不显示，故而不清空 */
    window.onunload=function(){
       removeCookie("loginSuc");
       removeCookie("followSuc");    
    }

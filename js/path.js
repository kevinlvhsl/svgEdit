/**
 * Created by durui on 2015/6/29.
 */
//path运动框架


function Path(json){
    if(this.constructor==Window) return new Path(json)
    this.SVG_NS= 'http://www.w3.org/2000/svg'
    this.queue=[]

    this.init(json)
}
Path.prototype.init=function(json){
    if(json.constructor==Object){
        this.elements=document.createElementNS(this.SVG_NS,'path')
        this.attr(json)
    }
    else{
        this.elements=json
    }

}
Path.prototype.attr=function(json){
    if(json.constructor=='object'){
        for(var key in json){
            this.elements.setAttribute(key,json[key])
        }
    }else{
        return this.elements.getAttribute(key)
    }
}
Path.prototype.appendTo=function(par){
    par.appendChild(this.elements)
}

Path.prototype.d=function(text){
    this.d=text
}

Path.prototype.realPath=function(){
    var arr=this.d.split(" ")
    arr.forEach(function(name,id){
        if(window[name]){
            arr[id]=window[name]
        }
    })
    arr=arr.join(" ")
    this.elements.setAttribute("d",arr)
}
Path.prototype.animate=function(json,times,fx,func){
    var q=[json,times || 1000,fx || "linear" ,this.stack || this]
    func && q.push(func)
    var This=this
    if(!this.queue.length){
        setTimeout(function(){
            startMove(This.queue)
        },0)
    }
    this.queue.push(q)
    return this
}
Path.prototype.wait=function(time){
    var q=[0,time || 1000,'linear',this]
    this.queue.push(q)
    return this
}
Path.prototype.then=function(obj){
    if(typeof obj=="object"){
        this.stack=obj
    }
    if(typeof obj=='number'){
        this.wait(obj)
    }
    return this
}
function startMove(queue){
    var inform =queue.shift()
    var This=inform[3]
    var obj=This.elements,json=inform[0],times=inform[1],fx=inform[2],iCur={}

    //用if判断执行wait
    if(json){
        for(var key in json){
            iCur[key]=window[key]
        }
    }
    var startTime=now()
    clearInterval(obj.timer)
    obj.timer=setInterval(function(){
        var changeTime=now();
        var t=times-Math.max(0,startTime-changeTime+times);
        //用if判断执行wait
        if(json){
            for(var attr in json){
                window[attr]=[Tween[fx](t,iCur[attr][0],json[attr][0]-iCur[attr][0],times),Tween[fx](t,iCur[attr][1],parseInt(json[attr][1])-iCur[attr][1],times)]
            }
            This.realPath()
        }
        if(t==times){
            clearInterval(obj.timer)
            inform[4] && inform[4]()
            queue.length && startMove(queue)
        }
    },13)
}


function now(){
    return (new Date()).getTime();
}

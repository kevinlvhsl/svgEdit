/**
 * Created by durui on 2015/6/29.
 */
// ∏¡øº∆À„¿‡
function Vector(l1,l2){
    return new V(l1,l2)
}
function V(l1,l2){
    if(!l2){
        l2=l1
        l1=[0,0]
    }
    this.elements=[l2[0]-l1[0],l2[1]-l1[1]]
    return this
}

V.prototype.plus=function(v){
    var ele= v.elements
    var arr=[]
    this.elements.forEach(function(value,id){
        arr.push(value+ele[id])
    })

    return arr
}
V.prototype.minus=function(v){
    var ele= v.elements
    var arr=[]
    this.elements.forEach(function(value,id){
        arr.push(value-ele[id])
    })
    return arr
}
V.prototype.multiply=function(v){
    var res
    if(typeof v=="number"){
        var arr=[]
        this.elements.forEach(function(value,id){
            arr.push(value*v)
        })
        res=arr
    }
    if(typeof v=="object"){
        var num=0
        this.elements.forEach(function(value,id){
            num+=value* v.elements[id]
        })
        res=num
    }
    return res
}
V.prototype.long=function(){
    return Math.sqrt(this.elements[0]*this.elements[0]+this.elements[1]*this.elements[1])
}
V.prototype.phi=function(v) {
    var up = this.multiply(v)
    var down = this.long() * v.long()
    return Math.round(Math.acos(up / down) * 180 / Math.PI)
}
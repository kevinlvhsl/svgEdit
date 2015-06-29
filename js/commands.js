/**
 * Created by durui on 2015/6/29.
 */
function detect(arr){
    var handle=arr
    return {
        semi:function(){

            for(var i=0;i<handle.length;i++){
                if(handle[i].indexOf("semi")==0){



                    var ks=handle[i].match(/semi(\d{0,}) +/)
                    var k=ks[1]?ks[1]:1
                    var tails=handle[i].match(/\d+ ([a-zA-Z].{0,})$/)
                    tails=tails?tails[1]:""
                    handle[i]=handle[i].replace(/semi\d{0,} +/,"").replace(/\d+ ([a-zA-Z].{0,})$/,function($0){
                        return $0.match(/^\d+/)[0]
                    })

                    handle[i]=handle[i].replace(/semi\d{0,1} +/,""),
                        handle[i]=(function(pos,k){
                            var p=pos.split(" "),p0=p[0],p1=p[1]
                            var r1=p[0].split(","),r2=p[1].split(",")
                            var r=Math.sqrt((r1[0]-r2[0])*(r1[0]-r2[0])+(r1[1]-r2[1])*(r1[1]-r2[1]))/4
                            var phi=Math.atan((r1[1]-r2[1])/(r1[0]-r2[0]))*180/Math.PI
                            var str="M "+p[0]+" A "+r+" "+r*k+" "+phi+" 0 1 "+p1
                            return str
                        })(handle[i],k)
                }
            }
            return this
        },
        rect:function(){
            for(var i=0;i<handle.length;i++){
                if(handle[i].indexOf("rect")==0){

                    var tails=handle[i].match(/\d+ ([a-zA-Z].{0,})$/)
                    tails=tails?tails[1]:""
                    handle[i]=handle[i].replace(/rect\ +/,"").replace(/\d+ ([a-zA-Z].{0,})$/,function($0){
                        return $0.match(/^\d+/)[0]
                    })

                    console.log(handle[i])
                    handle[i]=(function(pos){
                        pos=pos.split(" ")
                        var p0=pos[0].split(","),p1=pos[1].split(","),p2=pos[2].split(",")
                        pos.push((p0[0]*1+p2[0]*1-p1[0]*1)+","+(p0[1]*1+p2[1]*1-p1[1]*1))
                        return pos
                    })(handle[i])
                    handle[i]="M "+handle[i].join(" L ")+" Z"+" "+tails
                }
            }
            return this
        },
        line:function(){
            for(var i=0;i<handle.length;i++){
                if(handle[i].indexOf("line")==0){
                    var tails=handle[i].match(/\d+ ([a-zA-Z].{0,})$/)
                    tails=tails?tails[1]:""
                    handle[i]=handle[i].replace(/line\ +/,"").replace(/\d+ ([a-zA-Z].{0,})$/,function($0){
                        return $0.match(/^\d+/)[0]
                    })
                    handle[i]="M "+handle[i].trim().split(" ").join(" L ")+tails
                }
            }
            return this
        },
        arc:function(){
            for(var i=0;i<handle.length;i++){
                if(handle[i].indexOf("arc")==0){
                    var k=handle[i].match(/arc(\d{0,}) +/)[1]
                    var tails=handle[i].match(/\d+ ([a-zA-Z].{0,})$/)
                    tails=tails?tails[1]:""
                    handle[i]=handle[i].replace(/arc\d{0,} +/,"").replace(/\d+ ([a-zA-Z].{0,})$/,function($0){
                        return $0.match(/^\d+/)[0]
                    })

                    handle[i]=(function(pos,k){
                        var p=pos.split(" "),p0=p[0],p1=p[1]
                        var r1=p[0].split(","),r2=p[1].split(",")
                        var len=Vector([r1[0]*1,r1[1]*1],[r2[0]*1,r2[1]*1]).long()/2
                        var r=Math.round(len/(Math.sin(k*Math.PI/360)))
                        var str="M "+p0+" A "+r+" "+r+" 0 0 1 "+p1+tails
                        return str
                    })(handle[i],k)
                }
            }
            return this
        },
        code:function(){
            return handle
        }
    }
}

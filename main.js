var data=[];
            var startX,startY,toLeft,toTop,isMove = false,nowMove;
            window.onload=function(){
                data=getData();
                for(let index in data){
                    appendTipById(data[index]);
                }
                document.getElementById("wholeMask").style.zIndex=-1;
            };

            function addOne(){
                let nowTitle=localStorage.getItem('nowTitle'),
                    nowText=localStorage.getItem('nowText');
                if(nowTitle != null){
                    document.getElementById("title").value = nowTitle;
                }
                if(nowText != null){
                    document.getElementById("text").value = nowText;
                }
                document.getElementById("additionPanel").style.zIndex = 1001;
            }

            function deleteAll(){
                for(let index in data){
                    document.getElementById(data[index]).remove();
                }
            }

            function doAdd(){
                data=data.sort();
                let newId=1;
                let newObj=new Object();
                if(data.length != 0){
                    for(let i = 0; i<data.length ;i++){
                        if(data[i] != i+1) break;
                        newId++;
                    }
                }
                let newx = parseInt(Math.random()*990+10).toString()+"px",
                    newy = parseInt(Math.random()*390+10).toString()+"px";
                newObj.title = document.getElementById("title").value;
                newObj.text = document.getElementById("text").value;
                newObj.x=newx;
                newObj.y=newy;
                localStorage.removeItem("title");
                localStorage.removeItem("text");
                document.getElementById("title").value = null;
                document.getElementById("text").value = null;
                data.push(newId);
                saveDataById(newId, newObj);
                appendTipById(newId, newx, newy);
                document.getElementById("additionPanel").style.zIndex = -2;
                saveData();
            }

            function doUndo(){
                localStorage.setItem("title", document.getElementById("title").value);
                localStorage.setItem("text", document.getElementById("text").value);
                document.getElementById("additionPanel").style.zIndex = -2;
            }

            function saveData(){
                localStorage.setItem("storedData", JSON.stringify(data));
            }

            function saveDataById(id,obj){
                localStorage.setItem(`storedData-${id}`, JSON.stringify(obj));
            }

            function getData(){
                let res = localStorage.getItem("storedData");
                if(res != null) return JSON.parse(res);
                else return [];
            }

            function getDataById(id){
                return JSON.parse(localStorage.getItem(`storedData-${id}`));
            }

            function deleteAllData(){
                for(let index in data){
                    localStorage.removeItem(`soredData-${index}`);
                }
                localStorage.removeItem("storedData");
            }

            function deleteDataById(id){
                let index=data.indeOf(id.parseInt());
                if(index!=-1) data.splice(index, 1);
                localStorage.removeItem(`soredData-${id}`);
            }
            function appendTipById(id, newx, newy){
                let thisData=getDataById(id);
                var newDiv=document.createElement("div");
                newDiv.id=id;
                newDiv.className="tip";
                newDiv.title=thisData.title;
                newDiv.text=thisData.text;
                newDiv.innerHTML=newDiv.title+"<br></br>"+newDiv.text;
                newDiv.style.zIndex = id;
                newDiv.style.top = thisData.y;
                newDiv.style.left = thisData.x;
                console.log(thisData.y);
                newDiv.onmousedown = function(e){
                    startX=e.clientX;
                    startY=e.clientY;
                    isMove=true;
                    nowMove=this.id;
                    startLeft=document.getElementById(nowMove).style.left.slice(0,document.getElementById(nowMove).style.left.length-2);
                    startTop=document.getElementById(nowMove).style.top.slice(0,document.getElementById(nowMove).style.top.length-2);
                }
                newDiv.onmouseup = function(){
                    isMove=false;
                    let newObj = {};
                    newObj.title = document.getElementById(this.id).title;
                    newObj.text = document.getElementById(this.id).text;
                    newObj.x=document.getElementById(this.id).style.left;
                    newObj.y=document.getElementById(this.id).style.top;
                    saveDataById(this.id, newObj);
                }
                document.getElementById("container").appendChild(newDiv);
            }
            window.onmousemove = function(e){
                if(isMove == false) {
                    return;
                }
                
                let nx=e.clientX,ny=e.clientY;
                let newLeft=nx-(startX-startLeft),newTop=ny-(startY-startTop);
                document.getElementById(nowMove).style.top=newTop+"px";
                document.getElementById(nowMove).style.left=newLeft+"px";
            }
            function removeTipById(id){
                document.getElementsById(id).remove();
                deleteDataById(id);
            }
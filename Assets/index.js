var cnt=0, next=false, turn="white", jumpFrom, wLost=0, bLost=0, wTime=0, bTime=0, finished=false, pCord=new Array(8), xX, yY,mov=1,op = 0.6,aiActiveCord=new Array(20),len=0 ,aa, bb,enemy,GoOn=1,GoOn2=1,Active,y=500, selected=false,selectedPiece=" ";
var possibleCord=new Array(10),posLen, checkmate=0,aiVal=new Array(),hostile=false,aiHost=new Array(),hostLen=0,aiLen=0,leng;
var aiCord=new Array();
document.write("<div id=sol><div class=heading>WHITE PLAYER <span style=color:#000000; font-weight:normal; id=wClock>00:00</span></div><table border=0 cellspacing=0 class=table2><tr>");
for (i=0;i<=15;i++)
{
document.write("<td class=eaten align=center><img src=images/empty.png id=eWhite"+i+"></td>");
if(i==7)
document.write("</tr><tr>");
}
document.write("</tr></table><br /><br /><br /><br /><br /><br />");
document.write("<div class=heading>BLACK PLAYER <span style=color:#000000; font-weight:normal; id=bClock>00:00</span></div><table border=0 cellspacing=0 class=table2><tr>");
for (i=0;i<=15;i++)
{
document.write("<td class=eaten align=center><img src=https://sketchon.ml/empty.png id=eBlack"+i+"></td>");
if(i==7)
document.write("</tr><tr>");
}
document.write("</tr></tr></table></div><br /><div id=sag><table border=0 cellpadding=0 cellspacing=0>");
for (k=0;k<8;k++)
{
document.write("<tr>");
pCord[k]=new Array();
for (i=0+k%2;i<8+k%2;i++)
{
cnt++;
document.write("<td class=kutu"+(i%2)+" id=box"+cnt+" align='center' onmouseout='off(this.id);' onmouseover='on(this.id);' ><img width='40' height='40' id=pic"+k+(i-k%2)+" onmouseover='if(selected==false){if(this.desc==\"white\" & checkmate==0 && turn==\"white\")aiCheckPosibility(this.id,true,\"black\");}' onmouseout='if(selected==false)cleaner();' onclick='if(!finished)moveTo(this.id);'></td>");
pCord[k][i-k%2]="pic"+k+(i-k%2);
}
document.write("</tr>");
}
document.write("<tr><td colspan=8 id=statu valign=middle align=center style='width:0%'>Your turn...</td></tr><tr><td colspan=8 align=center id=s></td></tr></table></div><div id='mov'><span class='head_move' onclick='Sliding()' >MOVEMENTS</span><textarea id='movement' cols='38' rows='28' style='text-align:left; cursor:default; height:460px' disabled></textarea><div id='print' style='display:none;margin: 0 0 0 50px;'><input type='button' value='Restart' onclick='location.reload()'></div></div>");

placer();
function run() { event1 = window.setInterval("fadeOut('start')",30); document.getElementById("interface").style.visibility="hidden"; window.setInterval("clock();updateClock();",1000); document.all.movement.value = " The Game Has Started ! "; }
function placer()
{
var wimg=new Array("images/wr.png","images/wn.png","images/wb.png","images/wq.png","images/wk.png","images/wb.png","images/wn.png","images/wr.png","images/wp.png");
var bimg=new Array("images/br.png","images/bn.png","images/bb.png","images/bq.png","images/bk.png","images/bb.png","images/bn.png","images/br.png","images/bp.png");
for(k=0;k<8;k++)
{
switch(k)
{
case 0:
case 7:
for(i=0;i<8;i++)
{
document.getElementById(pCord[0][i]).src=bimg[i];
document.getElementById(pCord[0][i]).desc="black";
document.getElementById(pCord[7][7-i]).src=wimg[7-i];
document.getElementById(pCord[7][7-i]).desc="white";
}break;
case 1:
case 6:
for(i=0;i<8;i++)
{
document.getElementById(pCord[1][i]).src=bimg[8];
document.getElementById(pCord[1][i]).desc="black";
document.getElementById(pCord[6][i]).src=wimg[8];
document.getElementById(pCord[6][i]).desc="white";
}break;
default:
for(i=0;i<8;i++)
{
document.getElementById(pCord[k][i]).src="images/empty.png";
document.getElementById(pCord[k][i]).desc="emp";
}
}
}

}
function statusControl()
{
if(checkmate==1)
{
if(turn=="black")
document.all.statu.innerHTML="AI wins!";
else
document.all.statu.innerHTML="You win!";
document.getElementById("print").style.display="block";
document.all.movement.value += "\nThe Game Has Finished !";
scroll();
}
else
return;
finished=true;
}

function aiCheck()
{
var obj;
leng=0;
var aiTo,aiFrom,bestVal=0,tempVal=0,kingCord,ob;
for(z=0;z<8;z++)
for(k=0;k<8;k++)
if(document.getElementById(pCord[z][k]).desc=="black")
{
ob=document.getElementById(pCord[z][k]);
aiCord[leng++]=pCord[z][k];
if(ob.src.indexOf("k.png")!=-1)
kingCord=pCord[z][k];
}
if(aiCheckKing(kingCord)==false)
{
for(z=0;z<leng;z++)
{
hostile=false;
hostLen=0;
aiCheckPosibility(aiCord[z],false,"white");
if(hostile==true)
{
for(g=0;g<hostLen;g++)
{
obj=document.getElementById(aiHost[g]);
if(obj.src.indexOf("p.png")!=-1)
tempVal=1;
else if(obj.src.indexOf("b.png")!=-1)
tempVal=2;
else if(obj.src.indexOf("r.png")!=-1)
tempVal=3;
else if(obj.src.indexOf("n.png")!=-1)
tempVal=4;
else if(obj.src.indexOf("q.png")!=-1)
tempVal=5;
else
tempVal=6;

if(tempVal>bestVal)
{
bestVal=tempVal;
aiTo=aiHost[g];
aiFrom=aiCord[z];
}
}
}
}
if(bestVal!=0)
{
moved(aiFrom, aiTo);
replace(aiTo,aiFrom);
aiPieceChoice(aiTo);
}
else
{
len=0;
while(len==0)
{
o=Math.floor(Math.random()*leng);
len=0;
aiCheckPosibility(aiCord[o],false,"white");
}
randomCor=Math.floor(Math.random()*len);
moved(aiCord[o], aiActiveCord[randomCor]);
replace(aiActiveCord[randomCor],aiCord[o]);
aiPieceChoice(aiActiveCord[randomCor]);
}
hostile=false;
}
if(finished!=true)
{
document.all.statu.innerHTML="Your turn...";
cleaner();
}

}
function aiCheckKing(kingCord)
{
var whiteThreat=new Array(),whiteLen=0;
var threatZone=new Array(),zoneLen=0,r=0;
var planB=false;
for(row=0;row<8;row++)
for(col=0;col<8;col++)
if(document.getElementById(pCord[row][col]).desc=="white")
whiteThreat[whiteLen++]=pCord[row][col];

for(r=0;r<whiteLen;r++)
{
len=0;
aiCheckPosibility(whiteThreat[r],false,"black");
for(z=0;z<len;z++)
{
threatZone[zoneLen++]=aiActiveCord[z];
if(threatZone[zoneLen-1]==kingCord)
planB=true;
}
}
if(planB==true)
{
len=0;
aiCheckPosibility(kingCord,false,"white");
if(len==0)
return false;
else
{
for(zon=0;zon<len;zon++)
{
for(r=0;r<zoneLen;r++)
if(threatZone[r]==aiActiveCord[zon])
break;
if(r==zoneLen)
{
replace(aiActiveCord[zon],kingCord);
return true;
}
}
return false;
}
}
else
return false;
}
function aiCheckPosibility(x,show,en)
{
enemy=en;
obj=document.getElementById(x);
var a;
hostile=false;
if(obj.desc!="emp")
{
for(k=0;k<8;k++)
for(i=0;i<8;i++)
if(pCord[k][i]==x){xx=k;yy=i;break;}
if(obj.src.indexOf('p.png')!=-1)
{
aiCheckP(show);
}
else if(obj.src.indexOf('r.png')!=-1)
aiCheckR(show);
else if(obj.src.indexOf('b.png')!=-1)
aiCheckB(show);
else if(obj.src.indexOf('n.png')!=-1)
aiCheckN(show);
else if(obj.src.indexOf('q.png')!=-1)
{
aiCheckB(show);
aiCheckR(show);
}
else if(obj.src.indexOf('k.png')!=-1)
aiCheckK(show);
}
}
function aiCheckCord(a,b,show)
{
if(xx+a<8 && xx+a>-1 && yy+b<8 && yy+b>-1)
if(document.getElementById(pCord[xx+a][yy+b]).desc==enemy)
{
hostile=true;
aiAddActiveCord(xx+a,yy+b,"enemy",show);
aiHost[hostLen++]=pCord[xx+a][yy+b];
return 1;
}
else if(document.getElementById(pCord[xx+a][yy+b]).desc=="emp")
aiAddActiveCord(xx+a,yy+b,"free",show);
else
return 1;
}
function aiCheckK(show)
{
aiCheckCord(-1,0,show);
aiCheckCord(-1,1,show);
aiCheckCord(-1,-1,show);
aiCheckCord(0,-1,show);
aiCheckCord(1,1,show);
aiCheckCord(1,0,show);
aiCheckCord(1,-1,show);
aiCheckCord(0,1,show);
}
function aiCheckN(show)
{
aiCheckCord(-2,-1,show);
aiCheckCord(-2,1,show);
aiCheckCord(2,1,show);
aiCheckCord(2,-1,show);
aiCheckCord(1,2,show);
aiCheckCord(-1,2,show);
aiCheckCord(1,-2,show);
aiCheckCord(1,2,show);
aiCheckCord(-1,-2,show);
}
function aiCheckR(show)
{
for(i=1;i<8;i++)
if(aiCheckCord(i,0,show)==1)
break;
for(i=-1;i>-8;i--)
if(aiCheckCord(i,0,show)==1)
break;
for(i=1;i<8;i++)
if(aiCheckCord(0,i,show)==1)
break;
for(i=-1;i>-8;i--)
if(aiCheckCord(0,i,show)==1)
break;
}
function aiCheckB(show)
{
k=-1;
i=1;
while(i<8 && k>-8)
if(aiCheckCord((i++),(k--),show)==1)
break;
k=-1;
i=-1;
while(i>-8 && k>-8)
if(aiCheckCord((i--),(k--),show)==1)
break;
k=1;
i=1;
while(i<8 && k<8)
if(aiCheckCord((i++),(k++),show)==1)
break;
k=1;
i=-1;
while(i>-8 && k<8)
if(aiCheckCord((i--),(k++),show)==1)
break;
}
function aiCheckP(show)
{
hostLen=0;
if(enemy=="white") i=1; else i=-1;
if(xx<7 && xx>0)
{
if(xx==6 && enemy=="black" && document.getElementById(pCord[5][yy]).desc=="emp")
{
if(document.getElementById(pCord[4][yy]).desc=="emp")
aiAddActiveCord(4,yy,"free",show);
}
else if(xx==1 && enemy=="white" && document.getElementById(pCord[2][yy]).desc=="emp")
{
if(document.getElementById(pCord[3][yy]).desc=="emp")
aiAddActiveCord(3,yy,"free",show);
}
if(document.getElementById(pCord[xx+i][yy]).desc=="emp")
aiAddActiveCord(xx+i,yy,"free",show);
if(yy!=0)
if(document.getElementById(pCord[xx+i][yy-1]).desc==enemy)
{
hostile=true;
aiAddActiveCord(xx+i,yy-1,"enemy",show);
aiHost[hostLen++]=pCord[xx+i][yy-1];
}
if(yy!=7)
if(document.getElementById(pCord[xx+i][yy+1]).desc==enemy)
{
hostile=true;
aiAddActiveCord(xx+i,yy+1,"enemy",show);
aiHost[hostLen++]=pCord[xx+i][yy+1];
}
}
}
function aiAddActiveCord(a,b,type,show)
{
if(show==true)
mark(pCord[a][b],type);
aiActiveCord[len++]=pCord[a][b];
}
function moveTo(x)
{
var validation=0;
if(next==true)
{
if(document.getElementById(x).desc==document.getElementById(jumpFrom).desc)
{
off(jumpFrom);
cleaner();
aiCheckPosibility(x,true,"black");
addPossible();
jumpFrom=x;
foc(x);
}
else
{
for(i=0;i<posLen;i++)
if(possibleCord[i]==x)
validation=1;
if(validation==1)
{
next=false;
moved(jumpFrom,x);
replace(x,jumpFrom);
cleaner();
selected=false;
off(jumpFrom);
if(finished!=true) document.all.statu.innerHTML=turn+" is playing now...";
if(turn=="black" && finished!=true)
{
document.all.statu.innerHTML="Thinking...";
window.setTimeout("aiCheck()",1000*(Math.random()*1+1));
}
}
else
{
off(jumpFrom);
cleaner();
next=false;
selected=false;
}
}
}
else
{
if(document.getElementById(x).desc=="emp");
else if(document.getElementById(x).desc!=turn)
window.alert("It's your turn!");
else
{
selectedPiece=x;
selected=true;
addPossible();
next=true;
document.all.statu.innerHTML="";
jumpFrom=x;
foc(x);
}
}
}
function addPossible()
{
for(i=0;i<len;i++)
possibleCord[i]=aiActiveCord[i];
posLen=len;
}
function replace(x, jumpFrom)
{
to=document.getElementById(x);
if(to.src.indexOf("k.png")!=-1)
{
checkmate=1;
window.alert("Checkmate!");
}
from=document.getElementById(jumpFrom);
if(to.desc!="emp")
{
if(to.desc=="black")
document.getElementById("eWhite"+(wLost++)).src=to.src;
else if(to.desc=="white")
document.getElementById("eBlack"+(bLost++)).src=to.src;
}
to.src=from.src;
to.desc=from.desc;
from.desc="emp";
from.src="images/empty.png";
statusControl();
if(turn=="white") turn="black"; else turn="white";
}
function moved(jumpFrom, target)
{
var name = new Array("Pawn","Rook","Knight","Bishop","Queen","King");
var character = new Array("A","B","C","D","E","F","G","H");
var number = new Array("8","7","6","5","4","3","2","1");
var piece=0;
for(k=0;k<8;k++)
for(i=0;i<8;i++)
if(pCord[k][i]==jumpFrom){xx=k;yy=i;break;}
document.all.movement.value += "\n("+updateClock()+")Mov#"+zero(mov++)+": "+character[yy]+number[xx]+"-->";
for(k=0;k<8;k++)
for(i=0;i<8;i++)
if(pCord[k][i]==target){xx=k;yy=i;break;}
source = document.getElementById(target);
if (source.desc != "emp")
{
if(source.src.indexOf('p.png')!=-1)
piece=0;
else if(source.src.indexOf('r.png')!=-1)
piece=1;
else if(source.src.indexOf('n.png')!=-1)
piece=2;
else if(source.src.indexOf('b.png')!=-1)
piece=3;
else if(source.src.indexOf('q.png')!=-1)
piece=4;
else if(source.src.indexOf('k.png')!=-1)
piece=5;
document.getElementById("movement").value +=character[yy]+number[xx]+"("+reverse(turn)+" "+name[piece]+")";
}
else
document.all.movement.value +=character[yy]+number[xx];
scroll();
}
function scroll()
{
textarea = document.getElementById("movement");
textarea.scrollTop = textarea.scrollHeight;
}
function reverse(trn)
{
if (trn == "white")
trn = "Black";
else
trn = "White";
return trn;
}
function toggle()
{
var obj = document.getElementById("movement");
if (obj.style.visibility == "visible")
obj.style.visibility = "hidden";
else
obj.style.visibility = "visible";
}
function fadeOut(id)
{
var obj = document.getElementById(id);
if (op>=0 && GoOn2)
{
op -= 0.1;
obj.style.opacity = op;
obj.filters.alpha.opacity=op*100;
}
else
{GoOn2= !GoOn2;
window.clearInterval(event1);
obj.style.display= "none";
}
}
function fadeIn(id)
{
var obj = document.getElementById(id);
if (op<=0.5 && !GoOn2)
{
op += 0.1;
obj.style.opacity = op;
obj.filters.alpha.opacity=op*100;
}
else
{GoOn2 = !GoOn2;
window.clearInterval(event2);
}
}
function SlideUp()
{
var obj = document.getElementById("movement");
GoOn=0;
y -=20;
obj.style.height = y+"px";
if (y>20)
obj.style.height = y;
else
window.clearInterval(event3);
if (y==20)
GoOn=1;
scroll();

}
function SlideDown()
{
var obj = document.getElementById("movement");
y +=20;
GoOn=0;
obj.style.height = y+"px";
if (y<460)
obj.style.height = y;
else
window.clearInterval(event4);
if (y==460)
GoOn=1;
}
function Sliding()
{
if(y>20 & GoOn)
event3 = window.setInterval("SlideUp()",20);
else if(y == 20 && GoOn)
event4 = window.setInterval("SlideDown()",20);


}
function showCredit()
{
document.getElementById("credits").style.display= "block";
document.getElementById("credits").style.opacity= 0;
document.getElementById("credit_writing").style.display= "block";
document.getElementById("credit_writing").style.opacity= 1;
event2 = window.setInterval("fadeIn('credits')",30);
document.getElementById("credits").filters.alpha.opacity=0;
document.getElementById("credit_writing").filters.alpha.opacity=100;
}
function closeCredit()
{
document.getElementById("credit_writing").style.display= "none";
event1 = window.setInterval("fadeOut('credits')",30);
}
function pieceChoice(Type)
{
target = document.getElementById(selectedPiece);
if (xx == 0 && target.desc == "white" && target.src.indexOf("p.png")!=-1)
target.src = "images/w"+Type+".png";
}
function aiPieceChoice(aiTarget)
{
target = document.getElementById(aiTarget);
if(xx==7 && target.desc == "black" && target.src.indexOf("p.png")!=-1)
target.src="images/bq.png";
}
function clock() {if (!finished){if (turn=="white") wTime++; else bTime++;} }
function zero(x){ if (x < 10) return "0"+x;else return x;}
function updateClock()
{
var time,min,sec;
if(turn=="white") rTime=wTime; else rTime=bTime;
min=parseInt(rTime / 60);
sec=parseInt(rTime % 60);
time = zero(min)+":"+zero(sec);
if(turn=="white")
document.all.wClock.innerHTML=time;
else
document.all.bClock.innerHTML=time;
return time;

}
function mark(id,unit)
{
if(unit=="enemy")
document.getElementById(id).style.border = "red 1px solid";
else if(unit=="free")
document.getElementById(id).style.border = "yellow 1px solid";
}
function cleaner()
{
for(i=0;i<len;i++)
document.getElementById(aiActiveCord[i]).style.border = "";
len=0;
}
function on(id) { document.getElementById(id).style.border = "#000 1px solid";document.getElementById(id).style.cursor = "default"; }
function off(id) {
if(id.indexOf("pic")==-1)
document.getElementById(id).style.border = "#FFF 1px solid";
else
document.getElementById(id).style.border = document.getElementById(id).style.background+" 1px none";
}
function foc(id) { document.getElementById(id).style.border = "#000 1px dashed";}

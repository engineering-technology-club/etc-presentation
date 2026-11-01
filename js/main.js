var S=[].slice.call(document.querySelectorAll('.s')),k=0,st=document.getElementById('stage'),D=document.getElementById('dots');
S.forEach(function(_,i){var d=document.createElement('i');d.onclick=function(){go(i)};D.appendChild(d)});
function go(i){k=Math.max(0,Math.min(S.length-1,i));S.forEach(function(s,j){s.classList.toggle('on',j==k)});
[].forEach.call(D.children,function(d,j){d.classList.toggle('on',j==k)});
document.getElementById('pb').style.width=((k+1)/S.length*100)+'%';document.getElementById('n').textContent=(k+1)+' / '+S.length;
document.getElementById('lg').style.opacity=k==0?0:1;try{history.replaceState(null,'','#s'+(k+1))}catch(e){}}
function fit(){var s=Math.min(innerWidth/1280,(innerHeight-56)/720);st.style.transform='translate(-50%,-50%) scale('+s+')';st.style.top='calc(50% - 22px)'}
addEventListener('resize',fit);fit();
document.getElementById('nx').onclick=function(){go(k+1)};document.getElementById('pv').onclick=function(){go(k-1)};
document.getElementById('fs').onclick=function(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()};
addEventListener('keydown',function(e){var c=e.key;if(c=='ArrowLeft'||c=='PageDown'||c==' '||c=='ArrowDown')go(k+1);else if(c=='ArrowRight'||c=='PageUp'||c=='ArrowUp')go(k-1);else if(c=='Home')go(0);else if(c=='End')go(S.length-1)});
var x0=null;addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(d<0?k+1:k-1);x0=null});
addEventListener('wheel',function(e){if(Math.abs(e.deltaY)>40&&!go.t){go(k+(e.deltaY>0?1:-1));go.t=setTimeout(function(){go.t=0},900)}},{passive:true});
var h=parseInt((location.hash||'').slice(2));go(h>0&&h<=S.length?h-1:0);
/* particles */
var cv=document.getElementById('cv'),cx=cv.getContext('2d'),P=[],W,H,m={x:-999,y:-999};
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
for(var i=0;i<70;i++)P.push({x:Math.random()*2000,y:Math.random()*1200,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3});
addEventListener('mousemove',function(e){m.x=e.clientX;m.y=e.clientY});
(function f(){cx.clearRect(0,0,W,H);P.forEach(function(p,i){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;cx.fillStyle='rgba(77,227,255,.7)';cx.fillRect(p.x,p.y,1.8,1.8);
for(var j=i+1;j<P.length;j++){var q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<110){cx.strokeStyle='rgba(77,227,255,'+(.18*(1-d/110))+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
var dm=Math.hypot(p.x-m.x,p.y-m.y);if(dm<140){cx.strokeStyle='rgba(255,255,255,'+(.3*(1-dm/140))+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke()}});requestAnimationFrame(f)})();

if('serviceWorker' in navigator&&location.protocol!=='file:'){addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})})}

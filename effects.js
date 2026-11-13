/* Японские эффекты: сакура на canvas, золотой след курсора, капли туши при клике, волна на кнопках, наклон плиток, параллакс солнца, заставка */
(()=>{
const cv=document.createElement('canvas');cv.id='fx';cv.setAttribute('aria-hidden','true');document.body.appendChild(cv);
const c=cv.getContext('2d'),D=Math.min(devicePixelRatio||1,2);let W,H;
const rs=()=>{W=innerWidth;H=innerHeight;cv.width=W*D;cv.height=H*D;c.setTransform(D,0,0,D,0,0)};rs();addEventListener('resize',rs);
const dark=()=>{const t=document.documentElement.dataset.theme;return t?t==='dark':matchMedia('(prefers-color-scheme:dark)').matches};
const COL={l:['#F4A9BA','#F9C9D4','#EE8FA6'],d:['#E8A0B0','#F2C6D0','#C98593']};
const P=[],T=[];let wind=0,mx=null;
const mk=top=>({x:Math.random()*W,y:top?-20:Math.random()*H,s:6+Math.random()*9,r:Math.random()*6.28,vr:(Math.random()-.5)*.04,vy:.5+Math.random()*.9,ph:Math.random()*6.28,sw:.4+Math.random()*.8,c:Math.random()*3|0});
for(let i=0;i<40;i++)P.push(mk(false));
const petal=(p,col)=>{c.save();c.translate(p.x,p.y);c.rotate(p.r);c.scale(1,.7+.3*Math.sin(p.ph*2));c.fillStyle=col;c.globalAlpha=.85;c.beginPath();c.moveTo(0,0);c.bezierCurveTo(p.s*.6,-p.s*.7,p.s*1.1,p.s*.2,0,p.s);c.bezierCurveTo(-p.s*1.1,p.s*.2,-p.s*.6,-p.s*.7,0,0);c.fill();c.restore()};
let last=0;
const tick=t=>{requestAnimationFrame(tick);if(document.hidden)return;c.clearRect(0,0,W,H);if(document.body.classList.contains('nosky'))return;
 const dt=Math.min(2,(t-last)/16.7||1);last=t;const C=COL[dark()?'d':'l'];wind*=.96;
 for(const p of P){p.ph+=.02*dt;p.x+=(Math.sin(p.ph)*p.sw+wind+.35)*dt;p.y+=p.vy*dt;p.r+=p.vr*dt;if(p.y>H+20||p.x>W+30||p.x<-40)Object.assign(p,mk(true));petal(p,C[p.c])}
 for(let i=T.length-1;i>=0;i--){const q=T[i];q.l-=.03*dt;q.x+=q.vx;q.y+=q.vy;if(q.l<=0){T.splice(i,1);continue}c.globalAlpha=q.l*.9;c.fillStyle=q.l>.5?'#E8C873':'#F4A9BA';c.beginPath();c.arc(q.x,q.y,q.s*q.l,0,6.28);c.fill()}};
requestAnimationFrame(tick);

let cur=null;const R=document.documentElement;
addEventListener('pointermove',e=>{
 if(mx!==null)wind=Math.max(-3,Math.min(3,(e.clientX-mx)*.12));mx=e.clientX;
 if(Math.random()<.6)T.push({x:e.clientX,y:e.clientY,l:1,vx:(Math.random()-.5)*.9,vy:Math.random()*.9,s:2+Math.random()*3});
 R.style.setProperty('--mx',(e.clientX/innerWidth-.5).toFixed(3));R.style.setProperty('--my',(e.clientY/innerHeight-.5).toFixed(3));
 const el=e.target.closest&&e.target.closest('.tile');
 if(cur&&cur!==el){cur.style.removeProperty('--rx');cur.style.removeProperty('--ry')}
 if(el){const r=el.getBoundingClientRect();el.style.setProperty('--rx',(-((e.clientY-r.top)/r.height-.5)*12).toFixed(1)+'deg');el.style.setProperty('--ry',(((e.clientX-r.left)/r.width-.5)*14).toFixed(1)+'deg')}
 cur=el});
addEventListener('pointerdown',e=>{
 const s=document.createElement('i');s.className='ink';s.style.left=e.clientX+'px';s.style.top=e.clientY+'px';document.body.appendChild(s);setTimeout(()=>s.remove(),900);
 for(let i=0;i<10;i++){const a=Math.random()*6.28,v=1+Math.random()*2.5;T.push({x:e.clientX,y:e.clientY,l:1,vx:Math.cos(a)*v,vy:Math.sin(a)*v,s:3+Math.random()*3})}
 const b=e.target.closest&&e.target.closest('.bt,.tabs button');
 if(b){const r=b.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,w=document.createElement('span');w.className='rp';w.style.cssText=`width:${d}px;height:${d}px;left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px`;b.appendChild(w);setTimeout(()=>w.remove(),700)}});

try{if(!sessionStorage.getItem('intro')){sessionStorage.setItem('intro','1');
 const o=document.createElement('div');o.className='intro';o.innerHTML='<b>食</b><span>食事日報チェック</span>';document.body.appendChild(o);
 setTimeout(()=>o.classList.add('go'),1500);setTimeout(()=>o.remove(),2400)}}catch(e){}
})();

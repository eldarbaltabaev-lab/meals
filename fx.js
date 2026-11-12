/* эффекты: спотлайт, наклон, рябь, сакура, прогресс. app.js не затронут */
(()=>{const d=document,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches,$=s=>d.querySelector(s);
const pg=$('#pg'),sp=()=>{const h=d.documentElement;pg.style.transform='scaleX('+h.scrollTop/((h.scrollHeight-h.clientHeight)||1)+')'};addEventListener('scroll',sp,{passive:true});sp();
const P=[],S='.tile,.dz,.card,.ck';let W,H,tp=0;
d.addEventListener('pointermove',e=>{const t=e.target.closest&&e.target.closest(S);
 if(t){const r=t.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;t.style.setProperty('--mx',x+'px');t.style.setProperty('--my',y+'px');
  if(t.classList.contains('tile')&&!rm){t.style.setProperty('--ry',(x/r.width-.5)*12+'deg');t.style.setProperty('--rx',(.5-y/r.height)*12+'deg')}}
 if(fine&&!rm&&e.timeStamp-tp>90&&e.pointerType==='mouse'){tp=e.timeStamp;mk(e.clientX,e.clientY,2)}});
d.addEventListener('pointerout',e=>{const t=e.target.closest&&e.target.closest('.tile');if(t){t.style.setProperty('--rx','0deg');t.style.setProperty('--ry','0deg')}});
d.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('.bt,.tabs button');
 if(b&&!rm){const r=b.getBoundingClientRect(),s=d.createElement('span');s.className='rp';s.style.left=e.clientX-r.left+'px';s.style.top=e.clientY-r.top+'px';b.appendChild(s);setTimeout(()=>s.remove(),700)}
 if(!rm)for(let i=0;i<14;i++)mk(e.clientX,e.clientY,1)});
/* счёт итогов */
const cu=()=>d.querySelectorAll('.sb b[data-n]').forEach(e=>{const v=+e.dataset.n;if(rm||!v||e.dataset.d)return;e.dataset.d=1;const t0=performance.now();(function s(t){const k=Math.min(1,(t-t0)/1100);e.textContent=Math.round(v*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(s)})(t0)});
new MutationObserver(cu).observe($('#res'),{childList:true});
if(rm)return;
const c=$('#sk'),g=c.getContext('2d'),rs=()=>{W=c.width=innerWidth;H=c.height=innerHeight};rs();addEventListener('resize',rs);
function mk(x,y,k){P.push({x,y,k,s:k?3+Math.random()*4:5+Math.random()*6,vx:k===1?(Math.random()-.5)*7:(Math.random()-.5)*1.5,vy:k===1?-Math.random()*5:k===2?-Math.random()*.6:.5+Math.random()*1,r:Math.random()*6.3,vr:(Math.random()-.5)*.08,ph:Math.random()*6.3,l:1,a:.55+Math.random()*.4,c:Math.random()>.5?'#F7A9BF':'#FFD0DC'})}
for(let i=0;i<30;i++){mk(Math.random()*innerWidth,Math.random()*innerHeight,0)}
function dr(p){g.save();g.translate(p.x,p.y);g.rotate(p.r);g.globalAlpha=p.a*(p.k?p.l:1);g.fillStyle=p.c;g.beginPath();g.moveTo(0,-p.s);g.quadraticCurveTo(p.s,-p.s*.3,.15*p.s,p.s);g.lineTo(0,p.s*.75);g.lineTo(-.15*p.s,p.s);g.quadraticCurveTo(-p.s,-p.s*.3,0,-p.s);g.fill();g.restore()}
let t=0;(function f(){requestAnimationFrame(f);if(d.hidden)return;t+=.016;g.clearRect(0,0,W,H);
 for(let i=P.length-1;i>=0;i--){const p=P[i];
  if(p.k){p.vy+=p.k===1?.14:.02;p.x+=p.vx;p.y+=p.vy;p.vx*=.985;p.l-=p.k===1?.022:.025;if(p.l<=0){P.splice(i,1);continue}}
  else{p.x+=Math.sin(t+p.ph)*.7+.4;p.y+=p.vy;if(p.y>H+20){p.y=-20;p.x=Math.random()*W}if(p.x>W+20)p.x=-20}
  p.r+=p.vr;dr(p)}})()})();

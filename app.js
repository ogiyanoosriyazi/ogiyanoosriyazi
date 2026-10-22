let D;
const $=s=>document.querySelector(s),fa=n=>Number(n).toLocaleString('fa-IR');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const en=s=>String(s||'').replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const fin=p=>Math.round(p.price*(1-(+p.discount||0)/100));
const SYM=['∑','π','√','∫','÷','%','Δ','∞'];
let owner=false,open=0,tab=0,dirty=0,delIdx=-1;
function mark(){const s=$('#st');if(s)s.textContent='⚠️ تغییرات ذخیره نشده؛ دکمه ذخیره را بزن'}
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue=''}});
function L(){const c=D.contact,w=en(c.whatsapp).replace(/\D/g,'').replace(/^0/,'98'),h=x=>String(x||'').trim().replace(/^@/,'').replace(/^https?:\/\/[^/]+\//,'');
return{tg:c.telegram?'https://t.me/'+h(c.telegram):'',ig:c.instagram?'https://instagram.com/'+h(c.instagram):'',wa:w?'https://wa.me/'+w:'',tel:c.phone?'tel:'+en(c.phone):''}}
function render(){const l=L(),c=D.contact;
const ch=[[l.tg,'✈️','تلگرام',c.telegram],[l.ig,'📷','اینستاگرام',c.instagram],[l.wa,'💬','واتساپ',c.whatsapp],[l.tel,'📞','تماس تلفنی',c.phone]].filter(x=>x[0]);
$('#app').innerHTML=`<div class="top">${esc(D.announce)}</div>
<header><div class="logo"><span>∑</span>${esc(D.name)}</div><nav><a href="#products">محصولات</a><a href="#how">نحوه سفارش</a><a href="#contact">تماس</a></nav><a class="btn sm" href="#contact">سفارش</a></header>
<section class="hero"><i class="blob b1"></i><i class="blob b2"></i>
<div class="rv"><span class="tag">🌿 ${esc(D.tag)}</span><h1>${esc(D.heroTitle)}</h1><p>${esc(D.heroSub)}</p>
<div class="cta"><a class="btn" href="#products">دیدن پی‌دی‌اف‌ها</a><a class="btn alt" href="#contact">ارتباط با ما</a></div>
<div class="stats"><div><b>${fa(D.products.length)}+</b><small>محصول آموزشی</small></div><div><b>۲۴ ساعته</b><small>تحویل سریع</small></div><div><b>تخفیف</b><small>روی بسته‌ها</small></div></div></div>
<div class="ph rv"><img src="${D.hero}" alt="معلم"><div class="chip c1">📘 آموزش اصولی</div><div class="chip c2">✨ آینده‌ی روشن</div></div></section>
<section class="s" id="products"><div class="hd rv"><h2>پی‌دی‌اف‌های درسی</h2><p>انتخاب کن، سفارش بده، همون لحظه تحویل بگیر</p></div>
<div class="grid">${D.products.map((p,i)=>`<div class="card rv"><div class="cv">${SYM[i%SYM.length]}<i>${esc(p.category)}</i>${+p.discount?`<span class="off">${fa(p.discount)}٪ تخفیف</span>`:''}</div>
<div class="cb"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p><div class="pr"><b>${fa(fin(p))} تومان</b>${+p.discount?`<s>${fa(p.price)}</s>`:''}</div><button class="btn" onclick="ord(${i})">سفارش</button></div></div>`).join('')||'<p style="text-align:center">به‌زودی…</p>'}</div></section>
<section class="s" id="how"><div class="hd rv"><h2>چطور سفارش بدم؟</h2></div><div class="steps">
<div class="st rv"><span>۱</span><h3>انتخاب</h3><p>پی‌دی‌اف مورد نظرت رو انتخاب کن</p></div>
<div class="st rv"><span>۲</span><h3>پیام بده</h3><p>از تلگرام، واتساپ، اینستاگرام یا تماس</p></div>
<div class="st rv"><span>۳</span><h3>پرداخت</h3><p>هماهنگی پرداخت و تایید سفارش</p></div>
<div class="st rv"><span>۴</span><h3>دریافت</h3><p>فایل رو سریع برات می‌فرستیم</p></div></div></section>
<section class="s" id="contact"><div class="hd rv"><h2>ارتباط با ما</h2><p>از هر راهی که راحتی پیام بده</p></div><div class="ct">
${ch.map(x=>`<a class="ch rv" href="${esc(x[0])}" target="_blank" rel="noopener"><div>${x[1]}</div><b>${x[2]}</b><small>${esc(x[3])}</small></a>`).join('')}</div></section>
<footer>© ${esc(D.name)} — ${esc(D.tag)}</footer>`;
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((e,i)=>{e.style.transitionDelay=(i%4)*80+'ms';io.observe(e)})}
function ord(i){const p=D.products[i],l=L(),t=encodeURIComponent('سلام، می‌خوام این پی‌دی‌اف رو سفارش بدم: '+p.title);
const b=[[l.tg,'✈️ تلگرام'],[l.wa&&l.wa+'?text='+t,'💬 واتساپ'],[l.ig,'📷 اینستاگرام'],[l.tel,'📞 تماس']].filter(x=>x[0]);
const o=document.createElement('div');o.className='ov';o.onclick=e=>{if(e.target==o)o.remove()};
o.innerHTML=`<div class="pn" style="padding:22px"><b>${esc(p.title)}</b><span style="color:var(--g3);font-weight:800">${fa(fin(p))} تومان</span><small style="color:var(--mu)">از کدوم راه سفارش می‌دی؟</small><div class="oc">${b.map(x=>`<a href="${esc(x[0])}" target="_blank" rel="noopener">${x[1]}</a>`).join('')}</div></div>`;document.body.appendChild(o)}
/* ---- admin ---- */
function O(v){open=v;adm()}function T(t){tab=t;adm()}
function P(i,k,v){D.products[i][k]=v;dirty=1;mark();render()}
function addP(){dirty=1;D.products.unshift({title:'پی‌دی‌اف جدید',desc:'توضیح کوتاه محصول',price:100000,discount:0,category:'ریاضی'});adm(true);render()}
function delP(i){if(delIdx!==i){delIdx=i;adm();return}delIdx=-1;dirty=1;D.products.splice(i,1);adm();render()}
function C(k,v){D.contact[k]=v;dirty=1;mark();render()}function X(k,v){D[k]=v;dirty=1;mark();render()}
function img(f){if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,900/im.width),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);dirty=1;D.hero=pendingHero=c.toDataURL('image/jpeg',.85);render()};im.src=r.result};r.readAsDataURL(f)}
const F=(l,v,h)=>`<label>${l}</label><input value="${esc(v)}" ${h}>`;
function adm(top){const a=$('#adm'),old=document.querySelector('.pb'),sc=old?old.scrollTop:0;
if(!open){a.innerHTML=owner?'<button class="gear" onclick="O(1)">⚙️ پنل مدیریت</button>':'';return}
const c=D.contact;let b='';
if(tab==0)b=D.products.map((p,i)=>`<div class="row">${F('نام محصول',p.title,`oninput="P(${i},'title',this.value)"`)}<label>توضیح</label><textarea rows="2" oninput="P(${i},'desc',this.value)">${esc(p.desc)}</textarea><div class="two"><div>${F('قیمت (تومان)',p.price,`type="number" oninput="P(${i},'price',+this.value)"`)}</div><div>${F('تخفیف (٪)',p.discount,`type="number" oninput="P(${i},'discount',+this.value)"`)}</div></div>${F('دسته (مثلاً پایه نهم)',p.category,`oninput="P(${i},'category',this.value)"`)}<button class="del" onclick="delP(${i})">${delIdx===i?'مطمئنی؟ دوباره بزن':'حذف'}</button></div>`).join('')+'<button class="btn" onclick="addP()">+ محصول جدید</button>';
if(tab==1)b=F('شماره تماس',c.phone,`oninput="C('phone',this.value)"`)+F('شماره واتساپ',c.whatsapp,`oninput="C('whatsapp',this.value)"`)+F('آیدی تلگرام (بدون @)',c.telegram,`oninput="C('telegram',this.value)"`)+F('آیدی اینستاگرام (بدون @)',c.instagram,`oninput="C('instagram',this.value)"`);
if(tab==2)b=F('نام سایت',D.name,`oninput="X('name',this.value)"`)+F('نوار بالای سایت',D.announce,`oninput="X('announce',this.value)"`)+F('شعار کوچک',D.tag,`oninput="X('tag',this.value)"`)+F('تیتر اصلی',D.heroTitle,`oninput="X('heroTitle',this.value)"`)+`<label>توضیح اصلی</label><textarea rows="3" oninput="X('heroSub',this.value)">${esc(D.heroSub)}</textarea><label>عکس اول صفحه</label><input type="file" accept="image/*" onchange="img(this.files[0])">`;
a.innerHTML=`<div class="ov"><div class="pn"><div class="pnh"><b>⚙️ پنل مدیریت</b><button onclick="O(0)">✕</button></div><div class="tabs">${['محصولات','تماس و شبکه‌ها','متن و عکس'].map((t,i)=>`<button class="${tab==i?'on':''}" onclick="T(${i})">${t}</button>`).join('')}</div><div class="pb">${b}</div><div class="pf"><button class="btn" onclick="save()">ذخیره و انتشار</button><span id="st" style="color:var(--mu);flex:1"></span><button class="del" style="margin:0" onclick="out()">خروج</button></div></div></div>`;const nb=document.querySelector('.pb');if(nb)nb.scrollTop=top?0:sc;if(dirty)mark()}
const GH=(()=>{const h=location.hostname,p=location.pathname.split('/').filter(Boolean)[0]||'',o=h.endsWith('.github.io')?h.split('.')[0]:'';return{o,r:p&&!p.includes('.')?p:o+'.github.io'}})();
let TK='',pendingHero=null;
const ghH=()=>({Authorization:'Bearer '+TK,Accept:'application/vnd.github+json'});
const API=p=>`https://api.github.com/repos/${GH.o}/${GH.r}/contents/${p}`;
const b64=s=>btoa(unescape(encodeURIComponent(s)));
async function ghGet(p){const r=await fetch(API(p)+'?t='+Date.now(),{headers:ghH()});if(!r.ok)throw{status:r.status};return r.json()}
async function ghPut(p,content,msg){let sha;try{sha=(await ghGet(p)).sha}catch(e){if(e.status!==404)throw e}
const r=await fetch(API(p),{method:'PUT',headers:{...ghH(),'Content-Type':'application/json'},body:JSON.stringify({message:msg,content,sha})});if(!r.ok)throw{status:r.status};return r.json()}
async function save(){const st=$('#st');st.textContent='در حال ذخیره…';try{
if(pendingHero){await ghPut('hero.jpg',pendingHero.split(',')[1],'update hero image');D.hero='hero.jpg?v='+Date.now();pendingHero=null}
await ghPut('data.json',b64(JSON.stringify(D,null,2)),'update site data');dirty=0;st.textContent='✓ ذخیره شد؛ تا ۱ یا ۲ دقیقه دیگر برای همه نمایش داده می‌شود'}
catch(e){const m={401:'توکن نامعتبر یا منقضی شده',403:'توکن اجازه‌ی نوشتن ندارد',404:'ریپازیتوری پیدا نشد',409:'تداخل؛ صفحه را رفرش کن و دوباره امتحان کن',422:'خطای فایل؛ دوباره امتحان کن'}[e&&e.status]||'ارتباط با GitHub برقرار نشد';st.textContent='❌ ذخیره نشد: '+m}}
async function key(pw,salt){const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:100000,hash:'SHA-256'},k,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
async function enc(tk,pw){const s=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12)),c=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},await key(pw,s),new TextEncoder().encode(tk)));return JSON.stringify([...s,...iv,...c])}
async function dec(blob,pw){const a=new Uint8Array(JSON.parse(blob));return new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:a.slice(16,28)},await key(pw,a.slice(0,16)),a.slice(28)))}
async function gate(){if(location.hash!=='#admin'){owner=false;open=0;adm();return}
const blob=localStorage.getItem('ghenc');let pw='';
if(blob){pw=prompt('رمز پنل مدیریت:');if(!pw)return;try{TK=await dec(blob,pw)}catch(e){alert('رمز اشتباه است');return}}
else{const t=prompt('فقط بار اول: توکن GitHub را وارد کن:');if(!t)return;pw=prompt('یک رمز ساده برای پنل انتخاب کن (مثلاً 1234):');if(!pw)return;TK=t.trim()}
try{const r=await fetch(`https://api.github.com/repos/${GH.o}/${GH.r}`,{headers:ghH()}),j=await r.json();if(!r.ok||!(j.permissions&&j.permissions.push))throw 0;
if(!blob)localStorage.setItem('ghenc',await enc(TK,pw));
try{const f=await fetch(API('data.json')+'?t='+Date.now(),{headers:{...ghH(),Accept:'application/vnd.github.raw+json'}});if(f.ok){D=await f.json();render()}}catch(e){}
owner=true;open=1;adm()}catch(e){alert('توکن اشتباه است یا به این ریپازیتوری دسترسی نوشتن ندارد')}}
function out(){localStorage.removeItem('ghenc');localStorage.removeItem('ghtk');location.hash='';location.reload()}
window.addEventListener('hashchange',gate);
fetch('data.json?t='+Date.now()).then(r=>r.json()).then(d=>{D=d;render();gate()}).catch(()=>{$('#app').innerHTML='<p style="padding:60px;text-align:center">data.json بارگذاری نشد. مطمئن شو کنار index.html آپلود شده است.</p>'});

import{o as Na,b as Ia,i as Ra,a as z,s as J,e as Ce}from"./lifecycle.CANp6WaI.js";import{af as Wa,av as qa,b0 as Oa,b1 as Ya,ad as $a,u as Ka,b2 as Ua,b3 as Ha,a5 as Be,b4 as pt,b5 as je,c as Xa,f as Le,a as Q,p as Ga,b as Va,s as n,aF as W,g as t,m as A,q as c,e as o,r as s,v as N,w as Ja,t as Tt,h,i as ot}from"./utils.Cc6r9Byo.js";import{a as Qa,s as $}from"./render.B4KLwBDe.js";import{i as K}from"./if.B9_bKjka.js";import{e as Za,i as ti}from"./each.Da59tfhG.js";import{b as Te}from"./this.DM6qdPUS.js";import{I as v}from"./Icon.B6QoWY8I.js";import{m as mt}from"./config.DNVBpfbW.js";import{I as ei}from"./zh_TW.vJiIj70a.js";import{i as ai}from"./translation.DYwzNCpJ.js";import"./props.DsAoeuqc.js";const ii=()=>performance.now(),U={tick:l=>requestAnimationFrame(l),now:()=>ii(),tasks:new Set};function De(){const l=U.now();U.tasks.forEach(i=>{i.c(l)||(U.tasks.delete(i),i.f())}),U.tasks.size!==0&&U.tick(De)}function ri(l){let i;return U.tasks.size===0&&U.tick(De),{promise:new Promise(g=>{U.tasks.add(i={c:l,f:g})}),abort(){U.tasks.delete(i)}}}function Mt(l,i){je(()=>{l.dispatchEvent(new CustomEvent(i))})}function ni(l){if(l==="float")return"cssFloat";if(l==="offset")return"cssOffset";if(l.startsWith("--"))return l;const i=l.split("-");return i.length===1?i[0]:i[0]+i.slice(1).map(g=>g[0].toUpperCase()+g.slice(1)).join("")}function Me(l){const i={},g=l.split(";");for(const k of g){const[L,_]=k.split(":");if(!L||_===void 0)break;const I=ni(L.trim());i[I]=_.trim()}return i}const si=l=>l;function oi(l,i,g,k){var L=(l&Ua)!==0,_="both",I,b=i.inert,y=i.style.overflow,d,x;function E(){return je(()=>I??=g()(i,k?.()??{},{direction:_}))}var F={is_global:L,in(){i.inert=b,d=Ht(i,E(),x,1,()=>{Mt(i,"introstart")},()=>{Mt(i,"introend"),d?.abort(),d=I=void 0,i.style.overflow=y})},out(j){i.inert=!0,x=Ht(i,E(),d,0,()=>{Mt(i,"outrostart")},()=>{Mt(i,"outroend"),j?.()})},stop:()=>{d?.abort(),x?.abort()}},p=Wa;if((p.nodes.t??=[]).push(F),Qa){var C=L;if(!C){for(var u=p.parent;u&&(u.f&qa)!==0;)for(;(u=u.parent)&&(u.f&Oa)===0;);C=!u||(u.f&Ya)!==0}C&&$a(()=>{Ka(()=>F.in())})}}function Ht(l,i,g,k,L,_){var I=k===1,b=!1;if(Ha(i)){var y;return Be(()=>{if(!b){var u=i({direction:I?"in":"out"});y=Ht(l,u,g,k,L,_)}}),{abort:()=>{b=!0,y?.abort()},deactivate:()=>y.deactivate(),reset:()=>y.reset(),t:()=>y.t()}}if(g?.deactivate(),!i?.duration&&!i?.delay)return L(),_(),{abort:pt,deactivate:pt,reset:pt,t:()=>k};const{delay:d=0,css:x,tick:E,easing:F=si}=i;var p,C=()=>1-k;return Be(()=>{if(!b){var u=[];if(I&&g===void 0&&(E&&E(0,1),x)){var j=Me(x(0,1));u.push(j,j)}p=l.animate(u,{duration:d,fill:"forwards"}),p.onfinish=()=>{p.cancel(),L();var m=g?.t()??1-k;g?.abort();var tt=k-m,O=i.duration*Math.abs(tt),M=[];if(O>0){var f=!1;if(x)for(var w=Math.ceil(O/16.666666666666668),a=0;a<=w;a+=1){var H=m+tt*F(a/w),X=Me(x(H,1-H));M.push(X),f||=X.overflow==="hidden"}f&&(l.style.overflow="hidden"),C=()=>{var et=p.currentTime;return m+tt*F(et/O)},E&&ri(()=>{if(p.playState!=="running")return!1;var et=C();return E(et,1-et),!0})}p=l.animate(M,{duration:O,fill:"forwards"}),p.onfinish=()=>{C=()=>k,E?.(k,1-k),_()}}}}),{abort:()=>{b=!0,p&&(p.cancel(),p.effect=null,p.onfinish=pt)},deactivate:()=>{_=pt},reset:()=>{k===0&&E?.(1,0)},t:()=>C()}}function Se(l){return function(...i){var g=i[0];return g.stopPropagation(),l?.apply(this,i)}}function li(l){const i=l-1;return i*i*i+1}function Z(l,i,g){return Number.isNaN(i)?"":`${l}: ${g*i}px;`}function ui(l,{delay:i=0,duration:g=400,easing:k=li,axis:L="y"}={}){const _=getComputedStyle(l),I=+_.opacity,b=L==="y"?"height":"width",y=parseFloat(_[b]),d=L==="y"?["top","bottom"]:["left","right"],x=d.map(m=>`${m[0].toUpperCase()}${m.slice(1)}`),E=parseFloat(_[`padding${x[0]}`]),F=parseFloat(_[`padding${x[1]}`]),p=parseFloat(_[`margin${x[0]}`]),C=parseFloat(_[`margin${x[1]}`]),u=parseFloat(_[`border${x[0]}Width`]),j=parseFloat(_[`border${x[1]}Width`]);return{delay:i,duration:g,easing:k,css:m=>`overflow: hidden;opacity: ${Math.min(m*20,1)*I};`+Z(b,y,m)+Z(`padding-${d[0]}`,E,m)+Z(`padding-${d[1]}`,F,m)+Z(`margin-${d[0]}`,p,m)+Z(`margin-${d[1]}`,C,m)+Z(`border-${d[0]}-width`,u,m)+Z(`border-${d[1]}-width`,j,m)+`min-${b}: 0`}}var ci=ot('<div class="fixed bottom-20 right-4 z-[60] max-w-sm"><div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up"><!> <span class="text-sm flex-1"> </span> <button class="text-white/80 hover:text-white transition-colors"><!></button></div></div>'),di=ot('<div class="flex space-x-0.5"><div class="w-0.5 h-3 bg-white rounded-full animate-pulse"></div> <div class="w-0.5 h-4 bg-white rounded-full animate-pulse" style="animation-delay: 150ms;"></div> <div class="w-0.5 h-2 bg-white rounded-full animate-pulse" style="animation-delay: 300ms;"></div></div>'),vi=ot('<span class="text-sm text-[var(--content-meta)]"></span>'),fi=ot('<div role="button" tabindex="0"><div class="w-6 h-6 flex items-center justify-center"><!></div> <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0"><img class="w-full h-full object-cover"/></div> <div class="flex-1 min-w-0"><div> </div> <div> </div></div></div>'),pi=ot('<div class="playlist-panel float-panel fixed bottom-20 right-4 w-80 max-h-96 overflow-hidden z-50"><div class="playlist-header flex items-center justify-between p-4 border-b border-[var(--line-divider)]"><h3 class="text-lg font-semibold text-90"> </h3> <button class="btn-plain w-8 h-8 rounded-lg"><!></button></div> <div class="playlist-content overflow-y-auto max-h-80"></div></div>'),mi=ot(`<!> <div><div role="button" tabindex="0" aria-label="显示音乐播放器"><!></div> <div role="button" tabindex="0" aria-label="展开音乐播放器"><div class="flex items-center gap-3 cursor-pointer"><div class="cover-container relative w-12 h-12 rounded-full overflow-hidden"><img alt="封面"/> <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"><!></div></div> <div class="flex-1 min-w-0"><div class="text-sm font-medium text-90 truncate"> </div> <div class="text-xs text-50 truncate"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="隐藏播放器"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div></div> <div><div class="flex items-center gap-4 mb-4"><div class="cover-container relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><img alt="封面"/></div> <div class="flex-1 min-w-0"><div class="song-title text-lg font-bold text-90 truncate mb-1"> </div> <div class="song-artist text-sm text-50 truncate"> </div> <div class="text-xs text-30 mt-1"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="隐藏播放器"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div> <div class="progress-section mb-4"><div class="progress-bar flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="播放进度" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div></div> <div class="controls flex items-center justify-center gap-2 mb-4"><button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button></div> <div class="bottom-controls flex items-center gap-2"><button class="btn-plain w-8 h-8 rounded-lg"><!></button> <div class="flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="音量控制" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div> <button><!></button></div></div> <!></div> <style>.orb-player {
	position: relative;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}
.orb-player::before {
	content: '';
	position: absolute;
	inset: -2px;
	background: linear-gradient(45deg, var(--primary), transparent, var(--primary));
	border-radius: 50%;
	z-index: -1;
	opacity: 0;
	transition: opacity 0.3s ease;
}
.orb-player:hover::before {
	opacity: 0.3;
	animation: rotate 2s linear infinite;
}
.orb-player .animate-pulse {
	animation: musicWave 1.5s ease-in-out infinite;
}
@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
@keyframes musicWave {
	0%, 100% { transform: scaleY(0.5); }
	50% { transform: scaleY(1); }
}
.music-player.hidden-mode {
	width: 48px;
	height: 48px;
}
.music-player {
    max-width: 320px;
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
}
.mini-player {
    width: 280px;
    position: absolute;
    bottom: 0;
    right: 0;
    /*left: 0;*/
}
.expanded-player {
    width: 320px;
    position: absolute;
    bottom: 0;
    right: 0;
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
.progress-section div:hover,
.bottom-controls > div:hover {
    transform: scaleY(1.2);
    transition: transform 0.2s ease;
}
@media (max-width: 768px) {
    .music-player {
        max-width: 280px;
        /*left: 8px !important;*/
        bottom: 8px !important;
        right: 8px !important;
    }
    .music-player.expanded {
        width: calc(100vw - 16px);
        max-width: none;
        /*left: 8px !important;*/
        right: 8px !important;
    }
    .playlist-panel {
        width: calc(100vw - 16px) !important;
        /*left: 8px !important;*/
        right: 8px !important;
        max-width: none;
    }
    .controls {
        gap: 8px;
    }
    .controls button {
        width: 36px;
        height: 36px;
    }
    .controls button:nth-child(3) {
        width: 44px;
        height: 44px;
    }
}
@media (max-width: 480px) {
    .music-player {
        max-width: 260px;
    }
    .song-title {
        font-size: 14px;
    }
    .song-artist {
        font-size: 12px;
    }
    .controls {
        gap: 6px;
        margin-bottom: 12px;
    }
    .controls button {
        width: 32px;
        height: 32px;
    }
    .controls button:nth-child(3) {
        width: 40px;
        height: 40px;
    }
    .playlist-item {
        padding: 8px 12px;
    }
    .playlist-item .w-10 {
        width: 32px;
        height: 32px;
    }
}
@keyframes slide-up {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
.animate-slide-up {
    animation: slide-up 0.3s ease-out;
}
@media (hover: none) and (pointer: coarse) {
    .music-player button,
    .playlist-item {
        min-height: 44px;
    }
    .progress-section > div,
    .bottom-controls > div:nth-child(2) {
        height: 12px;
    }
}
/* 自定义旋转动画，停止时保持当前位置 */
@keyframes spin-continuous {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.cover-container img {
    animation: spin-continuous 3s linear infinite;
    animation-play-state: paused;
}

.cover-container img.spinning {
    animation-play-state: running;
}

/* 让主题色按钮更有视觉反馈 */
button.bg-\\[var\\(--primary\\)\\] {
    box-shadow: 0 0 0 2px var(--primary);
    border: none;
}</style>`,1);function Ci(l,i){Va(i,!1);let g=mt.mode??"meting",k=mt.meting_api??"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",L=mt.id??"14164869977",_=mt.server??"netease",I=mt.type??"playlist",b=A(!1),y=A(!1),d=A(!1),x=A(!1),E=A(0),F=A(0),p=A(.7),C=A(!1),u=A(!1),j=A(!1),m=A(0),tt=A(""),O=A(!1),M=A({title:"示例歌曲",artist:"示例艺术家",cover:"/favicon/favicon-light-192.png",url:"",duration:0}),f=A([]),w=A(0),a=A(),H=A(),X=A();const et=[{id:1,title:"ひとり上手",artist:"Kaya",cover:"assets/music/cover/hitori.jpg",url:"assets/music/url/hitori.mp3",duration:240},{id:2,title:"眩耀夜行",artist:"スリーズブーケ",cover:"assets/music/cover/xryx.jpg",url:"assets/music/url/xryx.mp3",duration:180},{id:3,title:"春雷の頃",artist:"22/7",cover:"assets/music/cover/cl.jpg",url:"assets/music/url/cl.mp3",duration:200}];async function Pe(){if(!k||!L)return;n(u,!0);const r=k.replace(":server",_).replace(":type",I).replace(":id",L).replace(":auth","").replace(":r",Date.now().toString());try{const B=await fetch(r);if(!B.ok)throw new Error("meting api error");const Y=await B.json();n(f,Y.map(D=>{let lt=D.name??D.title??"未知歌曲",_t=D.artist??D.author??"未知艺术家",S=D.duration??0;return S>1e4&&(S=Math.floor(S/1e3)),(!Number.isFinite(S)||S<=0)&&(S=0),{id:D.id,title:lt,artist:_t,cover:D.pic??"",url:D.url??"",duration:S}})),t(f).length>0&&jt(t(f)[0]),n(u,!1)}catch{yt("Meting 歌单获取失败"),n(u,!1)}}function ze(){!t(a)||!t(M).url||(t(b)?t(a).pause():t(a).play())}function bt(){n(y,!t(y)),t(y)&&(n(x,!1),n(d,!1))}function ht(){n(d,!t(d)),t(d)&&(n(y,!1),n(x,!1))}function Xt(){n(x,!t(x))}function Ne(){n(j,!t(j))}function Ie(){n(m,(t(m)+1)%3)}function Re(){if(t(f).length<=1)return;const r=t(w)>0?t(w)-1:t(f).length-1;gt(r)}function St(){if(t(f).length<=1)return;let r;if(t(j))do r=Math.floor(Math.random()*t(f).length);while(r===t(w)&&t(f).length>1);else r=t(w)<t(f).length-1?t(w)+1:0;gt(r)}function gt(r){if(r<0||r>=t(f).length)return;const B=t(b);n(w,r),t(a)&&t(a).pause(),jt(t(f)[t(w)]),(B||!t(b))&&setTimeout(()=>{t(a)&&(t(a).readyState>=2?t(a).play().catch(()=>{}):t(a).addEventListener("canplay",()=>{t(a).play().catch(()=>{})},{once:!0}))},100)}function xt(r){return r.startsWith("http://")||r.startsWith("https://")||r.startsWith("/")?r:`/${r}`}function jt(r){!r||!t(a)||(n(M,{...r}),r.url?(n(u,!0),t(a).pause(),W(a,t(a).currentTime=0),n(E,0),n(F,r.duration??0),t(a).removeEventListener("loadeddata",Gt),t(a).removeEventListener("error",Vt),t(a).removeEventListener("loadstart",Jt),t(a).addEventListener("loadeddata",Gt,{once:!0}),t(a).addEventListener("error",Vt,{once:!0}),t(a).addEventListener("loadstart",Jt,{once:!0}),W(a,t(a).src=xt(r.url)),t(a).load()):n(u,!1))}function Gt(){n(u,!1),t(a)?.duration&&t(a).duration>1&&(n(F,Math.floor(t(a).duration)),t(f)[t(w)]&&W(f,t(f)[t(w)].duration=t(F)),W(M,t(M).duration=t(F)))}function Vt(r){n(u,!1),yt(`无法播放 "${t(M).title}"，正在尝试下一首...`),t(f).length>1?setTimeout(()=>St(),1e3):yt("播放列表中没有可用的歌曲")}function Jt(){}function yt(r){n(tt,r),n(O,!0),setTimeout(()=>{n(O,!1)},3e3)}function We(){n(O,!1)}function qe(r){if(!t(a)||!t(H))return;const B=t(H).getBoundingClientRect(),D=(r.clientX-B.left)/B.width*t(F);W(a,t(a).currentTime=D),n(E,D)}function Oe(r){if(!t(a)||!t(X))return;const B=t(X).getBoundingClientRect(),Y=Math.max(0,Math.min(1,(r.clientX-B.left)/B.width));n(p,Y),W(a,t(a).volume=t(p)),n(C,t(p)===0)}function Qt(){t(a)&&(n(C,!t(C)),W(a,t(a).muted=t(C)))}function Zt(r){if(!Number.isFinite(r)||r<0)return"0:00";const B=Math.floor(r/60),Y=Math.floor(r%60);return`${B}:${Y.toString().padStart(2,"0")}`}function Ye(){t(a)&&(t(a).addEventListener("play",()=>{n(b,!0)}),t(a).addEventListener("pause",()=>{n(b,!1)}),t(a).addEventListener("timeupdate",()=>{n(E,t(a).currentTime)}),t(a).addEventListener("ended",()=>{t(m)===1?(W(a,t(a).currentTime=0),t(a).play().catch(()=>{})):t(m)===2||t(w)<t(f).length-1||t(j)?St():n(b,!1)}),t(a).addEventListener("error",r=>{n(u,!1)}),t(a).addEventListener("stalled",()=>{}),t(a).addEventListener("waiting",()=>{}))}Na(()=>{n(a,new Audio),W(a,t(a).volume=t(p)),Ye(),g==="meting"?Pe():(n(f,[...et]),t(f).length>0?jt(t(f)[0]):yt("本地播放列表为空"))}),Ia(()=>{t(a)&&(t(a).pause(),W(a,t(a).src=""))}),Ra();var te=Xa(),$e=Le(te);{var Ke=r=>{var B=mi(),Y=Le(B);{var D=e=>{var P=ci(),R=o(P),G=o(R);v(G,{icon:"material-symbols:error",class:"text-xl flex-shrink-0"});var Bt=c(G,2),vt=N(Bt,!0),ft=c(Bt,2),Lt=o(ft);v(Lt,{icon:"material-symbols:close",class:"text-lg"}),s(ft),s(R),s(P),Tt(()=>$(vt,t(tt))),h("click",ft,We),Q(e,P)};K(Y,e=>{t(O)&&e(D)})}var lt=c(Y,2);let _t;var S=o(lt);let ee;var Ue=o(S);{var He=e=>{v(e,{icon:"eos-icons:loading",class:"text-white text-lg"})},Xe=e=>{var P=di();Q(e,P)},Ge=e=>{v(e,{icon:"material-symbols:music-note",class:"text-white text-lg"})};K(Ue,e=>{t(u)?e(He):t(b)?e(Xe,1):e(Ge,-1)})}s(S);var at=c(S,2);let ae;var ie=o(at),Dt=o(ie),Pt=o(Dt);let re;var ne=c(Pt,2),Ve=o(ne);{var Je=e=>{v(e,{icon:"eos-icons:loading",class:"text-white text-xl"})},Qe=e=>{v(e,{icon:"material-symbols:pause",class:"text-white text-xl"})},Ze=e=>{v(e,{icon:"material-symbols:play-arrow",class:"text-white text-xl"})};K(Ve,e=>{t(u)?e(Je):t(b)?e(Qe,1):e(Ze,-1)})}s(ne),s(Dt);var zt=c(Dt,2),se=o(zt),ta=N(se,!0),ea=c(se,2),aa=N(ea,!0);s(zt);var oe=c(zt,2),wt=o(oe),ia=o(wt);v(ia,{icon:"material-symbols:visibility-off",class:"text-lg"}),s(wt);var Nt=c(wt,2),ra=o(Nt);v(ra,{icon:"material-symbols:expand-less",class:"text-lg"}),s(Nt),s(oe),s(ie),s(at);var kt=c(at,2);let le;var It=o(kt),Rt=o(It),ue=o(Rt);let ce;s(Rt);var Wt=c(Rt,2),de=o(Wt),na=N(de,!0),ve=c(de,2),sa=N(ve,!0),oa=c(ve,2),la=N(oa);s(Wt);var fe=c(Wt,2),Et=o(fe),ua=o(Et);v(ua,{icon:"material-symbols:visibility-off",class:"text-lg"}),s(Et);var qt=c(Et,2),ca=o(qt);v(ca,{icon:"material-symbols:expand-more",class:"text-lg"}),s(qt),s(fe),s(It);var Ot=c(It,2),ut=o(Ot),da=N(ut);Te(ut,e=>n(H,e),()=>t(H)),s(Ot);var Yt=c(Ot,2),it=o(Yt);let pe;var va=o(it);v(va,{icon:"material-symbols:shuffle",class:"text-lg"}),s(it);var ct=c(it,2),fa=o(ct);v(fa,{icon:"material-symbols:skip-previous",class:"text-xl"}),s(ct);var rt=c(ct,2);let me;var pa=o(rt);{var ma=e=>{v(e,{icon:"eos-icons:loading",class:"text-xl"})},ba=e=>{v(e,{icon:"material-symbols:pause",class:"text-xl"})},ha=e=>{v(e,{icon:"material-symbols:play-arrow",class:"text-xl"})};K(pa,e=>{t(u)?e(ma):t(b)?e(ba,1):e(ha,-1)})}s(rt);var dt=c(rt,2),ga=o(dt);v(ga,{icon:"material-symbols:skip-next",class:"text-xl"}),s(dt);var Ft=c(dt,2);let be;var xa=o(Ft);{var ya=e=>{v(e,{icon:"material-symbols:repeat-one",class:"text-lg"})},_a=e=>{v(e,{icon:"material-symbols:repeat",class:"text-lg"})},wa=e=>{v(e,{icon:"material-symbols:repeat",class:"text-lg opacity-50"})};K(xa,e=>{t(m)===1?e(ya):t(m)===2?e(_a,1):e(wa,-1)})}s(Ft),s(Yt);var he=c(Yt,2),At=o(he),ka=o(At);{var Ea=e=>{v(e,{icon:"material-symbols:volume-off",class:"text-lg"})},Fa=e=>{v(e,{icon:"material-symbols:volume-down",class:"text-lg"})},Aa=e=>{v(e,{icon:"material-symbols:volume-up",class:"text-lg"})};K(ka,e=>{t(C)||t(p)===0?e(Ea):t(p)<.5?e(Fa,1):e(Aa,-1)})}s(At);var nt=c(At,2),Ca=N(nt);Te(nt,e=>n(X,e),()=>t(X));var Ct=c(nt,2);let ge;var Ba=o(Ct);v(Ba,{icon:"material-symbols:queue-music",class:"text-lg"}),s(Ct),s(he),s(kt);var La=c(kt,2);{var Ta=e=>{var P=pi(),R=o(P),G=o(R),Bt=N(G,!0),vt=c(G,2),ft=o(vt);v(ft,{icon:"material-symbols:close",class:"text-lg"}),s(vt),s(R);var Lt=c(R,2);Za(Lt,5,()=>t(f),ti,($t,st,q)=>{var V=fi();let xe;var Kt=o(V),Ma=o(Kt);{var Sa=T=>{v(T,{icon:"material-symbols:graphic-eq",class:"text-[var(--primary)] animate-pulse"})},ja=T=>{v(T,{icon:"material-symbols:pause",class:"text-[var(--primary)]"})},Da=T=>{var Ae=vi();Ae.textContent=q+1,Q(T,Ae)};K(Ma,T=>{q===t(w)&&t(b)?T(Sa):q===t(w)?T(ja,1):T(Da,-1)})}s(Kt);var ye=c(Kt,2),_e=N(ye),we=c(ye,2),Ut=o(we);let ke;var Pa=N(Ut,!0),Ee=c(Ut,2);let Fe;var za=N(Ee,!0);s(we),s(V),Tt(T=>{xe=z(V,1,"playlist-item flex items-center gap-3 p-3 hover:bg-[var(--btn-plain-bg-hover)] cursor-pointer transition-colors",null,xe,{"bg-[var(--btn-plain-bg)]":q===t(w),"text-[var(--primary)]":q===t(w)}),J(V,"aria-label",`播放 ${t(st).title??""} - ${t(st).artist??""}`),J(_e,"src",T),J(_e,"alt",t(st).title),ke=z(Ut,1,"font-medium truncate",null,ke,{"text-[var(--primary)]":q===t(w),"text-90":q!==t(w)}),$(Pa,t(st).title),Fe=z(Ee,1,"text-sm text-[var(--content-meta)] truncate",null,Fe,{"text-[var(--primary)]":q===t(w)}),$(za,t(st).artist)},[()=>xt(t(st).cover)]),h("click",V,()=>gt(q)),h("keydown",V,T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),gt(q))}),Q($t,V)}),s(Lt),s(P),Tt($t=>$(Bt,$t),[()=>ai(ei.playlist)]),h("click",vt,Xt),oi(3,P,()=>ui,()=>({duration:300,axis:"y"})),Q(e,P)};K(La,e=>{t(x)&&e(Ta)})}s(lt),Ja(2),Tt((e,P,R,G)=>{_t=z(lt,1,"music-player fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out",null,_t,{expanded:t(y),"hidden-mode":t(d)}),ee=z(S,1,"orb-player w-12 h-12 bg-[var(--primary)] rounded-full shadow-lg cursor-pointer transition-all duration-500 ease-in-out flex items-center justify-center hover:scale-110 active:scale-95",null,ee,{"opacity-0":!t(d),"scale-0":!t(d),"pointer-events-none":!t(d)}),ae=z(at,1,"mini-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-3 transition-all duration-500 ease-in-out",null,ae,{"opacity-0":t(y)||t(d),"scale-95":t(y)||t(d),"pointer-events-none":t(y)||t(d)}),J(Pt,"src",e),re=z(Pt,1,"w-full h-full object-cover transition-transform duration-300",null,re,{spinning:t(b)&&!t(u),"animate-pulse":t(u)}),$(ta,t(M).title),$(aa,t(M).artist),le=z(kt,1,"expanded-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-4 transition-all duration-500 ease-in-out",null,le,{"opacity-0":!t(y),"scale-95":!t(y),"pointer-events-none":!t(y)}),J(ue,"src",P),ce=z(ue,1,"w-full h-full object-cover transition-transform duration-300",null,ce,{spinning:t(b)&&!t(u),"animate-pulse":t(u)}),$(na,t(M).title),$(sa,t(M).artist),$(la,`${R??""} / ${G??""}`),J(ut,"aria-valuenow",t(F)>0?t(E)/t(F)*100:0),Ce(da,`width: ${t(F)>0?t(E)/t(F)*100:0}%`),pe=z(it,1,"w-10 h-10 rounded-lg",null,pe,{"btn-regular":t(j),"btn-plain":!t(j)}),it.disabled=t(f).length<=1,ct.disabled=t(f).length<=1,me=z(rt,1,"btn-regular w-12 h-12 rounded-full",null,me,{"opacity-50":t(u)}),rt.disabled=t(u),dt.disabled=t(f).length<=1,be=z(Ft,1,"w-10 h-10 rounded-lg",null,be,{"btn-regular":t(m)>0,"btn-plain":t(m)===0}),J(nt,"aria-valuenow",t(p)*100),Ce(Ca,`width: ${t(p)*100}%`),ge=z(Ct,1,"btn-plain w-8 h-8 rounded-lg",null,ge,{"text-[var(--primary)]":t(x)})},[()=>xt(t(M).cover),()=>xt(t(M).cover),()=>Zt(t(E)),()=>Zt(t(F))]),h("click",S,ht),h("keydown",S,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ht())}),h("click",wt,Se(ht)),h("click",Nt,Se(bt)),h("click",at,bt),h("keydown",at,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),bt())}),h("click",Et,ht),h("click",qt,bt),h("click",ut,qe),h("keydown",ut,e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault(),t(H).getBoundingClientRect();const R=.5*t(F);t(a)&&(W(a,t(a).currentTime=R),n(E,R))}}),h("click",it,Ne),h("click",ct,Re),h("click",rt,ze),h("click",dt,St),h("click",Ft,Ie),h("click",At,Qt),h("click",nt,Oe),h("keydown",nt,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.key==="Enter"&&Qt())}),h("click",Ct,Xt),Q(r,B)};K($e,r=>{r(Ke)})}Q(l,te),Ga()}export{Ci as default};

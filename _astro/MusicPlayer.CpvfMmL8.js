import{o as Da,a as Pa,i as za,s as N,b as rt,e as Se}from"./lifecycle.DVXYv02V.js";import{a3 as $a,ab as Ia,aU as Ra,aV as Wa,i as Na,u as Ya,aW as qa,aX as ze,aY as Oa,q as Ua,aZ as ht,c as nt,f as tt,a as Y,p as Ka,b as Xa,h as l,m as F,ax as U,g as t,d as vt,s as v,e as r,r as i,v as Ha,t as Pt,o as h}from"./utils.I031fIKC.js";import{a as Va,s as G}from"./render.CXZIErzm.js";import{i as z}from"./if.UhLp8uqm.js";import{e as Ga,i as Za}from"./each.BWRjh538.js";import{b as je}from"./this.DSTH8Ssi.js";import{I as f}from"./Icon.D7jBQwJc.js";import{m as xt}from"./config.DNVBpfbW.js";import{I as Ja}from"./zh_TW.vJiIj70a.js";import{i as Qa}from"./translation.DYwzNCpJ.js";import"./props.Hvxcl91v.js";const ti=()=>performance.now(),Z={tick:c=>requestAnimationFrame(c),now:()=>ti(),tasks:new Set};function $e(){const c=Z.now();Z.tasks.forEach(n=>{n.c(c)||(Z.tasks.delete(n),n.f())}),Z.tasks.size!==0&&Z.tick($e)}function ei(c){let n;return Z.tasks.size===0&&Z.tick($e),{promise:new Promise(w=>{Z.tasks.add(n={c,f:w})}),abort(){Z.tasks.delete(n)}}}function zt(c,n){ze(()=>{c.dispatchEvent(new CustomEvent(n))})}function ai(c){if(c==="float")return"cssFloat";if(c==="offset")return"cssOffset";if(c.startsWith("--"))return c;const n=c.split("-");return n.length===1?n[0]:n[0]+n.slice(1).map(w=>w[0].toUpperCase()+w.slice(1)).join("")}function De(c){const n={},w=c.split(";");for(const k of w){const[T,A]=k.split(":");if(!T||A===void 0)break;const $=ai(T.trim());n[$]=A.trim()}return n}const ii=c=>c;function ri(c,n,w,k){var T=(c&qa)!==0,A="both",$,x=n.inert,B=n.style.overflow,d,b;function P(){return ze(()=>$??=w()(n,k?.()??{},{direction:A}))}var E={is_global:T,in(){n.inert=x,zt(n,"introstart"),d=ae(n,P(),b,1,()=>{zt(n,"introend"),d?.abort(),d=$=void 0,n.style.overflow=B})},out(j){n.inert=!0,zt(n,"outrostart"),b=ae(n,P(),d,0,()=>{zt(n,"outroend"),j?.()})},stop:()=>{d?.abort(),b?.abort()}},M=$a;if((M.transitions??=[]).push(E),Va){var S=T;if(!S){for(var u=M.parent;u&&(u.f&Ia)!==0;)for(;(u=u.parent)&&(u.f&Ra)===0;);S=!u||(u.f&Wa)!==0}S&&Na(()=>{Ya(()=>E.in())})}}function ae(c,n,w,k,T){var A=k===1;if(Oa(n)){var $,x=!1;return Ua(()=>{if(!x){var j=n({direction:A?"in":"out"});$=ae(c,j,w,k,T)}}),{abort:()=>{x=!0,$?.abort()},deactivate:()=>$.deactivate(),reset:()=>$.reset(),t:()=>$.t()}}if(w?.deactivate(),!n?.duration)return T(),{abort:ht,deactivate:ht,reset:ht,t:()=>k};const{delay:B=0,css:d,tick:b,easing:P=ii}=n;var E=[];if(A&&w===void 0&&(b&&b(0,1),d)){var M=De(d(0,1));E.push(M,M)}var S=()=>1-k,u=c.animate(E,{duration:B,fill:"forwards"});return u.onfinish=()=>{u.cancel();var j=w?.t()??1-k;w?.abort();var g=k-j,et=n.duration*Math.abs(g),at=[];if(et>0){var I=!1;if(d)for(var p=Math.ceil(et/16.666666666666668),y=0;y<=p;y+=1){var a=j+g*P(y/p),J=De(d(a,1-a));at.push(J),I||=J.overflow==="hidden"}I&&(c.style.overflow="hidden"),S=()=>{var K=u.currentTime;return j+g*P(K/et)},b&&ei(()=>{if(u.playState!=="running")return!1;var K=S();return b(K,1-K),!0})}u=c.animate(at,{duration:et,fill:"forwards"}),u.onfinish=()=>{S=()=>k,b?.(k,1-k),T()}},{abort:()=>{u&&(u.cancel(),u.effect=null,u.onfinish=ht)},deactivate:()=>{T=ht},reset:()=>{k===0&&b?.(1,0)},t:()=>S()}}function Pe(c){return function(...n){var w=n[0];return w.stopPropagation(),c?.apply(this,n)}}function ni(c){const n=c-1;return n*n*n+1}function si(c,{delay:n=0,duration:w=400,easing:k=ni,axis:T="y"}={}){const A=getComputedStyle(c),$=+A.opacity,x=T==="y"?"height":"width",B=parseFloat(A[x]),d=T==="y"?["top","bottom"]:["left","right"],b=d.map(g=>`${g[0].toUpperCase()}${g.slice(1)}`),P=parseFloat(A[`padding${b[0]}`]),E=parseFloat(A[`padding${b[1]}`]),M=parseFloat(A[`margin${b[0]}`]),S=parseFloat(A[`margin${b[1]}`]),u=parseFloat(A[`border${b[0]}Width`]),j=parseFloat(A[`border${b[1]}Width`]);return{delay:n,duration:w,easing:k,css:g=>`overflow: hidden;opacity: ${Math.min(g*20,1)*$};${x}: ${g*B}px;padding-${d[0]}: ${g*P}px;padding-${d[1]}: ${g*E}px;margin-${d[0]}: ${g*M}px;margin-${d[1]}: ${g*S}px;border-${d[0]}-width: ${g*u}px;border-${d[1]}-width: ${g*j}px;min-${x}: 0`}}var oi=vt('<div class="fixed bottom-20 right-4 z-[60] max-w-sm"><div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up"><!> <span class="text-sm flex-1"> </span> <button class="text-white/80 hover:text-white transition-colors"><!></button></div></div>'),li=vt('<div class="flex space-x-0.5"><div class="w-0.5 h-3 bg-white rounded-full animate-pulse"></div> <div class="w-0.5 h-4 bg-white rounded-full animate-pulse" style="animation-delay: 150ms;"></div> <div class="w-0.5 h-2 bg-white rounded-full animate-pulse" style="animation-delay: 300ms;"></div></div>'),ui=vt('<span class="text-sm text-[var(--content-meta)]"></span>'),ci=vt('<div role="button" tabindex="0"><div class="w-6 h-6 flex items-center justify-center"><!></div> <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0"><img class="w-full h-full object-cover"/></div> <div class="flex-1 min-w-0"><div> </div> <div> </div></div></div>'),di=vt('<div class="playlist-panel float-panel fixed bottom-20 right-4 w-80 max-h-96 overflow-hidden z-50"><div class="playlist-header flex items-center justify-between p-4 border-b border-[var(--line-divider)]"><h3 class="text-lg font-semibold text-90"> </h3> <button class="btn-plain w-8 h-8 rounded-lg"><!></button></div> <div class="playlist-content overflow-y-auto max-h-80"></div></div>'),vi=vt(`<!> <div><div role="button" tabindex="0" aria-label="显示音乐播放器"><!></div> <div role="button" tabindex="0" aria-label="展开音乐播放器"><div class="flex items-center gap-3 cursor-pointer"><div class="cover-container relative w-12 h-12 rounded-full overflow-hidden"><img alt="封面"/> <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"><!></div></div> <div class="flex-1 min-w-0"><div class="text-sm font-medium text-90 truncate"> </div> <div class="text-xs text-50 truncate"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="隐藏播放器"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div></div> <div><div class="flex items-center gap-4 mb-4"><div class="cover-container relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><img alt="封面"/></div> <div class="flex-1 min-w-0"><div class="song-title text-lg font-bold text-90 truncate mb-1"> </div> <div class="song-artist text-sm text-50 truncate"> </div> <div class="text-xs text-30 mt-1"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="隐藏播放器"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div> <div class="progress-section mb-4"><div class="progress-bar flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="播放进度" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div></div> <div class="controls flex items-center justify-center gap-2 mb-4"><button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button></div> <div class="bottom-controls flex items-center gap-2"><button class="btn-plain w-8 h-8 rounded-lg"><!></button> <div class="flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="音量控制" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div> <button><!></button></div></div> <!></div> <style>.orb-player {
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
}</style>`,1);function Ei(c,n){Xa(n,!1);let w=xt.mode??"meting",k=xt.meting_api??"https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",T=xt.id??"14164869977",A=xt.server??"netease",$=xt.type??"playlist",x=F(!1),B=F(!1),d=F(!1),b=F(!1),P=F(0),E=F(0),M=F(.7),S=F(!1),u=F(!1),j=F(!1),g=F(0),et=F(""),at=F(!1),I=F({title:"示例歌曲",artist:"示例艺术家",cover:"/favicon/favicon-light-192.png",url:"",duration:0}),p=F([]),y=F(0),a=F(),J=F(),K=F();const Ie=[{id:1,title:"ひとり上手",artist:"Kaya",cover:"assets/music/cover/hitori.jpg",url:"assets/music/url/hitori.mp3",duration:240},{id:2,title:"眩耀夜行",artist:"スリーズブーケ",cover:"assets/music/cover/xryx.jpg",url:"assets/music/url/xryx.mp3",duration:180},{id:3,title:"春雷の頃",artist:"22/7",cover:"assets/music/cover/cl.jpg",url:"assets/music/url/cl.mp3",duration:200}];async function Re(){if(!k||!T)return;l(u,!0);const s=k.replace(":server",A).replace(":type",$).replace(":id",T).replace(":auth","").replace(":r",Date.now().toString());try{const D=await fetch(s);if(!D.ok)throw new Error("meting api error");const X=await D.json();l(p,X.map(W=>{let ft=W.name??W.title??"未知歌曲",Ft=W.artist??W.author??"未知艺术家",R=W.duration??0;return R>1e4&&(R=Math.floor(R/1e3)),(!Number.isFinite(R)||R<=0)&&(R=0),{id:W.id,title:ft,artist:Ft,cover:W.pic??"",url:W.url??"",duration:R}})),t(p).length>0&&It(t(p)[0]),l(u,!1)}catch{Et("Meting 歌单获取失败"),l(u,!1)}}function We(){!t(a)||!t(I).url||(t(x)?t(a).pause():t(a).play())}function yt(){l(B,!t(B)),t(B)&&(l(b,!1),l(d,!1))}function _t(){l(d,!t(d)),t(d)&&(l(B,!1),l(b,!1))}function ie(){l(b,!t(b))}function Ne(){l(j,!t(j))}function Ye(){l(g,(t(g)+1)%3)}function qe(){if(t(p).length<=1)return;const s=t(y)>0?t(y)-1:t(p).length-1;wt(s)}function $t(){if(t(p).length<=1)return;let s;if(t(j))do s=Math.floor(Math.random()*t(p).length);while(s===t(y)&&t(p).length>1);else s=t(y)<t(p).length-1?t(y)+1:0;wt(s)}function wt(s){if(s<0||s>=t(p).length)return;const D=t(x);l(y,s),t(a)&&t(a).pause(),It(t(p)[t(y)]),(D||!t(x))&&setTimeout(()=>{t(a)&&(t(a).readyState>=2?t(a).play().catch(()=>{}):t(a).addEventListener("canplay",()=>{t(a).play().catch(()=>{})},{once:!0}))},100)}function kt(s){return s.startsWith("http://")||s.startsWith("https://")||s.startsWith("/")?s:`/${s}`}function It(s){!s||!t(a)||(l(I,{...s}),s.url?(l(u,!0),t(a).pause(),U(a,t(a).currentTime=0),l(P,0),l(E,s.duration??0),t(a).removeEventListener("loadeddata",re),t(a).removeEventListener("error",ne),t(a).removeEventListener("loadstart",se),t(a).addEventListener("loadeddata",re,{once:!0}),t(a).addEventListener("error",ne,{once:!0}),t(a).addEventListener("loadstart",se,{once:!0}),U(a,t(a).src=kt(s.url)),t(a).load()):l(u,!1))}function re(){l(u,!1),t(a)?.duration&&t(a).duration>1&&(l(E,Math.floor(t(a).duration)),t(p)[t(y)]&&U(p,t(p)[t(y)].duration=t(E)),U(I,t(I).duration=t(E)))}function ne(s){l(u,!1),Et(`无法播放 "${t(I).title}"，正在尝试下一首...`),t(p).length>1?setTimeout(()=>$t(),1e3):Et("播放列表中没有可用的歌曲")}function se(){}function Et(s){l(et,s),l(at,!0),setTimeout(()=>{l(at,!1)},3e3)}function Oe(){l(at,!1)}function Ue(s){if(!t(a)||!t(J))return;const D=t(J).getBoundingClientRect(),W=(s.clientX-D.left)/D.width*t(E);U(a,t(a).currentTime=W),l(P,W)}function Ke(s){if(!t(a)||!t(K))return;const D=t(K).getBoundingClientRect(),X=Math.max(0,Math.min(1,(s.clientX-D.left)/D.width));l(M,X),U(a,t(a).volume=t(M)),l(S,t(M)===0)}function oe(){t(a)&&(l(S,!t(S)),U(a,t(a).muted=t(S)))}function le(s){if(!Number.isFinite(s)||s<0)return"0:00";const D=Math.floor(s/60),X=Math.floor(s%60);return`${D}:${X.toString().padStart(2,"0")}`}function Xe(){t(a)&&(t(a).addEventListener("play",()=>{l(x,!0)}),t(a).addEventListener("pause",()=>{l(x,!1)}),t(a).addEventListener("timeupdate",()=>{l(P,t(a).currentTime)}),t(a).addEventListener("ended",()=>{t(g)===1?(U(a,t(a).currentTime=0),t(a).play().catch(()=>{})):t(g)===2||t(y)<t(p).length-1||t(j)?$t():l(x,!1)}),t(a).addEventListener("error",s=>{l(u,!1)}),t(a).addEventListener("stalled",()=>{}),t(a).addEventListener("waiting",()=>{}))}Da(()=>{l(a,new Audio),U(a,t(a).volume=t(M)),Xe(),w==="meting"?Re():(l(p,[...Ie]),t(p).length>0?It(t(p)[0]):Et("本地播放列表为空"))}),Pa(()=>{t(a)&&(t(a).pause(),U(a,t(a).src=""))}),za();var ue=nt(),He=tt(ue);{var Ve=s=>{var D=vi(),X=tt(D);{var W=e=>{var m=oi(),_=r(m),C=r(_);f(C,{icon:"material-symbols:error",class:"text-xl flex-shrink-0"});var L=v(C,2),o=r(L,!0);i(L);var H=v(L,2),ct=r(H);f(ct,{icon:"material-symbols:close",class:"text-lg"}),i(H),i(_),i(m),Pt(()=>G(o,t(et))),h("click",H,Oe),Y(e,m)};z(X,e=>{t(at)&&e(W)})}var ft=v(X,2);let Ft;var R=r(ft);let ce;var Ge=r(R);{var Ze=e=>{f(e,{icon:"eos-icons:loading",class:"text-white text-lg"})},Je=e=>{var m=nt(),_=tt(m);{var C=o=>{var H=li();Y(o,H)},L=o=>{f(o,{icon:"material-symbols:music-note",class:"text-white text-lg"})};z(_,o=>{t(x)?o(C):o(L,!1)},!0)}Y(e,m)};z(Ge,e=>{t(u)?e(Ze):e(Je,!1)})}i(R);var st=v(R,2);let de;var ve=r(st),Rt=r(ve),Wt=r(Rt);let fe;var pe=v(Wt,2),Qe=r(pe);{var ta=e=>{f(e,{icon:"eos-icons:loading",class:"text-white text-xl"})},ea=e=>{var m=nt(),_=tt(m);{var C=o=>{f(o,{icon:"material-symbols:pause",class:"text-white text-xl"})},L=o=>{f(o,{icon:"material-symbols:play-arrow",class:"text-white text-xl"})};z(_,o=>{t(x)?o(C):o(L,!1)},!0)}Y(e,m)};z(Qe,e=>{t(u)?e(ta):e(ea,!1)})}i(pe),i(Rt);var Nt=v(Rt,2),Yt=r(Nt),aa=r(Yt,!0);i(Yt);var me=v(Yt,2),ia=r(me,!0);i(me),i(Nt);var be=v(Nt,2),At=r(be),ra=r(At);f(ra,{icon:"material-symbols:visibility-off",class:"text-lg"}),i(At);var qt=v(At,2),na=r(qt);f(na,{icon:"material-symbols:expand-less",class:"text-lg"}),i(qt),i(be),i(ve),i(st);var Ct=v(st,2);let ge;var Ot=r(Ct),Ut=r(Ot),he=r(Ut);let xe;i(Ut);var Kt=v(Ut,2),Xt=r(Kt),sa=r(Xt,!0);i(Xt);var Ht=v(Xt,2),oa=r(Ht,!0);i(Ht);var ye=v(Ht,2),la=r(ye);i(ye),i(Kt);var _e=v(Kt,2),Bt=r(_e),ua=r(Bt);f(ua,{icon:"material-symbols:visibility-off",class:"text-lg"}),i(Bt);var Vt=v(Bt,2),ca=r(Vt);f(ca,{icon:"material-symbols:expand-more",class:"text-lg"}),i(Vt),i(_e),i(Ot);var Gt=v(Ot,2),ot=r(Gt),da=r(ot);i(ot),je(ot,e=>l(J,e),()=>t(J)),i(Gt);var Zt=v(Gt,2),lt=r(Zt);let we;var va=r(lt);f(va,{icon:"material-symbols:shuffle",class:"text-lg"}),i(lt);var pt=v(lt,2),fa=r(pt);f(fa,{icon:"material-symbols:skip-previous",class:"text-xl"}),i(pt);var ut=v(pt,2);let ke;var pa=r(ut);{var ma=e=>{f(e,{icon:"eos-icons:loading",class:"text-xl"})},ba=e=>{var m=nt(),_=tt(m);{var C=o=>{f(o,{icon:"material-symbols:pause",class:"text-xl"})},L=o=>{f(o,{icon:"material-symbols:play-arrow",class:"text-xl"})};z(_,o=>{t(x)?o(C):o(L,!1)},!0)}Y(e,m)};z(pa,e=>{t(u)?e(ma):e(ba,!1)})}i(ut);var mt=v(ut,2),ga=r(mt);f(ga,{icon:"material-symbols:skip-next",class:"text-xl"}),i(mt);var Lt=v(mt,2);let Ee;var ha=r(Lt);{var xa=e=>{f(e,{icon:"material-symbols:repeat-one",class:"text-lg"})},ya=e=>{var m=nt(),_=tt(m);{var C=o=>{f(o,{icon:"material-symbols:repeat",class:"text-lg"})},L=o=>{f(o,{icon:"material-symbols:repeat",class:"text-lg opacity-50"})};z(_,o=>{t(g)===2?o(C):o(L,!1)},!0)}Y(e,m)};z(ha,e=>{t(g)===1?e(xa):e(ya,!1)})}i(Lt),i(Zt);var Fe=v(Zt,2),Tt=r(Fe),_a=r(Tt);{var wa=e=>{f(e,{icon:"material-symbols:volume-off",class:"text-lg"})},ka=e=>{var m=nt(),_=tt(m);{var C=o=>{f(o,{icon:"material-symbols:volume-down",class:"text-lg"})},L=o=>{f(o,{icon:"material-symbols:volume-up",class:"text-lg"})};z(_,o=>{t(M)<.5?o(C):o(L,!1)},!0)}Y(e,m)};z(_a,e=>{t(S)||t(M)===0?e(wa):e(ka,!1)})}i(Tt);var it=v(Tt,2),Ea=r(it);i(it),je(it,e=>l(K,e),()=>t(K));var Mt=v(it,2);let Ae;var Fa=r(Mt);f(Fa,{icon:"material-symbols:queue-music",class:"text-lg"}),i(Mt),i(Fe),i(Ct);var Aa=v(Ct,2);{var Ca=e=>{var m=di(),_=r(m),C=r(_),L=r(C,!0);i(C);var o=v(C,2),H=r(o);f(H,{icon:"material-symbols:close",class:"text-lg"}),i(o),i(_);var ct=v(_,2);Ga(ct,5,()=>t(p),Za,(bt,Q,q)=>{var V=ci();let St;var gt=r(V),Ba=r(gt);{var La=O=>{f(O,{icon:"material-symbols:graphic-eq",class:"text-[var(--primary)] animate-pulse"})},Ta=O=>{var Dt=nt(),te=tt(Dt);{var ee=dt=>{f(dt,{icon:"material-symbols:pause",class:"text-[var(--primary)]"})},ja=dt=>{var Me=ui();Me.textContent=q+1,Y(dt,Me)};z(te,dt=>{q===t(y)?dt(ee):dt(ja,!1)},!0)}Y(O,Dt)};z(Ba,O=>{q===t(y)&&t(x)?O(La):O(Ta,!1)})}i(gt);var Jt=v(gt,2),Ce=r(Jt);i(Jt);var Be=v(Jt,2),jt=r(Be);let Le;var Ma=r(jt,!0);i(jt);var Qt=v(jt,2);let Te;var Sa=r(Qt,!0);i(Qt),i(Be),i(V),Pt((O,Dt,te,ee)=>{St=N(V,1,"playlist-item flex items-center gap-3 p-3 hover:bg-[var(--btn-plain-bg-hover)] cursor-pointer transition-colors",null,St,O),rt(V,"aria-label",`播放 ${t(Q).title??""} - ${t(Q).artist??""}`),rt(Ce,"src",Dt),rt(Ce,"alt",t(Q).title),Le=N(jt,1,"font-medium truncate",null,Le,te),G(Ma,t(Q).title),Te=N(Qt,1,"text-sm text-[var(--content-meta)] truncate",null,Te,ee),G(Sa,t(Q).artist)},[()=>({"bg-[var(--btn-plain-bg)]":q===t(y),"text-[var(--primary)]":q===t(y)}),()=>kt(t(Q).cover),()=>({"text-[var(--primary)]":q===t(y),"text-90":q!==t(y)}),()=>({"text-[var(--primary)]":q===t(y)})]),h("click",V,()=>wt(q)),h("keydown",V,O=>{(O.key==="Enter"||O.key===" ")&&(O.preventDefault(),wt(q))}),Y(bt,V)}),i(ct),i(m),Pt(bt=>G(L,bt),[()=>Qa(Ja.playlist)]),h("click",o,ie),ri(3,m,()=>si,()=>({duration:300,axis:"y"})),Y(e,m)};z(Aa,e=>{t(b)&&e(Ca)})}i(ft),Ha(2),Pt((e,m,_,C,L,o,H,ct,bt,Q,q,V,St,gt)=>{Ft=N(ft,1,"music-player fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out",null,Ft,e),ce=N(R,1,"orb-player w-12 h-12 bg-[var(--primary)] rounded-full shadow-lg cursor-pointer transition-all duration-500 ease-in-out flex items-center justify-center hover:scale-110 active:scale-95",null,ce,m),de=N(st,1,"mini-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-3 transition-all duration-500 ease-in-out",null,de,_),rt(Wt,"src",C),fe=N(Wt,1,"w-full h-full object-cover transition-transform duration-300",null,fe,L),G(aa,t(I).title),G(ia,t(I).artist),ge=N(Ct,1,"expanded-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-4 transition-all duration-500 ease-in-out",null,ge,o),rt(he,"src",H),xe=N(he,1,"w-full h-full object-cover transition-transform duration-300",null,xe,ct),G(sa,t(I).title),G(oa,t(I).artist),G(la,`${bt??""} / ${Q??""}`),rt(ot,"aria-valuenow",t(E)>0?t(P)/t(E)*100:0),Se(da,`width: ${t(E)>0?t(P)/t(E)*100:0}%`),we=N(lt,1,"w-10 h-10 rounded-lg",null,we,q),lt.disabled=t(p).length<=1,pt.disabled=t(p).length<=1,ke=N(ut,1,"btn-regular w-12 h-12 rounded-full",null,ke,V),ut.disabled=t(u),mt.disabled=t(p).length<=1,Ee=N(Lt,1,"w-10 h-10 rounded-lg",null,Ee,St),rt(it,"aria-valuenow",t(M)*100),Se(Ea,`width: ${t(M)*100}%`),Ae=N(Mt,1,"btn-plain w-8 h-8 rounded-lg",null,Ae,gt)},[()=>({expanded:t(B),"hidden-mode":t(d)}),()=>({"opacity-0":!t(d),"scale-0":!t(d),"pointer-events-none":!t(d)}),()=>({"opacity-0":t(B)||t(d),"scale-95":t(B)||t(d),"pointer-events-none":t(B)||t(d)}),()=>kt(t(I).cover),()=>({spinning:t(x)&&!t(u),"animate-pulse":t(u)}),()=>({"opacity-0":!t(B),"scale-95":!t(B),"pointer-events-none":!t(B)}),()=>kt(t(I).cover),()=>({spinning:t(x)&&!t(u),"animate-pulse":t(u)}),()=>le(t(P)),()=>le(t(E)),()=>({"btn-regular":t(j),"btn-plain":!t(j)}),()=>({"opacity-50":t(u)}),()=>({"btn-regular":t(g)>0,"btn-plain":t(g)===0}),()=>({"text-[var(--primary)]":t(b)})]),h("click",R,_t),h("keydown",R,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),_t())}),h("click",At,Pe(_t)),h("click",qt,Pe(yt)),h("click",st,yt),h("keydown",st,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),yt())}),h("click",Bt,_t),h("click",Vt,yt),h("click",ot,Ue),h("keydown",ot,e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault(),t(J).getBoundingClientRect();const _=.5*t(E);t(a)&&(U(a,t(a).currentTime=_),l(P,_))}}),h("click",lt,Ne),h("click",pt,qe),h("click",ut,We),h("click",mt,$t),h("click",Lt,Ye),h("click",Tt,oe),h("click",it,Ke),h("keydown",it,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.key==="Enter"&&oe())}),h("click",Mt,ie),Y(s,D)};z(He,s=>{s(Ve)})}Y(c,ue),Ka()}export{Ei as default};

(function(){
var root=document.documentElement;
if(!('IntersectionObserver' in window))return;
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduce)return;
root.classList.add('mo');
var sel='.section-heading,.brief-intro,.desk,.evidence-strip,.process article,.comparison,.case,.service,.scope,.evidence,.reel,.about>*,.cooperate .service,.outro h2,.outro .wa';
var els=[].slice.call(document.querySelectorAll(sel));
els.forEach(function(el){
 el.classList.add('rv');
 var sib=el.parentElement?[].slice.call(el.parentElement.children).filter(function(x){return x.classList.contains('rv')}):[];
 var i=sib.indexOf(el);el.style.setProperty('--d',(Math.min(i,4)*0.09)+'s');
});
function count(el){
 if(el.dataset.done)return;el.dataset.done=1;
 var txt=el.textContent;
 var m=txt.match(/\d+/g);if(!m)return;
 var final=txt,start=null,dur=1100;
 var nums=m.map(Number);
 function render(p){var k=0;return txt.replace(/\d+/g,function(){var v=Math.round(nums[k++]*p);return '<span class="cnt">'+v+'</span>'})}
 function step(t){if(!start)start=t;var p=Math.min((t-start)/dur,1);p=1-Math.pow(1-p,3);el.innerHTML=render(p);if(p<1)requestAnimationFrame(step);else el.textContent=final}
 requestAnimationFrame(step);
}
var io=new IntersectionObserver(function(es){es.forEach(function(e){
 if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);
  e.target.querySelectorAll('.metric').forEach(count);
  if(e.target.classList.contains('metric'))count(e.target);}
})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
els.forEach(function(el){io.observe(el)});
// metrics inside closed cases: animate when the case opens
document.querySelectorAll('.case').forEach(function(c){c.addEventListener('toggle',function(){if(c.open)c.querySelectorAll('.metric').forEach(function(m){m.dataset.done='';count(m)})})});
// fail-safe: never leave content hidden
setTimeout(function(){els.forEach(function(el){el.classList.add('in')})},6000);
})();

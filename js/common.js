var API = "/api/votes";
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
function toast(t){ var el=document.getElementById("toast"); if(!el) return; el.textContent=t; el.style.display="block"; clearTimeout(toast._t); toast._t=setTimeout(function(){ el.style.display="none"; },2200); }
function shareLink(id, title){
  var url = location.origin + "/item/" + encodeURIComponent(id);
  if (navigator.share) { navigator.share({ title: title, text: "Mirá esta actividad para Navidad en Río", url: url }).catch(function(){}); return; }
  if (navigator.clipboard) { navigator.clipboard.writeText(url).then(function(){ toast("Link copiado"); }, function(){ toast(url); }); }
  else { toast(url); }
}
function catLabel(c){ return {playa:"Playa y naturaleza", atraccion:"Atracción", excursion:"Excursión"}[c] || c; }
function getJSON(key, fallback){ try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); } catch(e){ return fallback; } }
function setJSON(key, v){ try { localStorage.setItem(key, JSON.stringify(v)); } catch(e){} }

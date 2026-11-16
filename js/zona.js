// Datos extra de la zona: restaurantes (almuerzo/cena), playas y atracciones.
// Precios y distancias marcados "Consultar" o "Por confirmar" deben verificarse antes de ir.
(function(){
  var gi = function(q){ return "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(q + " Barra da Tijuca Rio de Janeiro"); };
  var R = [
    {id:"r-irajaredux", name:"Irajá Redux (Rio Design Barra)", meal:"cena", precio:"~R$ 200 pp (Time Out)", dist:"Por confirmar", rec:"Adultos · ocasión especial", que:"Alta cocina accesible del chef Pedro de Artagão, en el Shopping Rio Design Barra desde 2023.", web:"https://www.google.com/search?q=Iraj%C3%A1+Redux+Barra"},
    {id:"r-ctboucherie", name:"CT Boucherie (Rio Design Barra)", meal:"cena", precio:"~R$ 90 pp con acompañamientos", dist:"Por confirmar", rec:"Adultos · carnes", que:"Parrilla y carnes en el Rio Design Barra.", web:"https://www.google.com/search?q=CT+Boucherie+Barra"},
    {id:"r-delirio", name:"Delírio Tropical (Terraço VillageMall)", meal:"ambos", precio:"Consultar", dist:"Por confirmar", rec:"Familia · adultos", que:"Restaurante en la terraza del VillageMall, Av. das Américas 3900.", web:"https://www.google.com/search?q=Del%C3%ADrio+Tropical+VillageMall"},
    {id:"r-enotria", name:"Enotria Bistrô (Barra Point)", meal:"ambos", precio:"Consultar", dist:"Por confirmar", rec:"Adultos · parejas", que:"Bistrô con cocina japonesa en el Shopping Barra Point.", web:"https://www.google.com/search?q=Enotria+Bistr%C3%B4+Barra+Point"},
    {id:"r-ocya", name:"Ocyá (Ilha Primeira)", meal:"cena", precio:"$$$ · reserva recomendada", dist:"Por confirmar (se llega en barco)", rec:"Adultos · ocasión especial", que:"Restaurante en la Ilha Primeira; se llega en barco desde Barra Point o estación Jardim Oceânico. Miércoles a domingo.", web:"https://www.google.com/search?q=Ocy%C3%A1+Ilha+Primeira"},
    {id:"r-hachiko", name:"Hachiko Barra", meal:"cena", precio:"Consultar", dist:"Por confirmar", rec:"Adultos", que:"Cocina de autor (pato con curry de acerola y granola salgada).", web:"https://www.google.com/search?q=Hachiko+Barra"},
    {id:"r-sushimar", name:"Sushimar (Barra)", meal:"ambos", precio:"Consultar", dist:"Por confirmar", rec:"Familia · niños", que:"Japonés con varias sedes en Rio, incluida la Barra.", web:"https://www.google.com/search?q=Sushimar+Barra"},
    {id:"r-japonesalmuerzo", name:"Japonés del Barra Shopping (almuerzo ejecutivo)", meal:"almuerzo", precio:"R$ 62 almuerzo ejecutivo", dist:"Por confirmar", rec:"Adultos · almuerzo rápido", que:"Entrada, plato principal y postre.", web:"https://www.google.com/search?q=Barra+Shopping+japon%C3%AAs+almo%C3%A7o"},
    {id:"r-oswaldo", name:"Bar do Oswaldo", meal:"almuerzo", precio:"Económico · consultar", dist:"Por confirmar", rec:"Familia · presupuesto bajo", que:"Bar económico citado entre los lugares baratos de Rio.", web:"https://www.google.com/search?q=Bar+do+Oswaldo+Rio"},
    {id:"r-giuseppe", name:"Giuseppe Mar", meal:"cena", precio:"Consultar", dist:"Por confirmar", rec:"Adultos", que:"Restaurante citado en guías de la zona oeste.", web:"https://www.google.com/search?q=Giuseppe+Mar+Barra"},
    {id:"r-pobrejuan", name:"Pobre Juan", meal:"ambos", precio:"Consultar", dist:"Por confirmar", rec:"Adultos · ambiente informal", que:"Restaurante de la zona citado en guías.", web:"https://www.google.com/search?q=Pobre+Juan+Barra"},
    {id:"r-gabbiano", name:"Gabbiano", meal:"cena", precio:"Consultar", dist:"Por confirmar", rec:"Adultos", que:"Restaurante citado en guías de la Barra.", web:"https://www.google.com/search?q=Gabbiano+Barra"},
    {id:"r-casaalemao", name:"Casa do Alemão", meal:"ambos", precio:"Consultar", dist:"Por confirmar", rec:"Familia · adultos", que:"Muy bien valorado en listas de la Barra (Foursquare).", web:"https://www.google.com/search?q=Casa+do+Alem%C3%A3o+Barra"}
  ];
  R.forEach(function(r){ FOOD.push({id:r.id, name:r.name, cat:"comida", meal:r.meal, km:null, dist:r.dist, precio:r.precio, rec:r.rec, que:r.que, foto:gi(r.name), web:r.web, webq:r.name}); });

  var P = [
    {id:"p-joa", name:"Praia do Joá", precio:"Gratis", dist:"Por confirmar", rec:"Adultos · parejas", que:"Playa chica y escondida cerca de la Barra.", web:"https://www.google.com/search?q=Praia+do+Jo%C3%A1"}
  ];
  P.forEach(function(p){ ACTIVITIES.push({id:p.id, day:null, name:p.name, tipo:"playa", precio:p.precio, que:p.que, web:p.web, ig:"", src:"", q:p.name, foto:gi(p.name), igq:p.name, webq:p.name, cat:"playa", km:null, rec:p.rec, dist:p.dist}); });

  var A = [
    {id:"a-jardimbotanico", name:"Jardim Botânico", precio:"R$ 40 residentes en Brasil · R$ 80 extranjeros", dist:"Por confirmar", rec:"Familia · niños · adultos", que:"Jueves a martes 8–17 h (miércoles 11–17 h). Entradas en línea.", web:"https://www.gov.br/jbrj/pt-br/assuntos/visitacao/ingressos"},
    {id:"a-parquelage", name:"Parque Lage", precio:"Consultar", dist:"Por confirmar", rec:"Familia · adultos", que:"Parque con mansión y mirador al Cristo Redentor.", web:"https://www.google.com/search?q=Parque+Lage+Rio"},
    {id:"a-museuamanha", name:"Museu do Amanhã", precio:"Consultar", dist:"Por confirmar", rec:"Familia · niños", que:"Museo de ciencia en la zona portuaria.", web:"https://www.google.com/search?q=Museu+do+Amanh%C3%A3"}
  ];
  A.forEach(function(a){ ACTIVITIES.push({id:a.id, day:null, name:a.name, tipo:"atraccion", precio:a.precio, que:a.que, web:a.web, ig:"", src:"", q:a.name, foto:gi(a.name), igq:a.name, webq:a.name, cat:"atraccion", km:null, rec:a.rec, dist:a.dist}); });
})();
// Unir la ficha completa de cada local de cena (DATA) a FOOD, para mostrarla en Actividades y comidas.
(function(){
  if (typeof DATA === "undefined") return;
  FOOD.forEach(function(f){
    var d = DATA.find(function(x){ return x.id === f.id; });
    if (!d) return;
    f.g = d.g; f.kids = d.kids; f.mar = d.mar; f.hotel = d.hotel; f.ig = d.ig; f.res = d.res;
    f.ceia = d.ceia; f.note = d.note; f.totaltxt = d.totaltxt; f.km = d.km; f.min = d.min;
    if (d.km != null && d.min != null) f.dist = "~" + String(d.km).replace(".",",") + " km · " + d.min + " min";
    if (d.precio != null) f.precio = "R$ " + d.precio + " pp" + (d.note && /estimad/i.test(d.note) ? " (estimado)" : "");
    if (d.hotel) f.rec = "Dentro del hotel Laghetto · " + (f.rec || "");
  });
})();

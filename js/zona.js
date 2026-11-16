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
// Planes para días de lluvia: shoppings, acuario, zoológico.
(function(){
  var gi = function(q){ return "https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(q + " Rio de Janeiro"); };
  var L = [
    {id:"a-barrashop", name:"Barra Shopping", precio:"Entrada gratis · cine y comidas aparte", dist:"Por confirmar (Barra)", rec:"Familia · niños · adultos", que:"Uno de los shoppings más grandes de Rio: cines, restaurantes, tiendas y juegos para chicos.", web:"https://www.barrashopping.com.br/"},
    {id:"a-riodesign", name:"Rio Design Barra", precio:"Entrada gratis", dist:"Por confirmar (Barra)", rec:"Adultos · familia", que:"Shopping de diseño y gastronomía, con Irajá Redux y CT Boucherie.", web:"https://www.google.com/search?q=Rio+Design+Barra"},
    {id:"a-villagemall", name:"VillageMall", precio:"Entrada gratis", dist:"Por confirmar (Barra)", rec:"Familia · adultos", que:"Shopping con cines, terraza gastronómica (Delírio Tropical) y tiendas.", web:"https://www.google.com/search?q=VillageMall+Barra"},
    {id:"a-metropolitano", name:"Shopping Metropolitano", precio:"Entrada gratis", dist:"Por confirmar (Barra)", rec:"Familia · niños", que:"Shopping de la Barra con tiendas, cines y patio de comidas.", web:"https://www.google.com/search?q=Shopping+Metropolitano+Barra"},
    {id:"a-aquariorio", name:"Aquário do Rio", precio:"Consultar", dist:"Por confirmar (Centro, Píer Mauá)", rec:"Familia · niños", que:"Acuario con especies marinas de la bahía y de otras regiones. Está junto al Museu do Amanhã.", web:"https://www.google.com/search?q=Aqu%C3%A1rio+do+Rio"},
    {id:"a-zoo", name:"Zoológico do Rio", precio:"Consultar", dist:"Por confirmar (Guaratiba)", rec:"Familia · niños", que:"Zoológico con grandes áreas verdes y animales de distintas partes del mundo.", web:"https://www.google.com/search?q=Zool%C3%B3gico+do+Rio"}
  ];
  L.forEach(function(a){ ACTIVITIES.push({id:a.id, day:null, name:a.name, tipo:"lluvia", precio:a.precio, que:a.que, web:a.web, ig:"", src:"", q:a.name, foto:gi(a.name), igq:a.name, webq:a.name, cat:"lluvia", km:null, rec:a.rec, dist:a.dist}); });
})();
// Fotos obtenidas de Google Maps (mismo origen que las de las cenas).
(function(){
  var PH = {
    "p-pepe":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TjMihzjpJHuXKEYUHKlxflglHWjpXHeKEPqKTeW9kGDA3-y_FZLzPx1x7yJroU16A27xeamwA0oBz9UfpeSFkQXYBpxEDMCTGIAsntEvSaOGXSkLcBQ_W7PIQHgJMUdKMlpTF5xQ=w529-h298-k-no",
    "p-recreio":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SL0x7QKbGRXHM0fYfoEg4wYifjJMySbIY31uQGu3CHtj4feXQdUvFYqpWoAyXQeOiKtp0ltgAuaGHTt4IZE2mit7V2rDEw_rHCZET3fZF0M_h6Pg6lhEnI6GNtWMBFEJQuKyGcBw=w529-h298-k-no",
    "p-joatinga":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9STO8XF4OmJyxPizz7ruSfu0LLtYDcWRd9i4jnF-KlXMHgw40er96DAKbZ3UavQPADNbvwndLAhxULFkIIEK0HxR4F8FayvfSr1bUT4VKdKf5txJrzg67WCtnrLK4IvQW7CBPeY=w447-h298-k-no",
    "p-macumba":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SvUY89zIjk1-dPKi_FeDaMbi27v1puEVyNLAXuty_pam0uHz484wxTRLyCY-OmiiWNJ7tpLYLeFwxKQJw_zdQfGeWmEchtNLJts4EhW0qvJU_BdpHOkuJ4AHtNNyJS3d0vCStzeQ=w397-h298-k-no",
    "p-reserva":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RbhTWBxCOW3rzlzwYkXGuqbfRBmyKUdvq-9nezYZLCrZc1yztY5QB9WfeWgnoLqai-8QfjlD_zLq_N9c6EOIJLDPlvEOZUrURHVNaWdT32Q6AENzccz8x3I6dDs6j7TSoDdw3S=w447-h298-k-no",
    "a-parquelage":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9R6GPV7E0ezCzMf62FXXK3d3Taw2jAyko7cymKSzunuJCYV8TtYrI9CXFfaVGk75AtgaYiMHePGc5fyCs_QfhCk4k0Dt42kLtwPBhLvvA8O92hL7R24Xe8yrha0ogwSYGtTsTRj=w415-h298-k-no",
    "a-museuamanha":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QOn-ubJos8_8pCiKG0O7-raRMZy32e52xLjcyxECThV-XR_f7Fs-ckZ79dc8PnPfqTz55pUO63yWJGJZ8CbHtsoNQT2fB1_8L9kFabC3r3CuaFiPRa3LTcjhiODxhUHwEgzQuhJPjzBMZS=w397-h298-k-no",
    "a-aquariorio":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9TemW5--47VCjD-RcgdJkR0CxM2vHASLfFdskuQeCHcTLHEbn3EQB-lCeJAxAq82FoR0k80lief7FY4kTMlSUsvkz9XHOPQGYkCy8iIjlubQQeFFA0TzUSFENF4z1WSmZr7hjUCNQ=w238-h298-k-no",
    "a-barrashop":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RgUAsEnvxRYzQKgFVptiRJm5_X14o-uKERtGEegA_iXm2BNcrjaj7-LkhwclqieSkgsQQoYoULZRwaRwyMoX0vVoN934vQIJexeR9yG4y9uGBrfqxAPSJ6REYwCnc083YAjQgLjqMQm3Q=w446-h298-k-no",
    "a-riodesign":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RxHDvznWR_BCDZ23jOmKGa4vC70v-9_JBgFNVerajIGFwkMIFzbGucG3_XX7xdsDzh8QzPi8sQeNP14ljQsMQ6oJtQXMQebSCl7x171wACEjhlNDzkAUGaeYt1OD_YtfHW7GUfiw=w487-h298-k-no",
    "a-villagemall":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qm2sWfs367WjK3lF6_ySSFj2ZOnLb8Nke88ydLaY-z9ktU2p0OaMe3lQ2un51H9i_2qU17Iy4E62_IxwzNuXk-RwcMSGjL3MvMM8VN8N5Yq4_pH_gQSl10Q0fRSudtcMPr4IprXe7RNtdk=w224-h398-k-no",
    "a-metropolitano":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QNT7GZevLJGcUXYeL-mEQqpRSdkIXhg34L9VzfKUB6hU1XISqJlvgx5UqBxWU8I2U0USEgg431_Jq2fpl1T1Mv6v26MdAf67LyNSbRKZfVTS7_sn_j2eIF5QMMfSSzjhbb5Oh7OYisIFe7=w447-h298-k-no",
    "r-irajaredux":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Qjd5en8yL5AAVJZjrj9UjONm7DS7gvZOSie4ZJOy0b_VoGWepttakdBF0zAiFyjhgd5h4_t0uwow-EFkNyiPARcqvOWDkaaPth-ArmPvKQFlHDGFj5PLnhhO0rzJXCGCOWGA6EeIa87SWJ=w529-h298-k-no",
    "r-ocya":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rw2uH9mA8q49elTG3fvL5W0bqu2QqSWSh5h3CsJtNTps-QF80NyE3Wp9OvLRWa7DTPtVfNO4RMwIaiK4dxp_jXcLRtO7AVxCnHhyO01llHbAkrtWyLd2Xd_ztxjSiYPAHjEG6Mjg=w447-h298-k-no",
    "r-hachiko":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SlhzP8EPC53zZRQuLLlG3RQS3p0ovSI54XseSdEARuAtUd3kmUEpHR7aeAc7UJY67xBfmHpGoLY01WDpO4ne-2gIjBP1Hah3ojlv6x2Gd98kZuxJ0jZ69toQCftpHnFAP9y-Gz=w645-h298-k-no",
    "r-sushimar":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RXPI1Vnow3iXAP9F9HrDK5h3cbpjLT9lf9uBRa6mTUyXymqCvjb3pap-axpESnW9mSfvLx-xS5olxtPnbpCqe07cld5Je3dMEvsXu9whI6Usp_fm_C-Cop5ACOQNfKVMlWCAk=w529-h298-k-no",
    "r-oswaldo":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SBFYzUsz53L25V5J55cF_3zZlULdrgJx6dpKAl5fe5-80750IeGYm7uR9zLAwrDv1xjU_KvqsZIjgcRo-KWIbrGqdbZlaGlsA7X48HKDBQfsh0Bh8Kse1iB1BlE_GL5HWQcYxKcA=w397-h298-k-no",
    "r-giuseppe":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Sa_8TV_C6gTyDRPa-R-p9lyWRzCMvYHnRPCHl7fVBkYePw7MmjvPJdqT1DGtrCbbeYa2ymCPpY8urz36WddFrIv7JVgTzihw06O1MnIf5FDhCSvJJHWOHzSu4me6rS1TjM9Tc8=w446-h298-k-no",
    "r-pobrejuan":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9SZQk6HASkuDrVQ4v5si-VKLtvnTDCvVopJNgZqBidb6drxTD6BfrmSlbfy_khDt_BQioxbwKbVLCCURSHnwCCoKJqATTxdV_6xrIhqHJLQy9mQsYVV_x6XzOftdq7hloTIR3ITHg=w447-h298-k-no",
    "r-gabbiano":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9QMtzt4fVeMJRwksu-iyYKCjMMyU9vEvYQzPfJiPvrg99CdyWUjd3GBLza-M3sgUFzZwx1jJaUTA_myAM9WHfjgTYcfqp-JwVA1msR5WRPQUhQTPq1N9UGpBmTn7p1QrWAbcGqd_g=w446-h298-k-no",
    "r-casaalemao":"https://lh3.googleusercontent.com/gps-cs-s/ANWiy9Rbp1-eonHw2Qg5lHMw5uyK2irkT38HwIk7EQo8Ch-T3xaiGd2_hs3UYE5C6f0n-eZbJ8lcmMFRs8ZaTtPY-GFWRwrFSJGQrRnMRP13q97TydRtrwZDAX3TFv7rpIE9TQj5Wpsuvg=w662-h298-k-no"
  };
  ACTIVITIES.forEach(function(a){ if (!a.img && PH[a.id]) a.img = PH[a.id]; });
  FOOD.forEach(function(f){
    if (!f.img && PH[f.id]) f.img = PH[f.id];
    if (!f.img && f.foto && f.foto.indexOf("lh3.googleusercontent.com")!==-1) f.img = f.foto;
  });
})();
// Instagram oficial de cada actividad (cuando existe una cuenta oficial verificada en búsqueda).
(function(){
  var IG = {
    "d25-barra":"https://www.instagram.com/praiadabarra/",
    "d26-cristo":"https://www.instagram.com/cristoredentoroficial/",
    "d27-pao":"https://www.instagram.com/paodeacucar/",
    "d28-buzios":"https://www.instagram.com/visitbuzioscvb/",
    "d28-paraty":"https://www.instagram.com/paratycombr/",
    "d29-ilha":"https://www.instagram.com/ilhagrande.oficial/",
    "p-recreio":"https://www.instagram.com/praiadorecreio/",
    "p-grumari":"https://www.instagram.com/grumari_beach/",
    "p-joatinga":"https://www.instagram.com/praiadajoatinga.oficial/",
    "a-jardimbotanico":"https://www.instagram.com/jardimbotanicorj/",
    "a-parquelage":"https://www.instagram.com/parquelage/",
    "a-museuamanha":"https://www.instagram.com/museudoamanha/",
    "a-aquariorio":"https://www.instagram.com/aquariomarinhodorio/",
    "a-zoo":"https://www.instagram.com/bioparquedorio/",
    "a-barrashop":"https://www.instagram.com/barrashoppingoficial/",
    "a-riodesign":"https://www.instagram.com/riodesignbarra/",
    "a-villagemall":"https://www.instagram.com/villagemall/"
  };
  ACTIVITIES.forEach(function(a){ if (!a.ig && IG[a.id]) a.ig = IG[a.id]; });
})();

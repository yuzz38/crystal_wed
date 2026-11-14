const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
burger.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') !== 'true';
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  nav.classList.toggle('open', open);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) { nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); burger.setAttribute('aria-label','Открыть меню'); }
});
const formats = {
  two: {image:'assets/img-09.webp', alt:'Пара на зимнем Байкале', title:'ВЕСЬ МИР<br>ДЛЯ ДВОИХ.', text:'Церемония, прогулка и место, которое будет только вашим. Например, Байкал.'},
  close: {image:'assets/img-11.webp', alt:'Камерная свадебная церемония', title:'САМОЕ ВАЖНОЕ —<br>РЯДОМ.', text:'Тёплый день в кругу близких: красивая церемония, разговоры и много личных деталей.'},
  party: {image:'assets/img-15.webp', alt:'Пара празднует свадьбу с гостями', title:'ЛЮБИМЫЕ ЛЮДИ.<br>БОЛЬШИЕ ЭМОЦИИ.', text:'Праздник с близкими и друзьями — с программой, атмосферой и моментами, которые хочется вспоминать.'}
};
document.querySelectorAll('.format-option').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.format-option').forEach(item => { item.classList.remove('active'); item.setAttribute('aria-pressed','false'); });
  button.classList.add('active'); button.setAttribute('aria-pressed','true');
  const item=formats[button.dataset.format];
  document.querySelector('#format-image').src=item.image; document.querySelector('#format-image').alt=item.alt;
  document.querySelector('#format-title').innerHTML=item.title; document.querySelector('#format-description').textContent=item.text;
}));
const steps = [
 {image:'assets/img-02.webp', title:'СНАЧАЛА<br>ПОЗНАКОМИМСЯ.',text:'На бесплатной встрече поговорим о ваших желаниях, расскажем, как строится подготовка, и составим предварительную смету. Важно понять, совпадаем ли мы по взглядам.'},
 {image:'assets/img-04.webp', title:'ВСЁ ФИКСИРУЕМ<br>В ДОГОВОРЕ.',text:'После встречи вы получаете предварительную смету. Если решаем работать вместе, подписываем договор; предоплата 50 000 ₽ идёт на дальнейшее бронирование специалистов.'},
 {image:'assets/img-05.webp', title:'СОБИРАЕМ<br>ОСНОВУ.',text:'Обсуждаем формат, выбираем площадку и подбираем команду: ведущего, фотографа, видеографа, стилиста и других специалистов с учётом пожеланий и бюджета.'},
 {image:'assets/img-06.webp', title:'ПРОДУМЫВАЕМ<br>ДЕТАЛИ.',text:'Прорабатываем оформление, программу, меню и рассадку, техническую часть, логистику, трансфер и другие важные детали праздника.'},
 {image:'assets/img-07.webp', title:'ПОСЛЕДНИЕ<br>ШТРИХИ.',text:'За 1–2 недели подтверждаем меню, рассадку, тайминг и работу подрядчиков. В день свадьбы команда следит за организацией, а вы наслаждаетесь событием.'}
];
document.querySelectorAll('.step').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.step').forEach(item => {item.classList.remove('active');item.setAttribute('aria-selected','false');});
  button.classList.add('active');button.setAttribute('aria-selected','true');const index=Number(button.dataset.step),step=steps[index];
  document.querySelector('#step-image').src=step.image;document.querySelector('#step-number').textContent=String(index+1).padStart(2,'0')+' / 05';document.querySelector('#step-title').innerHTML=step.title;document.querySelector('#step-description').textContent=step.text;
}));
document.querySelectorAll('.media-frame').forEach(frame => {
 const video=frame.querySelector('video'),button=frame.querySelector('.play');
 button.addEventListener('click',async()=>{if(video.paused){document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause()});try{await video.play()}catch(error){button.setAttribute('aria-label','Видео не удалось воспроизвести')}}else video.pause();});
 video.addEventListener('play',()=>{frame.classList.add('playing');button.querySelector('span').textContent='Ⅱ';button.setAttribute('aria-label','Поставить видео на паузу')});
 video.addEventListener('pause',()=>{frame.classList.remove('playing');button.querySelector('span').textContent='▶';button.setAttribute('aria-label','Воспроизвести видео')});
});
const track=document.querySelector('.story-track'),prev=document.querySelector('.story-prev'),next=document.querySelector('.story-next');
function updateArrows(){prev.disabled=track.scrollLeft<=1;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2;}
function slide(direction){const card=track.querySelector('.story-card');const gap=parseFloat(getComputedStyle(track).columnGap)||0;track.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
prev.addEventListener('click',()=>slide(-1));next.addEventListener('click',()=>slide(1));track.addEventListener('scroll',updateArrows,{passive:true});window.addEventListener('resize',updateArrows);updateArrows();
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('reveal-ready');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}), {threshold:0.08});
  document.querySelectorAll('.section-heading, .story-top, .format-header, .process-heading, .faq-title').forEach(element => {element.classList.add('reveal-item');observer.observe(element)});
}

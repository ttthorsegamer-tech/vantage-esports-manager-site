(function(){
  const LANG_KEY = 'vantage-lang';
  const MUSIC_KEY = 'vantage-music-enabled';
  const buttons = document.querySelectorAll('[data-set-lang]');

  function currentLang(){
    return document.documentElement.lang === 'en' ? 'en' : 'fr';
  }

  function setLang(lang){
    document.querySelectorAll('[data-lang]').forEach(el=>{
      el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
    });
    buttons.forEach(b=>b.classList.toggle('active', b.getAttribute('data-set-lang')===lang));
    document.documentElement.lang = lang;
    try{ localStorage.setItem(LANG_KEY,lang); }catch(e){}
    updateMusicButton();
  }

  buttons.forEach(b=>b.addEventListener('click',()=>setLang(b.getAttribute('data-set-lang'))));
  let initialLang = 'fr';
  try{ initialLang = localStorage.getItem(LANG_KEY) || 'fr'; }catch(e){}
  setLang(initialLang);

  const audio = new Audio('/assets/audio/covert-operation.mp3');
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.20;

  let musicEnabled = true;
  try{
    const saved = localStorage.getItem(MUSIC_KEY);
    if(saved === 'false') musicEnabled = false;
  }catch(e){}

  const musicButton = document.createElement('button');
  musicButton.type = 'button';
  musicButton.className = 'music-toggle';
  musicButton.setAttribute('aria-pressed', musicEnabled ? 'true' : 'false');

  const links = document.querySelector('.links');
  if(links){
    const langControl = links.querySelector('.lang');
    if(langControl) links.insertBefore(musicButton, langControl);
    else links.appendChild(musicButton);
  }else{
    document.body.appendChild(musicButton);
    musicButton.classList.add('music-toggle-floating');
  }

  function updateMusicButton(){
    if(!musicButton) return;
    const lang = currentLang();
    const on = musicEnabled;
    const label = lang === 'en'
      ? (on ? 'Music on' : 'Music off')
      : (on ? 'Musique activée' : 'Musique coupée');
    musicButton.innerHTML = '<span aria-hidden="true">' + (on ? '🔊' : '🔇') + '</span><span>' + (lang === 'en' ? 'Music' : 'Musique') + '</span>';
    musicButton.setAttribute('aria-label', label);
    musicButton.title = label;
    musicButton.setAttribute('aria-pressed', on ? 'true' : 'false');
    musicButton.classList.toggle('muted', !on);
  }

  function tryPlay(){
    if(!musicEnabled) return;
    const p = audio.play();
    if(p && typeof p.catch === 'function') p.catch(()=>{});
  }

  function applyMusicState(){
    if(musicEnabled){
      audio.muted = false;
      audio.volume = 0.20;
      tryPlay();
    }else{
      audio.pause();
      audio.muted = true;
    }
    try{ localStorage.setItem(MUSIC_KEY, musicEnabled ? 'true' : 'false'); }catch(e){}
    updateMusicButton();
  }

  musicButton.addEventListener('click',()=>{
    musicEnabled = !musicEnabled;
    applyMusicState();
  });

  // Most browsers block audible autoplay. Try immediately, then retry once
  // after the visitor's first interaction if autoplay was denied.
  if(musicEnabled){
    tryPlay();
    const resume = ()=>{
      tryPlay();
      document.removeEventListener('pointerdown', resume);
      document.removeEventListener('keydown', resume);
      document.removeEventListener('touchstart', resume);
    };
    document.addEventListener('pointerdown', resume, {passive:true});
    document.addEventListener('keydown', resume);
    document.addEventListener('touchstart', resume, {passive:true});
  }

  document.addEventListener('visibilitychange',()=>{
    if(document.hidden) audio.pause();
    else if(musicEnabled) tryPlay();
  });

  updateMusicButton();
})();

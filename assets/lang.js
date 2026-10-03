(()=>{
  const LANG_KEY='vantage-lang',MUSIC_KEY='vantage-music-enabled',MUSIC_VOLUME_KEY='vantage-music-volume';
  const DEFAULT_MUSIC_VOLUME=.08,MAX_MUSIC_VOLUME=.20,supported=['fr','en'];
  // Set only to the owner's permanent public invitation when it is available.
  const DISCORD_INVITE='';
  const root=document.documentElement;
  root.classList.add('js');
  const nav=document.querySelector('.nav'),menuButton=document.querySelector('.menu-toggle'),navigation=document.querySelector('.primary-nav');
  function setMenu(open,restoreFocus=false){
    if(!nav||!menuButton)return;
    nav.classList.toggle('is-menu-open',open);
    menuButton.setAttribute('aria-expanded',String(open));
    if(restoreFocus)menuButton.focus();
  }
  menuButton?.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
  navigation?.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
  document.addEventListener('click',event=>{if(nav&&!nav.contains(event.target))setMenu(false);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true')setMenu(false,true);});
  const desktop=window.matchMedia('(min-width:1001px)');
  desktop.addEventListener('change',()=>setMenu(false));
  navigation?.querySelectorAll('a').forEach(link=>{if(new URL(link.href).pathname===location.pathname)link.setAttribute('aria-current','page');});

  let audio=null,musicVolume=DEFAULT_MUSIC_VOLUME,musicEnabled=true;
  try{
    const storedVolume=localStorage.getItem(MUSIC_VOLUME_KEY);
    if(storedVolume!==null){const saved=Number(storedVolume);if(Number.isFinite(saved)&&saved>=0&&saved<=MAX_MUSIC_VOLUME)musicVolume=saved;}
    if(localStorage.getItem(MUSIC_KEY)==='false'||musicVolume===0)musicEnabled=false;
  }catch(error){}
  const musicControl=document.createElement('div');musicControl.className='music-control';
  const musicButton=document.createElement('button');musicButton.type='button';musicButton.className='music-toggle';
  const volumeSlider=document.createElement('input');
  Object.assign(volumeSlider,{type:'range',className:'music-volume',min:'0',max:'20',step:'1',value:String(Math.round(musicVolume*100))});
  musicControl.append(musicButton,volumeSlider);
  const navRight=document.querySelector('.nav-right'),langSwitch=navRight?.querySelector('.lang-switch');
  if(navRight)navRight.insertBefore(musicControl,langSwitch||null);
  else{musicControl.classList.add('music-control-floating');document.body.append(musicControl);}
  function currentLang(){return root.lang==='en'?'en':'fr';}
  function updateMusicButton(){
    const en=currentLang()==='en',playing=musicEnabled&&!!audio&&!audio.paused;
    const title=playing?(en?'Mute music':'Couper la musique'):(en?'Play music':'Activer la musique');
    const icon=playing?'<path d="M11 4 6 8H3v8h3l5 4V4Zm4 4c2 2 2 6 0 8m3-11c4 4 4 10 0 14"/>':'<path d="M11 4 6 8H3v8h3l5 4V4Zm5 5 5 6m0-6-5 6"/>';
    musicButton.innerHTML='<svg class="music-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+icon+'</svg><span class="music-label">'+(en?'Music':'Musique')+'</span>';
    musicButton.title=title;musicButton.setAttribute('aria-label',title);musicButton.setAttribute('aria-pressed',String(playing));
    musicButton.classList.toggle('is-off',!musicEnabled);musicButton.classList.toggle('is-paused',musicEnabled&&!playing);
    volumeSlider.setAttribute('aria-label',en?'Music volume':'Volume de la musique');volumeSlider.title=en?'Music volume':'Volume de la musique';
  }
  const description=document.querySelector('meta[name="description"]');
  const frenchDescription=description?.content;
  function setLang(lang){
    if(!supported.includes(lang))lang='fr';
    root.lang=lang;
    try{localStorage.setItem(LANG_KEY,lang);}catch(error){}
    document.querySelectorAll('[data-lang]').forEach(button=>{const active=button.dataset.lang===lang;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    document.querySelectorAll('[data-label-fr]').forEach(element=>element.setAttribute('aria-label',element.dataset[lang==='en'?'labelEn':'labelFr']));
    document.querySelectorAll('[data-alt-fr]').forEach(element=>element.setAttribute('alt',element.dataset[lang==='en'?'altEn':'altFr']));
    const title=document.querySelector('title');if(title?.dataset.titleFr)document.title=title.dataset[lang==='en'?'titleEn':'titleFr'];
    if(description)description.content=lang==='en'?(description.dataset.descriptionEn||frenchDescription):frenchDescription;
    // Explicit language remains usable even when browser storage is unavailable.
    document.querySelectorAll('a[href^="/"]').forEach(link=>{const url=new URL(link.href);url.searchParams.set('lang',lang);link.setAttribute('href',url.pathname+url.search+url.hash);});
    updateMusicButton();
  }
  let lang=(navigator.language||'').toLowerCase().startsWith('en')?'en':'fr';
  try{lang=localStorage.getItem(LANG_KEY)||lang;}catch(error){}
  const requested=new URLSearchParams(location.search).get('lang');if(supported.includes(requested))lang=requested;
  setLang(lang);
  document.addEventListener('click',event=>{const button=event.target.closest('[data-lang]');if(button)setLang(button.dataset.lang);});

  function ensureAudio(){
    if(audio)return audio;
    audio=new Audio();audio.preload='none';audio.loop=true;audio.volume=musicVolume;audio.src='/assets/audio/covert-operation.mp3';
    ['play','pause','ended','error'].forEach(event=>audio.addEventListener(event,updateMusicButton));
    return audio;
  }
  async function playMusic(){
    if(!musicEnabled||document.hidden)return;
    const track=ensureAudio();track.muted=false;track.volume=musicVolume;
    try{await track.play();}catch(error){}
    updateMusicButton();
  }
  function stopMusic(){if(audio){audio.pause();audio.muted=true;}updateMusicButton();}
  function savePreference(){try{localStorage.setItem(MUSIC_KEY,String(musicEnabled));}catch(error){}}
  function saveVolume(){try{localStorage.setItem(MUSIC_VOLUME_KEY,String(musicVolume));}catch(error){}}
  musicButton.addEventListener('click',()=>{
    if(musicEnabled&&audio&&!audio.paused){musicEnabled=false;savePreference();stopMusic();}
    else{musicEnabled=true;if(musicVolume===0){musicVolume=DEFAULT_MUSIC_VOLUME;volumeSlider.value=String(musicVolume*100);saveVolume();}savePreference();playMusic();}
  });
  volumeSlider.addEventListener('input',()=>{
    musicVolume=Math.max(0,Math.min(20,Number(volumeSlider.value)||0))/100;
    if(audio)audio.volume=musicVolume;saveVolume();musicEnabled=musicVolume>0;savePreference();
    if(musicEnabled)playMusic();else stopMusic();
  });
  const resumeAfterInteraction=event=>{if(event.target.closest?.('.music-control'))return;if(musicEnabled&&(!audio||audio.paused))playMusic();};
  document.addEventListener('pointerdown',resumeAfterInteraction,{passive:true});
  document.addEventListener('keydown',event=>{if(event.key!=='Tab'&&event.key!=='Escape')resumeAfterInteraction(event);});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){audio?.pause();updateMusicButton();}else if(musicEnabled&&audio)playMusic();});
  // Creating the audio element and fetching the track are deferred to interaction.
  updateMusicButton();

  if(DISCORD_INVITE){
    let invite;
    try{const url=new URL(DISCORD_INVITE);if(url.protocol==='https:'&&(url.hostname==='discord.gg'||(url.hostname==='discord.com'&&url.pathname.startsWith('/invite/'))))invite=url.href;}catch(error){}
    if(invite){
      document.querySelectorAll('[data-discord-invite]').forEach(link=>{link.href=invite;link.target='_blank';link.rel='noopener noreferrer';link.querySelector('.fr').textContent='Rejoindre Discord';link.querySelector('.en').textContent='Join Discord';});
      document.querySelectorAll('[data-discord-pending]').forEach(element=>element.hidden=true);
    }
  }
})();

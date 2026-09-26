(()=>{
  const LANG_KEY="vantage-lang";
  const MUSIC_KEY="vantage-music-enabled";
  const MUSIC_VOLUME_KEY="vantage-music-volume";
  const DEFAULT_MUSIC_VOLUME=.08;
  const MAX_MUSIC_VOLUME=.20;
  const supported=["fr","en"];

  const audio=new Audio("/assets/audio/covert-operation.mp3");
  audio.loop=true;
  audio.preload="auto";
  let musicVolume=DEFAULT_MUSIC_VOLUME;
  try{
    const savedVolume=Number(localStorage.getItem(MUSIC_VOLUME_KEY));
    if(Number.isFinite(savedVolume)&&savedVolume>=0&&savedVolume<=MAX_MUSIC_VOLUME) musicVolume=savedVolume;
  }catch(e){}
  audio.volume=musicVolume;

  let musicEnabled=true;
  try{
    if(localStorage.getItem(MUSIC_KEY)==="false") musicEnabled=false;
  }catch(e){}

  const musicControl=document.createElement("div");
  musicControl.className="music-control";

  const musicButton=document.createElement("button");
  musicButton.type="button";
  musicButton.className="music-toggle";

  const volumeSlider=document.createElement("input");
  volumeSlider.type="range";
  volumeSlider.className="music-volume";
  volumeSlider.min="0";
  volumeSlider.max="20";
  volumeSlider.step="1";
  volumeSlider.value=String(Math.round(musicVolume*100));
  volumeSlider.setAttribute("aria-label","Volume de la musique");
  volumeSlider.title="Volume";
  musicControl.appendChild(musicButton);
  musicControl.appendChild(volumeSlider);

  const navRight=document.querySelector(".nav-right");
  if(navRight){
    const langSwitch=navRight.querySelector(".lang-switch");
    if(langSwitch) navRight.insertBefore(musicControl,langSwitch);
    else navRight.appendChild(musicControl);
  }else{
    musicControl.classList.add("music-control-floating");
    document.body.appendChild(musicControl);
  }

  function currentLang(){
    return document.documentElement.lang==="en"?"en":"fr";
  }

  function updateMusicButton(){
    const lang=currentLang();
    const playing=musicEnabled&&!audio.paused;
    let icon;
    let text;
    let title;

    if(!musicEnabled){
      icon="🔇";
      text=lang==="en"?"Music":"Musique";
      title=lang==="en"?"Turn music on":"Activer la musique";
    }else if(playing){
      icon="🔊";
      text=lang==="en"?"Music":"Musique";
      title=lang==="en"?"Music on — click to mute":"Musique activée — cliquer pour couper";
    }else{
      icon="▶";
      text=lang==="en"?"Music":"Musique";
      title=lang==="en"?"Start music":"Démarrer la musique";
    }

    musicButton.innerHTML='<span class="music-icon" aria-hidden="true">'+icon+'</span><span class="music-label">'+text+'</span>';
    musicButton.title=title;
    musicButton.setAttribute("aria-label",title);
    musicButton.setAttribute("aria-pressed",playing?"true":"false");
    musicButton.classList.toggle("is-off",!musicEnabled);
    musicButton.classList.toggle("is-paused",musicEnabled&&!playing);
    volumeSlider.setAttribute("aria-label",lang==="en"?"Music volume":"Volume de la musique");
  }

  function setLang(lang){
    if(!supported.includes(lang)) lang="fr";
    document.documentElement.lang=lang;
    try{localStorage.setItem(LANG_KEY,lang)}catch(e){}
    document.querySelectorAll("[data-lang]").forEach(b=>{
      const active=b.dataset.lang===lang;
      b.classList.toggle("active",active);
      b.setAttribute("aria-pressed",active?"true":"false");
    });
    updateMusicButton();
  }

  let lang="fr";
  try{
    lang=localStorage.getItem(LANG_KEY)||((navigator.language||"").toLowerCase().startsWith("en")?"en":"fr");
  }catch(e){}
  setLang(lang);

  document.addEventListener("click",e=>{
    const langButton=e.target.closest("[data-lang]");
    if(langButton) setLang(langButton.dataset.lang);
  });

  async function playMusic(){
    if(!musicEnabled) return;
    audio.muted=false;
    audio.volume=musicVolume;
    try{
      await audio.play();
    }catch(e){}
    updateMusicButton();
  }

  function stopMusic(){
    audio.pause();
    audio.muted=true;
    updateMusicButton();
  }

  function saveMusicPreference(){
    try{localStorage.setItem(MUSIC_KEY,musicEnabled?"true":"false")}catch(e){}
  }

  musicButton.addEventListener("click",()=>{
    if(musicEnabled&&!audio.paused){
      musicEnabled=false;
      saveMusicPreference();
      stopMusic();
    }else{
      musicEnabled=true;
      saveMusicPreference();
      playMusic();
    }
  });

  volumeSlider.addEventListener("input",()=>{
    const pct=Math.max(0,Math.min(20,Number(volumeSlider.value)||0));
    musicVolume=pct/100;
    audio.volume=musicVolume;
    try{localStorage.setItem(MUSIC_VOLUME_KEY,String(musicVolume))}catch(e){}
    if(pct===0){
      musicEnabled=false;
      saveMusicPreference();
      stopMusic();
    }else{
      if(!musicEnabled){
        musicEnabled=true;
        saveMusicPreference();
      }
      playMusic();
    }
  });

  const resumeAfterInteraction=e=>{
    if(e.target&&e.target.closest&&e.target.closest(".music-control")) return;
    if(musicEnabled&&audio.paused) playMusic();
  };
  document.addEventListener("pointerdown",resumeAfterInteraction,{passive:true});
  document.addEventListener("keydown",resumeAfterInteraction);

  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){
      audio.pause();
      updateMusicButton();
    }else if(musicEnabled){
      playMusic();
    }
  });

  audio.addEventListener("play",updateMusicButton);
  audio.addEventListener("pause",updateMusicButton);
  audio.addEventListener("ended",updateMusicButton);

  if(musicEnabled) playMusic();
  else stopMusic();
})();
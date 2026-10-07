(()=>{
  const form=document.getElementById('account-deletion-form');
  if(!form)return;
  const button=form.querySelector('button[type="submit"]'),status=document.getElementById('deletion-status');
  let busy=false;
  const messages={
    sending:{fr:'Envoi de la demande…',en:'Submitting your request…'},
    success:{fr:'Ta demande a été enregistrée. Le titulaire du compte devra être vérifié avant la suppression.',en:'Your request has been registered. Account ownership must be verified before deletion.'},
    invalid:{fr:'Vérifie ton adresse courriel et la longueur de ta note, puis réessaie.',en:'Check your email address and note length, then try again.'},
    error:{fr:'La demande n’a pas pu être confirmée. Réessaie ou contacte le support par courriel.',en:'Your request could not be confirmed. Try again or contact support by email.'},
    reference:{fr:'Référence à conserver : ',en:'Keep this reference: '}
  };
  function message(kind,reference){
    status.replaceChildren();status.hidden=false;status.dataset.state=kind;
    for(const lang of ['fr','en']){
      const line=document.createElement('p');line.className=lang;line.textContent=messages[kind][lang];status.append(line);
    }
    if(reference){
      const line=document.createElement('p');
      for(const lang of ['fr','en']){const label=document.createElement('span');label.className=lang;label.textContent=messages.reference[lang];line.append(label);}
      const value=document.createElement('strong');value.textContent=reference;line.append(value);status.append(line);
    }
  }
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    if(busy||!form.reportValidity())return;
    busy=true;button.disabled=true;form.setAttribute('aria-busy','true');message('sending');
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await fetch(form.action,{
        method:'POST',headers:{'Content-Type':'application/json'},credentials:'omit',signal:controller.signal,
        body:JSON.stringify({email:form.elements.email.value.trim(),note:form.elements.note.value.trim(),website:form.elements.website.value})
      });
      const data=await response.json();
      if(!response.ok||data?.ok!==true){message(data?.error==='invalid_request'?'invalid':'error');return;}
      message('success',typeof data.reference==='string'?data.reference:null);
      form.reset();
    }catch{message('error');}
    finally{clearTimeout(timeout);busy=false;button.disabled=false;form.setAttribute('aria-busy','false');}
  });
})();

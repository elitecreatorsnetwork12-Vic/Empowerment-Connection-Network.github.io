// script.js — interactions for the static ECN page

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile menu if open
        if(window.innerWidth < 721){
          document.getElementById('navLinks')?.classList.remove('open');
        }
      }
    });
  });

  // Mobile hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Intersection Observer for reveal-up
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, {threshold: 0.15});

  document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));

  // TERMS modal controls
  const openPolicyBtn = document.getElementById('openPolicy');
  const termsModal = document.getElementById('termsModal');
  const closeModal = document.getElementById('closeModal');
  const acceptTerms = document.getElementById('acceptTerms');
  const declineTerms = document.getElementById('declineTerms');
  const agreeCheckbox = document.getElementById('agreePolicy');
  const formArea = document.getElementById('formArea');

  function showModal(){ termsModal.classList.remove('hidden'); termsModal.style.display='flex' }
  function hideModal(){ termsModal.classList.add('hidden'); termsModal.style.display='none' }

  openPolicyBtn?.addEventListener('click', showModal);
  closeModal?.addEventListener('click', hideModal);
  declineTerms?.addEventListener('click', hideModal);

  acceptTerms?.addEventListener('click', ()=>{
    hideModal();
    agreeCheckbox.checked = true;
    formArea.classList.remove('hidden');
  });

  // If user checks manualy, show form
  agreeCheckbox?.addEventListener('change', (e)=>{
    if(e.target.checked) formArea.classList.remove('hidden');
    else formArea.classList.add('hidden');
  });

  // Close modal on ESC
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape') hideModal();
  });
});

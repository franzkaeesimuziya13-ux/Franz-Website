/* script.js
   Handles: login form validation, remember-me, datetime, slideshow
*/

/* Login validation + remember me */
function handleLogin(e){
  if(e) e.preventDefault();
  var userEl = document.getElementById('username');
  var passEl = document.getElementById('password');
  var err = document.getElementById('loginError');
  err.textContent = '';
  var user = userEl ? userEl.value.trim() : '';
  var pass = passEl ? passEl.value : '';

  if(!user || !pass){
    err.textContent = 'Please fill in all fields.';
    return false;
  }
  if(user.length < 4){
    err.textContent = 'Username must be at least 4 characters.';
    return false;
  }
  if(pass.length < 6){
    err.textContent = 'Password must be at least 6 characters.';
    return false;
  }

  var remember = document.getElementById('remember') && document.getElementById('remember').checked;
  if(remember){
    try { localStorage.setItem('rememberedUser', user); } catch(e){}
  } else {
    try { localStorage.removeItem('rememberedUser'); } catch(e){}
  }

  // Frontend-only auth for assignment: redirect to home
  window.location.href = 'home.html';
  return false;
}

/* Pre-fill remembered username and init features */
window.addEventListener('DOMContentLoaded', function(){
  try {
    var r = localStorage.getItem('rememberedUser');
    if(r && document.getElementById('username')) document.getElementById('username').value = r;
  } catch(e){}
  updateDateTime();
  setInterval(updateDateTime, 1000);
  initSlideshow();
});

/* Date & time display */
function updateDateTime(){
  var el = document.getElementById('datetime');
  if(!el) return;
  var now = new Date();
  el.textContent = now.toLocaleString();
}

/* Slideshow */
var slideIndex = 0;
var slideTimer = null;

function initSlideshow(){
  var slides = document.querySelectorAll('.slide');
  if(!slides || slides.length === 0) return;

  // create dots
  var dotsContainer = document.getElementById('dots');
  if(dotsContainer){
    dotsContainer.innerHTML = '';
    slides.forEach(function(s, i){
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Slide ' + (i+1));
      b.addEventListener('click', function(){ showSlide(i); });
      dotsContainer.appendChild(b);
    });
  }

  showSlide(0);
  slideTimer = setInterval(function(){ changeSlide(1); }, 4000);
}

function showSlide(n){
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('#dots button');
  if(!slides || slides.length === 0) return;
  if(n >= slides.length) n = 0;
  if(n < 0) n = slides.length - 1;
  slideIndex = n;
  slides.forEach(function(s, i){
    s.style.display = (i === n) ? 'block' : 'none';
  });
  if(dots){
    dots.forEach(function(d, i){
      d.style.background = (i === n) ? '#333' : '#ddd';
    });
  }
  // reset timer
  if(slideTimer){
    clearInterval(slideTimer);
    slideTimer = setInterval(function(){ changeSlide(1); }, 4000);
  }
}

function changeSlide(delta){
  showSlide(slideIndex + delta);
}

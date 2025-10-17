/*=============== HOME SPLIT TEXT ===============*/
const { animate, text, stagger } = anime

const { chars: chars1 } = text.split('.home__profession-1', {chars: true})
const { chars: chars2 } = text.split('.home__profession-2', {chars: true})

animate(chars1, {
    y: [
        {to: ['100%', '0%'] },
        {to: '-100%', delay: 4000, ease: '10(3)'}
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(80),
    loop: true,
})


animate(chars2, {
    y: [
        {to: ['100%', '0%'] },
        {to: '-100%', delay: 4000, ease: '10(3)'}
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(80),
    loop: true,
})






/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
    loop: true,
    spaceBetween: 24,
    slidesPerView: 'auto',
    grabCursor: true,
    speed: 600,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
});

/*=============== WORK TABS ===============*/

const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetSelector = tab.dataset.target;
    const targetContent = document.querySelector(targetSelector);

    // Disable all content and deactivate all tabs
    tabContents.forEach((content) => content.classList.remove('work-active'));
    tabs.forEach((t) => t.classList.remove('work-active'));

    // Activate the clicked tab and its corresponding content
    tab.classList.add('work-active');
    targetContent.classList.add('work-active');
  });
});


/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button')

servicesButtons.forEach(button => {
    //Add your height to services info
    const heightInfo = document.querySelector('.services__info')
    heightInfo.computedStyleMap.height = heightInfo.scrollHeight + 'px'

    button.addEventListener('click', () => {
        const servicesCards = document.querySelectorAll('.services__card'),
              currentCard = button.parentNode,
              currentInfo = currentCard.querySelector('.services__info'),
              isCardOpen = currentCard.classList.contains('services-open')

        //Close all other services info
        servicesCards.forEach(card => {
            card.classList.replace('services-open', 'services-close')

            const info = card.querySelector('.services__info')
                  info.style.height = '0'
        })

        //Open only if not already open
        if(!isCardOpen){
            currentCard.classList.replace('services-close', 'services-open')
            currentInfo.style.height = currentInfo.scrollHeight + 'px'
        }  
    })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/
//Diplicate images to make the animatoin work
const tracks = document.querySelectorAll('.testimonials__content')

tracks.forEach(track => {
    const cards = [...track.children]

    //Duplicate cards only ones
    for(const card of cards){
        track.appendChild(card.cloneNode(true))
    }
})


/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn'),
      copyEmail = document.getElementById('contact-email').textContent

copyBtn.addEventListener('click', () => {
    //use the clipboard API to coyp text
    navigator.clipboard.writeText(copyEmail).then(() => {
        copyBtn.innerHTML = 'Email copied <i class="ri-check-line"></i>'

        //Restore the original text
        setTimeout(() => {
            copyBtn.innerHTML = 'copy email <i class="ri-file-copy-line"></i>'
        }, 2000)
        
    })
})
/*=============== CURRENT YEAR OF THE FOOTER ===============*/ 
const textYear = document.getElementById('footer-year')
      currentYear = new Date().getFullYear()

//Each year it is updated to the current year
textYear.textContent = currentYear;

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollY = window.scrollY; // ✅ Corrected: `window.scrollY`, not `document.window.scrollY`

  sections.forEach(section => {
    const id = section.id, // ✅ variable name fixed (was sections)
          top = section.offsetTop - 50, 
          height = section.offsetHeight,
          link = document.querySelector('.nav__menu a[href*=' + id + ']'); // ✅ removed extra space at end

    if (!link) return;

    // ✅ Add or remove class based on current scroll position
    link.classList.toggle('active-link', scrollY > top && scrollY <= top + height);
  });
};

window.addEventListener('scroll', scrollActive);

/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;

// Smooth animation variables
let currentX = 0, currentY = 0;
const speed = 0.15; // lower = smoother

const cursorMove = () => {
  if (!cursor) return;

  // Smooth follow animation (lerp)
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  // Apply styles
  cursor.style.left = `${currentX}px`;
  cursor.style.top = `${currentY}px`;
  cursor.style.transform = 'translate(-50%, -50%)';

  requestAnimationFrame(cursorMove);
};

// Track mouse movement
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Hide cursor on links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('mouseenter', () => cursor.classList.add('hide-cursor'));
  link.addEventListener('mouseleave', () => cursor.classList.remove('hide-cursor'));
});

cursorMove();


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
    // reset: true // Animation repeat
})

sr.reveal(`.home__image`)
sr.reveal(`.home__data`, {delay: 900, origin: 'bottom'})
sr.reveal(`.home__info`, {delay: 900, origin: 'bottom'})


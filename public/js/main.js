/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId)=>{
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle', 'nav-menu')

/*===== REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link')
    navMenu = document.getElementById('nav-menu')

function linkAction(){
    navMenu.classList.remove('show')    
}

navLink.forEach(n => n.addEventListener('click', linkAction) )


/*===== SCROLL SECTIONS ACTIVE LINK =====*/

const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
            sectionID = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*='+sectionID+']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*='+sectionID+']').classList.remove('active')
        }
    })
}

/*===== CHANGE COLOR HEADER =====*/ 
window.onscroll = ()=>{
    const nav = document.getElementById('header')
    if (this.scrollY >=200){
        nav.classList.add('scroll-header') 
    }else{
        nav.classList.remove('scroll-header')
    }
        
}

/*===== SWIPER CAROUSEL =====*/ 
const swiper = new Swiper('.testimonial__container', {
    // Optional parameters
    spaceBetween:16,
    loop: true,
    grabCursor:true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints:{
        640:{
            slidesPerview:2,
        },
        1024:{
            slidesPerview:3,
        },
    }
});
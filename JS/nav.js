const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

function openNav(){
    nav.classList.add('nav-active');

    //Animate Links
    navLinks.forEach((link, index) =>{
        link.style.animation = link.style.animation ? '' : link.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + 0.15}s`;
    });
}

function closeNav(){
    nav.classList.remove('nav-active');

    //Animate Links
    navLinks.forEach((link, index) =>{
        link.style.animation = link.style.animation ? '' : link.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + 0.15}s`;
    });
}

function toggleNav(){
    nav.classList.toggle('nav-active');

    //Animate Links
    navLinks.forEach((link, index) =>{
        link.style.animation = link.style.animation ? '' : link.style.animation = `navLinkFade 0.2s ease forwards ${index / 7 + 0.15}s`;
    });
}


function changePage(page_id, clicked = false){
    document.querySelectorAll(".page").forEach((page) => {
        page.classList.add("hidden");
    });
    document.querySelector(".navName").innerHTML = page_id.split("_")[1] === "home" ? "wyvern" : page_id.split("PAGE_")[1].replaceAll("_", " ");
    document.getElementById(page_id).classList.remove("hidden");
    if(clicked){
        closeNav();
    }
}
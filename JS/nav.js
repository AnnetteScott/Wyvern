const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')

    
    burger.addEventListener('click', () =>{
        //Toggle nav
        nav.classList.toggle('nav-active');

        //Animate Links
        navLinks.forEach((link, index) =>{
            link.style.animation = link.style.animation ? '' : link.style.animation = `navLinkFade 0.3s ease forwards ${index / 7 + 0.25}s`;
        });
    });
}

navSlide();


function changePage(page_id){
    document.querySelectorAll(".page").forEach((page) => {
        page.classList.add("hidden");
    });
    document.querySelector(".navName").innerHTML = page_id.split("_")[1] === "home" ? "wyvern" : page_id.split("_")[1];
    document.getElementById(page_id).classList.remove("hidden");
}
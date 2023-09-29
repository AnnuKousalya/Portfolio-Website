var prevTab = "home";
var navPresent = true;
var is_clicked = false;

const menuButton = document.querySelector("#Menu");
const Navbar = document.querySelector("#Navbar");
const MainContainer = document.querySelector("#MainContainer");

function changeTab(element){
    is_clicked = true;
    //handle navbar
    document.getElementById(prevTab).className = document.getElementById(prevTab).className.replace(" clicked","");
    element.className = element.className + " clicked";
    prevTab = element.id;
}

function hideNav(){
    Navbar.style.display = "None";
    MainContainer.style.marginLeft = "60px";
    menuButton.innerHTML = `<img src="./static/img/asset/menu.png" alt="menu" >`;
}

function showNav(){
    Navbar.style.display = "flex";
    if(window.innerWidth > 680)
        MainContainer.style.marginLeft = "290px";
    else
        MainContainer.style.marginLeft = "60px";
    //to prevent dislocation while on smaller width id scroll
    menuButton.innerHTML = `<img src="./static/img/asset/close.png" alt="menu" >`;
}


function menuClicked(){
    console.log("Clicked!!!")
    if(navPresent){
        hideNav();
        navPresent = false;
    }else{
        showNav();
        navPresent = true;
    }
}


const sectionButtons = document.querySelectorAll(".sectionButtons");

for(var i=0;i<sectionButtons.length;i++){
    sectionButtons[i].addEventListener("click",()=>{
        if(window.innerWidth<=680){
            Navbar.style.display = "None";
            MainContainer.style.marginLeft = "60px";
            menuButton.innerHTML = `<img src="./static/img/asset/menu.png" alt="menu" >`;
        }
    })
}

//highlight on scroll

var sections = document.getElementsByTagName('section');
var navigationLinks = document.getElementsByClassName('sectionButtons');
var navBar = document.getElementById('navbarSection');

// throttle function, enforces a minimum time interval
function throttle(fn, interval) {
	var lastCall, timeoutId;
	return function () {
		var now = new Date().getTime();
		if (lastCall && now < (lastCall + interval) ) {
			// if we are inside the interval we wait
			clearTimeout(timeoutId);
			timeoutId = setTimeout(function () {
				lastCall = now;
				fn.call();
			}, interval - (now - lastCall) );
		} else {
			// otherwise, we directly call the function 
			lastCall = now;
			fn.call();
		}
	};
}

function getOffset( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x };
}

function highlightNavigation() {
	// get the current vertical position of the scroll bar
	var scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

	// iterate the sections
	for (var i = sections.length-1; i >= 0; i--) {
		var currentSection = sections[i];
		// get the position of the section
		var sectionTop = getOffset(currentSection).top;
	   // if the user has scrolled over the top of the section  
		if (scrollPosition >= sectionTop - 250) {
			
			// remove .active class from all the links
			for (var j = 0; j < navigationLinks.length; j++) {
				navigationLinks[j].className = navigationLinks[j].className.replace('clicked', '');
			}

			// add .active class to the current link
			navigationLinks[i].className += (' clicked');
            
			if(!is_clicked) navBar.scrollTo({top: i*20, behavior: 'smooth'});
            else is_clicked=false;

			break;
		}
	}
}

window.addEventListener('scroll',throttle(highlightNavigation,150));


const storyWrapper = document.getElementById('storyWrapper');
const feedWrapper = document.getElementById('feedWrapper');
const mainHomeContent = document.getElementById('mainContentWrapper');
const profileContent = document.getElementById('profileContent');
const chatContent = document.getElementById('chatContent');
const searchContent = document.getElementById('searchContent');

let isDown = false;
let startX;
let scrollLeft;
let storyCount = 11;
let storyArray = document.getElementsByClassName('stories')
let startY;
let scrollDown;
let feedCount = 10;
//let boyNamesArray = ["Elias Johnson","Jason Born","Idris Patel","Lâm Nguyen","Corrin O'Connor","Junsu Kim"];
//let girlNamesArray = ["Ava Thompson","Maya Singh","Lina Chen","Nora Garcia","Sofia Rossi"];
let namesArray = ["Elias Johnson","Jason Born","Ava Thompson","Maya Singh","Idris Patel","Lina Chen","Corrin O'Connor","Nora Garcia","Sofia Rossi","Junsu Kim"];
//let orderArray = [1,1,0,0,1,0,1,8,0,0,1] //1=male, 0=female, 8=place
//let maleOrderRealArray = [0,1,4,6,9];
//let femaleOrderRealArray = [2,3,5,7,8];
let allNamesInOrderArray = ["Elias Johnson","Jason Born","Ava Thompson","Maya Singh","Idris Patel","Lina Chen","Corrin O'Connor","LNBTI","Nora Garcia","Sofia Rossi","Junsu Kim"];


//set views
profileContent.classList.add('hiddenElements')
chatContent.classList.add('hiddenElements')
searchContent.classList.add('hiddenElements')

//add stories, chats & search items
for (let i = 2; i < storyCount + 2; i++) {
    //stories
    storyWrapper.innerHTML += `<div class="stories" id="otherStory${i}"></div>`;
    const story = document.querySelector(`.stories:nth-child(${i})`);
    story.style.setProperty('--background-url', `radial-gradient(transparent 60%, black 80%),url('assets/profile${i-1}.jpg')`);

    //chats
    chatContent.innerHTML += `<div class="chats">
                <span id="chatIcon${i-1}" class="chatIcons"></span>${allNamesInOrderArray[i-2]}
            </div>`
    document.getElementById(`chatIcon${i-1}`).style.background = `radial-gradient(transparent 60%, black 80%),url('assets/profile${i-1}.jpg')`
    document.getElementById(`chatIcon${i-1}`).style.backgroundSize = "contain,contain"
    document.getElementById(`chatIcon${i-1}`).style.backgroundPosition = "center,center"
    document.getElementById(`chatIcon${i-1}`).style.backgroundRepeat = "no-repeat,no-repeat"

    //search
    searchContent.innerHTML += `<div class="chats searchable" id="searchingNames${i-1}">
                <span id="searchIcon${i-1}" class="chatIcons"></span>${allNamesInOrderArray[i-2]}
            </div>`
    document.getElementById(`searchIcon${i-1}`).style.background = `radial-gradient(transparent 60%, black 80%),url('assets/profile${i-1}.jpg')`
    document.getElementById(`searchIcon${i-1}`).style.backgroundSize = "contain,contain"
    document.getElementById(`searchIcon${i-1}`).style.backgroundPosition = "center,center"
    document.getElementById(`searchIcon${i-1}`).style.backgroundRepeat = "no-repeat,no-repeat"
}

//add feed
for (let i = 2; i < feedCount + 2; i++) {
    let randomNum = Math.round(Math.random()*11);
    let name = namesArray[i-2]

    //set feed elements
    feedWrapper.innerHTML += `<div class="card" id="card${i}">
                <section class="cardHeader">
                    <span class="feedThumbnails" id="feedThumbnail${i}"></span>
                    <h4>${name}</h4>
                </section>
                     <section class="cardImages" id="cardImage${i}"></section>
                     <section class="cardFooter">
                        <span class="cardFooterIcons" id="heartIcon${i}" onclick="changeIcon(${i}, 'heart')"></span>
                        <span class="cardFooterIcons"></span>
                        <span class="cardFooterIcons" onclick="changeIcon(${i}, 'save')" id="saveIcon${i}"></span>
                    </section>
            </div>`
    
    //set feed images
    document.getElementById(`cardImage${i}`).style.background = `url("assets/post${i}.jpg")`;
    document.getElementById(`cardImage${i}`).style.backgroundPosition = "center";
    document.getElementById(`cardImage${i}`).style.backgroundSize = "contain";
    document.getElementById(`cardImage${i}`).style.backgroundRepeat = "no-repeat";

    //set feed thumbnails
    if(i-1 < 8){    //account for image gap
        document.getElementById(`feedThumbnail${i}`).style.background = `url("assets/profile${i-1}.jpg")`;
        document.getElementById(`feedThumbnail${i}`).style.backgroundPosition = "center";
        document.getElementById(`feedThumbnail${i}`).style.backgroundSize = "contain";
        document.getElementById(`feedThumbnail${i}`).style.backgroundRepeat = "no-repeat";
    } else{
        document.getElementById(`feedThumbnail${i}`).style.background = `url("assets/profile${i}.jpg")`;
        document.getElementById(`feedThumbnail${i}`).style.backgroundPosition = "center";
        document.getElementById(`feedThumbnail${i}`).style.backgroundSize = "contain";
        document.getElementById(`feedThumbnail${i}`).style.backgroundRepeat = "no-repeat";
    }

    //set heart icons styles
    document.getElementById(`heartIcon${i}`).style.background = 'url("assets/heartTransparent.png")';
    document.getElementById(`heartIcon${i}`).style.backgroundSize = 'contain';
    document.getElementById(`heartIcon${i}`).style.backgroundRepeat = 'no-repeat';
    document.getElementById(`heartIcon${i}`).style.backgroundPosition = 'center';

    //set save icons styles
    document.getElementById(`saveIcon${i}`).style.background = 'url("assets/unsavedIcon.png")';
    document.getElementById(`saveIcon${i}`).style.backgroundSize = 'contain';
    document.getElementById(`saveIcon${i}`).style.backgroundRepeat = 'no-repeat';
    document.getElementById(`saveIcon${i}`).style.backgroundPosition = 'center';
}

// Add CSS rule for each story
const style = document.createElement('style');
document.head.appendChild(style);
for (let i = 2; i < storyCount + 2; i++) {
    style.sheet.insertRule(`
        .stories:nth-child(${i})::before {
            background-image: var(--background-url);
            background-size: contain;
            background-repeat: no-repeat;
        }
    `, style.sheet.cssRules.length);
}


//drag stories
storyWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    storyWrapper.classList.add('active');
    startX = e.pageX - storyWrapper.offsetLeft;
    scrollLeft = storyWrapper.scrollLeft;
});

storyWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    storyWrapper.classList.remove('active');
});

storyWrapper.addEventListener('mouseup', () => {
    isDown = false;
    storyWrapper.classList.remove('active');
});

storyWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - storyWrapper.offsetLeft;
    const walk = (x - startX) * 1; //scroll-fast
    storyWrapper.scrollLeft = scrollLeft - walk;
});

//drag feed
feedWrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    feedWrapper.classList.add('active');
    startY = e.pageY - feedWrapper.offsetTop;
    scrollTop = feedWrapper.scrollTop;
});

feedWrapper.addEventListener('mouseleave', () => {
    isDown = false;
    feedWrapper.classList.remove('active');
});

feedWrapper.addEventListener('mouseup', () => {
    isDown = false;
    feedWrapper.classList.remove('active');
});

feedWrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.pageY - feedWrapper.offsetTop;
    const walkY = (y - startY) * 1; //scroll-fast
    feedWrapper.scrollTop = scrollTop - walkY;
});

//change feed icons
function changeIcon(idNum, elementType){
    if(elementType == "heart"){
        let iconOne = document.getElementById(`heartIcon${idNum}`);
        let computedStyle1 = window.getComputedStyle(iconOne);

        if(computedStyle1.backgroundImage.includes('heartTransparent.png')){
            iconOne.style.backgroundImage = 'url("assets/heartRed.png")';
            iconOne.style.backgroundSize = 'contain';
            iconOne.style.backgroundPosition = 'center';
        } else{
            iconOne.style.backgroundImage = 'url("assets/heartTransparent.png")';
            iconOne.style.backgroundSize = 'contain';
            iconOne.style.backgroundPosition = 'center';
        }
    } else if(elementType == "save"){
        let iconTwo = document.getElementById(`saveIcon${idNum}`);
        let computedStyle2 = window.getComputedStyle(iconTwo);

        if(computedStyle2.backgroundImage.includes('unsavedIcon.png')){
            iconTwo.style.backgroundImage = 'url("assets/savedIcon.png")';
            iconTwo.style.backgroundSize = 'contain';
            iconTwo.style.backgroundPosition = 'center';
        } else{
            iconTwo.style.backgroundImage = 'url("assets/unsavedIcon.png")';
            iconTwo.style.backgroundSize = 'contain';
            iconTwo.style.backgroundPosition = 'center';
        }
    }
}

//navigations

function navBtnClick(navType){
    if(navType == 'profile'){
        mainHomeContent.classList.add('hiddenElements');
        chatContent.classList.add('hiddenElements');
        searchContent.classList.add('hiddenElements');
        profileContent.classList.remove('hiddenElements');
    } else if(navType == 'home'){
        mainHomeContent.classList.remove('hiddenElements');
        profileContent.classList.add('hiddenElements');
        searchContent.classList.add('hiddenElements');
        chatContent.classList.add('hiddenElements');
    } else if(navType == 'chat'){
        mainHomeContent.classList.add('hiddenElements');
        profileContent.classList.add('hiddenElements');
        chatContent.classList.remove('hiddenElements');
        searchContent.classList.add('hiddenElements');
    } else if(navType == 'search'){
        mainHomeContent.classList.add('hiddenElements');
        profileContent.classList.add('hiddenElements');
        chatContent.classList.add('hiddenElements');
        searchContent.classList.remove('hiddenElements');
    }
}

//notification alert
function notify(){
    alert('no new notifications')
}

//searching
function search() {
    const searchableRows = Array.from(document.getElementsByClassName('searchable'));
    const searchInput = document.getElementById('searchInput');

    let searched = searchInput.value.toLowerCase();
    console.log('Searched:', searched); // Debugging

    for (let i = 0; i < searchableRows.length; i++) {
        let rowText = searchableRows[i].textContent.toLowerCase().trim();
        console.log('Row Text:', rowText); // Debugging

        if (rowText.startsWith(searched)) {
            searchableRows[i].style.display = "";
        } else {
            searchableRows[i].style.display = "none";
        }
    }
}






// const searchableRows = document.getElementsByTagName('searchable');
// const searchInput = document.getElementById('searchInput');

// searchInput.addEventListener('keyup', function(event){
//     const searched = event.target.value.toLowerCase();

//     searchableRows.forEach((searchableRow) => {
//         searchableRow.getElementById("searchingNames").textContent.toLowerCase().startsWith(searched) ? (searchableRow.style.classList.remove('hiddenElement')) : (searchableRow.style.classList.add('hiddenElement'));
//     })
// })
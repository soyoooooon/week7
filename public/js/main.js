// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch

let userButtons = document.querySelectorAll('.u-link');
let lightBox = document.querySelector('.lightbox');

function getUserData(event){
    event.preventDefault();
    //1,2, or 3 depending on which achor tag you click
    let url = `/users/${this.getAttribute('href')}`;
    let currentImg = this.previousElementSibling.getAttribute('src');

    //this goes and fetches the database content (or an API endpoint)
    //that's why its called a fetch

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.currentSrc = currentImg;
            parseUserData(data);
        })
        .catch((err) => console.log(err));
};


function renderSocialMedia(media){
    return `<ul class="u-social">
       ${media.map(item =>`<li>${item}</li>`).join("")}</ul>`
       
};



    function parseUserData(person) {
        let targetDiv = lightBox.querySelector('.lb-content');
        let targetImg = lightBox.querySelector('img');
        let bioContent = `
        <p>${person.bio}</p>
        <h4>Social Media:</h4>
        <!-- loop thru social media stuff here -->   
         ${renderSocialMedia(person.social)}     
        `;

        targetDiv.innerHTML = bioContent;
        targetImg.src = person.currentSrc;
        lightBox.classList.add('show-lb');

    }

  


    userButtons.forEach(button => button.addEventListener("click" , getUserData ));

    lightBox.querySelector('.close').addEventListener("click", function(){
        lightBox.classList.remove('show-lb');
    });

})();
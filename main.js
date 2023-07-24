const word_el=document.getElementById(`word`);
const popup=document.getElementById(`popup-container`);
const messageEl=document.getElementById(`success-message`);
const wrongLetters_el=document.getElementById(`wrong-letters`);
const items = document.querySelectorAll(`.item`);
const message_el=document.getElementById(`message`);
const playAgainBtn =document.getElementById(`play-again`)



const correctLetters = [];
const wrongLetters=[];
let selectedWord = getRondomWord();



function getRondomWord(){
    const words=["metehan","dılan","beren","sevıyorum","aıle","dünyam"];
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord(){

    word_el.innerHTML = `
        ${selectedWord.split(``).map(letter => `
          <div class="letter">
             ${correctLetters.includes(letter) ? letter: ``}
          </div>
        ` ).join(``)}
    `;
    const w = word_el.innerText.replace(/\n/g,``);
    if(w === selectedWord){
        popup.style.display = `flex`;
        messageEl.innerText = `Tebrikler Kazandınız.`;
    }
}

function updateWorngLatters() {
    wrongLetters_el.innerHTML =`
        ${wrongLetters.length>0?`<h3>Hatalı Kelimeler</h3>`:``}
        ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;

    items.forEach((item,index) => {
        const errorCount = wrongLetters.length;

        if(index<errorCount) {
            item.style.display = `block`;
        }else{
            item.style.display=`none`;
        }
    })

    if(wrongLetters.length === items.length) {
        popup.style.display = `flex`;
        messageEl.innerText = `Kaybettiniz...`;
    }


}
function displayMassege(){
    message_el.classList.add(`show`);

    setTimeout(function(){
        message_el.classList.remove(`show`);
    }, 2000);
}

playAgainBtn.addEventListener(`click`, function(){
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRondomWord();
    displayWord();
    updateWorngLatters();

    popup.style.display=`none`;
})


window.addEventListener(`keydown`,function(e){
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else {
                displayMassege();
               message_el.classList.add(`show`);
               // bu harfi zaten eklediniz.
            }
        } else {
            if( !wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWorngLatters();
                //hatalı harfleri güncelle
            }else{
                displayMassege();
            }
        }

    }
})


displayWord();
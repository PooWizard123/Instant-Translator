
const texts = document.getElementById('convert-text');
const response = document.getElementById('response');
const selectTag = document.querySelectorAll('select');



window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

recognition.interimResults = true;

recognition.onresult = function(event) { 
    texts.value = event.results[0][0].transcript;
}


recognition.addEventListener('end', ()=> {
    //run the gpt function with texts.value
    if(texts.value != "") {
        translate()
    }
    recognition.start();
})


recognition.start();



function translate() {
    let text = texts.value
    let translateFrom = selectTag[0].value
    let translateTo = selectTag[1].value

    if(!text) return;
    response.setAttribute("placeholder", "Translating...")
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        response.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                response.value = data.translation;
            }
        })
        response.setAttribute("placeholder", "Translation");
    })

}





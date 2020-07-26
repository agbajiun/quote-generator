const quoteContainer = document.getElementById('quote-container');
const googleBtn = document.getElementById('google');
const newVerseBtn = document.getElementById('new-verse');
const bibleRef = document.getElementById('bible');
const verseText = document.getElementById('verse');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

//Get bible verse from API
async function getBibleVerse() {
    //Show Loader
    showLoadingSpinner();

    //Adding a proxy url to help get through the CORs policy error
    const proxyUrl = 'https://morning-waters-31503.herokuapp.com/'
    const apiUrl ='https://labs.bible.org/api/?passage=random&type=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        const results = data[0];
        let ref = results.bookname + " " + results.chapter + ":" + results.verse;
  
        bibleRef.innerHTML = ref;
        verseText.innerText = results.text;

        //Reduce font size for long quote
        if(results.text.length > 120){
            verseText.classList.add('long-quote');
        } else {
            verseText.classList.remove('long-quote')
        }
        //Stop loader
        removeLoadingSpinner();
    }  catch (error) {
        getBibleVerse();
        console.log("Whoops! no quote", error);
    }
}


//tweet Quote
function tweetVerse() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${verse} - ${text}`;
    window.open(twitterUrl, '_blank');
}

//add bible verse to google calendar
function addToGoogleCalendar() {
    const verse = bibleRef.innerText;
    const text = verseText.innerText;
    const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${verse} - ${text}`;
    window.open(googleCalendarUrl, '_blank');
}

//Event listeners
newVerseBtn.addEventListener('click', getBibleVerse);
googleBtn.addEventListener('click', addToGoogleCalendar);

//On Load
getBibleVerse();
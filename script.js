const quoteContainer = document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const googleBtn = document.getElementById('google');
const newQuoteBtn = document.getElementById('new-quote');
const newVerseBtn = document.getElementById('new-verse');
const bibleRef = document.getElementById('bible');
const verseText = document.getElementById('verse');
const loader = document.getElementById('loader');

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API using async fetch method
async function getQuote() {
    //Adding a proxy url to help get through the CORs policy error
    const proxyUrl = 'https://morning-waters-31503.herokuapp.com/'
    const apiUrl ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //If author is blank, add 'Unknown'
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        //Reduce font size for long quote
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        
    }  catch (error) {
        getQuote();
        //console.log("Whoops! no quote", error);
    }
}
//Get bible verse from API
async function getBibleVerse() {
    //Show Loader
    loading();

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
        complete();
    }  catch (error) {
        getBibleVerse();
        console.log("Whoops! no quote", error);
    }
}


//tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
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
//newQuoteBtn.addEventListener('click', getQuote);
newVerseBtn.addEventListener('click', getBibleVerse);
twitterBtn.addEventListener('click', tweetQuote);
googleBtn.addEventListener('click', addToGoogleCalendar);

//On Load
//getQuote();
getBibleVerse();
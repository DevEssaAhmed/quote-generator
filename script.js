const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader')

// Show Loading Spinner
function showLoadingSpinner() {
   loader.hidden = false;
   quoteContainer.hidden = true;
}

//Hide Loading Spinner
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// Get Quote from API
async function getQuote() {
    //Loading Function
    showLoadingSpinner()
     const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If AUthor is blank, add 'Unknown'
        if (data.quoteAuthor === '') {
            author.innerText = 'Unknown';
        } else {
                authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (quoteText.innerText.length > 100) {
                quoteText.classList.add('long-quote');
                quoteText.innerText = data.quoteText;
        } else {
                quoteText.classList.remove('long-quote');
                quoteText.innerText = data.quoteText;
        }
        // Stop Loading, ShowQuote
        removeLoadingSpinner();
        }catch (error) {
            console.log(error)
            while (error<10) {
                getQuote()
        }
        quoteText.innerText = "Can't Connect to Server";
        authorText.style.display = "none";
        
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author =  authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} (${author})`;
    window.open(twitterUrl, '_blank');
}
 
// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();

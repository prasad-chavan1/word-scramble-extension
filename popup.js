const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
let correctWord;

const initGame = async () => {
    try {
        const response = await fetch("https://raw.githubusercontent.com/prasad-chavan1/word-scramble-extension/main/words.json"); 
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const wordsData = await response.json();
        const randomObj = wordsData[Math.floor(Math.random() * wordsData.length)];
        let wordArray = randomObj.word.split("");
        for (let i = wordArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
        }
        wordText.innerText = wordArray.join("");
        hintText.innerText = randomObj.hint;
        correctWord = randomObj.word.toLowerCase();
        inputField.value = "";
        inputField.setAttribute("maxlength", correctWord.length);
        console.log(randomObj);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
const checkword = ()=>{
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) return alert("Please enter a correct word.");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word.`);
    else alert(`Congrats! ${userWord} is a correct word.`);
    initGame();
}


refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkword);

initGame();

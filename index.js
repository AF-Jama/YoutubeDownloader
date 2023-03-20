// client side 

const submitBtn = document.getElementById('submit-btn');
const textInput = document.getElementById("text-input");
const imageContainer = document.getElementById("youtube-video-image");
const cardContainer = document.getElementById("card-container"); 
const spinnerContainer = document.getElementById("spinner-container");
const errorContainer = document.getElementById("error-container");
const youtubeName = document.getElementById("youtube-info-name");
const youtubeDuration = document.getElementById("duration");
const liveStatus = document.getElementById("live-status");
const youtubeDescription = document.getElementById("description");
const downloadButtonContainer = document.getElementById("download-button-container");
const downloadButton = document.getElementById("download-tag");
const toggleContainer = document.getElementById("toggle-container");
const closeIcon = document.getElementById("close-icon");
const expandIcon = document.getElementById("expand-icon");
const selectContainer = document.getElementById("vid-select");


submitBtn.onclick = async (event)=>{
    event.preventDefault();

    // spinnerContainer.classList.toggle('spinner-border');
    // errorContainer.classList.toggle('hide-error-card');
    // console.log(spinnerContainer.classList)

    const textValue = textInput.value;

    let value = RegExp("^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$").test(textValue);
    let selectedValue = selectContainer.value; // returns select options

    if(!value || !selectedValue){
        textInput.parentElement.style.border = "1px solid red";

        setTimeout(()=>{
            textInput.parentElement.style.border = "0";
        },2000);

        return;
    }

    textInput.parentElement.style.border = "2px solid green";

    let res = await fetch(`http://44.203.215.184:5000?url=${textValue}`); // 

    // console.log(res);
    
    spinnerContainer.classList.add('spinner-border');

    res = await res.json();

    // console.log(selectedValue);

    // console.log(`Response is ${res}`);

    // spinnerContainer.classList.remove('spinner-border');

    if(!res){
        // triggered if res evaluates to false, card should be hidden and spinner should also be hidden and 
        console.log("TRIGGERED");
        cardContainer.classList.remove("show-card");
        cardContainer.classList.add('hide-card');   /* toggle card if class toggle exists then class is removed or if class does not exist then class is added */
        errorContainer.classList.remove("hide-error-card");
        spinnerContainer.classList.add("spinner-border");


        return;
    }
    
    // console.log("SHOW CARD");

    spinnerContainer.classList.remove("spinner-border");
    cardContainer.classList.remove('hide-card');
    cardContainer.classList.add("show-card");
    errorContainer.classList.add("hide-error-card");
    spinnerContainer.classList.remove("spinner-border");

    imageContainer.src = res.image;
    imageContainer.style.objectFit = "center";  
    youtubeName.innerHTML = (res.title)?res.title:"NA";
    liveStatus.innerHTML = (res.liveStatus)?res.liveStatus:"false";
    liveStatus.style.color =  (res.liveStatus)?"green":"red";
    downloadButton.href = `http://44.203.215.184:5000/download?url=${textValue}`;

    if(res.description){
        // triggered if description evaluates to true
        let text = res.description;
        if(text.length<=100){
            youtubeDescription.innerHTML = text;
            return;
        }
        text = text.substring(0,100); // returns first 100 characters within string
        youtubeDescription.innerHTML = text + "...";
    }

    // console.log(imageContainer);

}
    
//     ('click', async (event)=>{
//     event.preventDefault();

//     // let textValue = textInput.value;

//     // let value = RegExp("^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$").test(textValue);

//     // if(!value){    
//     //     textInput.parentElement.style.border = "1px solid red";

//     //     // setTimeout(()=>{
//     //     //     textInput.parentElement.style.border = "0";
//     //     // },2000);

//     //     return;
//     // }

//     // textInput.parentElement.style.border = "2px solid green";

//     let res = await fetch("http://localhost:5000/");

//     res = await res.json();

//     console.log(res);
//     return;


// })

const fetchData = async (URL)=>{
    let res = await fetch(URL);

    res = await res.json();

    return res; // returns promise value
}

expandIcon.onclick = (event)=>{
    event.preventDefault();

    toggleContainer.classList.remove("hide-toggle");
    toggleContainer.classList.add("show-toggle");
}

closeIcon.onclick = (event)=>{
    event.preventDefault();

    toggleContainer.classList.remove("show-toggle");
    toggleContainer.classList.add("hide-toggle");

    // console.log(selectContainer.value);
}
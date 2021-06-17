var prediction1 = '';
var prediction2 = '';
Webcam.set({
    height: 350,
    width: 350,
    image_format: 'png',
    png_quality: 100
});
console.log('ml5 version:', ml5.version);
camera = document.getElementById('camera');
Webcam.attach('#camera');
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-Poyoiadp/model.json', modelLoaded);

function takeSnap() {
    Webcam.snap(function(data_uri) {
        document.getElementById('result').innerHTML = '<img id="captureImage" src="' + data_uri + '"/>';
    });
}

function modelLoaded() {
    console.log('model loaded');
}

function speak() {
    var synth = window.speechSynthesis;
    var speakdat1 = 'hmm u look bad, your emotion is - ' + prediction1;
    var speakdat2 = 'hmm u look really bad, your emotion is - ' + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakdat1 + speakdat2);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captureImage');
    classifier.classify(img , gotResult);
}

function gotResult(error , results){
    if(error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById('paraEmoji1').innerHTML = results[0].label;
        document.getElementById('paraEmoji2').innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == 'happy'){
            document.getElementById('emoji1').innerHTML = '&#128522';   
        } 
        if(results[0].label == 'angry'){
          document.getElementById('emoji1').innerHTML = '&#128532';
        } 
        if(results[0].label == 'sad'){
            document.getElementById('emoji1').innerHTML = '&#128548';
        }
        if(results[1].label == 'happy'){
            document.getElementById('emoji2').innerHTML = '&#128522';
        }
        if(results[1].label == 'angry'){
            document.getElementById('emoji2').innerHTML = '&#128532';
        }
        if(results[1].label == 'sad'){
            document.getElementById('emoji2').innerHTML = '&#128548';
        }   
    }
}
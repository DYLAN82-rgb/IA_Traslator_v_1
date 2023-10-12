const microphone = document.getElementById('microphone');
const microphoneCircle = document.getElementById('microphone-circle');
const microphoneHead = document.getElementById('microphone-head');
const translationResult = document.getElementById('translation-result');
const translatedSpeech = document.getElementById('translated-speech');
let isMicrophoneOn = false;

// Variables para el reconocimiento de voz y traducción
let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES'; // Establece el idioma del reconocimiento
recognition.continuous = true; // Reconocimiento de voz continuo
let isTranslating = false; // Indica si se está traduciendo actualmente

microphone.addEventListener('click', () => {
    if (!isMicrophoneOn) {
        isMicrophoneOn = true;
        microphoneCircle.style.backgroundColor = '#00ff00'; // Verde para indicar que está encendido

        recognition.start();

        recognition.onresult = (event) => {
            let speech = event.results[event.results.length - 1][0].transcript;
            if (!isTranslating) {
                isTranslating = true;
                translateSpeech(speech);
            }
        };
    } else {
        isMicrophoneOn = false;
        microphoneCircle.style.backgroundColor = '#ff0000'; // Rojo para indicar que está apagado
        isTranslating = false;
        recognition.stop();
        translationResult.style.display = 'none'; // Oculta el resultado de la traducción
    }
});
//Store the 3 buttons in object

const player = document.querySelector('.player');

function clickHandler() {
    const buttons = Array.from(this.children);
    buttons.forEach(button => button.classList.toggle('hidden'))

};
player.addEventListener('click', clickHandler);
var buttons = {
    play: document.getElementById('btn-play'),
    pause: document.getElementById('btn-pause')
};


var Spectrum = WaveSurfer.create({
    container: document.querySelector("#audio-spectrum"),
    barWidth: 5,
    barHeight: 0.7,
    barGap: 3,
    height: 500,
    cursorColor: 'white',
    cursorWidth: 0.5,
    splitChannels: true,
    splitChannelsOptions: {
        overlay: true,
        relativeNormalization: true,
        channelColors: {
            0: {
                progressColor: '#03a9f4',
                // waveColor: 'pink',

            },
            1: {
                progressColor: '#03a9f4',
                // waveColor: 'purple'
            }
        }
    },
    plugins: [
        WaveSurfer.markers.create({
            markers: [
                {
                    time: 33,
                    label: "Introduction",
                    color: '#ff990a',
                    position: 'top',

                },
                {
                    time: 58,
                    label: "one-six",
                    color: 'lightgreen',
                    position: 'top'
                },
                {
                    time: 194,
                    label: "Rapport Building-Energy",
                    color: 'pink',
                    position: 'top'
                },
                {
                    time: 244,
                    label: "Polite",
                    color: 'blue',
                    position: 'top'
                },
                {
                    time: 303,
                    label: "Rapport Building-Empathy",
                    color: 'blue',
                    position: 'top'
                }
            ]
        })
    ],
    drawer: 'SplitWavePointPlot',
    plotArray: [
        [
            { time: 0.02, value: 10 },
            { time: 0.03, value: 20 },
            { time: 0.05, value: 120 },
            { time: 0.06, value: 119 }
        ]
    ],
    plotNormalizeTo: 2,
    plotMin: 2000,
    plotPointHeight: 5



});







//Handle play button
buttons.play.addEventListener("click", function () {
    Spectrum.play();

    buttons.pause.disabled = false;
    buttons.play.disabled = true;
}, false);

//Handle pause button
buttons.pause.addEventListener("click", function () {
    Spectrum.pause();


    buttons.pause.disabled = true;
    buttons.play.disabled = false;
}, false);


// Add a listener to enable the play button once it's ready
Spectrum.on('ready', function () {
    buttons.play.disabled = false;

});

// If you want a responsive mode (so when the user resizes the window)
// the spectrum will be still playable
window.addEventListener("resize", function () {
    // Get the current progress according to the cursor position
    var currentProgress = Spectrum.getCurrentTime() / Spectrum.getDuration();

    // Reset graph
    Spectrum.empty();
    Spectrum.drawBuffer();
    // Set original position
    Spectrum.seekTo(currentProgress);

    // Enable/Disable respectively buttons
    buttons.pause.disabled = true;
    buttons.play.disabled = false;
}, false);

// Load the audio file from your domain !
Spectrum.load('audioFile.mp3');





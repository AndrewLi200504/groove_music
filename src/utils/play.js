import * as Tone from "tone";

const MAX_DECIBELS = 20;
const MIN_DECIBELS = -20;
function percentageToDecibels(percentage) {
    if (percentage == 0) {
        return Number.NEGATIVE_INFINITY;
    }
    return MIN_DECIBELS + ((MAX_DECIBELS - MIN_DECIBELS) * percentage / 100);
}

export const defaultBpm = 120;
export function play(composition, bpm, volume) {
    const synth = new Tone.PolySynth().toDestination();
    const now = Tone.now();
    synth.volume.value = percentageToDecibels(volume);

    for (const track of composition) {
        for (const { tone, position, duration } of track) {
            synth.triggerAttackRelease(
                tone.replaceAll("\u266D", "b"),
                (duration * defaultBpm) / bpm,
                now + (position * defaultBpm) / bpm
            );
        }
    }
    return {
        stopPlaying: () => synth.disconnect().dispose(),
        setVolume: (volume) =>
            (synth.volume.value = percentageToDecibels(volume)),
    };
}
export function startMetronome(bpm) {
    const synthM = new Tone.Synth().toDestination();
    synthM.volume.value =  -10; 

    const metronome = new Tone.Loop(time => {
        synthM.triggerAttackRelease('C4', '32n', time);
      }, '4n');

    Tone.getTransport().bpm.value = bpm;
  
    Tone.start()
      .then(() => {
        metronome.start(0);
        Tone.getTransport().start();
      })
      return {
        stopMetronome: () => synthM.disconnect().dispose(),
    };
  }
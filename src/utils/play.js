import * as Tone from "tone";

export const defaultBpm = 120;
export const defaultVolume = 0;
export function play(composition, bpm, volume) {
  const synth = new Tone.PolySynth().toDestination();
  const now = Tone.now();
  synth.volume.value = volume;

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
    setVolume: (volume) => (synth.volume.value = volume),
  };
}

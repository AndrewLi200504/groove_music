import * as Tone from "tone";

export const defaultBpm = 120;
export function play(composition, bpm) {
  const synth = new Tone.PolySynth().toDestination();
  const now = Tone.now();

  for (const track of composition) {
    for (const { tone, position, duration } of track) {
      synth.triggerAttackRelease(
        tone.replaceAll("\u266D", "b"),
        (duration * defaultBpm) / bpm,
        now + (position * defaultBpm) / bpm
      );
    }
  }
  return () => synth.disconnect();
}

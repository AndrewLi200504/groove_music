import * as Tone from "tone";

export function play(composition) {
  const synth = new Tone.PolySynth().toDestination();
  const now = Tone.now();

  for (const track of composition) {
    for (const { tone, position, duration } of track) {
      synth.triggerAttackRelease(
        tone.replaceAll("\u266D", "b"),
        duration,
        now + position
      );
    }
  }
  return () => synth.disconnect();
}

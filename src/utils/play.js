import * as Tone from "tone";

export function play(composition) {
  const synth = new Tone.PolySynth().toDestination();
  const now = Tone.now();

  console.log(composition);
  for (const { tone, position, duration } of composition) {
    synth.triggerAttackRelease(
      tone.replaceAll("\u266D", "b") + "4",
      duration,
      now + position
    );
  }
}

import * as Tone from "tone";

export function play(composition) {
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();
  const now = Tone.now();

  for (let i = 0; i < composition.length; i++) {
    synth.triggerAttackRelease(composition[i], "4n", now + i);
  }
}

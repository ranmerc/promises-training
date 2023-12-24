import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const firstChain = async () => {
      await createPromise("A");

      await Promise.all([createPromise("B"), createPromise("C")]);

      await createPromise("D");
    };

    const secondChain = async () => {
      await createPromise("E");

      await Promise.all([createPromise("F"), createPromise("G")]);

      await createPromise("H");
    };

    await Promise.all([firstChain(), secondChain()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const firstChain = createPromise("A")
      .then(() => Promise.all([createPromise("B"), createPromise("C")]))
      .then(() => createPromise("D"));

    const secondChain = createPromise("E")
      .then(() => Promise.all([createPromise("F"), createPromise("G")]))
      .then(() => createPromise("H"));

    await Promise.all([firstChain, secondChain]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};

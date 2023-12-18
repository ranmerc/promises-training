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
      await createPromise("B");
      await createPromise("C");
    };

    const secondChain = async () => {
      await createPromise("D");
      await createPromise("E");
      await createPromise("F");
    };

    await Promise.all([firstChain(), secondChain()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const firstChain = createPromise("A")
      .then(() => createPromise("B"))
      .then(() => createPromise("C"));

    const secondChain = createPromise("D")
      .then(() => createPromise("E"))
      .then(() => createPromise("F"));

    return Promise.all([firstChain, secondChain]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};

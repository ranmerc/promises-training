import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const firstChain = async () => {
      await createPromise("B");
      await createPromise("D");
    };

    const secondChain = async () => {
      await createPromise("C");
      await createPromise("E");
    };

    await Promise.all([firstChain(), secondChain()]);

    await createPromise("F");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    const b = a.then(() => createPromise("B"));
    const d = b.then(() => createPromise("D"));

    const c = a.then(() => createPromise("C"));
    const e = c.then(() => createPromise("E"));

    return Promise.all([d, e]).then(() => createPromise("F"));
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};

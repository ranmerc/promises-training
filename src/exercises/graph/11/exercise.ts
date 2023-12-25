import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const c = (async () => {
      await Promise.any([a, b]);

      await createPromise("C");
    })();

    const d = (async () => {
      await Promise.all([a, b]);

      await createPromise("D");
    })();

    const e = (async () => {
      await Promise.any([a, b]);

      await createPromise("E");
    })();

    await Promise.all([c, d, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const c = Promise.any([a, b]).then(() => createPromise("C"));
    const d = Promise.all([a, b]).then(() => createPromise("D"));
    const e = Promise.any([a, b]).then(() => createPromise("E"));

    return Promise.all([c, d, e]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};

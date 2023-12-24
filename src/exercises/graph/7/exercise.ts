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
      await a;

      await createPromise("C");
    })();

    const d = (async () => {
      await Promise.all([a, b]);

      await createPromise("D");
    })();

    const e = (async () => {
      await Promise.all([b, c]);

      await createPromise("E");
    })();

    await Promise.all([d, e]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");
    const b = createPromise("B");

    const c = a.then(() => createPromise("C"));
    const d = Promise.all([a, b]).then(() => createPromise("D"));
    const e = Promise.all([c, b]).then(() => createPromise("E"));

    return Promise.all([d, e]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};

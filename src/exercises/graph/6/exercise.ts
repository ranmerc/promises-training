import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    const b = (async () => {
      await a;

      await createPromise("B");
    })();

    const c = (async () => {
      await a;

      await createPromise("C");
    })();

    const d = (async () => {
      await a;

      await createPromise("D");
    })();

    const e = (async () => {
      await Promise.all([b, c]);

      await createPromise("E");
    })();

    const f = (async () => {
      await Promise.all([c, d]);

      await createPromise("F");
    })();

    await Promise.all([e, f]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));
    const d = a.then(() => createPromise("D"));

    const e = Promise.all([b, c]).then(() => createPromise("E"));
    const f = Promise.all([c, d]).then(() => createPromise("F"));

    return Promise.all([e, f]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};

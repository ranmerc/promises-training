import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const chain = async () => {
      await Promise.all([createPromise("B"), createPromise("C")]);

      await createPromise("E");
    };

    await Promise.all([createPromise("D"), chain()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    return createPromise("A").then(() => {
      const chain = Promise.all([createPromise("B"), createPromise("C")]).then(
        () => createPromise("E")
      );

      return Promise.all([createPromise("D"), chain]);
    });
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const results = await Promise.allSettled(
      list.map(async (data) => await postData(data))
    );

    // reduce to expected resultant object directly
    // return results.reduce(
    //   (returnObject, result) => {
    //     if (result.status === "fulfilled") {
    //       return {
    //         ...returnObject,
    //         successes: returnObject.successes.concat(result.value),
    //       };
    //     } else {
    //       return {
    //         ...returnObject,
    //         errors: returnObject.errors.concat(result.reason),
    //       };
    //     }
    //   },
    //   {
    //     successes: [] as string[],
    //     errors: [] as string[],
    //   }
    // );

    const successes = results.reduce((successResults, result) => {
      if (result.status === "fulfilled") {
        return successResults.concat(result.value);
      }

      return successResults;
    }, [] as string[]);

    const errors = results.reduce((errorResults, result) => {
      if (result.status === "rejected") {
        return errorResults.concat(result.reason);
      }

      return errorResults;
    }, [] as string[]);

    return {
      successes,
      errors,
    };
  };

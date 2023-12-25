type Context = {
  getData: (data: string) => Promise<string>;
};

export default ({ getData }: Context) =>
  async (data: string) => {
    const MAX_RETRIES = 3;
    let retryCount = 0;
    let errors: unknown[] = [];

    while (retryCount <= MAX_RETRIES) {
      try {
        const result = await getData(data);

        return result;
      } catch (e) {
        errors = errors.concat(e);

        retryCount++;
      }
    }

    throw errors;
  };

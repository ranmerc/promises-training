type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const successes: string[] = [];
    const errors: unknown[] = [];

    for (const data of list) {
      try {
        const success = await postData(data);

        successes.push(success);
      } catch (e) {
        errors.push(e);
      }
    }

    return {
      successes,
      errors,
    };
  };

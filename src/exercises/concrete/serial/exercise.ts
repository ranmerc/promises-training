type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    let results: string[] = [];

    for (const data of list) {
      const result = await postData(data);

      results = results.concat(result);
    }

    return results;
  };

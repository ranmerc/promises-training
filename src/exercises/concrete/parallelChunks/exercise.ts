import { chunk } from "lodash";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const CHUNK_SIZE = 5;
    const results: string[] = [];

    let currentIndex = 0;
    while (currentIndex < list.length) {
      const endIndex = currentIndex + CHUNK_SIZE;

      // endIndex is not included in slice
      const listBatch = list.slice(currentIndex, endIndex);

      const batchResults = await Promise.all(
        listBatch.map(async (data) => await postData(data))
      );

      results.push(...batchResults);

      currentIndex = endIndex;
    }

    return results;
  };

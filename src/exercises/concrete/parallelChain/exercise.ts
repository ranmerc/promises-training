type Context = {
  firstStep: (data: string) => Promise<string>;
  secondStep: (data: string) => Promise<string>;
  thirdStep: (data: string) => Promise<string>;
};

export default ({ firstStep, secondStep, thirdStep }: Context) =>
  async (list: Array<string>) => {
    // using then
    // return Promise.all(
    //   list.map((data) => firstStep(data).then(secondStep).then(thirdStep))
    // );

    // using async await
    return Promise.all(
      list.map(async (data) => {
        const firstStepResult = await firstStep(data);
        const secondStepResult = await secondStep(firstStepResult);

        return thirdStep(secondStepResult);
      })
    );
  };

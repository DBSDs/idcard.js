import type Tesseract from "tesseract.js";
import {
  nameRecognize,
  sexRecognize,
  nationRecognize,
  birthdayRecognize,
  addressRecognize,
  cardRecognize,
} from "./pipe.js";

type TResult = {
  cardId: string | undefined;
  name: string | undefined;
  sex: string | undefined;
  nation: string | undefined;
  birthday: string | undefined;
  address: string | undefined;
  orginalData: Tesseract.Page;
};

async function recognize(
  image: Tesseract.ImageLike,
  options?: Partial<Tesseract.WorkerOptions>
) {
  const { createWorker } = (await import("tesseract.js")).default;
  const worker = await createWorker("chi_sim", 3, options);
  const ret = await worker.recognize(image);
  const data = ret.data;

  await worker.terminate();

  const recognizeResult: TResult = {
    orginalData: data,
  } as any;

  recognizeResult.name = nameRecognize(data);
  recognizeResult.sex = sexRecognize(data);
  recognizeResult.nation = nationRecognize(data);
  recognizeResult.birthday = birthdayRecognize(data);
  recognizeResult.address = addressRecognize(data);
  recognizeResult.cardId = cardRecognize(data);

  return recognizeResult;
}

export { recognize };

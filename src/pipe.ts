import type Tesseract from "tesseract.js";
import {
  name_regex,
  card_regex,
  sex_reg,
  nation_regex,
  birthday_regex,
  address_regex,
} from "./regex/index.js";

export function nameRecognize(data: Tesseract.Page) {
  const { lines } = data;
  let result: string | undefined = undefined;
  const name_matches = lines?.[0]?.text.match(name_regex);
  if (name_matches) {
    result = name_matches[1]
      .split(" ")
      .filter((item) => item)
      .join("");
  }
  return result;
}
export function sexRecognize(data: Tesseract.Page) {
  const { lines } = data;
  let result: string | undefined = undefined;
  const sex_matches = lines?.[1]?.text.match(sex_reg);
  if (sex_matches) {
    result = sex_matches[0];
  }
  return result;
}

export function nationRecognize(data: Tesseract.Page) {
  const { lines } = data;
  let result: string | undefined = undefined;
  const nation_matches = lines?.[1]?.text.match(nation_regex);
  if (nation_matches) {
    result = nation_matches[1];
  }
  return result;
}

export function birthdayRecognize(data: Tesseract.Page) {
  const { lines } = data;
  let result: string | undefined = undefined;
  const birthday = lines?.[2]?.words
    .slice(2)
    .map((item) => item.text)
    .join("");
  if (birthday_regex.test(birthday)) {
    result = birthday;
  }
  return result;
}

export function addressRecognize(data: Tesseract.Page) {
  const { lines } = data;
  let result: string | undefined = undefined;
  const addressLine = lines
    .slice(2, -1)
    .map((line) => line.words.map((item) => item.text).join(""))
    .join("");
  const address_matches = addressLine.match(address_regex);
  if (address_matches) {
    result = address_matches[0];
  }
  return result;
}

export function cardRecognize(data: Tesseract.Page) {
  const { lines } = data;
  let result: string | undefined = undefined;
  const card_matches = lines?.[6]?.text.match(card_regex);
  if (card_matches) {
    result = card_matches[0];
  }
  return result;
}

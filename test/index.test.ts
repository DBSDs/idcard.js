import { recognize } from "../dist";

test(
  "CDN recognize",
  async () => {
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const data = await recognize(file);
    // console.log(data, "recogize");
    // expect(recogize(1)).toBe(3);
  },
  5000 * 10
);

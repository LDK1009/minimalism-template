import { colors } from "./colors";

test("모든 색상 토큰은 무채색 hex 값이다", () => {
  for (const color of Object.values(colors)) {
    const channels = color.slice(1).match(/.{2}/g)?.map((channel) => parseInt(channel, 16));

    expect(channels).toHaveLength(3);
    expect(channels?.[0]).toBe(channels?.[1]);
    expect(channels?.[1]).toBe(channels?.[2]);
  }
});

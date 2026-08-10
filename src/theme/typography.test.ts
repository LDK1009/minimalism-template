import { typography } from "./typography";

test("타이포그래피 토큰은 크기와 줄 높이를 함께 정의한다", () => {
  expect(typography.display.fontSize).toBe(32);
  expect(typography.display.lineHeight).toBe(40);
  expect(typography.title.fontSize).toBe(24);
  expect(typography.body.lineHeight).toBe(24);
  expect(typography.caption.lineHeight).toBe(18);
});

import { render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { paperTheme } from "@/theme/theme";

import { AppText } from "./app-text";

test("AppText는 지정한 텍스트 변형을 렌더링한다", async () => {
  const rendered = await render(
    <PaperProvider theme={paperTheme}>
      <AppText variant="title">오늘의 기록</AppText>
    </PaperProvider>,
  );

  expect(rendered.getByText("오늘의 기록")).toBeTruthy();
});

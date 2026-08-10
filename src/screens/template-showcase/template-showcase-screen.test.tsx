import { render } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

import { paperTheme } from "@/theme/theme";

import { TemplateShowcaseScreen } from "./template-showcase-screen";

test("쇼케이스 화면은 템플릿 제목과 공통 UI를 렌더링한다", async () => {
  const rendered = await render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 320, height: 640 },
        insets: { top: 0, right: 0, bottom: 0, left: 0 },
      }}
    >
      <PaperProvider theme={paperTheme}>
        <TemplateShowcaseScreen />
      </PaperProvider>
    </SafeAreaProvider>,
  );

  expect(rendered.getByText("Minimalism Template")).toBeTruthy();
  expect(
    rendered.getByRole("button", { name: "Primary action" }),
  ).toBeTruthy();
});

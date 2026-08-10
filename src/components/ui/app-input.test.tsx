import { fireEvent, render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { paperTheme } from "@/theme/theme";

import { AppInput } from "./app-input";

test("AppInput은 입력값을 onChangeText로 전달한다", async () => {
  const onChangeText = jest.fn();
  const rendered = await render(
    <PaperProvider theme={paperTheme}>
      <AppInput
        label="제목"
        value=""
        placeholder="제목을 입력하세요"
        onChangeText={onChangeText}
      />
    </PaperProvider>,
  );

  fireEvent.changeText(
    rendered.getByPlaceholderText("제목을 입력하세요"),
    "새 제목",
  );

  expect(onChangeText).toHaveBeenCalledWith("새 제목");
});

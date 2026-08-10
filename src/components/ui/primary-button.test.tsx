import { fireEvent, render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { paperTheme } from "@/theme/theme";

import { PrimaryButton } from "./primary-button";

test("PrimaryButton은 누르면 onPress를 호출한다", async () => {
  const onPress = jest.fn();

  const rendered = await render(
    <PaperProvider theme={paperTheme}>
      <PrimaryButton label="확인" onPress={onPress} />
    </PaperProvider>,
  );

  fireEvent.press(rendered.getByRole("button", { name: "확인" }));

  expect(onPress).toHaveBeenCalledTimes(1);
});

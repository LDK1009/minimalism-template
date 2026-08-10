import { fireEvent, render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";

import { paperTheme } from "@/theme/theme";

import { EmptyState } from "./empty-state";

test("EmptyState는 actionLabel이 있으면 액션 버튼을 보여준다", async () => {
  const onAction = jest.fn();
  const rendered = await render(
    <PaperProvider theme={paperTheme}>
      <EmptyState
        title="아직 기록이 없습니다"
        actionLabel="추가"
        onAction={onAction}
      />
    </PaperProvider>,
  );

  fireEvent.press(rendered.getByRole("button", { name: "추가" }));

  expect(onAction).toHaveBeenCalledTimes(1);
});

import type { ReactElement } from "react";
import { render } from "@testing-library/react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { paperTheme } from "@/theme/theme";

export function renderWithTheme(element: ReactElement) {
  return render(
    <SafeAreaProvider
      initialMetrics={{
        frame: { x: 0, y: 0, width: 320, height: 640 },
        insets: { top: 0, right: 0, bottom: 0, left: 0 },
      }}
    >
      <PaperProvider theme={paperTheme}>{element}</PaperProvider>
    </SafeAreaProvider>,
  );
}

import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppInput } from "@/components/ui/app-input";
import { AppScreen } from "@/components/ui/app-screen";
import { AppText } from "@/components/ui/app-text";
import { EmptyState } from "@/components/ui/empty-state";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SecondaryButton } from "@/components/ui/secondary-button";
import { SurfaceCard } from "@/components/ui/surface-card";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function TemplateShowcaseScreen() {
  const [inputValue, setInputValue] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const handlePrimaryAction = () => {
    setActionMessage("기본 액션이 실행되었습니다.");
  };

  const handleSecondaryAction = () => {
    setActionMessage("보조 액션이 실행되었습니다.");
  };

  const handleEmptyStateAction = () => {
    setActionMessage("빈 상태 액션이 실행되었습니다.");
  };

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <AppText variant="caption" style={styles.eyebrow}>
          MINIMALISM TEMPLATE
        </AppText>
        <AppText variant="display">Minimalism Template</AppText>
        <AppText variant="body" style={styles.introduction}>
          흑색부터 백색까지의 토큰으로 구성한 앱 시작 화면입니다.
        </AppText>

        <SurfaceCard>
          <AppText variant="title">기본 UI</AppText>
          <AppText variant="body" style={styles.sectionDescription}>
            앱 목적에 맞는 화면을 이 컴포넌트 조합으로 시작합니다.
          </AppText>
          <AppInput
            label="앱 이름"
            value={inputValue}
            placeholder="앱 이름을 입력하세요"
            onChangeText={setInputValue}
          />
          <View style={styles.buttonGroup}>
            <PrimaryButton label="Primary action" onPress={handlePrimaryAction} />
            <SecondaryButton
              label="Secondary action"
              onPress={handleSecondaryAction}
            />
          </View>
          {actionMessage ? (
            <AppText variant="caption" style={styles.actionMessage}>
              {actionMessage}
            </AppText>
          ) : null}
        </SurfaceCard>

        <EmptyState
          title="아직 저장된 항목이 없습니다"
          description="첫 번째 항목을 추가하면 이 영역에 표시됩니다."
          actionLabel="Add item"
          onAction={handleEmptyStateAction}
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  eyebrow: {
    color: colors.graphite,
    letterSpacing: 1.2,
  },
  introduction: {
    color: colors.graphite,
  },
  sectionDescription: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.graphite,
  },
  buttonGroup: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  actionMessage: {
    marginTop: spacing.md,
    color: colors.graphite,
  },
});

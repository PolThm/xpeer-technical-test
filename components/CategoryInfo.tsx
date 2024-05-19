import { FC } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import transformFalsyString from '@/utils/transformFalsyString';

type Props = {
  label: string;
  value: string | undefined | null;
};

const CategoryInfo: FC<Props> = ({ label, value }) => {
  const borderColor = useThemeColor({}, 'border');

  return (
    <ThemedView style={[styles.infoContainer, { borderColor }]}>
      <ThemedText type="subtitle" style={styles.label}>
        {label}
      </ThemedText>
      <ThemedText style={styles.info}>{transformFalsyString(value)}</ThemedText>
    </ThemedView>
  );
};

interface Styles {
  infoContainer: ViewStyle;
  label: TextStyle;
  info: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  infoContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  info: {
    fontSize: 16,
  },
});

export default CategoryInfo;

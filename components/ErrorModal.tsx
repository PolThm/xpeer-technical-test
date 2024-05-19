import { FC } from 'react';
import { Modal, StyleSheet, View, Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const ErrorModal: FC<Props> = ({ visible, onClose }) => {
  const modalBackgroundColor = useThemeColor({}, 'card');
  const buttonBackgroundColor = useThemeColor({}, 'buttonBackground');
  const buttonTextColor = useThemeColor({}, 'buttonText');

  return (
    <Modal transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <ThemedView style={[styles.modalView, { backgroundColor: modalBackgroundColor }]}>
          <ThemedText style={styles.errorText}>
            Error fetching data. {'\n'} Please check your connection.
          </ThemedText>
          <Pressable
            onPress={onClose}
            style={[styles.closeButton, { backgroundColor: buttonBackgroundColor }]}>
            <ThemedText style={{ color: buttonTextColor }}>Close</ThemedText>
          </Pressable>
        </ThemedView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  errorText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
  },
});

export default ErrorModal;

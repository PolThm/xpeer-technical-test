import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import 'react-native-reanimated';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    GetSchwifty: require('../assets/fonts/get_schwifty.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // stale after 5 minutes
            gcTime: Infinity, // never garbage collect
            retry: 2, // retry failed requests twice
          },
        },
      }),
    []
  );

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
  });

  if (!loaded) {
    return null;
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <ThemedView style={{ flex: 1, paddingTop: 20 }}>
          <ThemedText
            style={{
              fontSize: 25,
              textAlign: 'center',
              padding: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              fontFamily: 'GetSchwifty',
            }}>
            Rick and Morty characters
          </ThemedText>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="character-details" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" options={{ headerShown: false }} />
          </Stack>
        </ThemedView>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}

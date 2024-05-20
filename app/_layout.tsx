import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useMemo } from 'react';
import 'react-native-reanimated';

import Header from '@/components/Header';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Paths } from '@/types';

const { CharactersList, CharacterDetails, NotFound } = Paths;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    GetSchwifty: require('../assets/fonts/get_schwifty.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
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

  const asyncStoragePersister = useMemo(
    () => createAsyncStoragePersister({ storage: AsyncStorage }),
    []
  );

  const theme = useMemo(() => (colorScheme === 'dark' ? DarkTheme : DefaultTheme), [colorScheme]);

  if (!loaded) return null;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}>
      <ThemeProvider value={theme}>
        <ThemedView style={{ flex: 1 }}>
          <Header />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={CharactersList} />
            <Stack.Screen name={CharacterDetails} />
            <Stack.Screen name={NotFound} />
          </Stack>
        </ThemedView>
      </ThemeProvider>
    </PersistQueryClientProvider>
  );
}

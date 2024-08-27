import { useUser } from '@clerk/clerk-expo';
import { Link, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const { user } = useUser();

  // const rootNavigationState = useRootNavigationState();

  // useEffect(() => {
  //   checkNavLoaded();
  // }, []);

  // const checkNavLoaded = () => {
  //   if (!rootNavigationState.key) return null;
  // };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Link href={'/login'}>
        <Text>Go to Login</Text>
      </Link>
    </View>
  );
}

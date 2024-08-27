import { View, Text, Image, Pressable } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth, useAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Colors from './../../constants/Colors';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const navigation = useNavigation();
  const { isSignedIn, isLoaded } = useAuth();
  useWarmUpBrowser();

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      navigation.replace('home');
    }
  }, [isSignedIn, isLoaded]);

  if (!isLoaded || isSignedIn) {
    // If auth state is loading or user is signed in, return null to avoid rendering
    return null;
  }

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        // setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  }, []);

  return (
    <View style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      <Image
        source={require('./../../assets/images/login.png')}
        style={{
          width: '100%',
          height: 600,
          marginBottom: 10,
        }}
      />
      <View style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, textAlign: 'center' }}>Ready to meet new friend?</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 18, textAlign: 'center', marginTop: 15, color: Colors.GRAY }}>
          Let's adopt the pet which you like and make their life happy again!
        </Text>
        <Pressable style={{ marginTop: 80, padding: 14, backgroundColor: Colors.PRIMARY, width: '100%', borderRadius: 14 }} onPress={onPress}>
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center' }}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

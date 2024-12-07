import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon
            name="chevron-back"
            size={24}
            color="white"
            backgroundColor="red"
            style={{borderRadius: 5}}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.headText}>Privacy & Policy</Text>
          <Text style={styles.letsGetSome}>You deserve better meal</Text>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.text}>
          Welcome to Food Market! Your privacy is important to us. This Privacy
          Policy explains how we collect, use, and protect your information when
          you use our app.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          - Personal Information: {'\n'}When you sign up, we collect details
          such as your name, email, and contact information.
          {'\n'}- Payment Information: {'\n'}For processing payments securely.
          {'\n'}- Device Information: {'\n'}To enhance app performance and user
          experience.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          - To provide personalized food recommendations.
          {'\n'}- To process your orders and payments.
          {'\n'}- To improve our app features and functionality.
        </Text>

        <Text style={styles.sectionTitle}>3. Sharing Your Information</Text>
        <Text style={styles.text}>
          We do not sell or rent your personal information. However, we may
          share your data with third-party services for:
          {'\n'}- Payment processing.
          {'\n'}- Delivery services.
          {'\n'}- Compliance with legal requirements.
        </Text>

        <Text style={styles.sectionTitle}>4. Security</Text>
        <Text style={styles.text}>
          We use advanced security measures to protect your data. However, no
          system is completely secure. Please ensure you use a strong password
          and avoid sharing your login details.
        </Text>

        <Text style={styles.sectionTitle}>5. Your Rights</Text>
        <Text style={styles.text}>
          - Access and update your information.
          {'\n'}- Delete your account and associated data.
          {'\n'}- Contact us with any privacy concerns.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to This Policy</Text>
        <Text style={styles.text}>
          We may update this Privacy Policy from time to time. We will notify
          you of any significant changes.
        </Text>

        <Text style={styles.text}>
          By using the app, you agree to the terms outlined in this Privacy
          Policy. If you have any questions, please contact our support team.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  letsGetSome: {
    fontSize: 13,
    fontWeight: '300',
    color: '#8d92a3',
  },
  head: {
    paddingLeft: 0,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    marginBottom: -10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -6,
  },
});

export default PrivacyPolicyScreen;

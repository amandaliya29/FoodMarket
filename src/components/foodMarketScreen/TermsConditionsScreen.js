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

const TermsConditionsScreen = () => {
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
          <Text style={styles.headText}>Terms & Conditions</Text>
          <Text style={styles.letsGetSome}>You deserve better meal</Text>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.text}>
          Welcome to Food Market! By using this app, you agree to the following
          terms and conditions. Please read them carefully before proceeding.
        </Text>

        <Text style={styles.sectionTitle}>1. Use of the App</Text>
        <Text style={styles.text}>
          - You must be at least 18 years old to use this app.
          {'\n'}- You are responsible for maintaining the confidentiality of
          your account details.
          {'\n'}- Unauthorized use of the app may result in suspension or legal
          action.
        </Text>

        <Text style={styles.sectionTitle}>2. Orders and Payments</Text>
        <Text style={styles.text}>
          - All orders placed through the app are subject to acceptance.
          {'\n'}- Prices and availability of food items are subject to change
          without notice.
          {'\n'}- You agree to provide accurate payment information for
          processing your orders.
        </Text>

        <Text style={styles.sectionTitle}>3. User Conduct</Text>
        <Text style={styles.text}>
          - You agree not to use the app for illegal or unauthorized purposes.
          {'\n'}- Any form of harassment, abuse, or disruption of the service is
          strictly prohibited.
        </Text>

        <Text style={styles.sectionTitle}>4. Limitation of Liability</Text>
        <Text style={styles.text}>
          - Food Market is not liable for any losses or damages arising from the
          use of this app.
          {'\n'}- You agree to use the app at your own risk.
        </Text>

        <Text style={styles.sectionTitle}>5. Termination</Text>
        <Text style={styles.text}>
          - We reserve the right to terminate or suspend access to the app at
          any time without prior notice.
        </Text>

        <Text style={styles.sectionTitle}>6. Changes to Terms</Text>
        <Text style={styles.text}>
          - We may update these Terms & Conditions at any time. Your continued
          use of the app indicates acceptance of the updated terms.
        </Text>

        <Text style={styles.text}>
          If you have any questions regarding these Terms & Conditions, please
          contact our support team.
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
    color: '#666',
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

export default TermsConditionsScreen;

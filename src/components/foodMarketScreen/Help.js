import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {Button, Card, Title, Paragraph} from 'react-native-paper';

const Help = () => {
  const navigation = useNavigation();
  const [isFaqOpen, setIsFaqOpen] = useState(null);

  const toggleFaq = index => {
    if (isFaqOpen === index) {
      setIsFaqOpen(null); // Close if clicked again
    } else {
      setIsFaqOpen(index); // Open the clicked FAQ
    }
  };

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
          <Text style={styles.headText}>Help & Support</Text>
          <Text style={styles.letsGetSome}>You deserve better meal</Text>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Card style={styles.card}>
          <Title style={styles.cardTitle}>Frequently Asked Questions</Title>
          <View style={styles.faqContainer}>
            {/* Question 1 */}
            <TouchableOpacity onPress={() => toggleFaq(1)}>
              <Text style={styles.faqQuestion}>How do I place an order?</Text>
            </TouchableOpacity>
            {isFaqOpen === 1 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- To place an order, simply select the food item you want
                and click on 'Add to Cart.' Afterward, proceed to checkout to
                finalize the order.
              </Paragraph>
            )}

            {/* Question 2 */}
            <TouchableOpacity onPress={() => toggleFaq(2)}>
              <Text style={styles.faqQuestion}>
                What payment methods are available?
              </Text>
            </TouchableOpacity>
            {isFaqOpen === 2 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- We accept credit card payments, PayPal, Apple Pay, and
                mobile payments like Google Pay.
              </Paragraph>
            )}

            {/* Question 3 */}
            <TouchableOpacity onPress={() => toggleFaq(3)}>
              <Text style={styles.faqQuestion}>How do I track my order?</Text>
            </TouchableOpacity>
            {isFaqOpen === 3 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- You can track your order in real-time through the 'Order
                Tracking' section in the app. You'll receive updates for each
                stage of your order.
              </Paragraph>
            )}

            {/* Additional Questions */}
            <TouchableOpacity onPress={() => toggleFaq(4)}>
              <Text style={styles.faqQuestion}>
                Can I change or cancel my order?
              </Text>
            </TouchableOpacity>
            {isFaqOpen === 4 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- Yes, you can change or cancel your order before it is
                confirmed by the restaurant. Go to the 'My Orders' section and
                select the order you want to modify.
              </Paragraph>
            )}

            <TouchableOpacity onPress={() => toggleFaq(5)}>
              <Text style={styles.faqQuestion}>What is the delivery time?</Text>
            </TouchableOpacity>
            {isFaqOpen === 5 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- Delivery times may vary depending on the restaurant and
                your location. Estimated delivery times are displayed during
                checkout and in the 'Order Tracking' section.
              </Paragraph>
            )}

            <TouchableOpacity onPress={() => toggleFaq(6)}>
              <Text style={styles.faqQuestion}>
                How do I apply a promo code?
              </Text>
            </TouchableOpacity>
            {isFaqOpen === 6 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- During checkout, you'll find a field to enter your promo
                code. Enter the code and click 'Apply' to see the discount
                reflected in your total.
              </Paragraph>
            )}

            <TouchableOpacity onPress={() => toggleFaq(7)}>
              <Text style={styles.faqQuestion}>
                What should I do if my food is delivered late?
              </Text>
            </TouchableOpacity>
            {isFaqOpen === 7 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- If your food is delivered late, you can contact our
                support team through the 'Help' section in the app. We’ll
                resolve the issue as quickly as possible.
              </Paragraph>
            )}

            <TouchableOpacity onPress={() => toggleFaq(8)}>
              <Text style={styles.faqQuestion}>
                How do I update my delivery address?
              </Text>
            </TouchableOpacity>
            {isFaqOpen === 8 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- You can update your delivery address by navigating to the
                'Profile' section and editing your saved addresses.
              </Paragraph>
            )}

            <TouchableOpacity onPress={() => toggleFaq(9)}>
              <Text style={styles.faqQuestion}>Why is my payment failing?</Text>
            </TouchableOpacity>
            {isFaqOpen === 9 && (
              <Paragraph style={styles.faqAnswer}>
                Ans :- Ensure your payment method is valid and that your
                internet connection is stable. If the problem persists, try
                another payment method or contact support.
              </Paragraph>
            )}
          </View>
        </Card>

        {/* Troubleshooting Section */}
        <Card style={styles.card}>
          <Title style={styles.cardTitle}>Troubleshooting</Title>
          <View style={styles.faqContainer}>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Why is my payment failing?</Text>
              <Paragraph style={styles.faqAnswer}>
                Ans :- Ensure that your payment method is valid and that your
                internet connection is stable. If the issue persists, try using
                a different payment method.
              </Paragraph>
            </View>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>Why can’t I find my order?</Text>
              <Paragraph style={styles.faqAnswer}>
                Ans :- Double-check that you're logged into the correct account.
                If the issue persists, check the 'Order Tracking' section or
                contact support.
              </Paragraph>
            </View>
          </View>
        </Card>

        {/* Account Issues Section */}
        <Card style={styles.card}>
          <Title style={styles.cardTitle}>Account Issues</Title>
          <View style={styles.faqContainer}>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>
                How do I reset my password?
              </Text>
              <Paragraph style={styles.faqAnswer}>
                Ans :- To reset your password, go to the login page and click on
                'Forgot Password?' Then follow the instructions to reset it via
                email.
              </Paragraph>
            </View>
            <View style={styles.faqItem}>
              <Text style={styles.faqQuestion}>
                How do I update my account details?
              </Text>
              <Paragraph style={styles.faqAnswer}>
                Ans :- You can update your account details by navigating to the
                'Profile' section in the app and selecting 'Edit Profile.'
              </Paragraph>
            </View>
          </View>
        </Card>

        {/* Contact Support Section */}
        <Card style={styles.card}>
          <Title style={styles.cardTitle}>Contact Support</Title>
          <Paragraph>
            Ans :- If you have any further questions or face issues that aren't
            covered here, feel free to reach out to our support team. We're here
            to help!
          </Paragraph>
        </Card>
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
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  faqContainer: {
    marginTop: 10,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 14,
    marginTop: 4,
    color: '#666',
  },
  contactButton: {
    marginTop: 16,
    backgroundColor: '#6200ea',
  },
});

export default Help;

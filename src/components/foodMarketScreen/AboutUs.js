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
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutUs = () => {
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
          <Text style={styles.headText}>About Us</Text>
          <Text style={styles.letsGetSome}>You deserve better meal</Text>
        </View>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.header}>
          <View
            style={{
              flex: 1,
              width: 120,
              height: 120,
              backgroundColor: 'red',
              alignContent: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 8,
              borderRadius: 60,
            }}>
            <Image
              source={require('../../assets/vector.png')}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>About FoodMarket</Text>
          <Text style={styles.subtitle}>
            Your trusted partner in delicious food delivery.
          </Text>
        </View>

        {/* Introduction Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who We Are</Text>
          <Text style={styles.sectionContent}>
            FoodMarket is a premier food delivery service dedicated to bringing
            a diverse range of cuisines to your doorstep. Established in 2020,
            we have partnered with thousands of restaurants to provide you with
            the best dining options, whether you’re craving local flavors or
            international delicacies.
          </Text>
        </View>

        {/* Mission Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionContent}>
            To create memorable dining experiences by delivering food from your
            favorite restaurants with speed, reliability, and exceptional
            customer service. We aim to bridge the gap between customers and
            culinary delights, offering convenience and satisfaction at every
            step.
          </Text>
        </View>

        {/* Vision Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.sectionContent}>
            To be the most preferred food delivery platform globally, empowering
            communities with innovative technology and sustainable practices. We
            strive to build a future where everyone can access quality food
            anytime, anywhere.
          </Text>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <Text style={styles.sectionContent}>
            - Seamless food delivery from top-rated restaurants{'\n'}- Exclusive
            promotions and loyalty rewards{'\n'}- Multiple payment methods for
            ease and security{'\n'}- User-friendly app for effortless browsing
            and ordering{'\n'}- 24/7 customer support for all your queries
          </Text>
        </View>

        {/* Our Team Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meet the Team</Text>
          <Text style={styles.sectionContent}>
            Our team is made up of passionate food lovers, technology
            enthusiasts, and customer-focused professionals. We work tirelessly
            to ensure that you enjoy an unparalleled food delivery experience.
            From our engineers and designers to our delivery partners, every
            member plays a critical role in our success.
          </Text>
        </View>

        {/* Sustainability Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Our Commitment to Sustainability
          </Text>
          <Text style={styles.sectionContent}>
            At FoodMarket, we are committed to minimizing our environmental
            impact. We use eco-friendly packaging, partner with sustainable
            restaurants, and actively contribute to community-driven
            initiatives. By choosing FoodMarket, you support a greener planet.
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.sectionContent}>
            We’re here to help! Reach out to us anytime at:{'\n'}
            <Text
              style={styles.link}
              onPress={() => Linking.openURL('mailto:support@foodmarket.com')}>
              Email: support@foodmarket.com
            </Text>
            {'\n'}
            Phone: +91 1234567890{'\n'}
            Address: 123 Food Street, Surat City, INDIA
          </Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 FoodMarket. Crafted with care and passion. All rights
            reserved.
          </Text>
        </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    size: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

export default AboutUs;

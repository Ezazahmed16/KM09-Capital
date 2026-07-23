import ContactUs from '@/components/Contact/ContactUs';
import React from 'react';
import SEO from '@/components/Shared/SEO';

const ContactPage = () => {
    return (
        <main>
            <SEO
                title="যোগাযোগ - KM09 CAPITAL সাপোর্ট ও অফিস ঠিকানা"
                description="KM09 CAPITAL এর সাথে যোগাযোগের অফিস ঠিকানা, ইমেইল এবং হেল্পলাইন নম্বর।"
            />
            <ContactUs />
        </main>
    );
};

export default ContactPage;
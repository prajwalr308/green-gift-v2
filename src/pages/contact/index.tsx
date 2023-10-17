import React from "react";
import Layout from "~/components/Layout";

const Contact = () => {
  return (
    <Layout>
      <section className="max-w-5xl mx-auto mt-16 px-6">
        <h1 className="text-3xl font-semibold mb-8">Contact GreenGift</h1>

        <p className="mb-6">
          We at GreenGift are always eager to hear from our community. Whether you have questions, suggestions, or just want to share your experience, we&apos;re here to help.
        </p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p>Email: <a href="mailto:info@greengift.com" className="underline">info@greengift.com</a></p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Our Address</h2>
          <p>GreenGift HQ</p>
          <p>123 Green Street</p>
          <p>Recycle City, 12345</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
          <p>Stay connected and get the latest updates from GreenGift:</p>
          <ul className="flex gap-4 mt-2">
            <li><a href="#" className="underline">Facebook</a></li>
            <li><a href="#" className="underline">Twitter</a></li>
            <li><a href="#" className="underline">Instagram</a></li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;

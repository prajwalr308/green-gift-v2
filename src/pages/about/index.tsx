import React from "react";
import Layout from "~/components/Layout";

const About = () => {
  return (
    <Layout>
      <section className="mx-auto mt-16 max-w-5xl px-6">
        <h1 className="mb-8 text-3xl font-semibold">About GreenGift</h1>

        <p className="mb-6">
          GreenGift is a community-driven platform dedicated to making the world
          a better place. We believe in the power of sharing and recycling,
          helping reduce waste and promoting sustainability one gift at a time.
        </p>

        <p className="mb-6">
          With millions of items discarded every year, many of which are in good
          or salvageable condition, we wanted to create a place where items like
          books, tools, tech, and other valuable resources could find a second
          home, rather than ending up in a landfill.
        </p>

        <p className="mb-6">
          Our platform allows individuals to donate their old or unwanted items
          to those in need. Whether it's a book that can enlighten another
          reader, a tool that can help someone with their craft, or tech that
          can bridge the digital divide, every item donated on GreenGift can
          make a difference in someone's life.
        </p>

        <p>
          We are proud to foster a community that believes in the importance of
          giving, sharing, and sustainability. Whether you're looking to donate
          items or find something you need, we invite you to be a part of the
          GreenGift journey.
        </p>
      </section>
    </Layout>
  );
};

export default About;

import React from "react";
import image from '../../assets/fullSnack.png';
import chief from '../../assets/Chief.png';
import { Link } from "react-router";

export default function About() {
  return (
    <div className="min-h-screen bg-base-100 dark:bg-gray-900 text-base-content dark:text-gray-100">
      {/* Header Section */}
      <section className="text-center py-25 bg-gradient-to-b from-primary/20 to-base-100 dark:to-gray-900">
        <h1 className="text-5xl font-bold mb-4 dark:text-gray-100">About Our Restaurant</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Experience the art of fine dining with a modern twist — where every
          dish tells a story of flavor, culture, and passion.
        </p>
      </section>

      {/* Who We Are */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={image}
          alt="restaurant interior"
          className="rounded-2xl shadow-xl object-cover w-100"
        />
        <div>
          <h2 className="text-3xl font-semibold mb-4 dark:text-gray-100">Who We Are</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            Founded in 2020, <span className="text-primary font-medium">FullSnack</span> was built on a
            simple idea: food should bring people together. Our chefs blend
            authentic ingredients with creative techniques to deliver dishes
            that are both comforting and exciting.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            From hand-crafted burgers to delicious desserts, every item on our
            menu is made with care and served with a smile.
          </p>
          <Link to={"/menu"} className="btn btn-primary">Explore Our Menu</Link>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-base-200 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-primary">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To serve meals that make every visit memorable. We believe in
              quality over quantity, and every plate we serve reflects our
              dedication to excellence.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-primary">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To be the most loved local restaurant brand, where customers
              always feel at home — whether dining in, ordering out, or just
              stopping by for dessert.
            </p>
          </div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          Meet Our <span className="text-primary">Chef</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <img
            src={chief}
            alt="chef"
            className="w-64 h-64 object-cover rounded-full shadow-lg"
          />
          <div className="max-w-md text-left">
            <h3 className="text-2xl font-bold mb-2 dark:text-gray-100">Chef Michael Adams</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3 italic">
              “Cooking is not just about recipes — it’s about love and
              creativity.”
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              With over 10 years of culinary experience, Chef Michael leads our
              kitchen with innovation and heart, blending modern techniques with
              traditional flavors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary text-primary-content text-center">
        <h3 className="text-2xl font-semibold">
          “Good food brings people together.”
        </h3>
        <p className="mt-2 opacity-90">— The FullSnack Family</p>
      </section>
    </div>
  );
}

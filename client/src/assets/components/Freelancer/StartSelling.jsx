import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';

const StartSelling = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const NavigateToSeller = () => {
    navigate("/freelancer/manage_gig");
  }

  const statsRef = useRef(null);
const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

  const categories = [
    { title: "Designer", class: "bg-[url('https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/be9e63fa588288b35991ed8e8c6550d9-1614861018529/designer.jpg')]" },
    { title: "Developer", class: "bg-[url('https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/699482a05db770305ba6f2fc7139b98a-1614861401148/developer.jpg')]" },
    { title: "Writer", class: "bg-[url('https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/cfe8db680cc2a8abc1b1e9b755011a4f-1614863917639/writer.jpg')]" },
    { title: "Marketer", class: "bg-[url('https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/be9e63fa588288b35991ed8e8c6550d9-1614861018521/video.jpg')]" },
    { title: "Musician", class: "bg-[url('https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/be9e63fa588288b35991ed8e8c6550d9-1614861018522/musician.jpg')]" },
    { title: "Voiceover Artist", class: "bg-[url('https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/be9e63fa588288b35991ed8e8c6550d9-1614861018521/voiceover.jpg')]" },
    { title: "Analyst", class: "bg-[url('https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/699482a05db770305ba6f2fc7139b98a-1614861401146/analyst.jpg')]" }
  ];

  

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen">
  <div className="absolute inset-0 overflow-hidden">
    <video 
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
      poster="//assetsv2.fiverrcdn.com/assets/v2_photos/packages-lp/bg-first-hero-d92a52e389008a9c36e1cb59634ae244.jpg"
    >
      <source src="https://sg.fiverrcdn.com/packages_lp/cover_video.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/40" />
  </div>

  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative h-full flex flex-col justify-center items-center text-center px-4"
  >
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
      Work Your <span className="text-green-400">Way</span>
    </h1>
    <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 md:mb-12 max-w-2xl">
      You bring the skill. We'll make earning easy.
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={NavigateToSeller}
      className="bg-green-500 text-white px-8 py-3 md:px-10 md:py-4 rounded-full text-lg md:text-xl"
    >
      Become a Seller
    </motion.button>
  </motion.div>

  {/* Stats Section - Now positioned absolutely within the video container */}
  <motion.div 
    ref={statsRef}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 20 }}
    transition={{ duration: 0.5 }}
    className="absolute bottom-0 left-0 w-full py-8 md:py-12 backdrop-blur-sm bg-[rgba(255,255,255,0.3)]                "
  >
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {[
        { title: 'A Gig is Bought Every', value: 4, suffix: 'sec' },
        { title: 'Transactions', value: 50, suffix: 'M+' },
        { title: 'Price Range', value: 10000, prefix: '$5 - $' },
      ].map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl md:text-4xl font-bold mb-2 text-white">
            {statsInView && (
              <CountUp
                start={0}
                end={stat.value}
                duration={2}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            )}
          </div>
          <p className="text-gray-300 text-sm md:text-base">{stat.title}</p>
        </div>
      ))}
    </div>
  </motion.div>
</section>

      <section className="py-12 md:py-20 bg-white">
  <div className="max-w-6xl mx-auto px-4">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12"
    >
      Join Our Freelance Community
    </motion.h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square rounded-xl overflow-hidden group"
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div 
            className={`absolute inset-0 ${category.class} bg-cover bg-center transition-transform duration-300 ${
              hoveredCard === index ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className={`absolute inset-0 transition-all duration-300 ${
            hoveredCard !== null 
              ? hoveredCard === index 
                ? 'bg-black/0' 
                : 'bg-black/60'
              : 'bg-black/40'
          }`}>
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-left">
              <h3 className="text-white text-lg md:text-xl leading-tight">
                I am
                <span className="block text-base md:text-lg font-medium mt-1">
                  {category.title}
                </span>
              </h3>
            </div>
          </div>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-100 aspect-square rounded-xl flex items-center justify-center p-6"
      >
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            What's<br />your skill?
          </h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={NavigateToSeller}
            className="bg-green-500 text-white px-6 py-2 md:px-8 md:py-3 rounded-full text-sm md:text-base"
          >
            Become a Seller
          </motion.button>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* How It Works */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16"
          >
            How It Works
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                title: 'Create Your Gig', 
                description: 'Showcase your skills with a beautiful service listing',
                icon: '🎨'
              },
              { 
                title: 'Deliver Excellence', 
                description: 'Connect with clients and deliver outstanding work',
                icon: '🚀'
              },
              { 
                title: 'Get Paid Securely', 
                description: 'Receive payments directly to your account',
                icon: '💸'
              },
            ].map((step, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-green-500">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-8">
            Start Your Freelance Journey Today
          </h2>
          <p className="text-gray-100 mb-8 md:mb-12 text-lg md:text-xl">
            Join millions of freelancers thriving in our global marketplace
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={NavigateToSeller}
            className="bg-white text-green-500 px-8 py-3 md:px-12 md:py-4 rounded-full text-lg md:text-xl font-semibold"
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default StartSelling;
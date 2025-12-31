import { useState } from "react";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    date: ""
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real implementation, you would send this data to your backend
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        date: ""
      });
    }, 3000);
  };

  // Google Maps Embed URL (Will be updated after web search)
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1dYOUR_LATITUDE_LONGITUDE!2dYOUR_LONGITUDE!3dYOUR_LATITUDE!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zYOUR_BUSINESS_NAME!5e0!3m2!1sen!2sin!4vYOUR_TIMESTAMP!5m2!1sen!2sin"; // Replace with actual embed URL

  return (
    <section id="contact" className="section-padding bg-primary/30 text-gray-800">
      <div className="container-custom">
        {/* Introduction Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-foreground/70 uppercase tracking-wider text-sm font-medium">
            Get In Touch
          </span>
          {/* Apply font-playfair and appropriate size/weight */}
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mt-2 mb-6 text-gray-800">
            Plan Your Luxury Experience
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Have questions or ready to book your tour? Reach out to our team for personalized assistance.
          </p>
        </div>

        {/* Contact Info and Form Section */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Column (4/12): Contact Info and Our Office (Stacked) */}
          <div className="md:col-span-4 space-y-8">
            {/* Contact Information Details */}
            <article className="bg-white rounded-xl shadow-md p-6">
              {/* Apply font-playfair and appropriate size/weight */}
              <h3 className="font-playfair text-2xl font-semibold mb-6 text-gray-800">Contact Information</h3>
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-full">
                    <Phone className="text-accent-foreground" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-800">Phone</h4>
                    <p className="text-gray-700">+91 7668312241</p>
                    <p className="text-sm text-gray-600">Only for registered clients</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-accent/20 p-3 rounded-full">
                    <Mail className="text-accent-foreground" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1 text-gray-800">Email</h4>
                    <p className="text-gray-700">info@tajheritage.com</p>
                    <p className="text-sm text-gray-600">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </article>

            {/* Office Address and Map Embed */}
            <article className="bg-white rounded-xl shadow-md p-6">
              {/* Apply font-playfair and appropriate size/weight */}
              <h3 className="font-playfair text-2xl font-semibold mb-2 text-gray-800">Our Office</h3>
              <p className="text-lg font-medium mb-2 text-gray-700">Taj Mahal East Gate Parking</p>
              {/* Formatted Address */}
              <p className="mb-4 leading-relaxed text-gray-700">
                (
                5383+G66, Telipara, Tajganj
                <br />
                Agra, Dhandhupura, Uttar Pradesh 282001
                <br />
                India
                )
              </p>
              <p className="text-sm text-gray-600 mb-6">
                Look for the main parking area near the East Gate entrance.
              </p>
            </article>
          </div>

          {/* Right Column (8/12): Contact Form */}
          <div className="md:col-span-8">
            <article className="bg-white rounded-xl shadow-md p-6 md:p-8 h-full">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-800">
                  <div className="bg-green-100 rounded-full p-4 mb-6">
                    <Send className="text-green-600" size={32} />
                  </div>
                  {/* Apply font-playfair and appropriate size/weight */}
                  <h3 className="font-playfair text-2xl font-semibold mb-4 text-gray-800">Thank You!</h3>
                  <p className="text-lg mb-2 text-gray-700">Your message has been sent successfully.</p>
                  <p className="text-gray-600">Our team will contact you shortly to assist with your inquiry.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                   {/* Apply font-playfair and appropriate size/weight */}
                  <h3 className="font-playfair text-2xl font-semibold mb-6 text-gray-800">Send Us a Message</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-700">
                        Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium mb-2 text-gray-700">
                        Date
                      </label>
                      <input 
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700">
                      Your Message
                    </label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="Tell us about your travel plans, questions, or special requests..."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 h-12 text-lg bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02] text-white"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-4">
                      We'll respond to your inquiry within 24 hours.
                    </p>
                  </div>
                </form>
              )}
            </article>
          </div>

          {/* Bottom Full Width (12/12): Business Hours */}
          <div className="md:col-span-12 mt-8">
            <article className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-playfair text-2xl font-semibold mb-4 text-gray-800">Business Hours</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium text-gray-700">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-700">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-gray-700">Closed</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "What is the best time to visit Agra?",
      answer: "The best time to visit Agra is during the cooler months from October to March. Summer (April to June) can be extremely hot, while the monsoon season (July to September) brings humidity. Winter mornings can be foggy, which might affect views of the monuments."
    },
    {
      question: "How many days should I spend in Agra?",
      answer: "While you can see the main attractions of Agra in one day, we recommend at least 2-3 days to fully appreciate the city's monuments, culture, and cuisine without rushing. This allows time for sunrise/sunset visits to the Taj Mahal and exploration of less-visited sites."
    },
    {
      question: "Is it worth visiting the Taj Mahal at sunrise?",
      answer: "Absolutely! The Taj Mahal at sunrise is a magical experience. The soft morning light brings out the delicate details of the marble and the monument is less crowded. Our sunrise tours are among our most popular options for this very reason."
    },
    {
      question: "Are your tours suitable for children?",
      answer: "Yes, most of our tours are family-friendly. We offer customized experiences for families with children, including interactive historical storytelling and child-friendly guides. Please mention children's ages when booking so we can tailor the experience appropriately."
    },
    {
      question: "What should I wear when visiting religious monuments?",
      answer: "Modest clothing is recommended when visiting religious sites. Both men and women should cover shoulders and knees. Comfortable footwear is essential as you'll be walking and removing shoes at certain monuments. We recommend carrying a scarf or shawl for added coverage when needed."
    },
    {
      question: "Do your tour packages include transportation?",
      answer: "Yes, all our tour packages include pick-up and drop-off services from your hotel in Agra. For guests arriving from Delhi or other cities, we can arrange transportation at an additional cost."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards, PayPal, and bank transfers. For local guests, we also accept cash payments. A 20% deposit is required to confirm your booking, with the remaining balance due on the day of the tour."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 72 hours before the scheduled tour receive a full refund. Cancellations within 48-72 hours receive a 50% refund. Unfortunately, we cannot offer refunds for cancellations made less than 48 hours before the tour. We understand circumstances change, so please contact us for special considerations."
    }
  ];

  return (
    <div className="fade-in">
      <h2 className="heading-md text-center mb-8">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQSection;

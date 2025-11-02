import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

interface ContactUsSectionProps {
  title?: string;
  address: string;
  email: string;
  phone: string;
}

const ContactUsSection: React.FC<ContactUsSectionProps> = ({
  title = "Contact Us",
  address,
  email,
  phone,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full text-center py-10 px-4 md:px-8"
    >
      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {title}
      </h2>

      {/* Contact Details */}
      <div className="space-y-4 text-gray-700 dark:text-gray-300 text-base md:text-lg">
        <div className="flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <p>{address}</p>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <a
            href={`mailto:${email}`}
            className="hover:underline text-blue-600 dark:text-blue-400"
          >
            {email}
          </a>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <a
            href={`tel:${phone}`}
            className="hover:underline text-blue-600 dark:text-blue-400"
          >
            {phone}
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactUsSection;

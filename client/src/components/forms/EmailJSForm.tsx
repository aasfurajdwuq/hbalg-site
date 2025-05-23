import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaTimes } from 'react-icons/fa';

// The service ID, template ID, and public key will need to be passed as props
interface EmailJSFormProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
  toEmail: string;
  onClose?: () => void;
  formType?: 'contact' | 'investor';
  title?: string;
}

const EmailJSForm: React.FC<EmailJSFormProps> = ({
  serviceId,
  templateId,
  publicKey,
  toEmail,
  onClose,
  formType = 'contact',
  title = 'Send Us a Message'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+213', // Default to Algeria
    phone: '',
    subject: formType === 'investor' ? 'Investment Opportunities' : 'General Inquiry',
    message: '',
    company: '' // Only used for investor form
  });
  
  const [status, setStatus] = useState({ message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setStatus({ message: '', isError: false });
    
    // Initialize EmailJS
    emailjs.init(publicKey);
    
    // Create the full phone number
    const fullPhone = formData.countryCode + ' ' + formData.phone;
    
    // Prepare the template parameters
    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      phone: fullPhone,
      subject: formData.subject,
      message: formData.message,
      to_email: toEmail,
      ...(formType === 'investor' && { company: formData.company })
    };
    
    try {
      await emailjs.send(serviceId, templateId, templateParams);
      setStatus({ message: '✅ Your message has been sent!', isError: false });
      // Reset the form
      setFormData({
        name: '',
        email: '',
        countryCode: '+213',
        phone: '',
        subject: formType === 'investor' ? 'Investment Opportunities' : 'General Inquiry',
        message: '',
        company: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus({ message: '❌ Something went wrong. Please try again.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Close form"
        >
          <FaTimes className="text-lg" />
        </button>
      )}
      
      <h1 className="text-3xl md:text-4xl font-bold mb-8">{title}</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">Your Name</label>
          <motion.input 
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Full name"
            required
          />
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <motion.input 
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="you@example.com"
            required
          />
        </div>
        
        {formType === 'investor' && (
          <div className="flex flex-col">
            <label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
            <motion.input 
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Your company name"
            />
          </div>
        )}
        
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="countryCode" className="text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="flex gap-2">
            <motion.select
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              id="countryCode"
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="w-1/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            >
              <option value="+93">🇦🇫 +93 Afghanistan</option>
              <option value="+355">🇦🇱 +355 Albania</option>
              <option value="+213">🇩🇿 +213 Algeria</option>
              <option value="+1684">🇦🇸 +1684 American Samoa</option>
              <option value="+376">🇦🇩 +376 Andorra</option>
              <option value="+244">🇦🇴 +244 Angola</option>
              <option value="+1264">🇦🇮 +1264 Anguilla</option>
              <option value="+672">🇦🇶 +672 Antarctica</option>
              <option value="+54">🇦🇷 +54 Argentina</option>
              <option value="+374">🇦🇲 +374 Armenia</option>
              <option value="+297">🇦🇼 +297 Aruba</option>
              <option value="+61">🇦🇺 +61 Australia</option>
              <option value="+43">🇦🇹 +43 Austria</option>
              <option value="+994">🇦🇿 +994 Azerbaijan</option>
              <option value="+1242">🇧🇸 +1242 Bahamas</option>
              <option value="+973">🇧🇭 +973 Bahrain</option>
              <option value="+880">🇧🇩 +880 Bangladesh</option>
              <option value="+1246">🇧🇧 +1246 Barbados</option>
              <option value="+375">🇧🇾 +375 Belarus</option>
              <option value="+32">🇧🇪 +32 Belgium</option>
              <option value="+501">🇧🇿 +501 Belize</option>
              <option value="+229">🇧🇯 +229 Benin</option>
              <option value="+1441">🇧🇲 +1441 Bermuda</option>
              <option value="+975">🇧🇹 +975 Bhutan</option>
              <option value="+591">🇧🇴 +591 Bolivia</option>
              <option value="+387">🇧🇦 +387 Bosnia & Herzegovina</option>
              <option value="+267">🇧🇼 +267 Botswana</option>
              <option value="+55">🇧🇷 +55 Brazil</option>
              <option value="+246">🇮🇴 +246 British Indian Ocean Territory</option>
              <option value="+1284">🇻🇬 +1284 British Virgin Islands</option>
              <option value="+673">🇧🇳 +673 Brunei</option>
              <option value="+359">🇧🇬 +359 Bulgaria</option>
              <option value="+226">🇧🇫 +226 Burkina Faso</option>
              <option value="+257">🇧🇮 +257 Burundi</option>
              <option value="+855">🇰🇭 +855 Cambodia</option>
              <option value="+237">🇨🇲 +237 Cameroon</option>
              <option value="+1">🇨🇦 +1 Canada</option>
              <option value="+238">🇨🇻 +238 Cape Verde</option>
              <option value="+345">🇰🇾 +345 Cayman Islands</option>
              <option value="+236">🇨🇫 +236 Central African Republic</option>
              <option value="+235">🇹🇩 +235 Chad</option>
              <option value="+56">🇨🇱 +56 Chile</option>
              <option value="+86">🇨🇳 +86 China</option>
              <option value="+61">🇨🇽 +61 Christmas Island</option>
              <option value="+61">🇨🇨 +61 Cocos (Keeling) Islands</option>
              <option value="+57">🇨🇴 +57 Colombia</option>
              <option value="+269">🇰🇲 +269 Comoros</option>
              <option value="+243">🇨🇬 +243 Congo (DRC)</option>
              <option value="+242">🇨🇩 +242 Congo (Republic)</option>
              <option value="+682">🇨🇰 +682 Cook Islands</option>
              <option value="+506">🇨🇷 +506 Costa Rica</option>
              <option value="+225">🇨🇮 +225 Côte d'Ivoire</option>
              <option value="+385">🇭🇷 +385 Croatia</option>
              <option value="+53">🇨🇺 +53 Cuba</option>
              <option value="+599">🇨🇼 +599 Curaçao</option>
              <option value="+357">🇨🇾 +357 Cyprus</option>
              <option value="+420">🇨🇿 +420 Czech Republic</option>
              <option value="+45">🇩🇰 +45 Denmark</option>
              <option value="+253">🇩🇯 +253 Djibouti</option>
              <option value="+1767">🇩🇲 +1767 Dominica</option>
              <option value="+1">🇩🇴 +1 Dominican Republic</option>
              <option value="+593">🇪🇨 +593 Ecuador</option>
              <option value="+20">🇪🇬 +20 Egypt</option>
              <option value="+503">🇸🇻 +503 El Salvador</option>
              <option value="+240">🇬🇶 +240 Equatorial Guinea</option>
              <option value="+291">🇪🇷 +291 Eritrea</option>
              <option value="+372">🇪🇪 +372 Estonia</option>
              <option value="+251">🇪🇹 +251 Ethiopia</option>
              <option value="+500">🇫🇰 +500 Falkland Islands</option>
              <option value="+298">🇫🇴 +298 Faroe Islands</option>
              <option value="+679">🇫🇯 +679 Fiji</option>
              <option value="+358">🇫🇮 +358 Finland</option>
              <option value="+33">🇫🇷 +33 France</option>
              <option value="+594">🇬🇫 +594 French Guiana</option>
              <option value="+689">🇵🇫 +689 French Polynesia</option>
              <option value="+241">🇬🇦 +241 Gabon</option>
              <option value="+220">🇬🇲 +220 Gambia</option>
              <option value="+995">🇬🇪 +995 Georgia</option>
              <option value="+49">🇩🇪 +49 Germany</option>
              <option value="+233">🇬🇭 +233 Ghana</option>
              <option value="+350">🇬🇮 +350 Gibraltar</option>
              <option value="+30">🇬🇷 +30 Greece</option>
              <option value="+299">🇬🇱 +299 Greenland</option>
              <option value="+1473">🇬🇩 +1473 Grenada</option>
              <option value="+590">🇬🇵 +590 Guadeloupe</option>
              <option value="+1671">🇬🇺 +1671 Guam</option>
              <option value="+502">🇬🇹 +502 Guatemala</option>
              <option value="+44">🇬🇬 +44 Guernsey</option>
              <option value="+224">🇬🇳 +224 Guinea</option>
              <option value="+245">🇬🇼 +245 Guinea-Bissau</option>
              <option value="+592">🇬🇾 +592 Guyana</option>
              <option value="+509">🇭🇹 +509 Haiti</option>
              <option value="+504">🇭🇳 +504 Honduras</option>
              <option value="+852">🇭🇰 +852 Hong Kong SAR</option>
              <option value="+36">🇭🇺 +36 Hungary</option>
              <option value="+354">🇮🇸 +354 Iceland</option>
              <option value="+91">🇮🇳 +91 India</option>
              <option value="+62">🇮🇩 +62 Indonesia</option>
              <option value="+98">🇮🇷 +98 Iran</option>
              <option value="+964">🇮🇶 +964 Iraq</option>
              <option value="+353">🇮🇪 +353 Ireland</option>
              <option value="+44">🇮🇲 +44 Isle of Man</option>
              <option value="+39">🇮🇹 +39 Italy</option>
              <option value="+1876">🇯🇲 +1876 Jamaica</option>
              <option value="+81">🇯🇵 +81 Japan</option>
              <option value="+44">🇯🇪 +44 Jersey</option>
              <option value="+962">🇯🇴 +962 Jordan</option>
              <option value="+7">🇰🇿 +7 Kazakhstan</option>
              <option value="+254">🇰🇪 +254 Kenya</option>
              <option value="+686">🇰🇮 +686 Kiribati</option>
              <option value="+383">🇽🇰 +383 Kosovo</option>
              <option value="+965">🇰🇼 +965 Kuwait</option>
              <option value="+996">🇰🇬 +996 Kyrgyzstan</option>
              <option value="+856">🇱🇦 +856 Laos</option>
              <option value="+371">🇱🇻 +371 Latvia</option>
              <option value="+961">🇱🇧 +961 Lebanon</option>
              <option value="+266">🇱🇸 +266 Lesotho</option>
              <option value="+231">🇱🇷 +231 Liberia</option>
              <option value="+218">🇱🇾 +218 Libya</option>
              <option value="+423">🇱🇮 +423 Liechtenstein</option>
              <option value="+370">🇱🇹 +370 Lithuania</option>
              <option value="+352">🇱🇺 +352 Luxembourg</option>
              <option value="+389">🇲🇰 +389 North Macedonia</option>
              <option value="+261">🇲🇬 +261 Madagascar</option>
              <option value="+265">🇲🇼 +265 Malawi</option>
              <option value="+60">🇲🇾 +60 Malaysia</option>
              <option value="+960">🇲🇻 +960 Maldives</option>
              <option value="+223">🇲🇱 +223 Mali</option>
              <option value="+356">🇲🇹 +356 Malta</option>
              <option value="+692">🇲🇭 +692 Marshall Islands</option>
              <option value="+596">🇲🇶 +596 Martinique</option>
              <option value="+222">🇲🇷 +222 Mauritania</option>
              <option value="+230">🇲🇺 +230 Mauritius</option>
              <option value="+262">🇾🇹 +262 Mayotte</option>
              <option value="+52">🇲🇽 +52 Mexico</option>
              <option value="+691">🇫🇲 +691 Micronesia</option>
              <option value="+373">🇲🇩 +373 Moldova</option>
              <option value="+377">🇲🇨 +377 Monaco</option>
              <option value="+976">🇲🇳 +976 Mongolia</option>
              <option value="+382">🇲🇪 +382 Montenegro</option>
              <option value="+1664">🇲🇸 +1664 Montserrat</option>
              <option value="+212">🇲🇦 +212 Morocco</option>
              <option value="+258">🇲🇿 +258 Mozambique</option>
              <option value="+95">🇲🇲 +95 Myanmar (Burma)</option>
              <option value="+264">🇳🇦 +264 Namibia</option>
              <option value="+674">🇳🇷 +674 Nauru</option>
              <option value="+977">🇳🇵 +977 Nepal</option>
              <option value="+31">🇳🇱 +31 Netherlands</option>
              <option value="+687">🇳🇨 +687 New Caledonia</option>
              <option value="+64">🇳🇿 +64 New Zealand</option>
              <option value="+505">🇳🇮 +505 Nicaragua</option>
              <option value="+227">🇳🇪 +227 Niger</option>
              <option value="+234">🇳🇬 +234 Nigeria</option>
              <option value="+683">🇳🇺 +683 Niue</option>
              <option value="+672">🇳🇫 +672 Norfolk Island</option>
              <option value="+850">🇰🇵 +850 North Korea</option>
              <option value="+1670">🇲🇵 +1670 Northern Mariana Islands</option>
              <option value="+47">🇳🇴 +47 Norway</option>
              <option value="+968">🇴🇲 +968 Oman</option>
              <option value="+92">🇵🇰 +92 Pakistan</option>
              <option value="+680">🇵🇼 +680 Palau</option>
              <option value="+970">🇵🇸 +970 Palestinian Territories</option>
              <option value="+507">🇵🇦 +507 Panama</option>
              <option value="+675">🇵🇬 +675 Papua New Guinea</option>
              <option value="+595">🇵🇾 +595 Paraguay</option>
              <option value="+51">🇵🇪 +51 Peru</option>
              <option value="+63">🇵🇭 +63 Philippines</option>
              <option value="+48">🇵🇱 +48 Poland</option>
              <option value="+351">🇵🇹 +351 Portugal</option>
              <option value="+1939">🇵🇷 +1939 Puerto Rico</option>
              <option value="+974">🇶🇦 +974 Qatar</option>
              <option value="+40">🇷🇴 +40 Romania</option>
              <option value="+7">🇷🇺 +7 Russia</option>
              <option value="+250">🇷🇼 +250 Rwanda</option>
              <option value="+590">🇧🇱 +590 Saint Barthélemy</option>
              <option value="+290">🇸🇭 +290 Saint Helena</option>
              <option value="+1869">🇰🇳 +1869 Saint Kitts & Nevis</option>
              <option value="+1758">🇱🇨 +1758 Saint Lucia</option>
              <option value="+590">🇲🇫 +590 Saint Martin</option>
              <option value="+508">🇵🇲 +508 Saint Pierre & Miquelon</option>
              <option value="+1784">🇻🇨 +1784 Saint Vincent & Grenadines</option>
              <option value="+685">🇼🇸 +685 Samoa</option>
              <option value="+378">🇸🇲 +378 San Marino</option>
              <option value="+239">🇸🇹 +239 São Tomé & Príncipe</option>
              <option value="+966">🇸🇦 +966 Saudi Arabia</option>
              <option value="+221">🇸🇳 +221 Senegal</option>
              <option value="+381">🇷🇸 +381 Serbia</option>
              <option value="+248">🇸🇨 +248 Seychelles</option>
              <option value="+232">🇸🇱 +232 Sierra Leone</option>
              <option value="+65">🇸🇬 +65 Singapore</option>
              <option value="+1721">🇸🇽 +1721 Sint Maarten</option>
              <option value="+421">🇸🇰 +421 Slovakia</option>
              <option value="+386">🇸🇮 +386 Slovenia</option>
              <option value="+677">🇸🇧 +677 Solomon Islands</option>
              <option value="+252">🇸🇴 +252 Somalia</option>
              <option value="+27">🇿🇦 +27 South Africa</option>
              <option value="+82">🇰🇷 +82 South Korea</option>
              <option value="+211">🇸🇸 +211 South Sudan</option>
              <option value="+34">🇪🇸 +34 Spain</option>
              <option value="+94">🇱🇰 +94 Sri Lanka</option>
              <option value="+249">🇸🇩 +249 Sudan</option>
              <option value="+597">🇸🇷 +597 Suriname</option>
              <option value="+47">🇸🇯 +47 Svalbard & Jan Mayen</option>
              <option value="+268">🇸🇿 +268 Eswatini</option>
              <option value="+46">🇸🇪 +46 Sweden</option>
              <option value="+41">🇨🇭 +41 Switzerland</option>
              <option value="+963">🇸🇾 +963 Syria</option>
              <option value="+886">🇹🇼 +886 Taiwan</option>
              <option value="+992">🇹🇯 +992 Tajikistan</option>
              <option value="+255">🇹🇿 +255 Tanzania</option>
              <option value="+66">🇹🇭 +66 Thailand</option>
              <option value="+670">🇹🇱 +670 Timor-Leste</option>
              <option value="+228">🇹🇬 +228 Togo</option>
              <option value="+690">🇹🇰 +690 Tokelau</option>
              <option value="+676">🇹🇴 +676 Tonga</option>
              <option value="+1868">🇹🇹 +1868 Trinidad & Tobago</option>
              <option value="+216">🇹🇳 +216 Tunisia</option>
              <option value="+90">🇹🇷 +90 Turkey</option>
              <option value="+993">🇹🇲 +993 Turkmenistan</option>
              <option value="+688">🇹🇻 +688 Tuvalu</option>
              <option value="+256">🇺🇬 +256 Uganda</option>
              <option value="+380">🇺🇦 +380 Ukraine</option>
              <option value="+971">🇦🇪 +971 United Arab Emirates</option>
              <option value="+44">🇬🇧 +44 United Kingdom</option>
              <option value="+1">🇺🇸 +1 United States</option>
              <option value="+598">🇺🇾 +598 Uruguay</option>
              <option value="+998">🇺🇿 +998 Uzbekistan</option>
              <option value="+678">🇻🇺 +678 Vanuatu</option>
              <option value="+58">🇻🇪 +58 Venezuela</option>
              <option value="+84">🇻🇳 +84 Vietnam</option>
              <option value="+681">🇼🇫 +681 Wallis & Futuna</option>
              <option value="+212">🇪🇭 +212 Western Sahara</option>
              <option value="+967">🇾🇪 +967 Yemen</option>
              <option value="+260">🇿🇲 +260 Zambia</option>
              <option value="+263">🇿🇼 +263 Zimbabwe</option>
            </motion.select>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="123-456-7890"
              required
            />
          </div>
        </div>
        
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2">Subject</label>
          <motion.select
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            required
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Agricultural Services">Agricultural Services</option>
            <option value="Investment Opportunities">Investment Opportunities</option>
            <option value="Partnership Proposal">Partnership Proposal</option>
            <option value="Other">Other</option>
          </motion.select>
        </div>
        
        <div className="flex flex-col md:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">Message</label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-32 resize-none"
            placeholder="How can we help you?"
            required
          ></motion.textarea>
        </div>
        
        <div className="md:col-span-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300 w-full"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                Send Message
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </motion.button>
          
          {status.message && (
            <div className={`mt-4 text-center ${status.isError ? 'text-red-600' : 'text-green-600'}`}>
              {status.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmailJSForm;
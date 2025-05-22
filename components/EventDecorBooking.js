import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className }) => <div className={`shadow-2xl rounded-3xl bg-white ${className}`}>{children}</div>;
const CardContent = ({ children, className }) => <div className={`p-8 md:p-10 ${className}`}>{children}</div>;
const Input = (props) => <input {...props} className={`border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 ${props.className || ''}`} />;
const Button = ({ children, ...props }) => <button {...props} className={`px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold shadow-md transition-all w-full ${props.className || ''}`}>{children}</button>;
const Calendar = ({ selected, onSelect, className }) => <input type='date' value={selected.toISOString().split('T')[0]} onChange={(e) => onSelect(new Date(e.target.value))} className={`border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 ${className}`} />;
const Textarea = (props) => <textarea {...props} className={`border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 ${props.className || ''}`} />;

export default function EventDecorBooking() {
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    notes: ''
  });
  const [price, setPrice] = useState(0);

  const pricing = {
    "Birthday Parties": 550,
    "Half Saree Functions": 850,
    "Wedding Anniversaries": 650,
    "Baby Showers": 650,
    "Corporate Events": 850,
    "Graduation Celebrations": 650,
    "Housewarmings": 750,
    "Themed Parties": 650
  };

  useEffect(() => {
    const basePrice = pricing[form.eventType] || 0;
    setPrice(basePrice);
  }, [form.eventType]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = encodeURIComponent(`Event Booking: ${form.eventType}`);
    const details = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nNotes: ${form.notes}`);
    const location = encodeURIComponent("Golden Elephant Events Venue or Client Location");
    const start = new Date(date);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const startTime = start.toISOString().replace(/-|:|\.\d\d\d/g, "").slice(0, 15);
    const endTime = end.toISOString().replace(/-|:|\.\d\d\d/g, "").slice(0, 15);

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}&sf=true&output=xml`;

    window.open(calendarUrl, '_blank');
    alert(`Appointment booked! Please scan the Zelle code to pay $${price}.`);
  };

  const eventList = Object.keys(pricing);

  return (
    <motion.div className="min-h-screen bg-gradient-to-b from-pink-50 via-rose-100 to-yellow-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-pink-600 tracking-tight leading-tight">Golden Elephant Events</h1>
          <p className="text-lg text-gray-700 mt-3">We specialize in Birthday Parties, Half Saree Functions, Weddings, Anniversaries & more!</p>
        </div>

        <Card>
          <CardContent>
            <h2 className="text-2xl font-bold text-rose-600 mb-6">Book Your Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
              <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
              <select name="eventType" value={form.eventType} onChange={handleChange} required className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400">
                <option value="">Select Event Type</option>
                {eventList.map((event, index) => (
                  <option key={index} value={event}>{event}</option>
                ))}
              </select>
              <Calendar selected={date} onSelect={setDate} />
              <Textarea name="notes" placeholder="Additional Notes" value={form.notes} onChange={handleChange} />
              <div className="text-lg font-bold text-pink-700">Estimated Price: ${price}</div>
              <Button type="submit">Book Appointment</Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-3 mt-12">
          <h3 className="text-xl font-semibold text-rose-500">Payment & Contact Information</h3>
          <p className="text-gray-600">For bookings and payment instructions, please contact us directly:</p>
          <p className="text-pink-700 font-medium">Richmond & Northern Virginia: (804) 244-6947</p>
          <p className="text-pink-700 font-medium">Florida: (305) 555-5678</p>
        </div>
      </div>
    </motion.div>
  );
}

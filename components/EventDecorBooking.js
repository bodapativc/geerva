import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className }) => <div className={`shadow-2xl rounded-3xl bg-white ${className}`}>{children}</div>;
const CardContent = ({ children, className }) => <div className={`p-8 md:p-10 ${className}`}>{children}</div>;
const Input = (props) => <input {...props} className={`border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-100$1`} />;
const Button = ({ children, ...props }) => <button {...props} className={`px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-lg font-semibold shadow-md transition-all w-full ${props.className || ''}`}>{children}</button>;
const Calendar = ({ selected, onSelect, className }) => (
  <input
    type="date"
    value={selected.toISOString().split('T')[0]}
    onChange={(e) => onSelect(new Date(e.target.value))}
    className={`border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-300 ${className || ''}`}
  />
);
const Textarea = (props) => <textarea {...props} className={`border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-400 ${props.className || ''}`} />;

export default function EventDecorBooking() {
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    const title = encodeURIComponent(`Event Booking: ${form.eventType}`);
    const details = encodeURIComponent(`Name: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nNotes: ${form.notes}`);
    const location = encodeURIComponent("Golden Elephant Events Venue or Client Location");
    const start = new Date(date);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

    const startTime = start.toISOString().replace(/-|:|\.\d\d\d/g, "").slice(0, 15);
    const endTime = end.toISOString().replace(/-|:|\.\d\d\d/g, "").slice(0, 15);

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}&sf=true&output=xml`;

    await fetch("https://formspree.io/f/mvoebjbg", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _replyto: form.email,
        name: `${form.firstName} ${form.lastName}`,
        phone: form.phone,
        message: `Event: ${form.eventType}\nDate: ${date.toDateString()}\nNotes: ${form.notes}`,
        to: "goldenjrva@gmail.com"
      })
    });

    window.open(calendarUrl, '_blank');
    alert(`Appointment booked! Confirmation sent to Golden Elephant Events.`);
  };

  const eventList = Object.keys(pricing);

  return (
    <motion.div className="min-h-screen bg-[#0b0935] text-white">
      <div className="max-w-3xl mx-auto bg-[#1c1a48] backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-[#FFD700]">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">Golden Elephant Events</h1>
          <p className="text-lg text-white mt-3">We specialize in Birthday Parties, Half Saree Functions, Weddings, Anniversaries & more!</p>
        </div>

        <Card>
          <CardContent>
            <h2 className="text-2xl font-bold text-white mb-6">Book Your Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
                <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
              </div>
              <Input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
              <Input name="phone" type="tel" maxLength={10} placeholder="Phone Number (10 digits)" value={form.phone} onChange={handleChange} required />
              <select name="eventType" className="text-gray-300 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400">
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
          <h3 className="text-xl font-semibold text-white">Payment & Contact Information</h3>
          <p className="text-white">For bookings and payment instructions, please contact us directly:</p>
          <p className="text-white font-medium">Richmond & Northern Virginia: (804) 244-6947</p>
          <p className="text-white font-medium">Florida: (305) 555-5678</p>
          <p className="text-white mt-4">
            <a href="https://www.instagram.com/golden_elephant_events?igsh=MWE0Y3k3eGc5bHVnMA==" target="_blank" rel="noopener noreferrer" className="underline font-medium">
              Follow us on Instagram
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

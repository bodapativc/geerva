import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className }) => <div className={`shadow rounded ${className}`}>{children}</div>;
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;
const Input = (props) => <input {...props} className={`border p-2 rounded w-full ${props.className || ''}`} />;
const Button = ({ children, ...props }) => <button {...props} className={`px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 text-white text-lg w-full ${props.className || ''}`}>{children}</button>;
const Calendar = ({ selected, onSelect, className }) => <input type='date' value={selected.toISOString().split('T')[0]} onChange={(e) => onSelect(new Date(e.target.value))} className={`border p-2 rounded w-full ${className}`} />;
const Textarea = (props) => <textarea {...props} className={`border p-2 rounded w-full ${props.className || ''}`} />;

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
    <motion.div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-yellow-100 p-8 max-w-3xl mx-auto space-y-8">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white">
        <div className="flex flex-col items-center space-y-3">
          <img
            src="https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/347645965_239697372079686_1870956674610927686_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Sy8yIBBiXKgQ7kNvwEq_zjY&_nc_oc=AdlvU9do6xd7sI1AT9HreG1rEypra8KJOVHDjtro2UW05IyM8DKwT6yZJoA062Yf4qI&_nc_zt=23&_nc_ht=scontent-iad3-1.xx&_nc_gid=wx7o92Locm6KS_QCvV5q8A&oh=00_AfJ5JY7K-NNZ4CGZgomqTihlSDhHi9G_FqP29Bqo7c3T8w&oe=683442F4"
            alt="Golden Elephant Logo"
            className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 border-white shadow-md"
          />
          <h1 className="text-4xl font-extrabold text-pink-600 text-center tracking-tight">Golden Elephant Events</h1>
        </div>
        <p className="text-center text-gray-700 mt-2">We specialize in Birthday Parties, Half Saree Functions, Weddings, Anniversaries & more!</p>

        <Card className="mt-6 bg-white rounded-2xl shadow-xl">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-rose-600">Book Your Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
              <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
              <select name="eventType" value={form.eventType} onChange={handleChange} required className="w-full border p-2 rounded-md">
                <option value="">Select Event Type</option>
                {eventList.map((event, index) => (
                  <option key={index} value={event}>{event}</option>
                ))}
              </select>
              <Calendar selected={date} onSelect={setDate} className="border rounded-xl" />
              <Textarea name="notes" placeholder="Additional Notes" value={form.notes} onChange={handleChange} />
              <div className="text-lg font-semibold text-pink-700">Estimated Price: ${price}</div>
              <Button type="submit">Book Appointment</Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center space-y-2 mt-8">
          <h3 className="text-lg font-semibold text-rose-500">Payment & Contact Information</h3>
          <p className="text-gray-600">For bookings and payment instructions, please contact us directly:</p>
          <p className="text-pink-700 font-medium">Richmond & Northern Virginia: (804) 244-6947</p>
          <p className="text-pink-700 font-medium">Florida: (305) 555-5678</p>
        </div>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Appointment booked! Please scan the Zelle code to pay.');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Golden Elephant Events</h1>
      <p className="text-center text-gray-600">We specialize in Birthday Parties, Half Saree Functions, Weddings, Anniversaries & more!</p>

      <div className="bg-white shadow p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-semibold">Book Your Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="eventType" placeholder="Event Type (e.g. Birthday, Half Saree)" value={form.eventType} onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="date" value={date.toISOString().split('T')[0]} onChange={(e) => setDate(new Date(e.target.value))} className="w-full border p-2 rounded" />
          <textarea name="notes" placeholder="Additional Notes" value={form.notes} onChange={handleChange} className="w-full border p-2 rounded" />
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded">Book Appointment</button>
        </form>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-lg font-medium">Payment via Zelle</h3>
        <p>Please scan the QR code below to complete your payment.</p>
        <img src="/zelle-qr-code.png" alt="Zelle QR Code" className="mx-auto w-48 h-48 rounded-xl shadow" />
      </div>
    </div>
  );
}

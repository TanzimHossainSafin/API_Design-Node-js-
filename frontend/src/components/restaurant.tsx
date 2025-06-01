import { useRef, useState } from 'react';
import axios from 'axios';

export default function Restaurant() {
    const nameRef = useRef<HTMLInputElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        const name = nameRef.current?.value?.trim();
        const location = locationRef.current?.value?.trim();
        const comment = commentRef.current?.value?.trim();
        if (!name || !location || !comment) {
            setError('Please fill all fields.');
            setLoading(false);
            return;
        }
        try {
            // restaurant create
            const res = await axios.post(
                'http://localhost:3000/app/v1/restaurant/restaurantreview',
                { name, location },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            const restaurantId = res.data.restaurant?.id;
            if (!restaurantId) throw new Error('Failed to create restaurant');
            // review create
            await axios.post(
                'http://localhost:3000/app/v1/review/customer',
                { comment, restaurantId },
                {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    },
                }
            );
            setSuccess('Restaurant and review created successfully!');
            if (nameRef.current) nameRef.current.value = '';
            if (locationRef.current) locationRef.current.value = '';
            if (commentRef.current) commentRef.current.value = '';
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center relative text-black"
            style={{
                backgroundImage: `url('/src/assets/restaurant.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay for dark effect */}
            <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 md:p-12 flex flex-col justify-center relative z-10">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Add a Restaurant & Review</h2>
                <p className="text-gray-500 mb-6">Create a new restaurant and leave your review</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Restaurant Name</label>
                        <input ref={nameRef} type="text" placeholder="Enter restaurant name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Location</label>
                        <input ref={locationRef} type="text" placeholder="Enter location" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Review Comment</label>
                        <input ref={commentRef} type="text" placeholder="Write your review" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition" type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
                <div className="mt-4 text-sm min-h-[24px]">
                    {error && <div className="text-red-500 text-center">{error}</div>}
                    {success && <div className="text-green-600 text-center">{success}</div>}
                </div>
            </div>
        </div>
    );
}

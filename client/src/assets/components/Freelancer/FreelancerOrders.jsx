import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FreelancerOrders = () => {
    const { freelancerId } = useParams();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/order/Freelancer_Orders?freelancerId=${freelancerId}`);
                if (!response.ok) throw new Error('Failed to fetch orders');
                const data = await response.json();
                setOrders(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [freelancerId]);

    const handleFileUpload = async (orderId) => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('orderId', orderId);
        formData.append('uploaderId', freelancerId);

        try {
            // Upload file
            const uploadResponse = await fetch('/api/order/Upload_File', {
                method: 'POST',
                body: formData
            });

            if (!uploadResponse.ok) throw new Error('File upload failed');

            // Update order status
            const updateResponse = await fetch(`/api/order/Update_Order?orderId=${orderId}&status=Completed`, {
                method: 'PUT'
            });

            if (!updateResponse.ok) throw new Error('Status update failed');

            // Update local state
            setOrders(orders.map(order => 
                order.orderId === orderId ? { 
                    ...order, 
                    status: 'Completed',
                    completionDate: new Date().toISOString() 
                } : order
            ));
            setSelectedOrder(prev => ({ ...prev, status: 'Completed' }));
            setFile(null);
            alert('Project delivered successfully!');
            
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div className="loading">Loading orders...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map(order => (
                    <div 
                        key={order.orderId}
                        className={`p-4 rounded-lg shadow-md cursor-pointer transition-all 
                            ${selectedOrder?.orderId === order.orderId ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'}
                            ${order.status === 'Completed' ? 'opacity-75' : ''}`}
                        onClick={() => setSelectedOrder(order)}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-lg font-semibold">Order #{order.orderId}</h3>
                                <p className="text-sm text-gray-600">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-sm 
                                ${order.status === 'Completed' ? 'bg-green-200 text-green-800' :
                                  order.status === 'Cancelled' ? 'bg-red-200 text-red-800' :
                                  'bg-yellow-200 text-yellow-800'}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="mt-2">
                            <p className="text-sm">
                                Client: {order.client?.firstName} {order.client?.lastName}
                            </p>
                            <p className="text-sm">
                                Due: {new Date(order.dueDate).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {orders.length === 0 && (
                <div className="mt-8 text-center text-gray-500">
                    No orders found for this freelancer
                </div>
            )}

            {selectedOrder && (
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">
                            Order #{selectedOrder.orderId} Details
                        </h2>
                        <button 
                            onClick={() => setSelectedOrder(null)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Close
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Client Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Client Information</h3>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">Name:</span> {selectedOrder.client?.firstName} {selectedOrder.client?.lastName}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span> {selectedOrder.client?.email}
                                </p>
                                <p>
                                    <span className="font-medium">Joined:</span> {new Date(selectedOrder.client?.joinDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-medium">Country:</span> {selectedOrder.client?.country}
                                </p>
                            </div>
                        </div>

                        {/* Package Details */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Package Details</h3>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">Type:</span> {selectedOrder.gigPackage?.packageType}
                                </p>
                                <p>
                                    <span className="font-medium">Price:</span> ${selectedOrder.gigPackage?.price}
                                </p>
                                <p>
                                    <span className="font-medium">Delivery Days:</span> {selectedOrder.gigPackage?.deliveryDays}
                                </p>
                                <p>
                                    <span className="font-medium">Description:</span> {selectedOrder.gigPackage?.description}
                                </p>
                            </div>
                        </div>

                        {/* Order Timeline */}
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Timeline</h3>
                            <div className="space-y-2">
                                <p>
                                    <span className="font-medium">Order Date:</span> {new Date(selectedOrder.orderDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-medium">Due Date:</span> {new Date(selectedOrder.dueDate).toLocaleDateString()}
                                </p>
                                {selectedOrder.completionDate && (
                                    <p>
                                        <span className="font-medium">Completed:</span> {new Date(selectedOrder.completionDate).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Project Delivery */}
                        {selectedOrder.status === 'In progress' && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Deliver Project</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Upload ZIP File
                                        </label>
                                        <input
                                            type="file"
                                            accept=".zip"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleFileUpload(selectedOrder.orderId)}
                                        disabled={!file}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    >
                                        Deliver Project
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FreelancerOrders;
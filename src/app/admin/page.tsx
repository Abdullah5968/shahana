import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 50,
  });

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-ivory p-8">
      <h1 className="text-3xl font-serif text-maroon mb-8">SHAHANA Admin</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total Orders" value={totalOrders.toString()} />
        <StatCard label="Pending Orders" value={pendingOrders.toString()} />
        <StatCard label="Total Sales" value={`PKR ${totalSales.toLocaleString()}`} />
      </div>

      <div className="bg-white border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500">
              <th className="p-4">Order #</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">City</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100">
                <td className="p-4 font-medium text-charcoal">{order.orderNumber}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.phone}</td>
                <td className="p-4">{order.city}</td>
                <td className="p-4">PKR {order.total.toLocaleString()}</td>
                <td className="p-4">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-200 p-6">
      <p className="text-xs text-gray-500 mb-2">{label}</p>
      <p className="text-2xl font-serif text-charcoal">{value}</p>
    </div>
  );
}
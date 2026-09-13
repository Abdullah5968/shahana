import { prisma } from "@/lib/db";
import OrderStatusSelect from "@/components/OrderStatusSelect";

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

      <div className="bg-white border border-gray-200 overflow-x-auto">
        <table className="text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-left text-gray-500 whitespace-nowrap">
              <th className="p-3">Order #</th>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Province</th>
              <th className="p-3">City</th>
              <th className="p-3">Area</th>
              <th className="p-3">Complete Address</th>
              <th className="p-3">Postal Code</th>
              <th className="p-3">Order Notes</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-100 align-top">
                <td className="p-3 font-medium text-charcoal whitespace-nowrap">
                  {order.orderNumber}
                </td>
                <td className="p-3 whitespace-nowrap">{order.customerName}</td>
                <td className="p-3 whitespace-nowrap">{order.phone}</td>
                <td className="p-3 whitespace-nowrap">{order.email || "-"}</td>
                <td className="p-3 whitespace-nowrap">{order.province}</td>
                <td className="p-3 whitespace-nowrap">{order.city}</td>
                <td className="p-3 whitespace-nowrap">{order.area}</td>
                <td className="p-3 min-w-[220px]">{order.address}</td>
                <td className="p-3 whitespace-nowrap">{order.postalCode || "-"}</td>
                <td className="p-3 min-w-[150px]">{order.notes || "-"}</td>
                <td className="p-3 whitespace-nowrap">
                  PKR {order.total.toLocaleString()}
                </td>
                <td className="p-3 whitespace-nowrap">
                  <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </td>
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
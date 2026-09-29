import React from 'react';

interface OrderBookProps {
  ltp: number;
}

export const OrderBook: React.FC<OrderBookProps> = ({ ltp }) => {
  // Generate 5 levels of realistic bids & asks around ltp
  const bids = [
    { orders: 42, qty: 12450, price: Number((ltp - 0.25).toFixed(2)) },
    { orders: 86, qty: 28900, price: Number((ltp - 0.50).toFixed(2)) },
    { orders: 120, qty: 45200, price: Number((ltp - 0.75).toFixed(2)) },
    { orders: 94, qty: 31050, price: Number((ltp - 1.00).toFixed(2)) },
    { orders: 210, qty: 89400, price: Number((ltp - 1.25).toFixed(2)) },
  ];

  const asks = [
    { price: Number((ltp + 0.25).toFixed(2)), orders: 38, qty: 11200 },
    { price: Number((ltp + 0.50).toFixed(2)), orders: 74, qty: 24500 },
    { price: Number((ltp + 0.75).toFixed(2)), orders: 110, qty: 39800 },
    { price: Number((ltp + 1.00).toFixed(2)), orders: 105, qty: 34100 },
    { price: Number((ltp + 1.25).toFixed(2)), orders: 185, qty: 78900 },
  ];

  const totalBuyQty = bids.reduce((acc, b) => acc + b.qty, 0);
  const totalSellQty = asks.reduce((acc, a) => acc + a.qty, 0);
  const buyRatio = (totalBuyQty / (totalBuyQty + totalSellQty)) * 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-3">
        <h3 className="font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
          <span>5-Level Market Depth</span>
          <span className="text-[10px] text-slate-400 font-normal">(Order Book)</span>
        </h3>
        <span className="text-[10px] font-mono-nums text-slate-500">Live Tick</span>
      </div>

      {/* Tables side-by-side */}
      <div className="grid grid-cols-2 gap-3">
        {/* BUY ORDERS */}
        <div>
          <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded flex justify-between uppercase">
            <span>Bid Price (₹)</span>
            <span>Orders / Qty</span>
          </div>
          <div className="divide-y divide-slate-100 font-mono-nums">
            {bids.map((b, idx) => (
              <div key={idx} className="flex justify-between py-1.5 px-1 hover:bg-slate-50 transition-colors">
                <span className="font-bold text-emerald-600">{b.price.toFixed(2)}</span>
                <span className="text-slate-600">
                  <span className="text-[10px] text-slate-400 mr-1">({b.orders})</span>
                  {b.qty.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SELL ORDERS */}
        <div>
          <div className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-1 rounded flex justify-between uppercase">
            <span>Orders / Qty</span>
            <span>Ask Price (₹)</span>
          </div>
          <div className="divide-y divide-slate-100 font-mono-nums">
            {asks.map((a, idx) => (
              <div key={idx} className="flex justify-between py-1.5 px-1 hover:bg-slate-50 transition-colors">
                <span className="text-slate-600">
                  {a.qty.toLocaleString('en-IN')}
                  <span className="text-[10px] text-slate-400 ml-1">({a.orders})</span>
                </span>
                <span className="font-bold text-rose-600">{a.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Totals & Ratio Bar */}
      <div className="mt-3 pt-2.5 border-t border-slate-200">
        <div className="flex justify-between font-mono-nums text-[11px] mb-1.5">
          <span className="font-bold text-emerald-700">
            Total Buy: {totalBuyQty.toLocaleString('en-IN')}
          </span>
          <span className="font-bold text-rose-700">
            Total Sell: {totalSellQty.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="w-full h-2 bg-rose-200 rounded-full overflow-hidden flex">
          <div
            className="h-full bg-emerald-500 transition-all duration-300"
            style={{ width: `${buyRatio}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Buyers: {buyRatio.toFixed(1)}%</span>
          <span>Sellers: {(100 - buyRatio).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

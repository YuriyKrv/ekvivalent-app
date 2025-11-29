import React from 'react';
import { ShoppingCart, Tag, Truck } from 'lucide-react';

const ProductCard = ({ title, supplier, price, type }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
    <div className="h-32 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400">
      <Truck size={32} />
    </div>
    <div className="flex justify-between items-start mb-2">
      <div>
        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{type}</span>
        <h3 className="font-bold text-slate-900 mt-2">{title}</h3>
        <p className="text-sm text-slate-500">{supplier}</p>
      </div>
    </div>
    <div className="mt-auto pt-4 border-t border-slate-100 flex justify-between items-center">
      <span className="font-bold text-lg text-slate-900">₴{price} <span className="text-xs text-slate-400 font-normal">/т</span></span>
      <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
        <ShoppingCart size={16} /> Купити
      </button>
    </div>
  </div>
);

export default function Marketplace() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Маркетплейс МТР</h2>
          <p className="text-slate-500">Обмінюйте зерно на пальне та добрива без грошей</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">Фільтри</button>
           <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Мої Замовлення</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <ProductCard title="Карбамід (Urea) N46" supplier="Eridon" price="28,500" type="Добрива" />
        <ProductCard title="Селітра аміачна" supplier="AgroSem" price="19,200" type="Добрива" />
        <ProductCard title="Дизельне пальне (Євро-5)" supplier="OKKO Agro" price="48,000" type="Пальне" />
        <ProductCard title="Pioneer P9911 (Кукурудза)" supplier="Corteva" price="4,500" type="Насіння (п.о.)" />
        <ProductCard title="NPK 16:16:16" supplier="Eridon" price="24,000" type="Добрива" />
        <ProductCard title="Roundup Power (Гербіцид)" supplier="Bayer" price="320" type="ЗЗР (л)" />
      </div>
    </div>
  );
}
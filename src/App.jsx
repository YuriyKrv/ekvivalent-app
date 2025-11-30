import React, { useState } from 'react';
// Імпортуємо ваш новий Лендінг (перевірте, що файл src/components/LandingPage.jsx існує!)
import LandingPage from './components/LandingPage'; 

// Імпортуємо графіки
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// Імпортуємо іконки
import { 
  LayoutDashboard, 
  Wallet, 
  ShoppingCart, 
  FileText, 
  BarChart3, 
  Settings, 
  Bell, 
  Wheat, 
  Sprout, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  DollarSign,
  Landmark,
  Truck,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

// --- ДАНІ ДЛЯ ДІАГРАМИ ---
const portfolioData = [
  { name: 'Пшениця (2.5k т)', value: 525000, color: '#d97706' },
  { name: 'Кукурудза (1.8k т)', value: 333000, color: '#facc15' },
  { name: 'Соняшник (1.1k т)', value: 418000, color: '#16a34a' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// --- КОМПОНЕНТ: МАРКЕТПЛЕЙС ---
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

const MarketplaceView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Каталог Пропозицій</h2>
        <p className="text-slate-500">Доступні товари для обміну за програмою "Врожай 2025"</p>
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
      <ProductCard title="Pioneer P9911 (Кукурудза)" supplier="Corteva" price="4,500" type="Насіння" />
      <ProductCard title="NPK 16:16:16" supplier="Eridon" price="24,000" type="Добрива" />
      <ProductCard title="Roundup Power (Гербіцид)" supplier="Bayer" price="320" type="ЗЗР (л)" />
      <ProductCard title="КАС-32" supplier="Grossdorf" price="16,800" type="Добрива" />
      <ProductCard title="AdBlue (20л)" supplier="OKKO Agro" price="850" type="Автохімія" />
    </div>
  </div>
);

// --- ЗАГАЛЬНІ КОМПОНЕНТИ (Card, GrainRow) ---
const Card = ({ title, value, subtext, trend, trendValue, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-slate-50 rounded-lg">
        <Icon className="w-6 h-6 text-slate-700" />
      </div>
      {trend && (
        <span className={`flex items-center text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {trendValue}
        </span>
      )}
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
    {subtext && <div className="text-slate-400 text-xs mt-1">{subtext}</div>}
  </div>
);

const GrainRow = ({ crop, type, elevator, volume, price, value, trend }) => (
  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
    <td className="py-4 px-4">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3 text-blue-700">
          {crop === 'Wheat' ? <Wheat size={20} /> : <Sprout size={20} />}
        </div>
        <div>
          <div className="font-medium text-slate-900">{crop}</div>
          <div className="text-xs text-slate-500">{type}</div>
        </div>
      </div>
    </td>
    <td className="py-4 px-4 text-slate-600 flex items-center gap-2">
      <Landmark size={14} className="text-slate-400"/> {elevator}
    </td>
    <td className="py-4 px-4 font-medium text-slate-900">{volume} т</td>
    <td className="py-4 px-4 text-slate-600">
      <div className="flex items-center gap-2">
        ${price}
        <span className={`text-xs ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      </div>
    </td>
    <td className="py-4 px-4 font-bold text-slate-900">${value}</td>
    <td className="py-4 px-4">
      <div className="flex gap-2">
        <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Продати
        </button>
        <button className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          Кредит
        </button>
      </div>
    </td>
  </tr>
);

// --- КОМПОНЕНТ: ГОЛОВНИЙ ЕКРАН (DASHBOARD) ---
const DashboardView = ({ setView }) => (
  <>
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card 
        title="Обсяг Зерна (Активи)" 
        value="5,400 т" 
        subtext="На 3 елеваторах"
        trend="up"
        trendValue="+12% до минулого року"
        icon={Wheat}
      />
      <Card 
        title="Оціночна Вартість" 
        value="$1,276,000" 
        subtext="За поточними спотовими цінами"
        trend="up"
        trendValue="+2.4% за тиждень"
        icon={DollarSign}
      />
      <Card 
        title="Доступний Кредитний Ліміт" 
        value="$350,000" 
        subtext="Pre-approved by Bushel Ukraine"
        trend="neutral"
        trendValue="Готовий до використання"
        icon={TrendingUp}
      />
    </div>

    {/* БЛОК: Grain Wallet + PIE CHART */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      
      {/* Ліва частина: Таблиця */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Grain Wallet</h2>
            <p className="text-sm text-slate-500">Ваші цифрові активи</p>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors">
            <Truck size={14} />
            Додати
          </button>
        </div>
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                <th className="py-3 px-4">Культура</th>
                <th className="py-3 px-4">Обсяг</th>
                <th className="py-3 px-4">Ціна</th>
                <th className="py-3 px-4">Вартість</th>
              </tr>
            </thead>
            <tbody>
              <GrainRow crop="Wheat" type="Class 2" elevator="Nibulon" volume="2,500" price="210" value="525,000" trend={1.2} />
              <GrainRow crop="Corn" type="Grade 3" elevator="Kernel" volume="1,800" price="185" value="333,000" trend={-0.5} />
              <GrainRow crop="Sunflower" type="High Oleic" elevator="MHP" volume="1,100" price="380" value="418,000" trend={2.8} />
            </tbody>
          </table>
        </div>
      </div>

      {/* Права частина: Діаграма */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Структура Портфелю</h2>
        <div className="flex-1 min-h-[250px] relative">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie
                 data={portfolioData}
                 cx="50%"
                 cy="50%"
                 innerRadius={60}
                 outerRadius={80}
                 paddingAngle={5}
                 dataKey="value"
                 label={renderCustomizedLabel}
                 labelLine={false}
               >
                 {portfolioData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Pie>
               <Tooltip 
                  formatter={(value) => `$${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
               />
               <Legend verticalAlign="bottom" height={36}/>
             </PieChart>
           </ResponsiveContainer>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-4 text-center pointer-events-none">
              <div className="text-xs text-slate-400 font-medium uppercase">Всього</div>
              <div className="text-xl font-bold text-slate-900">$1.27M</div>
           </div>
        </div>
      </div>
    </div>

    {/* BANNER CROSSCHECK */}
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-100 rounded-full opacity-50 blur-xl"></div>
      
      <div className="flex items-center gap-4 z-10">
        <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 shadow-sm">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg">Плануєте експорт в ЄС?</h3>
          <p className="text-sm text-slate-600 max-w-xl">
             Для доступу до преміальних ринків потрібна сертифікація сталості. Перейдіть на платформу <span className="font-bold text-emerald-700">Crosscheck</span> для швидкої сертифікації ISCC.
          </p>
        </div>
      </div>
      
      <a 
        href="https://www.crossxcheck.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-emerald-600 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2 whitespace-nowrap z-10 group"
      >
        Перейти до Crosscheck 
        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform"/>
      </a>
    </div>

    {/* Quick Actions & Market Ticker */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
       <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2">Потрібні добрива?</h3>
            <p className="text-blue-100 text-sm mb-4">Обміняйте ваше зерно на МТР без грошей через аграрну ноту. Миттєве погодження.</p>
          </div>
          <button 
            onClick={() => setView('marketplace')}
            className="bg-white text-blue-700 px-4 py-3 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors w-fit shadow-md"
          >
            Перейти в Маркетплейс →
          </button>
       </div>
       
       <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Ринкові Індикатори (CPT Одеса)</h3>
          <div className="space-y-4 mt-4">
             <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                   <span className="font-medium text-slate-600">Пшениця (Фураж)</span>
                   <span className="font-bold text-green-600">$188 (+2$)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                   <div className="bg-green-500 h-full w-3/4"></div>
                </div>
             </div>
             
             <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                   <span className="font-medium text-slate-600">Кукурудза</span>
                   <span className="font-bold text-red-500">$172 (-1$)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                   <div className="bg-red-400 h-full w-1/2"></div>
                </div>
             </div>

             <div className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                   <span className="font-medium text-slate-600">Соняшник</span>
                   <span className="font-bold text-green-600">$390 (+5$)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                   <div className="bg-green-500 h-full w-[85%]"></div>
                </div>
             </div>
          </div>
       </div>
    </div>
  </>
);

// --- ГОЛОВНИЙ ДОДАТОК (APP) ---
export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleStart = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    // Переконайтеся, що файл src/components/LandingPage.jsx існує!
    return <LandingPage onStart={handleStart} />;
  }

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard': return <DashboardView setView={setCurrentView} />;
      case 'marketplace': return <MarketplaceView />;
      case 'contracts': return <div className="flex items-center justify-center h-96 text-slate-400 font-medium">Розділ "Контракти" в розробці...</div>;
      default: return <DashboardView setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-900">
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full z-10 hidden md:block">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">E</div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Ekvivalent</span>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          <button onClick={() => setCurrentView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${currentView === 'dashboard' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><LayoutDashboard size={20} /> Головна</button>
          <button onClick={() => setCurrentView('dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors"><Wallet size={20} /> Grain Wallet</button>
          <button onClick={() => setCurrentView('marketplace')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${currentView === 'marketplace' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><ShoppingCart size={20} /> Маркетплейс</button>
          <button onClick={() => setCurrentView('contracts')} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${currentView === 'contracts' ? 'text-blue-700 bg-blue-50' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}><FileText size={20} /> Контракти</button>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">YK</div>
            <div>
              <div className="text-sm font-medium">Yuriy Kravchuk</div>
              <div className="text-xs text-slate-500">Agro-Invest Ltd.</div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 md:ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {currentView === 'dashboard' && 'Кабінет Юрія Кравчука'}
              {currentView === 'marketplace' && 'Маркетплейс МТР'}
              {currentView === 'contracts' && 'Мої Контракти'}
            </h1>
            <p className="text-slate-500 text-sm">Останнє оновлення: Сьогодні, 17:15 (Київ)</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-xs text-slate-400 uppercase font-semibold">Загальна Ліквідність</span>
                <span className="text-lg font-bold text-slate-900">₴ 48,250,000</span>
             </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-full transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}
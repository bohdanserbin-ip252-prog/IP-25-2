import { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet, NavLink } from "react-router";
import { LayoutDashboard, Users, CalendarDays, Settings, Menu, X } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Дашборд", to: "/" },
  { icon: Users, label: "Співробітники", to: "/employees" },
  { icon: CalendarDays, label: "Відпустки", to: "/leaves" },
  { icon: Settings, label: "Налаштування", to: "/settings" },
];

const link = (active: boolean) =>
  `flex items-center gap-3 px-3 py-2 rounded-md text-sm ${active ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-100"}`;

function Shell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-50">
      {open && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed md:static z-40 inset-y-0 left-0 w-52 bg-white border-r border-gray-200 flex flex-col transition-transform md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-12 flex items-center justify-between px-4 border-b border-gray-200">
          <span className="text-gray-900 text-sm">HR Portal</span>
          <button className="md:hidden text-gray-400" onClick={() => setOpen(false)}><X className="w-4 h-4" /></button>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} onClick={() => setOpen(false)}
              className={({ isActive }) => link(isActive)}>
              <n.icon className="w-4 h-4" />{n.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 md:hidden shrink-0">
          <button className="text-gray-500" onClick={() => setOpen(true)}><Menu className="w-5 h-5" /></button>
          <span className="ml-3 text-sm text-gray-900">HR Portal</span>
        </div>
        <main className="flex-1 overflow-auto p-4 sm:p-6"><Outlet /></main>
      </div>
    </div>
  );
}

/* Dashboard */
const chart = [
  { m: "Січ", v: 120 }, { m: "Лют", v: 125 }, { m: "Бер", v: 128 },
  { m: "Кві", v: 132 }, { m: "Тра", v: 140 }, { m: "Чер", v: 145 }, { m: "Лип", v: 154 },
];
const maxV = Math.max(...chart.map((c) => c.v));

function Dashboard() {
  return (
    <div className="space-y-4 max-w-4xl">
      <h1 className="text-gray-900">Дашборд</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[["Працівників", "154", "+12%", "text-green-600"], ["Нові", "8", "+2%", "text-green-600"], ["Відпустки", "12", "-4%", "text-red-500"], ["Вакансії", "5", "0%", "text-gray-400"]].map(([l, v, c, cl]) => (
          <div key={l} className="bg-white rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500">{l}</p>
            <p className="text-2xl text-gray-900">{v}</p>
            <p className={`text-xs ${cl}`}>{c}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <p className="text-sm text-gray-500 mb-3">Динаміка працівників</p>
        <div className="flex items-end gap-2 h-40">
          {chart.map((c) => (
            <div key={c.m} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-blue-500/80 rounded-t" style={{ height: `${(c.v / maxV) * 100}%` }} />
              <span className="text-[10px] text-gray-400">{c.m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Employees */
const emp = [
  { id: 1, n: "Олена Коваленко", p: "Маркетолог", s: "Активний" },
  { id: 2, n: "Іван Петренко", p: "Розробник", s: "Активний" },
  { id: 3, n: "Марія Ткач", p: "Бухгалтер", s: "Лікарняний" },
  { id: 4, n: "Олександр Сидоренко", p: "Менеджер", s: "У відпустці" },
  { id: 5, n: "Вікторія Лисенко", p: "HR Менеджер", s: "Активний" },
];
const badge = (s: string) =>
  s === "Активний" ? "bg-green-100 text-green-800" : s === "У відпустці" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800";

function Employees() {
  return (
    <div className="max-w-4xl space-y-4">
      <h1 className="text-gray-900">Співробітники</h1>
      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
        {emp.map((e) => (
          <div key={e.id} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs">{e.n[0]}</div>
              <div><p className="text-sm text-gray-900">{e.n}</p><p className="text-xs text-gray-500">{e.p}</p></div>
            </div>
            <span className={`px-2 py-0.5 text-xs rounded-full ${badge(e.s)}`}>{e.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Leaves */
const lvs = [
  { id: 1, n: "Олександр Сидоренко", t: "Щорічна · 15–29 Тра · 14дн", s: "Затверджено" },
  { id: 2, n: "Марія Ткач", t: "Лікарняний · 10–14 Тра · 5дн", s: "Очікує" },
  { id: 3, n: "Іван Петренко", t: "За свій рахунок · 5 Тра · 1дн", s: "Відхилено" },
];
const lc: Record<string, string> = { Затверджено: "text-green-700", Відхилено: "text-red-600", Очікує: "text-amber-600" };

function Leaves() {
  return (
    <div className="max-w-4xl space-y-4">
      <h1 className="text-gray-900">Відпустки</h1>
      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
        {lvs.map((r) => (
          <div key={r.id} className="px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-gray-900">{r.n}</p>
              <p className="text-xs text-gray-500">{r.t}</p>
            </div>
            <span className={`text-sm ${lc[r.s]}`}>{r.s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Settings */
function Sett() {
  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-gray-900">Налаштування</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <input defaultValue="Tech Corp" placeholder="Компанія" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
        <input defaultValue="hr@techcorp.com" placeholder="Email" className="w-full border border-gray-300 rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-blue-500" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">Зберегти</button>
      </div>
    </div>
  );
}

const router = createBrowserRouter([{
  path: "/", Component: Shell, children: [
    { index: true, Component: Dashboard },
    { path: "employees", Component: Employees },
    { path: "leaves", Component: Leaves },
    { path: "settings", Component: Sett },
  ],
}]);

export default function App() {
  return <RouterProvider router={router} />;
}

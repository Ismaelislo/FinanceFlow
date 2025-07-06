import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Dashboard } from './components/Dashboard/Dashboard';
import { InvoiceManager } from './components/Invoices/InvoiceManager';
import { ExpenseManager } from './components/Expenses/ExpenseManager';
import { TreasuryDashboard } from './components/Treasury/TreasuryDashboard';
import { AssetManager } from './components/Assets/AssetManager';
import { CustomerManager } from './components/Customers/CustomerManager';
import { ReportsCenter } from './components/Reports/ReportsCenter';
import { Settings } from './components/Settings/Settings';
import { AccountingDashboard } from './components/Accounting/AccountingDashboard';
import { GeneralLedger } from './components/Accounting/GeneralLedger';
import { BankReconciliation } from './components/Accounting/BankReconciliation';
import { TaxDeclarations } from './components/Accounting/TaxDeclarations';
import { AnalyticalAccounting } from './components/Accounting/AnalyticalAccounting';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';

export type PageType =
  | 'dashboard'
  | 'invoices'
  | 'expenses'
  | 'treasury'
  | 'assets'
  | 'customers'
  | 'reports'
  | 'settings'
  | 'accounting'
  | 'ledger'
  | 'reconciliation'
  | 'taxes'
  | 'analytical';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const currentPage = location.pathname.replace('/', '') || 'dashboard';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <Header
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage as PageType}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(!darkMode)}
        />

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/invoices" element={<InvoiceManager />} />
              <Route path="/expenses" element={<ExpenseManager />} />
              <Route path="/treasury" element={<TreasuryDashboard />} />
              <Route path="/assets" element={<AssetManager />} />
              <Route path="/customers" element={<CustomerManager />} />
              <Route path="/reports" element={<ReportsCenter />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/accounting" element={<AccountingDashboard />} />
              <Route path="/ledger" element={<GeneralLedger />} />
              <Route path="/reconciliation" element={<BankReconciliation />} />
              <Route path="/taxes" element={<TaxDeclarations />} />
              <Route path="/analytical" element={<AnalyticalAccounting />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
import React, { useState } from 'react';
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

export type PageType = 'dashboard' | 'invoices' | 'expenses' | 'treasury' | 'assets' | 'customers' | 'reports' | 'settings' | 'accounting' | 'ledger' | 'reconciliation' | 'taxes' | 'analytical';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'invoices':
        return <InvoiceManager />;
      case 'expenses':
        return <ExpenseManager />;
      case 'treasury':
        return <TreasuryDashboard />;
      case 'assets':
        return <AssetManager />;
      case 'customers':
        return <CustomerManager />;
      case 'reports':
        return <ReportsCenter />;
      case 'settings':
        return <Settings />;
      case 'accounting':
        return <AccountingDashboard />;
      case 'ledger':
        return <GeneralLedger />;
      case 'reconciliation':
        return <BankReconciliation />;
      case 'taxes':
        return <TaxDeclarations />;
      case 'analytical':
        return <AnalyticalAccounting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="lg:ml-64">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          currentPage={currentPage}
        />
        
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
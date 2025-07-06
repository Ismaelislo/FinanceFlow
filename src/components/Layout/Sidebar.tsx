import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  TrendingUp as Treasury,
  Building,
  Users,
  BarChart3, 
  Settings as SettingsIcon,
  Calculator,
  BookOpen,
  RefreshCw,
  FileCheck,
  PieChart,
  X
} from 'lucide-react';
import { PageType } from '../../App';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Tableau de bord', href: 'dashboard', icon: LayoutDashboard },
  { name: 'Factures', href: 'invoices', icon: FileText },
  { name: 'Dépenses', href: 'expenses', icon: Receipt },
  { name: 'Trésorerie', href: 'treasury', icon: Treasury },
  { name: 'Immobilisations', href: 'assets', icon: Building },
  { name: 'Clients/Fournisseurs', href: 'customers', icon: Users },
  { name: 'Comptabilité', href: 'accounting', icon: Calculator },
  { name: 'Grand livre', href: 'ledger', icon: BookOpen },
  { name: 'Rapprochement', href: 'reconciliation', icon: RefreshCw },
  { name: 'Déclarations', href: 'taxes', icon: FileCheck },
  { name: 'Analytique', href: 'analytical', icon: PieChart },
  { name: 'Rapports', href: 'reports', icon: BarChart3 },
  { name: 'Paramètres', href: 'settings', icon: SettingsIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  onPageChange, 
  isOpen, 
  onClose 
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FM</span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">FinanceFlow</h1>
          </div>
          
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.href;
              
              return (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      onPageChange(item.href as PageType);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-xs">AB</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Entreprise Mayotte
              </p>
              <p className="text-xs text-gray-500 truncate">
                admin@entreprise.yt
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
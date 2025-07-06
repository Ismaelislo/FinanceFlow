import React from 'react';
import { Menu, Bell, Search, User, Moon, Sun } from 'lucide-react';
import { PageType } from '../../App';

interface HeaderProps {
  onMenuClick: () => void;
  currentPage: PageType;
  darkMode: boolean;
  onToggleDark: () => void;
}

const pageNames = {
  dashboard: 'Tableau de bord',
  invoices: 'Gestion des factures',
  expenses: 'Gestion des dépenses',
  treasury: 'Gestion de trésorerie',
  assets: 'Gestion des immobilisations',
  customers: 'Clients et fournisseurs',
  accounting: 'Comptabilité générale',
  ledger: 'Grand livre comptable',
  reconciliation: 'Rapprochement bancaire',
  taxes: 'Déclarations fiscales',
  analytical: 'Comptabilité analytique',
  reports: 'Rapports et analyses',
  settings: 'Paramètres'
};

export const Header: React.FC<HeaderProps> = ({ onMenuClick, currentPage, darkMode, onToggleDark }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="ml-4 lg:ml-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {pageNames[currentPage]}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                aria-label="Search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 relative" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  Admin User
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
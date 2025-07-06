import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Edit, Plus, Calendar } from 'lucide-react';

const accounts = [
  { code: '101000', name: 'Capital social', type: 'Capitaux propres', balance: 50000, movements: 2 },
  { code: '164000', name: 'Emprunts auprès des établissements de crédit', type: 'Dettes', balance: -25000, movements: 12 },
  { code: '211000', name: 'Terrains', type: 'Immobilisations', balance: 80000, movements: 1 },
  { code: '213000', name: 'Constructions', type: 'Immobilisations', balance: 120000, movements: 3 },
  { code: '215400', name: 'Matériel informatique', type: 'Immobilisations', balance: 15000, movements: 8 },
  { code: '411000', name: 'Clients', type: 'Créances', balance: 12450, movements: 45 },
  { code: '401000', name: 'Fournisseurs', type: 'Dettes', balance: -8750, movements: 32 },
  { code: '512000', name: 'Banque', type: 'Trésorerie', balance: 28900, movements: 156 },
  { code: '530000', name: 'Caisse', type: 'Trésorerie', balance: 850, movements: 23 },
  { code: '607000', name: 'Achats de marchandises', type: 'Charges', balance: -45000, movements: 89 },
  { code: '701000', name: 'Ventes de marchandises', type: 'Produits', balance: 125000, movements: 67 },
  { code: '445710', name: 'TVA collectée', type: 'Dettes fiscales', balance: -15600, movements: 67 },
  { code: '445660', name: 'TVA déductible', type: 'Créances fiscales', balance: 8900, movements: 89 }
];

const journalEntries = [
  {
    id: 1,
    date: '2024-01-15',
    journal: 'VTE',
    piece: 'F-2024-001',
    account: '411000',
    accountName: 'Clients',
    description: 'Facture F-2024-001 - Société XYZ',
    debit: 2850,
    credit: 0,
    lettrage: '',
    analytique: 'PROJ001'
  },
  {
    id: 2,
    date: '2024-01-15',
    journal: 'VTE',
    piece: 'F-2024-001',
    account: '701000',
    accountName: 'Ventes de marchandises',
    description: 'Facture F-2024-001 - Société XYZ',
    debit: 0,
    credit: 2375,
    lettrage: '',
    analytique: 'PROJ001'
  },
  {
    id: 3,
    date: '2024-01-15',
    journal: 'VTE',
    piece: 'F-2024-001',
    account: '445710',
    accountName: 'TVA collectée',
    description: 'Facture F-2024-001 - TVA 20%',
    debit: 0,
    credit: 475,
    lettrage: '',
    analytique: ''
  }
];

export const GeneralLedger: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'accounts' | 'entries'>('accounts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const filteredAccounts = accounts.filter(account =>
    account.code.includes(searchTerm) || 
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Grand livre</h2>
          <p className="text-gray-600">Plan comptable et écritures détaillées</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau compte
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'accounts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Plan comptable
          </button>
          <button
            onClick={() => setActiveTab('entries')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'entries'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Journal des écritures
          </button>
        </nav>
      </div>

      {activeTab === 'accounts' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un compte..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tous les types</option>
                  <option value="assets">Actif</option>
                  <option value="liabilities">Passif</option>
                  <option value="income">Produits</option>
                  <option value="expenses">Charges</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Intitulé</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Solde</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Mouvements</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAccounts.map((account) => (
                  <tr key={account.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-medium text-gray-900">{account.code}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{account.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {account.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`text-sm font-medium ${
                        account.balance >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        €{Math.abs(account.balance).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm text-gray-900">{account.movements}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => setSelectedAccount(account.code)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'entries' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une écriture..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="text-gray-500">à</span>
                <input
                  type="date"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Journal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pièce</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compte</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Débit</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Crédit</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Lettrage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {journalEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                        {entry.journal}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.piece}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-mono font-medium text-gray-900">{entry.account}</div>
                        <div className="text-xs text-gray-500">{entry.accountName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {entry.debit > 0 ? `€${entry.debit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      {entry.credit > 0 ? `€${entry.credit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {entry.lettrage || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
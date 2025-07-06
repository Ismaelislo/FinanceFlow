import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Eye, Edit, Mail, Phone, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const customers = [
  {
    id: 1,
    name: 'Société XYZ',
    email: 'contact@xyz.com',
    phone: '+262 269 12 34 56',
    address: '123 Rue de la Plage, 97600 Mamoudzou',
    siret: '12345678901234',
    paymentTerms: 30,
    outstandingAmount: 2850,
    totalInvoiced: 15600,
    lastInvoice: '2024-01-15',
    status: 'active',
    riskLevel: 'low'
  },
  {
    id: 2,
    name: 'Client ABC',
    email: 'admin@abc.yt',
    phone: '+262 269 98 76 54',
    address: '456 Avenue des Baobabs, 97615 Pamandzi',
    siret: '98765432109876',
    paymentTerms: 45,
    outstandingAmount: 1200,
    totalInvoiced: 8900,
    lastInvoice: '2024-01-13',
    status: 'active',
    riskLevel: 'medium'
  },
  {
    id: 3,
    name: 'Entreprise DEF',
    email: 'contact@def.fr',
    phone: '+262 269 55 44 33',
    address: '789 Boulevard du Lagon, 97620 Chirongui',
    siret: '45678912345678',
    paymentTerms: 30,
    outstandingAmount: 3500,
    totalInvoiced: 22400,
    lastInvoice: '2024-01-10',
    status: 'overdue',
    riskLevel: 'high'
  },
  {
    id: 4,
    name: 'Société GHI',
    email: 'info@ghi.yt',
    phone: '+262 269 11 22 33',
    address: '321 Rue des Ylang-Ylang, 97610 Dzaoudzi',
    siret: '78912345678912',
    paymentTerms: 60,
    outstandingAmount: 0,
    totalInvoiced: 5200,
    lastInvoice: '2024-01-08',
    status: 'inactive',
    riskLevel: 'low'
  }
];

const suppliers = [
  {
    id: 1,
    name: 'Fournisseur Alpha',
    email: 'commandes@alpha.fr',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue du Commerce, 75001 Paris',
    siret: '11122233344455',
    paymentTerms: 30,
    outstandingAmount: 1500,
    totalPurchases: 12000,
    lastPurchase: '2024-01-14',
    status: 'active'
  },
  {
    id: 2,
    name: 'Fournisseur Beta',
    email: 'contact@beta.com',
    phone: '+262 269 77 88 99',
    address: '456 Zone Industrielle, 97600 Mamoudzou',
    siret: '66677788899900',
    paymentTerms: 45,
    outstandingAmount: 2200,
    totalPurchases: 8500,
    lastPurchase: '2024-01-12',
    status: 'active'
  }
];

export const CustomerManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'suppliers'>('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'inactive':
        return <Clock className="w-4 h-4 text-gray-600" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'inactive':
        return 'Inactif';
      case 'overdue':
        return 'En retard';
      default:
        return 'Inconnu';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-emerald-100 text-emerald-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskText = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'Faible';
      case 'medium':
        return 'Moyen';
      case 'high':
        return 'Élevé';
      default:
        return 'Inconnu';
    }
  };

  const filteredData = (activeTab === 'customers' ? customers : suppliers).filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || (activeTab === 'customers' && (item as any).riskLevel === riskFilter);
    
    return matchesSearch && matchesStatus && (activeTab === 'suppliers' || matchesRisk);
  });

  const totalOutstanding = customers.reduce((sum, customer) => sum + customer.outstandingAmount, 0);
  const overdueCustomers = customers.filter(c => c.status === 'overdue').length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalSupplierDebt = suppliers.reduce((sum, supplier) => sum + supplier.outstandingAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clients et fournisseurs</h2>
          <p className="text-gray-600">Gestion des relations commerciales et suivi des encours</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            {activeTab === 'customers' ? 'Nouveau client' : 'Nouveau fournisseur'}
          </button>
        </div>
      </div>

      {/* Métriques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Créances clients</p>
              <p className="text-2xl font-bold text-blue-600">€{totalOutstanding.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{customers.length} clients</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients actifs</p>
              <p className="text-2xl font-bold text-emerald-600">{activeCustomers}</p>
              <p className="text-sm text-gray-500">Sur {customers.length} clients</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Clients en retard</p>
              <p className="text-2xl font-bold text-red-600">{overdueCustomers}</p>
              <p className="text-sm text-gray-500">Relances nécessaires</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dettes fournisseurs</p>
              <p className="text-2xl font-bold text-orange-600">€{totalSupplierDebt.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{suppliers.length} fournisseurs</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('customers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'customers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Clients ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'suppliers'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Fournisseurs ({suppliers.length})
          </button>
        </nav>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Rechercher ${activeTab === 'customers' ? 'un client' : 'un fournisseur'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous statuts</option>
                <option value="active">Actif</option>
                <option value="inactive">Inactif</option>
                {activeTab === 'customers' && <option value="overdue">En retard</option>}
              </select>
              {activeTab === 'customers' && (
                <select
                  value={riskFilter}
                  onChange={(e) => setRiskFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous risques</option>
                  <option value="low">Risque faible</option>
                  <option value="medium">Risque moyen</option>
                  <option value="high">Risque élevé</option>
                </select>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {activeTab === 'customers' ? 'Client' : 'Fournisseur'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  {activeTab === 'customers' ? 'Encours' : 'Dette'}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  {activeTab === 'customers' ? 'CA total' : 'Achats total'}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Délai paiement</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Statut</th>
                {activeTab === 'customers' && (
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Risque</th>
                )}
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.siret}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{item.email}</div>
                      <div className="text-xs text-gray-500">{item.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <span className={`text-sm font-medium ${
                      item.outstandingAmount > 0 ? 'text-red-600' : 'text-emerald-600'
                    }`}>
                      €{item.outstandingAmount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    €{(activeTab === 'customers' ? item.totalInvoiced : (item as any).totalPurchases).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                    {item.paymentTerms} jours
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </td>
                  {activeTab === 'customers' && (
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor((item as any).riskLevel)}`}>
                        {getRiskText((item as any).riskLevel)}
                      </span>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Phone className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Relances automatiques</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Relance J+5</span>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Relance J+15</span>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Mise en demeure J+30</span>
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            </div>
            <button className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
              Configurer les relances
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lettrage automatique</h3>
          <div className="space-y-4">
            <div className="bg-emerald-50 rounded-lg p-3">
              <p className="text-sm text-emerald-800">
                <strong>12 paiements</strong> en attente de lettrage automatique
              </p>
            </div>
            <button className="w-full bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors">
              Lancer le lettrage
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse des risques</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Clients à risque</span>
              <span className="text-sm font-medium text-red-600">
                {customers.filter(c => c.riskLevel === 'high').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Délai moyen</span>
              <span className="text-sm font-medium text-gray-900">18 jours</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Taux de recouvrement</span>
              <span className="text-sm font-medium text-emerald-600">94.2%</span>
            </div>
            <button className="w-full bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
              Rapport détaillé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Plus, Filter, Search, Download, Eye, Edit, Trash2, Send, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const invoices = [
  {
    id: 'INV-2024-001',
    client: 'Société XYZ',
    amount: 2850,
    date: '2024-01-15',
    dueDate: '2024-02-14',
    status: 'paid',
    paymentDate: '2024-01-20',
    items: [
      { description: 'Conseil stratégique', quantity: 10, unitPrice: 250, total: 2500 },
      { description: 'Formation équipe', quantity: 1, unitPrice: 350, total: 350 }
    ]
  },
  {
    id: 'INV-2024-002',
    client: 'Client ABC',
    amount: 1200,
    date: '2024-01-13',
    dueDate: '2024-02-12',
    status: 'sent',
    items: [
      { description: 'Développement web', quantity: 8, unitPrice: 150, total: 1200 }
    ]
  },
  {
    id: 'INV-2024-003',
    client: 'Entreprise DEF',
    amount: 3500,
    date: '2024-01-10',
    dueDate: '2024-02-09',
    status: 'overdue',
    items: [
      { description: 'Audit comptable', quantity: 1, unitPrice: 3500, total: 3500 }
    ]
  },
  {
    id: 'INV-2024-004',
    client: 'Société GHI',
    amount: 950,
    date: '2024-01-08',
    dueDate: '2024-02-07',
    status: 'draft',
    items: [
      { description: 'Consultation juridique', quantity: 5, unitPrice: 190, total: 950 }
    ]
  }
];

const quotes = [
  {
    id: 'DEV-2024-001',
    client: 'Nouveau Client',
    amount: 4500,
    date: '2024-01-16',
    validUntil: '2024-02-16',
    status: 'pending'
  },
  {
    id: 'DEV-2024-002',
    client: 'Client Potentiel',
    amount: 2200,
    date: '2024-01-14',
    validUntil: '2024-02-14',
    status: 'accepted'
  }
];

export const InvoiceManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'invoices' | 'quotes'>('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-emerald-100 text-emerald-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'accepted':
        return 'bg-emerald-100 text-emerald-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'sent':
        return <Send className="w-4 h-4 text-blue-600" />;
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'draft':
        return <Edit className="w-4 h-4 text-gray-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'sent':
        return 'Envoyée';
      case 'overdue':
        return 'En retard';
      case 'draft':
        return 'Brouillon';
      case 'pending':
        return 'En attente';
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      default:
        return 'Inconnu';
    }
  };

  const totalInvoices = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Facturation</h2>
          <p className="text-gray-600">Gérez vos devis, factures et paiements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau devis
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle facture
          </button>
        </div>
      </div>

      {/* Métriques de facturation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CA facturé</p>
              <p className="text-2xl font-bold text-gray-900">€{totalInvoices.toLocaleString()}</p>
              <p className="text-sm text-emerald-600">+12% ce mois</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Encaissé</p>
              <p className="text-2xl font-bold text-emerald-600">€{paidInvoices.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{((paidInvoices/totalInvoices)*100).toFixed(1)}% du CA</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En retard</p>
              <p className="text-2xl font-bold text-red-600">€{overdueInvoices.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{invoices.filter(inv => inv.status === 'overdue').length} factures</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Délai moyen</p>
              <p className="text-2xl font-bold text-gray-900">18j</p>
              <p className="text-sm text-emerald-600">-2j vs mois dernier</p>
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
            onClick={() => setActiveTab('invoices')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'invoices'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Factures ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'quotes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Devis ({quotes.length})
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
                placeholder={`Rechercher ${activeTab === 'invoices' ? 'une facture' : 'un devis'}...`}
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
                <option value="all">Tous les statuts</option>
                {activeTab === 'invoices' ? (
                  <>
                    <option value="draft">Brouillon</option>
                    <option value="sent">Envoyée</option>
                    <option value="paid">Payée</option>
                    <option value="overdue">En retard</option>
                  </>
                ) : (
                  <>
                    <option value="pending">En attente</option>
                    <option value="accepted">Accepté</option>
                    <option value="rejected">Refusé</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Numéro
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'invoices' ? 'Échéance' : 'Validité'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(activeTab === 'invoices' ? invoices : quotes).map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.client}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      €{item.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(item.date).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(activeTab === 'invoices' ? (item as any).dueDate : (item as any).validUntil).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedInvoice(item.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Download className="w-4 h-4" />
                      </button>
                      {item.status === 'draft' && (
                        <button className="text-emerald-600 hover:text-emerald-700">
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      {item.status === 'overdue' && activeTab === 'invoices' && (
                        <button className="text-orange-600 hover:text-orange-700 text-xs font-medium">
                          Relancer
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-50 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Plus className="w-5 h-5" />
                <div>
                  <p className="font-medium">Facture express</p>
                  <p className="text-sm opacity-75">Créer rapidement</p>
                </div>
              </div>
            </button>
            
            <button className="w-full bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg hover:bg-emerald-100 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Send className="w-5 h-5" />
                <div>
                  <p className="font-medium">Relances automatiques</p>
                  <p className="text-sm opacity-75">Configurer les rappels</p>
                </div>
              </div>
            </button>
            
            <button className="w-full bg-purple-50 text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5" />
                <div>
                  <p className="font-medium">Export comptable</p>
                  <p className="text-sm opacity-75">Vers expert-comptable</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Modèles de facture</h3>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <p className="font-medium text-gray-900">Modèle standard</p>
              <p className="text-sm text-gray-600">Facture classique avec TVA</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <p className="font-medium text-gray-900">Modèle service</p>
              <p className="text-sm text-gray-600">Pour prestations de service</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
              <p className="font-medium text-gray-900">Modèle récurrent</p>
              <p className="text-sm text-gray-600">Abonnements et récurrence</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Paiements en ligne</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Stripe</span>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">PayPal</span>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Virement SEPA</span>
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            </div>
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Configurer les paiements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
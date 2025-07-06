import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Filter, Download, Plus } from 'lucide-react';

const projects = [
  {
    id: 'PROJ001',
    name: 'Projet Alpha',
    client: 'Société XYZ',
    budget: 50000,
    spent: 32500,
    revenue: 45000,
    margin: 12500,
    status: 'active'
  },
  {
    id: 'PROJ002',
    name: 'Projet Beta',
    client: 'Client ABC',
    budget: 30000,
    spent: 28000,
    revenue: 35000,
    margin: 7000,
    status: 'completed'
  },
  {
    id: 'PROJ003',
    name: 'Projet Gamma',
    client: 'Entreprise DEF',
    budget: 75000,
    spent: 15000,
    revenue: 0,
    margin: -15000,
    status: 'active'
  }
];

const costCenters = [
  {
    id: 'CC001',
    name: 'Administration',
    type: 'Support',
    budget: 120000,
    actual: 98000,
    variance: 22000,
    percentage: 81.7
  },
  {
    id: 'CC002',
    name: 'Commercial',
    type: 'Opérationnel',
    budget: 80000,
    actual: 85000,
    variance: -5000,
    percentage: 106.3
  },
  {
    id: 'CC003',
    name: 'Production',
    type: 'Opérationnel',
    budget: 200000,
    actual: 180000,
    variance: 20000,
    percentage: 90.0
  },
  {
    id: 'CC004',
    name: 'R&D',
    type: 'Investissement',
    budget: 60000,
    actual: 45000,
    variance: 15000,
    percentage: 75.0
  }
];

const analyticalEntries = [
  {
    id: 1,
    date: '2024-01-15',
    account: '607000',
    description: 'Achat matériel - Projet Alpha',
    amount: 2500,
    project: 'PROJ001',
    costCenter: 'CC003',
    type: 'charge'
  },
  {
    id: 2,
    date: '2024-01-14',
    account: '701000',
    description: 'Facturation Projet Beta',
    amount: 15000,
    project: 'PROJ002',
    costCenter: 'CC002',
    type: 'produit'
  },
  {
    id: 3,
    date: '2024-01-13',
    account: '641000',
    description: 'Salaires équipe R&D',
    amount: 8500,
    project: 'PROJ003',
    costCenter: 'CC004',
    type: 'charge'
  }
];

export const AnalyticalAccounting: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'costcenters' | 'entries'>('projects');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProjectStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'completed':
        return 'Terminé';
      case 'paused':
        return 'En pause';
      default:
        return 'Inconnu';
    }
  };

  const getCostCenterTypeColor = (type: string) => {
    switch (type) {
      case 'Opérationnel':
        return 'bg-blue-100 text-blue-800';
      case 'Support':
        return 'bg-purple-100 text-purple-800';
      case 'Investissement':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Comptabilité analytique</h2>
          <p className="text-gray-600">Analyse de la rentabilité par projet et centre de coûts</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nouveau projet
          </button>
        </div>
      </div>

      {/* Métriques globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Marge totale</p>
              <p className="text-2xl font-bold text-emerald-600">€24,500</p>
              <p className="text-sm text-gray-500">+15.2% vs mois dernier</p>
            </div>
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Projets actifs</p>
              <p className="text-2xl font-bold text-blue-600">
                {projects.filter(p => p.status === 'active').length}
              </p>
              <p className="text-sm text-gray-500">Sur {projects.length} projets</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de marge moyen</p>
              <p className="text-2xl font-bold text-purple-600">18.5%</p>
              <p className="text-sm text-gray-500">+2.1% vs objectif</p>
            </div>
            <PieChart className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget consommé</p>
              <p className="text-2xl font-bold text-orange-600">68%</p>
              <p className="text-sm text-gray-500">€75,500 / €110,000</p>
            </div>
            <Filter className="w-8 h-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('projects')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'projects'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Projets
          </button>
          <button
            onClick={() => setActiveTab('costcenters')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'costcenters'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Centres de coûts
          </button>
          <button
            onClick={() => setActiveTab('entries')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'entries'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Ventilations
          </button>
        </nav>
      </div>

      {activeTab === 'projects' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Analyse par projet</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Budget</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Dépensé</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Chiffre d'affaires</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Marge</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => {
                  const marginRate = project.revenue > 0 ? (project.margin / project.revenue) * 100 : 0;
                  const budgetUsed = (project.spent / project.budget) * 100;
                  
                  return (
                    <tr key={project.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{project.name}</div>
                          <div className="text-xs text-gray-500">{project.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {project.client}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                        €{project.budget.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            €{project.spent.toLocaleString()}
                          </div>
                          <div className={`text-xs ${budgetUsed > 90 ? 'text-red-600' : 'text-gray-500'}`}>
                            {budgetUsed.toFixed(1)}% du budget
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        €{project.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div>
                          <div className={`text-sm font-medium ${
                            project.margin >= 0 ? 'text-emerald-600' : 'text-red-600'
                          }`}>
                            €{project.margin.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {marginRate.toFixed(1)}%
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProjectStatusColor(project.status)}`}>
                          {getProjectStatusText(project.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'costcenters' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Analyse par centre de coûts</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Centre de coûts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Budget</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Réalisé</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Écart</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">% Réalisation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {costCenters.map((center) => (
                  <tr key={center.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{center.name}</div>
                        <div className="text-xs text-gray-500">{center.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCostCenterTypeColor(center.type)}`}>
                        {center.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      €{center.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      €{center.actual.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`text-sm font-medium ${
                        center.variance >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {center.variance >= 0 ? '+' : ''}€{center.variance.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <span className={`text-sm font-medium ${
                          center.percentage > 100 ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {center.percentage.toFixed(1)}%
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              center.percentage > 100 ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${Math.min(center.percentage, 100)}%` }}
                          />
                        </div>
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
            <h3 className="text-lg font-semibold text-gray-900">Ventilations analytiques récentes</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compte</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projet</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Centre de coûts</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analyticalEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {entry.account}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {entry.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      €{entry.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.project}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.costCenter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        entry.type === 'produit' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {entry.type === 'produit' ? 'Produit' : 'Charge'}
                      </span>
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
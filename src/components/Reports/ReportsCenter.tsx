import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, Filter } from 'lucide-react';

const reports = [
  {
    id: 1,
    title: 'Chiffre d\'affaires mensuel',
    description: 'Évolution du CA sur 12 mois',
    type: 'revenue',
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    title: 'Analyse des dépenses',
    description: 'Répartition par catégorie',
    type: 'expenses',
    lastUpdated: '2024-01-14'
  },
  {
    id: 3,
    title: 'Trésorerie prévisionnelle',
    description: 'Prévision sur 3 mois',
    type: 'cashflow',
    lastUpdated: '2024-01-13'
  },
  {
    id: 4,
    title: 'Clients et factures',
    description: 'Suivi des paiements',
    type: 'customers',
    lastUpdated: '2024-01-12'
  }
];

const metrics = [
  {
    title: 'CA Total',
    value: '€152,430',
    change: '+18.2%',
    period: 'vs mois dernier'
  },
  {
    title: 'Bénéfice Net',
    value: '€28,650',
    change: '+12.5%',
    period: 'vs mois dernier'
  },
  {
    title: 'Taux de marge',
    value: '18.8%',
    change: '+2.1%',
    period: 'vs mois dernier'
  },
  {
    title: 'Créances',
    value: '€7,240',
    change: '-5.3%',
    period: 'vs mois dernier'
  }
];

export const ReportsCenter: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rapports et analyses</h2>
          <p className="text-gray-600">Analysez vos performances financières</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
          </div>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600 ml-1">
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">{metric.period}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Rapports disponibles</h3>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">Tous les rapports</option>
                <option value="revenue">Chiffre d'affaires</option>
                <option value="expenses">Dépenses</option>
                <option value="cashflow">Trésorerie</option>
                <option value="customers">Clients</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {reports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-600">{report.description}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Dernière mise à jour</span>
                  <span className="text-gray-900">
                    {new Date(report.lastUpdated).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <button className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  Consulter le rapport
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analyse des performances</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Évolution du chiffre d'affaires</h4>
            <div className="h-40 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Graphique interactif</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Répartition des dépenses</h4>
            <div className="h-40 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Graphique en secteurs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
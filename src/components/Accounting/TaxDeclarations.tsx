import React, { useState } from 'react';
import { FileText, Calendar, AlertTriangle, CheckCircle, Download, Send, Clock } from 'lucide-react';

const declarations = [
  {
    id: 1,
    type: 'TVA',
    period: 'Décembre 2023',
    dueDate: '2024-01-20',
    status: 'submitted',
    amount: 15600,
    submittedDate: '2024-01-18'
  },
  {
    id: 2,
    type: 'TVA',
    period: 'Janvier 2024',
    dueDate: '2024-02-20',
    status: 'draft',
    amount: 18200,
    submittedDate: null
  },
  {
    id: 3,
    type: 'IS',
    period: 'Exercice 2023',
    dueDate: '2024-05-15',
    status: 'pending',
    amount: 28500,
    submittedDate: null
  },
  {
    id: 4,
    type: 'CFE',
    period: 'Année 2024',
    dueDate: '2024-12-15',
    status: 'upcoming',
    amount: 1200,
    submittedDate: null
  }
];

const taxRates = [
  { name: 'TVA normale', rate: '20%', base: 125000, amount: 25000 },
  { name: 'TVA réduite', rate: '10%', base: 15000, amount: 1500 },
  { name: 'TVA super réduite', rate: '2.1%', base: 5000, amount: 105 },
  { name: 'Exonéré', rate: '0%', base: 8000, amount: 0 }
];

const obligations = [
  {
    title: 'Déclaration TVA mensuelle',
    description: 'Déclaration CA3 à déposer avant le 20 de chaque mois',
    frequency: 'Mensuelle',
    nextDue: '2024-02-20',
    status: 'active'
  },
  {
    title: 'Impôt sur les sociétés',
    description: 'Déclaration annuelle des résultats',
    frequency: 'Annuelle',
    nextDue: '2024-05-15',
    status: 'upcoming'
  },
  {
    title: 'Cotisation foncière des entreprises',
    description: 'Taxe locale sur les biens immobiliers',
    frequency: 'Annuelle',
    nextDue: '2024-12-15',
    status: 'upcoming'
  },
  {
    title: 'Déclaration sociale nominative',
    description: 'Déclaration des cotisations sociales',
    frequency: 'Mensuelle',
    nextDue: '2024-02-05',
    status: 'active'
  }
];

export const TaxDeclarations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'declarations' | 'obligations' | 'rates'>('declarations');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'draft':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'upcoming':
        return <Calendar className="w-4 h-4 text-gray-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Transmise';
      case 'draft':
        return 'Brouillon';
      case 'pending':
        return 'En attente';
      case 'upcoming':
        return 'À venir';
      default:
        return 'En retard';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-emerald-100 text-emerald-800';
      case 'draft':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Déclarations fiscales</h2>
          <p className="text-gray-600">Gérez vos obligations fiscales et déclarations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter FEC
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FileText className="w-4 h-4 mr-2" />
            Nouvelle déclaration
          </button>
        </div>
      </div>

      {/* Alertes importantes */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-orange-800">Échéances à venir</h3>
            <p className="text-sm text-orange-700 mt-1">
              Déclaration TVA janvier 2024 à déposer avant le 20 février (dans 15 jours)
            </p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('declarations')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'declarations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Déclarations
          </button>
          <button
            onClick={() => setActiveTab('obligations')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'obligations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Obligations
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Taux et bases
          </button>
        </nav>
      </div>

      {activeTab === 'declarations' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Historique des déclarations</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Période</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Échéance</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Montant</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {declarations.map((declaration) => {
                  const daysUntilDue = getDaysUntilDue(declaration.dueDate);
                  return (
                    <tr key={declaration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                          {declaration.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {declaration.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {new Date(declaration.dueDate).toLocaleDateString('fr-FR')}
                          </div>
                          {daysUntilDue > 0 && declaration.status !== 'submitted' && (
                            <div className={`text-xs ${daysUntilDue <= 7 ? 'text-red-600' : 'text-gray-500'}`}>
                              Dans {daysUntilDue} jours
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                        €{declaration.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {getStatusIcon(declaration.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(declaration.status)}`}>
                            {getStatusText(declaration.status)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {declaration.status === 'draft' && (
                            <button className="text-blue-600 hover:text-blue-700">
                              <Send className="w-4 h-4" />
                            </button>
                          )}
                          <button className="text-gray-600 hover:text-gray-700">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'obligations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {obligations.map((obligation, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    obligation.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <FileText className={`w-5 h-5 ${
                      obligation.status === 'active' ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{obligation.title}</h3>
                    <p className="text-sm text-gray-600">{obligation.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fréquence</span>
                  <span className="text-sm font-medium text-gray-900">{obligation.frequency}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Prochaine échéance</span>
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(obligation.nextDue).toLocaleDateString('fr-FR')}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Statut</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    obligation.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {obligation.status === 'active' ? 'Actif' : 'À venir'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  Préparer la déclaration
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'rates' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Taux de TVA et bases imposables</h3>
            <p className="text-sm text-gray-600 mt-1">Période: Janvier 2024</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Taux</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Pourcentage</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Base HT</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">TVA due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {taxRates.map((rate, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rate.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
                        {rate.rate}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      €{rate.base.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      €{rate.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900" colSpan={2}>
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    €{taxRates.reduce((sum, rate) => sum + rate.base, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                    €{taxRates.reduce((sum, rate) => sum + rate.amount, 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
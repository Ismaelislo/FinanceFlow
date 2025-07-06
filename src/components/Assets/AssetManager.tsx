import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Edit, Trash2, Calculator, TrendingDown, Building, Laptop, Car } from 'lucide-react';

const assets = [
  {
    id: 1,
    name: 'Ordinateur portable Dell',
    category: 'Matériel informatique',
    purchaseDate: '2023-01-15',
    purchasePrice: 1200,
    currentValue: 800,
    depreciationMethod: 'Linéaire',
    depreciationRate: 33.33,
    annualDepreciation: 400,
    accumulatedDepreciation: 400,
    remainingYears: 2,
    location: 'Bureau principal',
    status: 'active'
  },
  {
    id: 2,
    name: 'Véhicule utilitaire',
    category: 'Matériel de transport',
    purchaseDate: '2022-06-10',
    purchasePrice: 25000,
    currentValue: 15000,
    depreciationMethod: 'Linéaire',
    depreciationRate: 20,
    annualDepreciation: 5000,
    accumulatedDepreciation: 10000,
    remainingYears: 3,
    location: 'Garage',
    status: 'active'
  },
  {
    id: 3,
    name: 'Mobilier bureau',
    category: 'Mobilier',
    purchaseDate: '2021-03-20',
    purchasePrice: 3500,
    currentValue: 1750,
    depreciationMethod: 'Linéaire',
    depreciationRate: 10,
    annualDepreciation: 350,
    accumulatedDepreciation: 1750,
    remainingYears: 5,
    location: 'Bureau principal',
    status: 'active'
  },
  {
    id: 4,
    name: 'Ancien serveur',
    category: 'Matériel informatique',
    purchaseDate: '2019-01-10',
    purchasePrice: 4000,
    currentValue: 0,
    depreciationMethod: 'Linéaire',
    depreciationRate: 33.33,
    annualDepreciation: 1333,
    accumulatedDepreciation: 4000,
    remainingYears: 0,
    location: 'Stockage',
    status: 'disposed'
  }
];

const depreciationSchedule = [
  { year: 2021, opening: 29700, depreciation: 6950, closing: 22750 },
  { year: 2022, opening: 22750, depreciation: 6950, closing: 15800 },
  { year: 2023, opening: 15800, depreciation: 6950, closing: 8850 },
  { year: 2024, opening: 8850, depreciation: 6950, closing: 1900 },
  { year: 2025, opening: 1900, depreciation: 1900, closing: 0 }
];

export const AssetManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'assets' | 'depreciation'>('assets');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Matériel informatique':
        return <Laptop className="w-5 h-5" />;
      case 'Matériel de transport':
        return <Car className="w-5 h-5" />;
      case 'Mobilier':
        return <Building className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-100 text-emerald-800';
      case 'disposed':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'disposed':
        return 'Cédé';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Inconnu';
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || asset.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalAssetValue = assets.filter(a => a.status === 'active').reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalDepreciation = assets.reduce((sum, asset) => sum + asset.accumulatedDepreciation, 0);
  const annualDepreciation = assets.filter(a => a.status === 'active').reduce((sum, asset) => sum + asset.annualDepreciation, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des immobilisations</h2>
          <p className="text-gray-600">Suivi des biens et calcul des amortissements</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle immobilisation
          </button>
        </div>
      </div>

      {/* Métriques des immobilisations */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valeur nette</p>
              <p className="text-2xl font-bold text-gray-900">€{totalAssetValue.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{assets.filter(a => a.status === 'active').length} biens actifs</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Amortissements cumulés</p>
              <p className="text-2xl font-bold text-orange-600">€{totalDepreciation.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Depuis l'acquisition</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Amortissement annuel</p>
              <p className="text-2xl font-bold text-red-600">€{annualDepreciation.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Exercice en cours</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taux moyen</p>
              <p className="text-2xl font-bold text-purple-600">22.1%</p>
              <p className="text-sm text-gray-500">Amortissement</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('assets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'assets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Immobilisations
          </button>
          <button
            onClick={() => setActiveTab('depreciation')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'depreciation'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Plan d'amortissement
          </button>
        </nav>
      </div>

      {activeTab === 'assets' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une immobilisation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Toutes catégories</option>
                  <option value="Matériel informatique">Matériel informatique</option>
                  <option value="Matériel de transport">Matériel de transport</option>
                  <option value="Mobilier">Mobilier</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Tous statuts</option>
                  <option value="active">Actif</option>
                  <option value="disposed">Cédé</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bien</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valeur d'achat</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valeur nette</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amortissement</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Statut</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(asset.category)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                          <div className="text-xs text-gray-500">
                            Acquis le {new Date(asset.purchaseDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {asset.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      €{asset.purchasePrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          €{asset.currentValue.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {((asset.currentValue / asset.purchasePrice) * 100).toFixed(1)}% de la valeur
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          €{asset.annualDepreciation.toLocaleString()}/an
                        </div>
                        <div className="text-xs text-gray-500">
                          {asset.depreciationRate}% - {asset.remainingYears} ans restants
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                        {getStatusText(asset.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Calculator className="w-4 h-4" />
                        </button>
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
      )}

      {activeTab === 'depreciation' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Plan d'amortissement consolidé</h3>
            <p className="text-sm text-gray-600 mt-1">Évolution des amortissements sur 5 ans</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exercice</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valeur d'ouverture</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amortissement</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Valeur de clôture</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Taux</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {depreciationSchedule.map((schedule) => (
                  <tr key={schedule.year} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{schedule.year}</span>
                      {schedule.year === 2024 && (
                        <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          En cours
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      €{schedule.opening.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-red-600">
                      €{schedule.depreciation.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                      €{schedule.closing.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                      {schedule.opening > 0 ? ((schedule.depreciation / schedule.opening) * 100).toFixed(1) : '0.0'}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Impact fiscal</h4>
                <p className="text-sm text-blue-800">
                  Les amortissements réduisent le résultat imposable de €{annualDepreciation.toLocaleString()} par an.
                </p>
              </div>
              
              <div className="bg-emerald-50 rounded-lg p-4">
                <h4 className="font-medium text-emerald-900 mb-2">Renouvellement</h4>
                <p className="text-sm text-emerald-800">
                  Prévoir le renouvellement de 2 biens dans les 12 prochains mois.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-medium text-orange-900 mb-2">Optimisation</h4>
                <p className="text-sm text-orange-800">
                  Possibilité d'amortissement dégressif pour certains biens éligibles.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
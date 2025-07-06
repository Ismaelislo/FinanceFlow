import React from 'react';
import { User, Bell, Shield, CreditCard, FileText, HelpCircle } from 'lucide-react';

const settingsCategories = [
  {
    title: 'Profil utilisateur',
    icon: User,
    description: 'Gérez vos informations personnelles',
    items: [
      { name: 'Informations personnelles', status: 'active' },
      { name: 'Mot de passe', status: 'active' },
      { name: 'Préférences', status: 'active' }
    ]
  },
  {
    title: 'Notifications',
    icon: Bell,
    description: 'Configurez vos alertes et notifications',
    items: [
      { name: 'Notifications par email', status: 'active' },
      { name: 'Notifications push', status: 'inactive' },
      { name: 'Rappels de paiement', status: 'active' }
    ]
  },
  {
    title: 'Sécurité',
    icon: Shield,
    description: 'Sécurisez votre compte',
    items: [
      { name: 'Authentification à deux facteurs', status: 'inactive' },
      { name: 'Sessions actives', status: 'active' },
      { name: 'Journaux d\'activité', status: 'active' }
    ]
  },
  {
    title: 'Paiements',
    icon: CreditCard,
    description: 'Gérez vos moyens de paiement',
    items: [
      { name: 'Cartes bancaires', status: 'active' },
      { name: 'Comptes bancaires', status: 'active' },
      { name: 'Méthodes de paiement', status: 'active' }
    ]
  },
  {
    title: 'Facturation',
    icon: FileText,
    description: 'Personnalisez vos factures',
    items: [
      { name: 'Modèles de facture', status: 'active' },
      { name: 'Conditions générales', status: 'active' },
      { name: 'Mentions légales', status: 'active' }
    ]
  },
  {
    title: 'Support',
    icon: HelpCircle,
    description: 'Aide et assistance',
    items: [
      { name: 'Documentation', status: 'active' },
      { name: 'Contact support', status: 'active' },
      { name: 'Formation', status: 'active' }
    ]
  }
];

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
        <p className="text-gray-600">Gérez vos préférences et configurations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <div className={`w-2 h-2 rounded-full ${
                      item.status === 'active' ? 'bg-emerald-500' : 'bg-gray-300'
                    }`} />
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                Configurer
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations sur l'entreprise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              defaultValue="Entreprise Mayotte"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SIRET
            </label>
            <input
              type="text"
              defaultValue="12345678901234"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <input
              type="text"
              defaultValue="123 Rue de la Plage, 97600 Mamoudzou"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              defaultValue="+262 269 XX XX XX"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Enregistrer les modifications
          </button>
        </div>
      </div>
    </div>
  );
};
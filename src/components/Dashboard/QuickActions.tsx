import React from 'react';
import { Plus, FileText, Receipt, Send, CreditCard } from 'lucide-react';

const actions = [
  {
    title: 'Nouvelle facture',
    description: 'Créer une facture rapidement',
    icon: FileText,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    title: 'Ajouter dépense',
    description: 'Enregistrer une dépense',
    icon: Receipt,
    color: 'bg-emerald-500 hover:bg-emerald-600'
  },
  {
    title: 'Virement',
    description: 'Effectuer un virement',
    icon: Send,
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    title: 'Note de frais',
    description: 'Soumettre une note de frais',
    icon: CreditCard,
    color: 'bg-orange-500 hover:bg-orange-600'
  }
];

export const QuickActions: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Plus className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Actions rapides</h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className={`w-full p-4 rounded-lg transition-all duration-200 ${action.color} text-white hover:shadow-md transform hover:scale-105`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Aide et support</h4>
        <p className="text-sm text-gray-600">
          Besoin d'aide ? Contactez notre équipe support dédiée à Mayotte.
        </p>
        <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
          Contacter le support →
        </button>
      </div>
    </div>
  );
};
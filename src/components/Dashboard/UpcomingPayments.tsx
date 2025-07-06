import React from 'react';
import { Calendar, AlertTriangle, CheckCircle } from 'lucide-react';

const upcomingPayments = [
  {
    id: 1,
    type: 'invoice',
    description: 'Facture #INV-2024-003',
    amount: 1850,
    dueDate: '2024-01-20',
    status: 'due_soon',
    client: 'Société XYZ'
  },
  {
    id: 2,
    type: 'expense',
    description: 'Loyer bureau',
    amount: 1200,
    dueDate: '2024-01-25',
    status: 'scheduled',
    client: 'Propriétaire'
  },
  {
    id: 3,
    type: 'invoice',
    description: 'Facture #INV-2024-004',
    amount: 2200,
    dueDate: '2024-01-18',
    status: 'overdue',
    client: 'Client ABC'
  },
  {
    id: 4,
    type: 'expense',
    description: 'Assurance professionnelle',
    amount: 450,
    dueDate: '2024-01-30',
    status: 'scheduled',
    client: 'Assureur'
  }
];

export const UpcomingPayments: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'due_soon':
        return 'bg-orange-100 text-orange-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'due_soon':
        return <Calendar className="w-4 h-4 text-orange-600" />;
      case 'scheduled':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'overdue':
        return 'En retard';
      case 'due_soon':
        return 'Bientôt dû';
      case 'scheduled':
        return 'Planifié';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Paiements à venir</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Gérer
        </button>
      </div>

      <div className="space-y-4">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(payment.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {getStatusText(payment.status)}
                  </span>
                </div>
                <p className="font-medium text-gray-900">{payment.description}</p>
                <p className="text-sm text-gray-600">{payment.client}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Échéance: {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  €{payment.amount.toLocaleString()}
                </p>
                <button className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  {payment.type === 'invoice' ? 'Relancer' : 'Payer'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { KPICards } from './KPICards';
import { CashFlowChart } from './CashFlowChart';
import { RecentTransactions } from './RecentTransactions';
import { QuickActions } from './QuickActions';
import { UpcomingPayments } from './UpcomingPayments';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bienvenue</h2>
          <p className="text-gray-600 mt-1">Voici un aperçu de votre activité financière</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Dernière mise à jour</p>
          <p className="text-sm font-medium text-gray-900">Il y a 2 minutes</p>
        </div>
      </div>

      <KPICards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <CashFlowChart />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentTransactions />
        <UpcomingPayments />
      </div>
    </div>
  );
};
import { AdminDetails } from './AdminDetails';
import { PaidSubscriber } from './PaidSubscriber';
import { PremiumInfo } from './PremiumInfo';
import { ServicesProvided } from './ServicesProvided';

interface AdminSettingsProps {}

export const AdminSettings: React.FC<AdminSettingsProps> = () => {
  return (
    <>
      <AdminDetails />
      <PaidSubscriber />
      <PremiumInfo />
      <ServicesProvided />
    </>
  );
};

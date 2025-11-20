import { useNavigate, useParams } from 'react-router-dom';
import { usePurchase } from '@/domain/purchase/hooks/usePurchase';
import { usePurchaseMutations } from '@/domain/purchase/hooks/usePurchaseMutations';
import { PurchaseForm } from '@/domain/purchase/components/PurchaseForm';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';

export const PurchaseFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { purchase, isLoading, error } = usePurchase({
    id,
    enabled: isEditMode,
  });

  const { createPurchase, updatePurchase, isCreating, isUpdating } = usePurchaseMutations();

  const handleSubmit = async (data: any) => {
    try {
      if (isEditMode && id) {
        await updatePurchase({ id, data });
      } else {
        await createPurchase(data);
      }
      navigate('/dashboard/purchases');
    } catch (error) {
      console.error('Failed to save purchase:', error);
    }
  };

  if (isEditMode && isLoading) {
    return <LoadingSpinner size="lg" />;
  }

  if (isEditMode && error) {
    return (
      <ErrorMessage title="Error loading purchase" message="Could not load purchase details." />
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <PurchaseForm
        initialData={purchase}
        onSubmit={handleSubmit}
        isSubmitting={isCreating || isUpdating}
        onCancel={() => navigate('/dashboard/purchases')}
      />
    </div>
  );
};

export default PurchaseFormPage;

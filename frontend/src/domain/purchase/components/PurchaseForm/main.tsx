import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/core/components/ui/button';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/core/components/ui/card';
import type { CreatePurchaseDto, Purchase } from '../../types';

const purchaseSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  quantity: z.coerce.number().min(0.001, 'Quantity must be greater than 0'),
  unitPrice: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  purchaseDate: z.string().refine((date) => new Date(date) <= new Date(), {
    message: 'Date cannot be in the future',
  }),
  category: z.string().max(50, 'Category must be less than 50 characters').optional(),
});

type PurchaseFormData = z.infer<typeof purchaseSchema>;

interface PurchaseFormProps {
  initialData?: Purchase;
  onSubmit: (data: CreatePurchaseDto) => Promise<void>;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const PurchaseForm = ({
  initialData,
  onSubmit,
  isSubmitting,
  onCancel,
}: PurchaseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      name: initialData?.name || '',
      quantity: initialData?.quantity || 1,
      unitPrice: initialData?.unitPrice || 0,
      purchaseDate: initialData?.purchaseDate
        ? new Date(initialData.purchaseDate).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      category: initialData?.category || '',
    },
  });

  const quantity = watch('quantity');
  const unitPrice = watch('unitPrice');
  const total = (Number(quantity) || 0) * (Number(unitPrice) || 0);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Purchase' : 'New Purchase'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Product Name</Label>
            <Input id="name" {...register('name')} placeholder="e.g., Milk, Bread" />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" step="0.001" {...register('quantity')} />
              {errors.quantity && (
                <p className="text-sm text-destructive">{errors.quantity.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unitPrice">Unit Price</Label>
              <Input id="unitPrice" type="number" step="0.01" {...register('unitPrice')} />
              {errors.unitPrice && (
                <p className="text-sm text-destructive">{errors.unitPrice.message}</p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Total Price (Estimated)</Label>
            <div className="text-2xl font-bold">${total.toFixed(2)}</div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="purchaseDate">Date</Label>
            <Input id="purchaseDate" type="date" {...register('purchaseDate')} />
            {errors.purchaseDate && (
              <p className="text-sm text-destructive">{errors.purchaseDate.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category (Optional)</Label>
            <Input id="category" {...register('category')} placeholder="e.g., Dairy, Produce" />
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Purchase'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

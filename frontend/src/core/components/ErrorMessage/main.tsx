import { Button } from '@/core/components/ui/button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export const ErrorMessage = ({ title = 'Error', message, onRetry, onBack }: ErrorMessageProps) => {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-md border border-destructive/50 bg-destructive/10 p-6 text-center">
      <h3 className="mb-2 text-lg font-semibold text-destructive">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{message}</p>
      <div className="flex gap-2">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Go Back
          </Button>
        )}
        {onRetry && <Button onClick={onRetry}>Try Again</Button>}
      </div>
    </div>
  );
};

export default ErrorMessage;

import { toast, ToasterProps } from 'sonner';
import CheckCircleIcon from '@/components/icons/CheckCircle';
import InfoCircleIcon from '@/components/icons/InfoCircle';

type NotificationProps = {
  message: string;
  description?: string;
  type?: 'success' | 'error';
  position?: ToasterProps['position'];
};

const Notification = ({
  message,
  description,
  type = 'success',
  position = 'top-center',
}: NotificationProps) => {
  const color = type === 'success' ? 'text-green-500' : 'text-red-600';
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-600';
  const Icon = type === 'success' ? CheckCircleIcon : InfoCircleIcon;

  toast.custom(
    (t) => (
      <div
        onClick={() => toast.dismiss(t)}
        className={`w-full flex gap-3 items-start bg-ui-900 border border-secondary/[8%] rounded-lg px-4 py-3 cursor-pointer`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
        <div className="flex-1">
          <p className={`text-sm font-semibold ${color}`}>{message}</p>
          {description && <p className="text-sm text-white/90 mt-1">{description}</p>}
        </div>
      </div>
    ),
    { position },
  );
};

export default Notification;

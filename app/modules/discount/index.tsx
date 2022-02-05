import { FC } from 'react';
import { useRouter } from 'blitz';


const DiscountPage: FC = () => {
  const router = useRouter();
  const { clientId } = router.query;

  return <>{clientId}</>;
}

export default DiscountPage;

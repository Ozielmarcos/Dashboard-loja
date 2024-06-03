import { FormRoot } from '@/components/form';

export default function LoginFactory({ children }: React.PropsWithChildren) {
  return <FormRoot onSubmit={() => {}}>{children}</FormRoot>;
}

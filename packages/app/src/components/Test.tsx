import { trpc } from '../utils/trpc';

const Test = (): JSX.Element => {
  const mutation = trpc.useMutation('auth/signup-publisher');

  const onSubmit = () => {
    mutation.mutate({ email: 'juan19188765876@live.com.mx', password: '123456##', username: 'Kamiganzo2' });
  };

  return (
    <div>
      <div>Error: {mutation.error?.message}</div>
      <div>Error Zod: {JSON.stringify(mutation.error?.data?.zodError)}</div>
      <div>Error Data: {JSON.stringify(mutation.error?.data)}</div>
      <button onClick={() => onSubmit()}>Test</button>
    </div>
  );
};

export { Test };

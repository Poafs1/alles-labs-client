import { FC, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getRefreshToken } from '../../utils/localstorage';
import { CONSTANTS } from '../../constants';
import { fetcher } from '../../utils/fetcher';
import useSWR from 'swr';

type WithAuth = (Component: FC) => FC;

const WithAuth: WithAuth = (Component) => {
  const Authenticated: FC = (props: any): JSX.Element | null => {
    const router = useRouter();
    const { data, isLoading } = useSWR(CONSTANTS.api.user, fetcher);
    const [isOk, setIsOk] = useState(false);

    const handleUser = useCallback(() => {
      const isHasRefreshToken = !!getRefreshToken();

      if (!isHasRefreshToken) {
        router.push(CONSTANTS.redirection.home);

        return;
      }

      if (!data) {
        router.push(CONSTANTS.redirection.home);

        return;
      }

      setIsOk(true);
    }, [data]);

    useEffect(() => {
      handleUser();
    }, [handleUser, data]);

    return (
      <div className='min-h-screen'>
        {!isLoading && isOk ? (
          <Component
            {...{
              ...props,
              user: data,
            }}
          />
        ) : null}
      </div>
    );
  };

  return Authenticated;
};

export default WithAuth;

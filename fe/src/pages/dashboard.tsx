import Router from "next/router";
import { destroyCookie } from "nookies";
import { useContext } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";

const authChannel = new BroadcastChannel('auth');

function SignOut(): void {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  });

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button type="button" onClick={SignOut}>
        Sair
      </button>

      {userCanSeeMetrics && <div>Métricas</div>}

      <Can permissions={['metrics.list']}>
        <h1>Usuário tem permissão</h1>
      </Can>
    </>
  );
}
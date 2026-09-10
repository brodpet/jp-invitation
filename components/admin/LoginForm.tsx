'use client';

import { useActionState } from 'react';
import { login } from '@/app/admin/actions';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <main className="admin admin-center">
      <p className="eyebrow">Antonio &amp; Axzel</p>
      <h1 className="chapter-title">
        Guest <em>list</em>
      </h1>
      <form action={action} className="admin-login">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" autoFocus required />
        {state?.error && (
          <p className="admin-error" role="alert">
            {state.error}
          </p>
        )}
        <button className="btn btn-ink" type="submit" disabled={pending}>
          {pending ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </main>
  );
}

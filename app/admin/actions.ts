'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { addGuest as addGuestRecord, type Guest } from '@/lib/guests';
import { clearAdminCookie, isAdmin, passwordMatches, setAdminCookie } from '@/lib/admin-auth';

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
  const password = String(formData.get('password') ?? '');
  if (!passwordMatches(password)) return { error: 'That password is not right.' };
  await setAdminCookie();
  redirect('/admin');
}

export async function logout() {
  await clearAdminCookie();
  redirect('/admin');
}

export type AddState = { guest?: Guest; error?: string };

export async function addGuest(_prev: AddState | undefined, formData: FormData): Promise<AddState> {
  if (!(await isAdmin())) return { error: 'Not signed in.' };
  const name = String(formData.get('name') ?? '');
  const seats = Number(formData.get('seats') ?? 1);
  try {
    const guest = await addGuestRecord(name, seats);
    revalidatePath('/admin');
    return { guest };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not add guest.' };
  }
}

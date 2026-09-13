'use client';

import { useState } from 'react';
import Envelope from './Envelope';
import RsvpPrompt, { PROMPT_SKIPPED } from './RsvpPrompt';
import type { Guest } from '@/lib/guests';

// Envelope first; then, for a personal link with no reply on record, a quick RSVP.
export default function Intro({ guest }: { guest?: Guest }) {
  const [step, setStep] = useState<'envelope' | 'prompt' | 'done'>('envelope');

  function envelopeDone() {
    let skipped = false;
    try {
      skipped = !!sessionStorage.getItem(PROMPT_SKIPPED);
    } catch {}
    const needsReply = !!guest && guest.status !== 'accepted' && guest.status !== 'declined';
    setStep(needsReply && !skipped ? 'prompt' : 'done');
  }

  return (
    <>
      {step === 'envelope' && <Envelope guestName={guest?.name} onDone={envelopeDone} />}
      {step === 'prompt' && guest && <RsvpPrompt guest={guest} onClose={() => setStep('done')} />}
    </>
  );
}

'use client';

import { useState, useTransition } from 'react';
import { Slot, useRefetch } from 'waku/minimal/client';

export const Counter = ({ enableInnerApp }: { enableInnerApp?: boolean }) => {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();
  const refetch = useRefetch();
  const handleClick = () => {
    if (enableInnerApp) {
      const nextCount = count + 1;
      setCount(nextCount);
      refetch('InnerApp=' + nextCount);
    } else {
      setCount((c) => c + 1);
    }
  };
  const handleClickWithTransition = () => {
    if (enableInnerApp) {
      startTransition(() => {
        const nextCount = count + 1;
        setCount(nextCount);
        refetch('InnerApp=' + nextCount);
      });
    } else {
      setCount((c) => c + 1);
    }
  };
  return (
    <div style={{ border: '3px blue dashed', margin: '1em', padding: '1em' }}>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      {enableInnerApp && (
        <button onClick={handleClickWithTransition} disabled={isPending}>
          Increment with transition
        </button>
      )}
      {isPending && 'Pending...'}
      <h3>This is a client component.</h3>
      {enableInnerApp && <Slot id="InnerApp" />}
    </div>
  );
};

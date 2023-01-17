'use client';

import type { Comment } from '../interfaces';
import React, { useState } from 'react';
import useSWR from 'swr';

async function getToken() {
  const response = await fetch('/api/token');
  const { accessToken } = await response.json();
  return accessToken;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useComments() {
  const [text, setText] = useState('');
  const { data: comments, mutate } = useSWR<Comment[]>(
    '/api/comment',
    fetcher,
    { fallbackData: [] },
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();

    try {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      setText('');
      await mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return { text, setText, onSubmit, comments };
}

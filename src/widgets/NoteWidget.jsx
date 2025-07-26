// src/components/widgets/NoteWidget.jsx
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';

const STORAGE_KEY = 'dashboard_notes';

export default function NoteWidget() {
  const [text, setText] = useState('');

  // Al montar, carga desde localStorage si existe
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      setText(saved);
    }
  }, []);

  // Cada vez que cambia el texto, lo guardamos
  const onChange = (e) => {
    const v = e.target.value;
    setText(v);
    localStorage.setItem(STORAGE_KEY, v);
  };

  return (
    <Input.TextArea
      value={text}
      onChange={onChange}
      placeholder="Escribe tus notas aquí..."
      rows={8}
    />
  );
}

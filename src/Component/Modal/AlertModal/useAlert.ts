import {useCallback, useMemo, useState} from 'react';

type AlertContent = {
  title?: string;
  message: string;
  onConfirm: () => void;
};

export function useAlert() {
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState<AlertContent | null>(null);

  const openAlert = useCallback(
    ({title = '알림', message, onConfirm}: AlertContent) => {
      setVisible(true);
      setAlert({title, message, onConfirm});
    },
    [],
  );

  const closeAlert = useCallback(() => {
    setVisible(false);
  }, []);

  return {visible, alert, openAlert, closeAlert};
}

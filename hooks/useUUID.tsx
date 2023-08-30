import { useMemo, useRef } from "react";
import uuid from "react-native-uuid";

const useUUID = () => {
  const id = useRef<string>(String(uuid.v4()));
  return useMemo(() => id.current, []);
};

export default useUUID;
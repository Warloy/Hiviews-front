import { useState, useEffect } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

import { getConnection } from "@/services/http";

const useConnection = () => {
  const [isConnected, setIsConnected] = useState(false);

  const recognizeConnection = () => {
    NetInfo.fetch()
      .then((state) => {
        if (state.isConnected) {

          getConnection()
            .then((result) => {
              let { status } = result;

              infoState(state, status);

              setIsConnected(typeof status === "number");

            })
            .catch((error) => {
              console.error(`getConnection error: ${error}`);
            })

        } else {

          infoState(state)

          setIsConnected(false);

        }
      });
  }

  useEffect(() => {
    recognizeConnection();
  }, [recognizeConnection]);

  return {
    isConnected,
    recognizeConnection
  };

};

export default useConnection;

const infoState = (state: NetInfoState, status?: number) => {
  console.group("Connection Details:");
  console.log(`Connection type: ${state.type}`);
  status && console.log(`Status: ${status}`);
  console.log(`Is connected? ${state.isConnected}`);
  console.groupEnd();
}
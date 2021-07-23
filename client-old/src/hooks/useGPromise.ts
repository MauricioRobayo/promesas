import { useQuery } from "react-query";
import { firebaseCallable } from "../../../client/src/services/firebase";
import { GPromise } from "../features/gPromises/gPromisesSlice";

export default function useGPromise(gPromiseId: string) {
  const getPromiseById = firebaseCallable<GPromise, string>("promise");
  return useQuery(["promise", gPromiseId], () => getPromiseById(gPromiseId), {
    staleTime: Infinity,
  });
}

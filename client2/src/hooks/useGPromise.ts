import { useQuery } from "react-query";
import { firebaseCallable } from "../src/components/firebase";
import { GPromise } from "../src/components/gPromises/gPromisesSlice";

export default function useGPromise(gPromiseId: string) {
  const getPromiseById = firebaseCallable<GPromise, string>("promise");
  return useQuery(["promise", gPromiseId], () => getPromiseById(gPromiseId), {
    staleTime: Infinity,
  });
}
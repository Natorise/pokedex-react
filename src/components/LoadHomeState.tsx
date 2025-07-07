import { useEffect, useRef } from "react";
import type { FiltersType } from "./Filters";
import { useLocation } from "react-router-dom";

type PropsType = {
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  pokesLoaded: number;
  setPokesLoaded: React.Dispatch<React.SetStateAction<number>>;
};

const LoadHomeState = ({
  setFilters,
  pokesLoaded,
  setPokesLoaded,
}: PropsType) => {
  const location = useLocation();

  const scrollYRef = useRef<number | null>(null);
  const pokesLoadedRef = useRef<number | null>(null);

  useEffect(() => {
    const filters: FiltersType | undefined = location.state?.filters;
    const pokesLoaded: number | undefined = location.state?.pokesLoaded;
    const scrollY: number | undefined = location.state?.scrollY;

    if (
      typeof filters === "undefined" ||
      typeof pokesLoaded === "undefined" ||
      typeof scrollY === "undefined"
    )
      return;
    setFilters(filters);
    setPokesLoaded(pokesLoaded);
    scrollYRef.current = scrollY;
    pokesLoadedRef.current = pokesLoaded;
  }, [location.state]);
  useEffect(() => {
    if (scrollYRef.current === null || pokesLoadedRef.current === null) return;

    if (pokesLoadedRef.current !== pokesLoaded) return;

    requestAnimationFrame(() => {
      window.scrollTo(0, scrollYRef.current!);
      scrollYRef.current = null;
      pokesLoadedRef.current = null;
    });
  }, [pokesLoaded]);

  return null;
};

export default LoadHomeState;

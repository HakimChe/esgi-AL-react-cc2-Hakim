import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Movie } from "../types/movie";
import { MovieCard } from "../components/MovieCard";
import { SearchBar } from "../components/SearchBar";

// =============================================================
// EXERCICE 2 — CataloguePage (8 pts)
// =============================================================
//
// Compléter cette page pour charger et afficher la liste des films.
//
// L'état search et genre est déjà câblé avec SearchBar.
// L'endpoint API est : GET /api/movies?search=...&genre=...
//
// 1. (2 pts) Écrire le useQuery avec un queryKey qui reflète
//    les critères de recherche actuels
//
// 2. (2 pts) Dans la queryFn, construire l'URL avec les bons
//    paramètres et appeler le service API
//
// 3. (1 pt) Afficher un message de chargement quand les données
//    ne sont pas encore arrivées
//
// 4. (1 pt) Afficher un message d'erreur si la requête échoue
//
// 5. (2 pts) Afficher les films dans une grille en utilisant
//    le composant MovieCard (penser à la prop key)
//

export const CataloguePage = () => {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  // TODO : écrire le useQuery ici

  const{
    data: movies,
    loading,
    error,
  } = useQuery<Movie[]>({
    queryKey: ["movies", search, genre],
    queryFn: async () => {
      const reponse = await api.get<Movie[]>(`/movies?search=${search}&genre=${genre}`);

      if (!reponse.ok) {
        throw new Error("Erreur lors du chargement des films");
      }
      return reponse.json();
    }
  });
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Catalogue</h1>
      <SearchBar onSearch={setSearch} onGenreChange={setGenre} />

      {/* TODO : afficher loading, error, et la liste de films */}
      {loading && <p>Chargement des films ...</p>}

      {error && <p>Erreur lors du chargement des films</p>}

    </div>
  );
};

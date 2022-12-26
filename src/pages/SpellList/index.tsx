import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import Spin from "../../components/Spin";
import SpellCard from "../../components/SpellCard";

const SPELLS_QUERY = gql`
  {
    spells {
      index
      name
      classes {
        name
      }
    }
  }
`;

const SpellList = () => {
  const [favorite, setFavorite] = useState<string[]>([]);

  const { data, loading, error } = useQuery(SPELLS_QUERY);

  useEffect(() => {
    const favorite = localStorage.getItem("favorite");
    if (favorite) {
      setFavorite(JSON.parse(favorite));
    }
  }, []);

  if (loading) return <Spin />;
  if (error) return <pre>{error.message}</pre>;

  const handleFavorite = (index: string) => {
    const isFavorite = favorite.includes(index);
    if (isFavorite) {
      const newFavorite = favorite.filter((item) => item !== index);
      setFavorite(newFavorite);
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
    } else {
      const newFavorite = [...favorite, index];
      setFavorite(newFavorite);
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
    }
  };

  return (
    <div className="p-5 bg-gray-900">
      <div className="grid grid-cols-4 gap-5">
        {data.spells.map((spell: any) => (
          <SpellCard
            key={spell.index}
            name={spell.name}
            index={spell.index}
            classType={spell.classes[0].name}
            handleFavorite={handleFavorite}
            isFavorite={favorite.includes(spell.index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SpellList;

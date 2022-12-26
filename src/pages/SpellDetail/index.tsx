import { useParams, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Spin from "../../components/Spin";
import DamageTable from "../../components/DamageTable";

const SPELL_DETAIL_QUERY = gql`
  query Spell($index: String) {
    spell(index: $index) {
      level
      name
      school {
        name
      }
      desc
      higher_level
      ritual
      classes {
        name
      }
      damage {
        damage_at_slot_level {
          level
          damage
        }
        damage_type {
          name
        }
      }
      range
      material
      duration
      concentration
      attack_type
      area_of_effect {
        size
        type
      }
      casting_time
      heal_at_slot_level {
        healing
      }
      components
    }
  }
`;

const SpellDetail = () => {
  const navigate = useNavigate();
  const { index } = useParams<{ index: string }>();

  const { data, loading, error } = useQuery(SPELL_DETAIL_QUERY, {
    variables: { index: index },
  });

  if (loading) return <Spin />;
  if (error) return <pre>{error.message}</pre>;

  console.log(data);

  return (
    <div className="bg-gray-900 flex justify-center h-[100vh] p-5">
      <div className="relative px-5 pt-2 pb-5 rounded-xl w-[70%] bg-gray-800 mt-5 overflow-y-auto">
        <h1 className="text-3xl text-center text-white font-semibold py-5">
          {data.spell.name}
        </h1>
        <button
          title="Close"
          type="button"
          className="absolute top-6 right-6 text-white hover:text-gray-400"
          onClick={() => {
            navigate(-1);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
        <div className="flex gap-2 pb-5">
          <div className="px-3 py-1 border border-white rounded-full bg-slate-300">
            <span className="text-sm font-semibold">Level: </span>
            <span className="text-sm">{data.spell.level}</span>
          </div>
          <div className="px-3 py-1 border border-white rounded-full bg-slate-300">
            <span className="text-sm font-semibold">Ritual: </span>
            <span className="text-sm">{data.spell.ritual ? "Yes" : "No"}</span>
          </div>
          <div className="px-3 py-1 border border-white rounded-full bg-slate-300">
            <span className="text-sm font-semibold">School: </span>
            <span className="text-sm">{data.spell.school.name}</span>
          </div>
          <div className="px-3 py-1 border border-white rounded-full bg-slate-300">
            <span className="text-sm font-semibold">Component: </span>
            <span className="text-sm">{data.spell.components.join(", ")}</span>
          </div>
        </div>
        <p className="text-white text-sm">{data.spell.desc}</p>
        <div className="mt-5">
          <span className="text-xl font-semibold text-white">Damage</span>
          <div className="grid grid-cols-2 gap-5 mt-2">
            <div className="flex flex-col border border-white rounded-xl">
              <div className="px-3 py-1 ">
                <span className="text-white text-sm font-semibold">
                  Range:{" "}
                </span>
                <span className="text-white text-sm">{data.spell.range}</span>
              </div>
              <div className="px-3 py-1 ">
                <span className="text-white text-sm font-semibold">
                  Duration:{" "}
                </span>
                <span className="text-white text-sm">
                  {data.spell.duration}
                </span>
              </div>
              <div className="px-3 py-1 ">
                <span className="text-white text-sm font-semibold">
                  Concentration:{" "}
                </span>
                <span className="text-white text-sm">
                  {data.spell.concentration ? "Yes" : "No"}
                </span>
              </div>
              <div className="px-3 py-1 ">
                <span className="text-white text-sm font-semibold">
                  Material:{" "}
                </span>
                <span className="text-white text-sm">
                  {data.spell.material}
                </span>
              </div>
              <div className="px-3 py-1 ">
                <span className="text-white text-sm font-semibold">
                  Attack Type:{" "}
                </span>
                <span className="text-white text-sm">
                  {data.spell.attack_type}
                </span>
              </div>
              <div className="px-3 py-1 ">
                <span className="text-white text-sm font-semibold">
                  Area of Effect:{" "}
                </span>
                <span className="text-white text-sm">
                  {data.spell.area_of_effect?.size}{" "}
                  {data.spell.area_of_effect?.type}
                </span>
              </div>
              <div className="px-3 py-1">
                <span className="text-white text-sm font-semibold">
                  Casting Time:{" "}
                </span>
                <span className="text-white text-sm">
                  {data.spell.casting_time}
                </span>
              </div>
            </div>
            {data.spell.damage?.damage_at_slot_level && (
              <DamageTable
                damageAtLevel={data.spell.damage.damage_at_slot_level}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpellDetail;

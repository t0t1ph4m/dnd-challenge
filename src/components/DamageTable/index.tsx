interface IDamageAtLevel {
  damageAtLevel: {
    level: number;
    damage: string;
  }[];
}

const DamageTable = ({ damageAtLevel }: IDamageAtLevel) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Level
            </th>
            <th scope="col" className="py-3 px-6">
              <span>Damage</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {damageAtLevel.map((damage, index) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {damage.level}
                </th>
                <td className="py-4 px-6">{damage.damage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DamageTable;

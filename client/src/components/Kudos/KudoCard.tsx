import { Kudo } from "../../types";

interface KudoCardProps {
  kudo: Kudo;
}

const KudoCard = ({ kudo }: KudoCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600">From: {kudo.sender.name}</p>
          <p className="text-sm text-gray-600">To: {kudo.receiver.name}</p>
        </div>
        <span className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-800">
          {kudo.category}
        </span>
      </div>
      <p className="text-gray-800">{kudo.message}</p>
      <p className="text-sm text-gray-500 mt-4">
        {new Date(kudo.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default KudoCard;
